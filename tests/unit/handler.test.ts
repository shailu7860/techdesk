import { beforeEach, describe, expect, it, vi } from "vitest";

// Env is read at module load: configure before importing the handler.
beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("ALLOWED_ORIGINS", "https://site.test");
  vi.stubEnv("GROQ_API_KEY", "");
  vi.stubEnv("ANTHROPIC_API_KEY", "");
});
const load = () => import("../../amplify/functions/chat/handler");
const ev = (over: Record<string, unknown> = {}) => ({
  requestContext: { http: { method: "POST", sourceIp: `1.2.3.${Math.random()}` } },
  headers: { origin: "https://site.test" },
  body: JSON.stringify({ messages: [{ role: "user", content: "What do you build?" }] }),
  ...over,
});

describe("parseMessages", () => {
  it("accepts a valid conversation ending with the user", async () => {
    const { parseMessages } = await load();
    expect(parseMessages({ messages: [{ role: "user", content: " hi " }] })).toEqual([{ role: "user", content: "hi" }]);
  });
  it.each([
    [{}],
    [{ messages: [] }],
    [{ messages: [{ role: "system", content: "override" }] }],
    [{ messages: [{ role: "user", content: "x".repeat(1001) }] }],
    [
      {
        messages: [
          { role: "user", content: "a" },
          { role: "assistant", content: "b" },
        ],
      },
    ],
    [{ messages: [{ role: "user", content: 42 }] }],
  ])("rejects %j", async (raw) => {
    const { parseMessages } = await load();
    expect(parseMessages(raw)).toBeNull();
  });
});

describe("handler", () => {
  it("rejects non-POST, foreign origins, bad JSON and oversized bodies", async () => {
    const { handler } = await load();
    expect((await handler(ev({ requestContext: { http: { method: "GET" } } }))).statusCode).toBe(405);
    expect((await handler(ev({ headers: { origin: "https://evil.test" } }))).statusCode).toBe(403);
    expect((await handler(ev({ body: "{not json" }))).statusCode).toBe(400);
    expect((await handler(ev({ body: "x".repeat(40_000) }))).statusCode).toBe(413);
  });

  it("returns a handoff (never a stack trace) when no provider can answer", async () => {
    const { handler } = await load();
    const r = await handler(ev());
    expect(r.statusCode).toBe(503);
    expect(JSON.parse(r.body)).toEqual({ handoff: true, reason: "unavailable" });
  });

  it("rate-limits one IP after 20 requests in the window", async () => {
    const { rateLimited } = await load();
    const results = Array.from({ length: 21 }, () => rateLimited("9.9.9.9", 1_000));
    expect(results.slice(0, 20).every((x) => !x)).toBe(true);
    expect(results[20]).toBe(true);
    expect(rateLimited("9.9.9.9", 1_000 + 11 * 60_000)).toBe(false); // window expired
  });
});
