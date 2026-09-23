/**
 * TECHDESK wordmark. The mark is brackets around a live signal block:
 * "the instrument is on". Text stays live text (crisp, selectable, no font-in-SVG).
 */
export function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <path d="M12 7H7v18h5M20 7h5v18h-5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="13.5" y="12" width="5" height="8" className="fill-signal" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-ink ${className}`}>
      <Mark />
      <span className="text-[1.0625rem] font-bold uppercase tracking-[0.06em] [font-stretch:125%]">TechDesk</span>
    </span>
  );
}
