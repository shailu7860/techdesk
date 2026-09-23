# Tech Stack

Every dependency has a reason (spec §24, rule 4). If it doesn't earn its line here, it doesn't get installed.

## Runtime
| Package | Why |
|---|---|
| `react`, `react-dom` 19 | UI library required by the spec |
| `react-router` 8 | Routing and framework mode: `ssr:false` plus prerender gives static HTML per route for SEO (see `ARCHITECTURE.md` §2). v8 is v7 with the future flags promoted to defaults; the prerender API is unchanged |
| `@react-router/node` | Node adapter the framework build needs for prerendering |
| `isbot` | Peer of the React Router server entry used during prerender |
| `@fontsource-variable/archivo` | Self-hosted display and body face (width and weight axes); no Google Fonts request, and `unicode-range` subsets |
| `@fontsource-variable/martian-mono` | Self-hosted mono for system labels |

## Build / dev
| Package | Why |
|---|---|
| `@react-router/dev` | Vite plugin, route typegen, prerender build |
| `vite` 8 | Bundler / dev server (spec) |
| `typescript` 7 | Strict typing (spec §45) |
| `tailwindcss` 4, `@tailwindcss/vite` | Utility CSS generated from the `@theme` tokens in `src/styles/tokens.css` |
| `@types/*` | Types for React and Node |

## Deliberately not installed (yet)
| Package | Reason not yet |
|---|---|
| GSAP, Lenis | Arrive in Phase 5 (animation), after the static layout is stable (spec §63) |
| three / @react-three/fiber | Arrive with the hero system core only (Phase 5), lazy-loaded and desktop only |
| Icon library | Three icons total: the WhatsApp glyph copied from Simple Icons (CC0) and hand-drawn phone and arrow glyphs |
| Colour library | `scripts/check-contrast.mjs` implements OKLCH to sRGB in about 15 lines |
| ESLint / Prettier | Added in Phase 3 with the app foundation |

## Scripts
- `npm run dev`: dev server
- `npm run build`: production build (prerendered HTML in `build/client`)
- `npm run typecheck`: route typegen plus `tsc`
- `npm run check:contrast`: fails if any colour pairing drops below its WCAG minimum
