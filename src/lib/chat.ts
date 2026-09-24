export type ChatMsg = { role: "user" | "assistant"; content: string };
export type ChatReply =
  | { ok: true; reply: string }
  | { ok: false; handoff: true; reason: "config" | "rate" | "unavailable" | "network" | "invalid" };

export const CHAT_LIMITS = { messageChars: 1_000, turns: 12 } as const;

/** Calls the chat function. Every failure resolves to a human handoff, never a thrown error (LG-08). */
export async function sendChat(messages: ChatMsg[], fetcher: typeof fetch = fetch): Promise<ChatReply> {
  const url = import.meta.env.VITE_CHAT_URL;
  if (!url) return { ok: false, handoff: true, reason: "config" };
  try {
    const res = await fetcher(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.slice(-CHAT_LIMITS.turns) }),
    });
    if (res.status === 429) return { ok: false, handoff: true, reason: "rate" };
    if (res.status === 400 || res.status === 413) return { ok: false, handoff: true, reason: "invalid" };
    if (!res.ok) return { ok: false, handoff: true, reason: "unavailable" };
    const data = (await res.json()) as { reply?: unknown };
    return typeof data.reply === "string" && data.reply
      ? { ok: true, reply: data.reply }
      : { ok: false, handoff: true, reason: "unavailable" };
  } catch {
    return { ok: false, handoff: true, reason: "network" };
  }
}
