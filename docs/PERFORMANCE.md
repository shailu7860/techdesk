# Performance

## Budgets and results (2026-09-24, production build, local server with gzip like CloudFront)
| Metric | Budget | Lighthouse mobile (slow 4G, 4× CPU) | Lighthouse desktop |
|---|---|---|---|
| Performance score | ≥ 90 | **94–95** (/, /work/stratos, /contact) | **99** |
| LCP | ≤ 2.5s (field, p75) | 2.7–2.9s simulated | 0.9s |
| CLS | ≤ 0.1 | 0 | ≤ 0.01 |
| TBT (INP proxy) | ≤ 200ms | 0ms | 0ms |
| Initial JS for `/` | ≤ 170 KB gz | **135 KB gz** (measured); GSAP + ScrollTrigger (44 KB gz) load after hydration | 135 KB gz + deferred GSAP, Lenis (5 KB) and WebGL |
| WebGL chunk | lazy, desktop only | never requested on mobile (e2e-asserted) | 129 KB gz after idle |

The simulated mobile LCP sits slightly above the field budget. The remaining render delay is the 90 KB variable headline font on a throttled link (it is preloaded). Check real-user LCP after launch (Search Console Core Web Vitals, which need traffic). If it stays above 2.5s, the next step is subsetting Archivo to the glyphs used in display text.

## What keeps it fast
- Static HTML; no runtime server; hashed assets cached for a year (`immutable`).
- GSAP, Lenis, three.js, the chat panel and the calculator logic are split and loaded on demand.
- three.js via named imports (the switch from React Three Fiber cut the chunk from 239 KB to 131 KB gz); DPR capped at 1.5; the render loop stops off-screen.
- Self-hosted fonts with `unicode-range` subsets; the LCP font is preloaded; no asset inlining (keeps the CSP strict).
- No images on the critical path; the hero poster is inline SVG.

## Re-measure
`npm run build && npm start`, then `npx lighthouse http://localhost:4173/ --only-categories=performance`.
