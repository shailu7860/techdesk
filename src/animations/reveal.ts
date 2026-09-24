import type { gsap as G } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";

/**
 * Section reveal (AN-002). Starts from a *visible* state (opacity 0.35, 24px down) so content
 * is never hidden if the trigger doesn't fire (hidden tab, crawler, headless render).
 */
export function reveal(gsap: typeof G, ScrollTrigger: typeof ST, scope: Element) {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
  gsap.set(items, { opacity: 0.35, y: 24 });
  ScrollTrigger.batch(items, {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });
}
