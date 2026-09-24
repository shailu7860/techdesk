# TechDesk — Project Rules

Source of truth for every session. Full product spec: [`SPEC.md`](./SPEC.md). Decisions below override the spec where they differ.

## What this is
Premium futuristic technology-agency website for **TechDesk**. Goal: qualified leads + proof of engineering capability. The site itself is the portfolio piece.

## Locked decisions (Phase 0, 2026-09-23)
| Area | Decision |
|---|---|
| Brand | **TechDesk** (wordmark `TECHDESK`). No logo exists — SVG wordmark designed in Phase 2. |
| Stack | Vite 8 + React 19 + TypeScript 7 (strict) + React Router 8 framework mode (v7 API; prerender unchanged) |
| Rendering | `ssr: false` + `prerender()` → static HTML per route incl. every `/work/:slug` (SEO, spec §32) |
| Hosting | **AWS Amplify** Hosting (static). No domain yet — use Amplify default URL, domain later. |
| Leads | Form service (Formspree/Web3Forms class) behind ONE `submitLead()` in `src/lib/leads.ts`. Public form ID only. |
| AI chatbot | Amplify Gen 2 function (Lambda) — keys via `secret()`, never in frontend. Provider chain env-driven: Groq first, Claude fallback. Grounded ONLY on `src/data/*`. |
| Quote calculator | Pure frontend, data-driven (`src/data/pricing.ts`). Shows **indicative ranges**, never a binding price. |
| Quick contact | Persistent dock: WhatsApp (`wa.me` deep link, prefilled text) + phone (`tel:`) + chat. |
| Styling | Tailwind CSS v4 + CSS custom-property tokens (`src/styles/tokens.css`). |
| Motion | GSAP + ScrollTrigger + Lenis (on demand). three.js (plain, named imports; R3F removed) for the hero only, lazy, desktop only. |
| Fonts | **Archivo** variable (display at 118% width, body at 100%) + **Martian Mono** (labels only), self-hosted via Fontsource. |

## Business content (see `docs/DISCOVERY.md` § Business content)
WhatsApp/call **+91 92033 87375** · **shailendramishra0127@gmail.com** · **Indore, India, serving clients worldwide** · INR and USD toggle · Mon–Sat 10–19 IST · replies within one business day · four "Why TechDesk" commitments and price bands are in DISCOVERY.md (delegated by the owner; editable).

## Visual rules (owner, 2026-09-24)
- **No gradients and no box shadows anywhere** (incl. glows, drop/text shadows, gradient masks). Enforced by `tests/unit/style-rules.test.ts`.
- Theme: **green nebula galaxy** (dark space, starfield, solid-colour nebula blurs, green accent). Content width 80rem (xl). Sentence case, never forced uppercase.
- Every ambient animation must obey `prefers-reduced-motion` and the site-wide Pause motion toggle.

## Content rules (non-negotiable)
- **Never invent** client names, metrics, results, testimonials or stats (spec §71 rules 6–8).
- Old portfolio testimonials ("Sarah Chen" etc.) and stats ("50+ projects", "30+ clients", "99.9%") are **template content — excluded** unless the owner confirms them.
- Missing content → flag it in data (e.g. `visualsPending: true`): a `[CONTENT NEEDED]` note renders in dev builds only and the section is omitted in production. `tests/unit/data.test.ts` fails on known template filler.
- BidMaster: describe as procurement automation; do not market CAPTCHA reading.

## Working rules
- Work in phases (spec §57). Phases 0–12 completed 2026-09-24 (see docs/CHANGELOG.md); deploy steps in docs/DEPLOYMENT.md need the owner.
- Before each major implementation: Plan / Files / Expected result / Risks (spec §73).
- After: TypeScript, lint, build, responsive, animation cleanup, console, routes (spec §74).
- Report changes as: What changed / Why / Files / How it works / How tested / Still required (spec §72).
- Every dependency needs a one-line reason in `docs/TECH_STACK.md`.
- Pre-push/deploy: run the `security-audit` skill; no open Critical/High.
- Loading / Empty / Error / Success states for every user-facing feature.

## Design context
- `PRODUCT.md` — register **brand**, platform **web**, users, personality (precise · calm-confident · inventive · warm), anti-references, principles. WCAG 2.2 AA.
- `DESIGN.md` — visual system (The Instrument in the Dark): restrained near-black + Signal Blue ≤10% + Agent Violet for AI only; display + mono; choreographed motion. Tokens scanned from code after Phase 2; `/system` is the live specimen (noindex).

## Quality gates
`npm run verify` (lint, types, contrast, build) · `npm test` (unit) · `npm run test:e2e` (Playwright + axe) · lint is **Biome** (typescript-eslint cannot run on TS 7).

## Docs
`PRODUCT.md` · `DESIGN.md` (= spec DESIGN_SYSTEM) · `docs/DISCOVERY.md` (Phase 0) · full index in `docs/README.md`
