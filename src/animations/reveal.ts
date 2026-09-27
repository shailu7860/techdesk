import type { gsap as G } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

/**
 * Section reveal (AN-002). Movement only, no opacity change: content is fully legible (and passes
 * contrast) at every moment, even if the trigger never fires (hidden tab, crawler, headless render).
 */
export function reveal(gsap: typeof G, ScrollTrigger: typeof ST, scope: Element) {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
  gsap.set(items, { y: 32 });
  ScrollTrigger.batch(items, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });
}
