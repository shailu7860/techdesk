import { useEffect } from "react";
import { loadGsap } from "./gsap";

/**
 * Lenis smooth scrolling (AN-001), desktop + fine pointer + motion allowed only.
 * Drives ScrollTrigger from the same ticker so scrubs stay locked to input.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    Promise.all([import("lenis"), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new Lenis({ duration: 1.0, anchors: { offset: -80 }, autoRaf: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      destroy = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);
}
