import { useEffect, useState } from "react";
import { isMotionPaused, onMotionChange } from "../../lib/motion";

/**
 * Types and deletes phrases in a loop. Accessibility: the visible text is aria-hidden (the parent
 * provides one stable accessible sentence), space is reserved for the longest phrase (no layout
 * shift), and it holds on the first phrase under reduced motion or when motion is paused.
 */
export function Typewriter({ phrases, className = "" }: { phrases: readonly string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(phrases[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sync = () => setStill(reduced || isMotionPaused());
    sync();
    return onMotionChange(sync);
  }, []);

  useEffect(() => {
    if (still) return;
    const phrase = phrases[i] ?? "";
    let delay = deleting ? 35 : 70;
    if (!deleting && len === phrase.length) delay = 1800; // hold the full phrase
    if (deleting && len === 0) delay = 250;
    const t = window.setTimeout(() => {
      if (!deleting && len === phrase.length) setDeleting(true);
      else if (deleting && len === 0) {
        setDeleting(false);
        setI((n) => (n + 1) % phrases.length);
      } else setLen((n) => n + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [still, phrases, i, len, deleting]);

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");
  const shown = still ? (phrases[0] ?? "") : (phrases[i] ?? "").slice(0, len);

  return (
    <span aria-hidden="true" className={`inline-grid ${className}`}>
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      <span className="col-start-1 row-start-1">
        {shown}
        <span
          className={`ml-0.5 inline-block w-[0.08em] translate-y-[0.08em] bg-current ${len === (phrases[i]?.length ?? 0) || still ? "caret" : ""}`}
        >
          &nbsp;
        </span>
      </span>
    </span>
  );
}
