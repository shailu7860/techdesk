import { afterEach, describe, expect, it, vi } from "vitest";
import { sendChat } from "../../src/lib/chat";

const msgs = [{ role: "user" as const, content: "hi" }];
const res = (status: number, body: unknown) => vi.fn(async () => new Response(JSON.stringify(body), { status }));
afterEach(() => vi.unstubAllEnvs());

describe("sendChat", () => {
  it("hands off when no endpoint is configured", async () => {
    vi.stubEnv("VITE_CHAT_URL", "");
    expect(await sendChat(msgs, vi.fn())).toEqual({ ok: false, handoff: true, reason: "config" });
  });

  it("returns the reply", async () => {
    vi.stubEnv("VITE_CHAT_URL", "https://chat.test/");
    expect(await sendChat(msgs, res(200, { reply: "Hello" }) as unknown as typeof fetch)).toEqual({
      ok: true,
      reply: "Hello",
    });
  });

  it.each([
    [429, "rate"],
    [400, "invalid"],
    [503, "unavailable"],
  ])("maps HTTP %i to a %s handoff", async (status, reason) => {
    vi.stubEnv("VITE_CHAT_URL", "https://chat.test/");
    expect(await sendChat(msgs, res(status, {}) as unknown as typeof fetch)).toEqual({
      ok: false,
      handoff: true,
      reason,
    });
  });

  it("never throws on network failure", async () => {
    vi.stubEnv("VITE_CHAT_URL", "https://chat.test/");
    const f = vi.fn(async () => {
      throw new TypeError("failed");
    });
    expect(await sendChat(msgs, f as unknown as typeof fetch)).toEqual({ ok: false, handoff: true, reason: "network" });
  });
});
