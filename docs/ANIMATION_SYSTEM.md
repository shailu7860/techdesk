# Animation System

Principles (from `DESIGN.md`): choreographed, not decorated. Content is always visible and legible without motion. Every animation has a reduced-motion alternative. Only transform, opacity and colour are animated. GSAP and Lenis load on demand, so pages without motion never download them.

| ID | Name | Trigger | Duration / easing | Desktop | Tablet | Mobile | Reduced motion | Performance | Code |
|---|---|---|---|---|---|---|---|---|---|
| AN-000 | Hero entrance | First paint (CSS, pre-hydration) | 1.1s, ease-out-expo, staggered 0–0.32s | Label, H1, subline and CTAs rise 28px from 35% opacity | Same | Same | Instant (global safety net) | CSS only, no JS | `globals.css` |
| AN-001 | Smooth scroll | Page load | Lenis 1.0s | On (fine pointer, ≥1024px) | Off | Off | Off | Driven by the GSAP ticker, feeds ScrollTrigger | `animations/smoothScroll.ts` |
| AN-002 | Section reveal | `[data-reveal]` enters at 88% of the viewport | 0.9s, expo.out, 80ms stagger | Rise 32px, **no opacity change** | Same | Same | None | `ScrollTrigger.batch`, runs once | `animations/reveal.ts` |
| AN-003 | Agent trace | Each step reaches 62% of the viewport | 0.48s colour; dot scrubbed | Text muted→ink (AA throughout); dot scales 0.4→1.6 | Same | Same | Steps fully lit, static | One trigger per step | `animations/home.ts`, `globals.css` |
| AN-004 | Proof gallery | Section centre | Scrubbed (0.6s smoothing) | Pinned horizontal scroll of 4 mission files (≥1280px, fine pointer) | 2-column grid | Vertical stack | Grid | `invalidateOnRefresh` for resize | `animations/home.ts` |
| AN-005 | Process pipeline | List enters at 75% | Scrubbed | Signal line draws left→right | Vertical timeline, static | Static | Static | One tween | `animations/home.ts` |
| AN-006 | System core | Idle after load | 1.2s assembly, ease-out-quart; slow drift | WebGL: 5 nodes assemble, lean toward the pointer | SVG poster (dimmed) | SVG poster (dimmed) | SVG poster | Lazy chunk (131 KB gz), DPR ≤1.5, paused off-screen, disposed on unmount, context-loss fallback | `sections/home/SystemCore.tsx` |
| AN-007 | Page transition | Internal link click | 160ms out / 260ms in | View Transitions API crossfade | Same | Same | None | Browser-native, no JS library | `globals.css`, `viewTransition` on links |
| AN-008 | Micro-interactions | Hover / focus | 140–220ms, ease-out-quart | Button glyph nudge, border/colour shifts, dock tooltips | Same | Tap states | Instant | Colour/transform only | components |

Not built, by decision: custom cursor (FR-06, P2: little value for the cost) and a boot-sequence preloader (spec §39 says skip when content is ready, and it always is, since pages are prerendered).

## Rules for new animation
1. Build the static version first; it must be complete without JS.
2. Put timelines in `src/animations/*` and use `gsap.matchMedia` with `MOTION_OK` / `DESKTOP` / `WIDE`.
3. Never animate from opacity 0 on content, and never below AA contrast at any frame.
4. Revert on unmount (`mm.revert()`); test with `reducedMotion: "reduce"` in Playwright.
