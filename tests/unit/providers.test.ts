import { describe, expect, it, vi } from "vitest";
import { classify, createChain, parseChain, redact } from "../../amplify/functions/chat/providers";

const groqOk = (text: string) =>
  new Response(JSON.stringify({ choices: [{ message: { content: text } }] }), { status: 200 });
const claudeOk = (text: string) => new Response(JSON.stringify({ content: [{ type: "text", text }] }), { status: 200 });
const chain = parseChain("groq:openai/gpt-oss-20b,anthropic:claude-haiku-4-5");
const keys = { groq: "gsk_test", anthropic: "sk-ant-test" };
const msgs = [{ role: "user" as const, content: "hi" }];

describe("parseChain", () => {
  it("splits on the first colon only", () =>
    expect(chain).toEqual([
      { provider: "groq", model: "openai/gpt-oss-20b" },
      { provider: "anthropic", model: "claude-haiku-4-5" },
    ]));
  it("drops unknown providers", () => expect(parseChain("evil:x,groq:m")).toEqual([{ provider: "groq", model: "m" }]));
});

describe("classify / redact", () => {
  it("classifies HTTP statuses", () => {
    expect(classify(429)).toBe("rate_limit");
    expect(classify(401)).toBe("auth");
    expect(classify(404)).toBe("not_found");
    expect(classify(500)).toBe("server");
  });
  it("redacts keys", () => {
    expect(redact("key sk-ant-abcdef123456789")).not.toContain("123456789");
    expect(redact("gsk_abcd1234567890")).not.toContain("1234567890");
  });
});

describe("createChain", () => {
  it("answers from the first healthy provider", async () => {
    const f = vi.fn(async () => groqOk("from groq"));
    const run = createChain({ chain, keys, fetcher: f as unknown as typeof fetch });
    expect(await run("sys", msgs)).toMatchObject({ ok: true, text: "from groq", provider: "groq" });
    expect(f).toHaveBeenCalledTimes(1);
  });

  it("falls back to Claude when Groq rate-limits, then skips Groq while it cools down", async () => {
    let t = 0;
    const f = vi.fn(async (url: string) =>
      url.includes("groq") ? new Response("{}", { status: 429 }) : claudeOk("from claude"),
    );
    const run = createChain({ chain, keys, fetcher: f as unknown as typeof fetch, now: () => t });
    const first = await run("sys", msgs);
    expect(first).toMatchObject({ ok: true, provider: "anthropic", attempts: ["groq/openai/gpt-oss-20b: rate_limit"] });
    t += 5_000; // still inside the 60s rate-limit cooldown
    const second = await run("sys", msgs);
    expect(second).toMatchObject({ ok: true, provider: "anthropic", attempts: ["groq/openai/gpt-oss-20b: cooling"] });
    expect(f.mock.calls.filter(([u]) => String(u).includes("groq"))).toHaveLength(1);
  });

  it("times out a hung provider and reports failure when all fail", async () => {
    const f = vi.fn(
      (_url: string, init: RequestInit) =>
        new Promise<Response>((_, reject) =>
          init.signal?.addEventListener("abort", () =>
            reject(Object.assign(new Error("aborted"), { name: "AbortError" })),
          ),
        ),
    );
    const run = createChain({ chain, keys, fetcher: f as unknown as typeof fetch, attemptMs: 20, deadlineMs: 5_000 });
    const r = await run("sys", msgs);
    expect(r.ok).toBe(false);
    expect(r.attempts).toEqual(["groq/openai/gpt-oss-20b: timeout", "anthropic/claude-haiku-4-5: timeout"]);
  });

  it("treats a missing key as an auth failure instead of calling out", async () => {
    const f = vi.fn();
    const run = createChain({ chain, keys: {}, fetcher: f as unknown as typeof fetch });
    expect((await run("sys", msgs)).ok).toBe(false);
    expect(f).not.toHaveBeenCalled();
  });
});
