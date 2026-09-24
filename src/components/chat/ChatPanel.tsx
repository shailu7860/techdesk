import { type FormEvent, useEffect, useRef, useState } from "react";
import { contact } from "../../data/contact";
import { CHAT_LIMITS, type ChatMsg, sendChat } from "../../lib/chat";
import { telLink, waLink } from "../../lib/whatsapp";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";

const SUGGESTIONS = [
  "What do you build?",
  "Have you built a marketplace?",
  "How much does an AI agent cost?",
  "How do we start?",
];

const handoffCopy: Record<string, string> = {
  config: "The assistant isn't switched on yet. A person can answer right away:",
  rate: "You've sent a lot of messages in a short time. A person can pick this up directly:",
  unavailable: "The assistant is unavailable right now. A person can answer instead:",
  network: "We couldn't reach the assistant. Check your connection, or reach a person directly:",
  invalid: "That message couldn't be processed. Try a shorter question, or reach a person directly:",
};

/**
 * Chat assistant (LG-07/08, AC-05). Modal <dialog>: focus contained, Esc closes, focus returns.
 * Replies are rendered as plain text (never HTML), so model output cannot inject markup (SC-02).
 */
export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [handoff, setHandoff] = useState<string | null>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      input.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new content
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages, busy, handoff]);

  const userTurns = messages.filter((m) => m.role === "user").length;
  const capped = userTurns >= CHAT_LIMITS.turns;

  const send = async (text: string) => {
    const content = text.trim().slice(0, CHAT_LIMITS.messageChars);
    if (!content || busy || capped) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setDraft("");
    setBusy(true);
    setHandoff(null);
    const r = await sendChat(next);
    setBusy(false);
    if (r.ok) setMessages([...next, { role: "assistant", content: r.reply }]);
    else setHandoff(r.reason);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
  };

  const lastQuestion = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      aria-labelledby="chat-title"
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-void p-0 text-ink backdrop:bg-void/70 backdrop:backdrop-blur-sm md:inset-auto md:top-auto md:right-6 md:bottom-6 md:left-auto md:h-[min(40rem,calc(100dvh-3rem))] md:w-[26rem] md:border md:border-agent/50"
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4">
          <div>
            <Label tone="agent" live>
              Agent / online
            </Label>
            <h2 id="chat-title" className="mt-1 font-display text-small">
              Ask TechDesk
            </h2>
          </div>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-small text-muted hover:text-ink"
          >
            Close
          </button>
        </header>

        <div ref={log} className="flex-1 overflow-y-auto px-5 py-6" aria-live="polite" aria-busy={busy}>
          {messages.length === 0 && (
            <div>
              <p className="text-muted">
                Ask about our services, past work, process or indicative prices. Answers come only from what's on this
                site; for anything specific, a person is one tap away.
              </p>
              <ul className="mt-6 grid gap-2">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => send(s)}
                      className="min-h-11 w-full cursor-pointer rounded-sm border border-hairline px-4 py-2 text-left text-small transition-colors hover:border-agent"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ol className="grid gap-4">
            {messages.map((m, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: append-only log
              <li key={i} className={m.role === "user" ? "justify-self-end" : "justify-self-start"}>
                <p className="sr-only">{m.role === "user" ? "You said:" : "Assistant:"}</p>
                <p
                  className={`max-w-[34ch] whitespace-pre-line break-words rounded-sm px-4 py-3 text-small ${
                    m.role === "user" ? "bg-panel-hi" : "border border-agent/40 bg-agent-lo"
                  }`}
                >
                  {m.content}
                </p>
              </li>
            ))}
          </ol>

          {busy && (
            <p className="mt-4 flex items-center gap-2 font-mono text-label text-agent">
              <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-agent" />
              Thinking
            </p>
          )}

          {handoff && (
            <div role="alert" className="mt-6 border border-hairline bg-panel p-4">
              <p className="text-small">{handoffCopy[handoff] ?? handoffCopy.unavailable}</p>
              <div className="mt-4 grid gap-2">
                <Button
                  href={waLink(`Hi TechDesk, I was asking your website assistant: "${lastQuestion.slice(0, 300)}"`)}
                  external
                >
                  WhatsApp {contact.phoneDisplay}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button href={telLink()} variant="secondary">
                    Call
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Send a brief
                  </Button>
                </div>
              </div>
            </div>
          )}

          {capped && !handoff && (
            <p className="mt-6 text-small text-muted">
              That's the limit for this chat. For more detail, WhatsApp us on {contact.phoneDisplay}.
            </p>
          )}
        </div>

        <form onSubmit={onSubmit} className="border-t border-hairline p-4">
          <label htmlFor="chat-input" className="sr-only">
            Your message
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="chat-input"
              ref={input}
              rows={1}
              maxLength={CHAT_LIMITS.messageChars}
              value={draft}
              disabled={capped}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              placeholder="Ask a question…"
              className="max-h-32 min-h-11 flex-1 resize-none rounded-sm border border-hairline bg-panel px-3 py-2.5 text-small placeholder:text-subtle focus-visible:border-agent focus-visible:outline-none"
            />
            <Button type="submit" loading={busy} disabled={!draft.trim() || capped}>
              Send
            </Button>
          </div>
          <p className="mt-2 text-[0.75rem] text-muted">
            Automated and can be wrong. Don't share sensitive personal data.{" "}
            <a href="/privacy" className="underline underline-offset-2">
              Privacy
            </a>
          </p>
        </form>
      </div>
    </dialog>
  );
}
