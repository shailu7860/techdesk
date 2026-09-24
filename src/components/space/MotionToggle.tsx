import { setMotionPaused, useMotionPaused } from "../../lib/motion";

/** Pauses/resumes every ambient animation on the site. Visible, keyboard-operable, remembered. */
export function MotionToggle({ className = "" }: { className?: string }) {
  const paused = useMotionPaused();
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setMotionPaused(!paused)}
      className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm px-3 text-small font-medium text-muted transition-colors hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
      </svg>
      {paused ? "Resume motion" : "Pause motion"}
    </button>
  );
}
