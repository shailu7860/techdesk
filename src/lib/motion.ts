import { useEffect, useState } from "react";

// A user-controlled "pause motion" switch (WCAG 2.2.2 Pause, Stop, Hide) for all ambient animation:
// starfield, nebulae, planet orbits, shooting stars and the marquee. Stored on <html data-motion>.
const KEY = "techdesk.motion";
const EVENT = "techdesk:motion";

export const isMotionPaused = () =>
  typeof document !== "undefined" && document.documentElement.dataset.motion === "paused";

export function setMotionPaused(paused: boolean) {
  document.documentElement.dataset.motion = paused ? "paused" : "running";
  try {
    localStorage.setItem(KEY, paused ? "paused" : "running");
  } catch {
    /* non-essential preference */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Restore the saved preference once, at app start. */
export function useRestoreMotionPreference() {
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "paused") setMotionPaused(true);
    } catch {
      /* storage blocked */
    }
  }, []);
}

export function useMotionPaused() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const sync = () => setPaused(isMotionPaused());
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return paused;
}

export const onMotionChange = (fn: () => void) => {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
};
