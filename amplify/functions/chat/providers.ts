// Provider chain for the chat assistant. Pattern adapted from the owner's Stratos LLM layer
// (env-driven provider:model pairs, per-attempt timeout, overall deadline, classified failures,
// per-provider cooldown, secret redaction), rewritten small and fetch-only.

export type Msg = { role: "user" | "assistant"; content: string };
export type Candidate = { provider: "groq" | "anthropic"; model: string };
export type FailureKind = "rate_limit" | "timeout" | "auth" | "not_found" | "server" | "bad_response";

export const DEFAULT_CHAIN = "groq:openai/gpt-oss-20b,anthropic:claude-haiku-4-5";

/** "groq:openai/gpt-oss-20b" → { provider, model }. First colon wins (model ids contain slashes). */
export function parseChain(v: string | undefined): Candidate[] {
  return (v || DEFAULT_CHAIN)
    .split(",")
    .map((s) => s.trim())
    .map((s) => {
      const i = s.indexOf(":");
      return { provider: s.slice(0, i).trim(), model: s.slice(i + 1).trim() };
    })
    .filter((c): c is Candidate => (c.provider === "groq" || c.provider === "anthropic") && Boolean(c.model));
}

const COOLDOWN_MS: Record<FailureKind, number> = {
  rate_limit: 60_000,
  timeout: 30_000,
  auth: 15 * 60_000,
  not_found: 15 * 60_000,
  server: 20_000,
  bad_response: 10_000,
};

export class ProviderError extends Error {
  constructor(
    public kind: FailureKind,
    message: string,
  ) {
    super(message);
  }
}

export function classify(status: number): FailureKind {
  if (status === 429) return "rate_limit";
  if (status === 401 || status === 403) return "auth";
  if (status === 404) return "not_found";
  return "server";
}

/** Strip anything that looks like a key before it reaches a log line. */
export const redact = (s: string) => s.replace(/(sk-[\w-]{6})[\w-]+/g, "$1…").replace(/(gsk_[\w]{4})[\w]+/g, "$1…");

type Keys = { groq?: string; anthropic?: string };
type Fetch = typeof fetch;

async function callOnce(c: Candidate, system: string, messages: Msg[], keys: Keys, timeoutMs: number, f: Fetch) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    if (c.provider === "groq") {
      if (!keys.groq) throw new ProviderError("auth", "missing GROQ key");
      const res = await f("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        signal: ctrl.signal,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${keys.groq}` },
        body: JSON.stringify({
          model: c.model,
          temperature: 0.3,
          max_tokens: 500,
          messages: [{ role: "system", content: system }, ...messages],
        }),
      });
      if (!res.ok) throw new ProviderError(classify(res.status), `groq ${res.status}`);
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = data.choices?.[0]?.message?.content?.trim();
      if (!text) throw new ProviderError("bad_response", "groq empty");
      return text;
    }
    if (!keys.anthropic) throw new ProviderError("auth", "missing ANTHROPIC key");
    const res = await f("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": keys.anthropic,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: c.model, max_tokens: 500, system, messages }),
    });
    if (!res.ok) throw new ProviderError(classify(res.status), `anthropic ${res.status}`);
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((b) => b.type === "text")?.text?.trim();
    if (!text) throw new ProviderError("bad_response", "anthropic empty");
    return text;
  } catch (e) {
    if (e instanceof ProviderError) throw e;
    if ((e as Error)?.name === "AbortError") throw new ProviderError("timeout", `${c.provider} timeout`);
    throw new ProviderError("server", redact(String((e as Error)?.message ?? e)));
  } finally {
    clearTimeout(timer);
  }
}

export type ChainResult =
  | { ok: true; text: string; provider: string; attempts: string[] }
  | { ok: false; attempts: string[] };

/**
 * Try each candidate in order within one overall deadline. A failing provider is parked for a
 * cooldown (in memory, per warm Lambda instance) so the next request skips it instead of waiting.
 */
export function createChain(opts: {
  chain: Candidate[];
  keys: Keys;
  attemptMs?: number;
  deadlineMs?: number;
  now?: () => number;
  fetcher?: Fetch;
}) {
  const cooldownUntil = new Map<string, number>();
  const now = opts.now ?? Date.now;
  const attemptMs = opts.attemptMs ?? 8_000;
  const deadlineMs = opts.deadlineMs ?? 15_000;

  return async function run(system: string, messages: Msg[]): Promise<ChainResult> {
    const ends = now() + deadlineMs;
    const attempts: string[] = [];
    for (const c of opts.chain) {
      const left = ends - now();
      if (left < 1_000) {
        attempts.push(`${c.provider}/${c.model}: deadline`);
        break;
      }
      if ((cooldownUntil.get(c.provider) ?? 0) > now()) {
        attempts.push(`${c.provider}/${c.model}: cooling`);
        continue;
      }
      try {
        const text = await callOnce(c, system, messages, opts.keys, Math.min(attemptMs, left), opts.fetcher ?? fetch);
        return { ok: true, text, provider: c.provider, attempts };
      } catch (e) {
        const kind = e instanceof ProviderError ? e.kind : "server";
        cooldownUntil.set(c.provider, now() + COOLDOWN_MS[kind]);
        attempts.push(`${c.provider}/${c.model}: ${kind}`);
      }
    }
    return { ok: false, attempts };
  };
}
