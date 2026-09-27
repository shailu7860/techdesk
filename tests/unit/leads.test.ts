import { afterEach, describe, expect, it, vi } from "vitest";
import { clean, emptyLead, type Lead, line, submitLead, validate } from "../../src/lib/leads";

const good: Lead = {
  ...emptyLead,
  name: "Asha Rao",
  email: "asha@example.com",
  projectType: "AI agent / chatbot / automation",
  description: "A WhatsApp agent that qualifies clinic leads.",
};

afterEach(() => vi.unstubAllEnvs());

describe("validate", () => {
  it("accepts a complete brief", () => expect(validate(5, good)).toEqual({}));
  it("requires a name on step 1", () => expect(validate(1, { ...good, name: " a " }).name).toBeTruthy());
  it("requires type and a real description on step 2", () => {
    const e = validate(2, { ...good, projectType: "", description: "short" });
    expect(e.projectType).toBeTruthy();
    expect(e.description).toBeTruthy();
  });
  it("rejects malformed email and phone", () => {
    const e = validate(4, { ...good, email: "nope@", phone: "abc" });
    expect(e.email).toBeTruthy();
    expect(e.phone).toBeTruthy();
  });
  it("needs a phone when WhatsApp or call is preferred", () => {
    expect(validate(4, { ...good, channel: "whatsapp" }).phone).toBeTruthy();
    expect(validate(4, { ...good, channel: "whatsapp", phone: "+91 98765 43210" })).toEqual({});
  });
});

describe("clean", () => {
  it("strips control characters, trims and caps length", () => {
    expect(clean("  hi\u0000\u0007 there  ", 100)).toBe("hi there");
    expect(clean("x".repeat(50), 10)).toHaveLength(10);
  });
});

describe("line", () => {
  it("collapses line breaks so single-line fields cannot split an email header", () => {
    expect(line("Asha\r\nBcc: victim@example.com", 100)).toBe("Asha Bcc: victim@example.com");
  });
});

describe("submitLead", () => {
  it("reports config when no key is set", async () => {
    vi.stubEnv("VITE_WEB3FORMS_KEY", "");
    expect(await submitLead(good, vi.fn())).toEqual({ ok: false, reason: "config" });
  });

  it("drops honeypot submissions without calling the network", async () => {
    const f = vi.fn();
    expect(await submitLead({ ...good, botcheck: "spam" }, f)).toEqual({ ok: true });
    expect(f).not.toHaveBeenCalled();
  });

  it("sends cleaned, capped fields and succeeds", async () => {
    vi.stubEnv("VITE_WEB3FORMS_KEY", "test-key");
    const f = vi.fn(async () => new Response(JSON.stringify({ success: true }), { status: 200 }));
    const r = await submitLead({ ...good, description: `${"a".repeat(3000)}\u0000` }, f as unknown as typeof fetch);
    expect(r).toEqual({ ok: true });
    const body = JSON.parse((f.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(body.access_key).toBe("test-key");
    expect(body.message).toHaveLength(2000);
    expect(body.botcheck).toBe("");
  });

  it("maps rejections and network failures", async () => {
    vi.stubEnv("VITE_WEB3FORMS_KEY", "test-key");
    const rejected = vi.fn(async () => new Response(JSON.stringify({ success: false }), { status: 200 }));
    expect(await submitLead(good, rejected as unknown as typeof fetch)).toEqual({ ok: false, reason: "rejected" });
    const offline = vi.fn(async () => {
      throw new TypeError("offline");
    });
    expect(await submitLead(good, offline as unknown as typeof fetch)).toEqual({ ok: false, reason: "network" });
  });
});
