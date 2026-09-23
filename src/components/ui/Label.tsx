import type { ReactNode } from "react";

type Tone = "muted" | "signal" | "agent";

const tones: Record<Tone, string> = {
  muted: "text-muted",
  signal: "text-signal",
  agent: "text-agent",
};

/**
 * System label: the instrument's engraving (DESIGN.md "Mono-Is-Metadata").
 * For metadata only (project IDs, status, stack), never headings or prose.
 */
export function Label({ children, tone = "muted", live = false, className = "" }: {
  children: ReactNode;
  tone?: Tone;
  /** Shows the single permitted live indicator. Pair with text that states the status. */
  live?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-label uppercase ${tones[tone]} ${className}`}>
      {live && (
        <span aria-hidden="true" className="relative inline-flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-current opacity-60 motion-safe:animate-ping" />
          <span className="relative size-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
