import { buildSystemPrompt } from "./knowledge";
import { createChain, type Msg, parseChain, redact } from "./providers";

// Minimal Lambda Function URL event/response shapes (avoids an @types/aws-lambda dependency).
type UrlEvent = {
  body?: string;
  isBase64Encoded?: boolean;
  headers?: Record<string, string | undefined>;
  requestContext?: { http?: { method?: string; sourceIp?: string } };
};
type UrlResult = { statusCode: number; headers: Record<string, string>; body: string };

export const LIMITS = { messageChars: 1_000, turns: 12, bodyBytes: 32_000 } as const;
const RATE = { max: 20, windowMs: 10 * 60_000 } as const;

const json = (statusCode: number, body: unknown): UrlResult => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  body: JSON.stringify(body),
});

// ponytail: in-memory limits reset per cold start and are per instance; add API Gateway throttling or WAF if abused.
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear(); // bound memory
  return recent.length > RATE.max;
}

/** Validate and normalise the client payload. Returns null for anything malformed. */
export function parseMessages(raw: unknown): Msg[] | null {
  if (!raw || typeof raw !== "object" || !Array.isArray((raw as { messages?: unknown }).messages)) return null;
  const list = (raw as { messages: unknown[] }).messages;
  if (list.length === 0 || list.length > LIMITS.turns * 2) return null;
  const out: Msg[] = [];
  for (const m of list) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const c = content.trim();
    if (!c || c.length > LIMITS.messageChars) return null;
    out.push({ role, content: c });
  }
  if (out[out.length - 1]?.role !== "user") return null;
  return out.slice(-LIMITS.turns);
}

const allowed = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const run = createChain({
  chain: parseChain(process.env.CHAT_CHAIN),
  keys: { groq: process.env.GROQ_API_KEY, anthropic: process.env.ANTHROPIC_API_KEY },
});
let system: string | undefined;

export const handler = async (event: UrlEvent): Promise<UrlResult> => {
  if (event.requestContext?.http?.method !== "POST") return json(405, { error: "method" });

  // CORS is enforced by the Function URL for browsers; this also rejects non-browser calls from other origins.
  const origin = event.headers?.origin ?? event.headers?.Origin ?? "";
  if (allowed.length && !allowed.includes(origin)) return json(403, { error: "origin" });

  const ip = event.requestContext?.http?.sourceIp ?? "unknown";
  if (rateLimited(ip)) return json(429, { handoff: true, reason: "rate" });

  const text = event.isBase64Encoded ? Buffer.from(event.body ?? "", "base64").toString("utf8") : (event.body ?? "");
  if (text.length > LIMITS.bodyBytes) return json(413, { error: "size" });

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return json(400, { error: "json" });
  }
  const messages = parseMessages(parsed);
  if (!messages) return json(400, { error: "messages" });

  system ??= buildSystemPrompt(process.env.SITE_URL ?? "");
  const result = await run(system, messages);
  if (!result.ok) {
    console.warn("chat: all providers failed", redact(result.attempts.join("; ")));
    return json(503, { handoff: true, reason: "unavailable" });
  }
  if (result.attempts.length) console.info("chat: fell back", redact(result.attempts.join("; ")));
  return json(200, { reply: result.text.slice(0, 2_000) });
};
