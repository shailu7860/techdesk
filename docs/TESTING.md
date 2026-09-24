# Testing

| Layer | Tool | Command | Count |
|---|---|---|---|
| Unit | Vitest | `npm test` | 51 tests / 6 files |
| End-to-end + accessibility | Playwright + axe (desktop Chrome 1440, Pixel 7) | `npm run test:e2e` | 45 passing, 5 intentionally skipped (keyboard-only on mobile, mobile-only on desktop) |
| Static | Biome, `tsc`, contrast script | `npm run lint`, `npm run typecheck`, `npm run check:contrast` | |

## Unit coverage (`tests/unit`)
- `estimate`: band maths, add-on factors, rounding, open-ended bands, INR/USD formatting, `summaryFromParams` rejecting crafted params.
- `leads`: per-step validation, control-character stripping, line-break collapsing, honeypot, config / success / rejected / network results, payload caps.
- `chat-client`: every HTTP status maps to a handoff; network errors never throw.
- `providers`: chain parsing, Groq→Claude fallback, cooldown skip, timeouts, missing keys, key redaction.
- `handler`: message validation (roles, lengths, turns), 405/403/400/413, 503 handoff, per-IP rate limit window.
- `data`: slug uniqueness, cross-references, price-band sanity, no template filler, chat grounding coverage, `customHttp.yml` in sync.

## E2E coverage (`tests/e2e`)
Every route: one h1, canonical, OG, description, CSP meta, no horizontal overflow, axe clean. Plus: real 404, sitemap/robots, security headers, skip link, dock links, reduced motion, WebGL mounts on desktop and is never downloaded on mobile, navigation (desktop and mobile menu), Esc/focus return, work filter, keyboard tabs, calculator currency and handoff, brief validation, success and network failure, and chat reply and handoff (with HTML in a reply rendered as text).

E2E runs against a separate build (`build-e2e/`) with test endpoint values. Web3Forms and the chat URL are intercepted, so no emails or AI calls are made. Any console error, including a CSP violation, fails the test.
