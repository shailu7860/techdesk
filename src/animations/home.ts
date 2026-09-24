import { useEffect, useRef } from "react";
import { DESKTOP, loadGsap, MOTION_OK, WIDE } from "./gsap";
import { reveal } from "./reveal";

/**
 * Homepage choreography (docs/ANIMATION_SYSTEM.md AN-002…AN-005). One gsap.matchMedia per mount,
 * reverted on unmount, so nothing leaks between navigations. Reduced motion: no timelines at all.
 */
export function useHomeMotion() {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    let revert: (() => void) | undefined;
    let cancelled = false;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      const root = scope.current;
      if (cancelled || !root) return;
      const mm = gsap.matchMedia(root);

      mm.add(MOTION_OK, () => {
        reveal(gsap, ScrollTrigger, root);

        // AN-003 Agent trace: each step "lights up" (muted → ink, still AA at every stage) as it
        // reaches the viewport centre; the dot scales with scroll. No opacity dimming.
        const trace = root.querySelector("[data-trace]");
        trace?.classList.add("trace-armed");
        for (const step of gsap.utils.toArray<HTMLElement>("[data-trace-step]", root)) {
          ScrollTrigger.create({ trigger: step, start: "top 62%", onEnter: () => step.classList.add("is-lit") });
          const dot = step.querySelector("[data-trace-dot]");
          if (dot)
            gsap.fromTo(
              dot,
              { scale: 0.4 },
              { scale: 1.6, ease: "none", scrollTrigger: { trigger: step, start: "top 75%", end: "top 55%", scrub: true } },
            );
        }
        return () => trace?.classList.remove("trace-armed");
      });

      // AN-005 Process pipeline line draws with scroll (desktop layout only).
      mm.add(DESKTOP, () => {
        const line = root.querySelector("[data-process-line]");
        const list = root.querySelector("[data-process]");
        if (line && list)
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 60%", scrub: true },
            },
          );
      });

      // AN-004 Work: pinned horizontal gallery on wide, fine-pointer screens; a grid everywhere else.
      mm.add(WIDE, () => {
        const viewport = root.querySelector<HTMLElement>("[data-work-viewport]");
        const track = root.querySelector<HTMLElement>("[data-work-track]");
        if (!viewport || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });

      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return scope;
}
