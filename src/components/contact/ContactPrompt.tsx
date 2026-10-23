import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { contact } from "../../data/contact";
import { telLink, waLink } from "../../lib/whatsapp";
import { Button } from "../ui/Button";

// The visitor's need, mapped to a quote-calculator type (src/data/pricing.ts) for /contact?type=.
const NEEDS = [
  { label: "AI agent", type: "ai" },
  { label: "SaaS or web app", type: "web-app" },
  { label: "ERP or HRMS", type: "web-app" },
  { label: "Gaming platform", type: "web-app" },
  { label: "Website", type: "website" },
  { label: "Something else", type: "" },
] as const;

const DELAY_MS = 5000;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000; // a closed prompt stays away for a week
const KEY_CLOSED = "techdesk.contactPrompt.closedAt";
const KEY_SHOWN = "techdesk.contactPrompt.shown";

const read = (store: () => Storage, key: string) => {
  try {
    return store().getItem(key);
  } catch {
    return null; // storage blocked: behave as a first visit
  }
};
const write = (store: () => Storage, key: string, value: string) => {
  try {
    store().setItem(key, value);
  } catch {
    /* non-essential */
  }
};
const isTyping = () => document.activeElement?.matches("input, textarea, select, [contenteditable]") ?? false;

/**
 * "Tell us what you need" card, 5 s after landing. Non-modal (the page stays usable, no focus theft),
 * once per session, snoozed for a week when closed, never on /contact and never while someone types.
 */
export function ContactPrompt() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState<(typeof NEEDS)[number] | null>(null);
  const onContact = pathname.startsWith("/contact");
  const armed = useRef(false);

  useEffect(() => {
    if (armed.current || onContact) return;
    const closedAt = Number(read(() => localStorage, KEY_CLOSED) ?? 0);
    if (read(() => sessionStorage, KEY_SHOWN) || Date.now() - closedAt < SNOOZE_MS) return;
    armed.current = true;
    let t = 0;
    const show = () => {
      if (isTyping()) {
        // Wait until they leave the field, then give them a moment.
        document.addEventListener("focusout", () => (t = window.setTimeout(show, 1500)), { once: true });
        return;
      }
      write(() => sessionStorage, KEY_SHOWN, "1");
      setOpen(true);
    };
    t = window.setTimeout(show, DELAY_MS);
    return () => window.clearTimeout(t);
  }, [onContact]);

  const close = () => {
    setOpen(false);
    write(() => localStorage, KEY_CLOSED, String(Date.now()));
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!open || onContact) return null;

  const text = need
    ? `Hi TechDesk, I need help with: ${need.label}. Can we talk?`
    : "Hi TechDesk, I'd like to discuss a project.";
  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="prompt-title"
      className="prompt-in fixed inset-x-4 bottom-[calc(var(--dock-h)+env(safe-area-inset-bottom)+0.75rem)] z-(--z-overlay) rounded-lg border-2 border-signal bg-panel p-5 md:inset-x-auto md:right-24 md:bottom-6 md:w-[27rem] md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id="prompt-title" className="font-display text-title">
          Tell us what you need
        </h2>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="-mt-1 -mr-2 grid size-11 shrink-0 cursor-pointer place-items-center rounded-sm text-muted transition-colors hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <p className="mt-1 text-small text-muted">Talk to the engineer who would build it. {contact.replyPromise}</p>

      <fieldset className="mt-4">
        <legend className="sr-only">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((n) => (
            <button
              key={n.label}
              type="button"
              aria-pressed={need?.label === n.label}
              onClick={() => setNeed(need?.label === n.label ? null : n)}
              className={`min-h-9 pointer-coarse:min-h-11 cursor-pointer rounded-sm border px-3 text-small font-medium transition-colors ${
                need?.label === n.label
                  ? "border-signal bg-signal text-void"
                  : "border-hairline text-ink hover:border-signal hover:text-signal"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
        <Button href={`/contact${need?.type ? `?type=${need.type}` : ""}`} variant="secondary" onClick={close}>
          Send a brief
        </Button>
        <Button href={waLink(text)} external onClick={close}>
          WhatsApp us
        </Button>
      </div>
      <p className="mt-4 text-right text-small text-muted">
        Or call{" "}
        <a href={telLink()} className="font-medium text-signal underline underline-offset-4">
          {contact.phoneDisplay}
        </a>
      </p>
    </section>
  );
}
