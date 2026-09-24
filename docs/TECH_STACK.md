# Tech Stack

Every dependency has a reason (spec §24, rule 4). If it doesn't earn its line here, it doesn't get installed.

## Runtime (ships to visitors)
| Package | Why |
|---|---|
| `react`, `react-dom` 19 | UI library required by the spec |
| `react-router` 8 | Routing + framework mode: `ssr:false` + prerender gives static HTML per route (SEO). v8 = v7 with the future flags made default; prerender API unchanged |
| `@react-router/node`, `isbot` | Required by the framework build during prerendering |
| `@fontsource-variable/archivo`, `@fontsource-variable/martian-mono` | Self-hosted display/body and label faces; no third-party font requests |
| `gsap` | Scroll choreography (ScrollTrigger pin/scrub/batch) with `matchMedia` for breakpoint and reduced-motion variants. Loaded on demand |
| `lenis` | Smooth scrolling tied to the GSAP ticker (desktop only, loaded on demand) |
| `three` | Hero system core. Named imports only (tree-shaken, 129 KB gz lazy chunk, desktop only) |

## Build / dev
| Package | Why |
|---|---|
| `@react-router/dev`, `vite` 8 | Build, dev server, route typegen, prerender |
| `typescript` 7 | Strict typing (spec §45) |
| `tailwindcss` 4, `@tailwindcss/vite` | Utilities generated from the `@theme` tokens |
| `@biomejs/biome` | Lint + format in one tool. **Replaces the spec's ESLint + Prettier:** typescript-eslint needs TypeScript's JS API, which TypeScript 7 (native compiler) does not provide |
| `vitest` | Unit tests |
| `@playwright/test`, `@axe-core/playwright` | End-to-end tests and WCAG scans; also used by the screenshot and OG-image scripts |
| `@aws-amplify/backend`, `@aws-amplify/backend-cli`, `aws-cdk-lib`, `constructs` | Amplify Gen 2 backend definition and pipeline deploy of the chat function |
| `@types/*` | Types |

## Removed / deliberately not used
| Package | Reason |
|---|---|
| `@react-three/fiber` | Tried and removed: it pulls in all of three.js (239 KB gz). Plain three.js with named imports is 129 KB gz for the same scene |
| ESLint, Prettier | See Biome above |
| Icon library | Four icons total: the WhatsApp glyph from Simple Icons (CC0) and hand-drawn phone, chat and arrow |
| Colour library | `scripts/check-contrast.mjs` implements OKLCH → sRGB in about 15 lines |
| Form/validation library | `src/lib/leads.ts` is about 60 lines of plain validation |
| Analytics SDK | Deferred (see ROADMAP); will be cookieless |

## `overrides`
`lodash ^4.18.1`, `mysql2 ^3.24.4`, `immutable ^3.8.4`: patch dev-tooling advisories inside the Amplify CLI without changing major versions (see SECURITY.md).
