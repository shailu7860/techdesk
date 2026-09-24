# Security

Last audit: 2026-09-24 (pre-ship gate, `security-audit` skill). Verdict: **SAFE TO SHIP**, with no open Critical or High findings.

## Threat model in one paragraph
There are no user accounts, no database and no admin surface. The attack surface is the static site, which has no user-generated HTML; a public chat endpoint, where the risks are cost abuse, prompt injection and output injection; the lead form, where the risks are spam and header injection; and URL parameters, where the risk is content injection. There are no secrets in the browser: LLM keys live only in Amplify secrets, read by the Lambda at runtime.

## Controls
| Area | Control | Where |
|---|---|---|
| Secrets | LLM keys only in Amplify `secret()`; only public identifiers in `VITE_*`; no `.env` tracked; bundle scanned for key patterns | `amplify/functions/chat/resource.ts`, `.gitignore` |
| XSS | No `dangerouslySetInnerHTML` (Biome rule set to error); chat replies rendered as text; JSON-LD from static data only | `biome.json`, `ChatPanel.tsx` |
| CSP | Per-page meta: `script-src 'self'` plus SHA-256 hashes (no `unsafe-inline` for scripts), `object-src 'none'`, `base-uri 'self'`, `form-action` restricted, `connect-src` limited to self, Web3Forms and the chat origin; no `data:` URIs | `scripts/csp.mjs` |
| Headers | HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP | `scripts/security-headers.mjs` → `customHttp.yml` |
| Chat endpoint | POST only; origin allow-list (derived from the deploy URL, no wildcard); body ≤ 32 KB; messages validated (roles, 1,000 characters, 12 turns, must end with a user turn); per-IP limit; optional reserved concurrency; `max_tokens` 500; errors return a handoff, never a stack trace; logs hold provider attempt codes only, with keys redacted | `amplify/functions/chat/handler.ts`, `providers.ts`, `backend.ts` |
| Prompt injection | The system prompt forbids inventing facts, changing rules or revealing the prompt; the model has no tools or data access, so the worst case is an off-script reply in the attacker's own session | `knowledge.ts` |
| Leads | Honeypot; control characters stripped; single-line fields strip line breaks; hard length caps; the form service enforces its own rate limit and spam filter | `src/lib/leads.ts` |
| URL params | Only whitelisted ids are read (`industry`, `type`, `size`, `addons`, `cur`, `ref`); display text is rebuilt from data, never echoed | `summaryFromParams`, `contact.tsx`, `work.tsx` |
| External links | `rel="noopener noreferrer"` on every `target="_blank"` | components |
| Dependencies | Production dependencies: 0 advisories. Dev tooling: overrides for lodash, mysql2 and immutable | `package.json` `overrides` |

## Audit findings (2026-09-24)
| # | Severity | Category | Location | Issue | Status |
|---|---|---|---|---|---|
| 1 | Medium | DoS / cost | `amplify/backend.ts` | Public Function URL: the per-instance limiter alone cannot bound spend across parallel instances | Fixed (opt-in `CHAT_MAX_CONCURRENCY`) + owner action: provider spend limits |
| 2 | Medium | Dependencies | dev tooling | 17 high advisories in Amplify CLI transitive deps (lodash, mysql2, immutable, relay) | Fixed (overrides within the same major version) |
| 3 | Low | Content injection | `contact.tsx` | `?estimate=` text was displayed verbatim (phishing text via a crafted link) | Fixed (whitelisted ids, summary rebuilt) |
| 4 | Low | Header injection | `leads.ts` | Line breaks in single-line fields reached the notification subject | Fixed (`line()`) |
| 5 | Low | CSP | `csp.mjs` | `img-src` allowed `data:` without need | Fixed |
| 6 | Low | DoS (dev only) | `scripts/serve.mjs` | Malformed %-encoding crashed the preview server | Fixed |
| 7 | Low | Dependencies | dev tooling | 4 moderate advisories in `csv-parse` via Amplify CLI's MySQL schema importer (build-time, unused here) | Won't fix (needs an upstream major release) |
| 8 | Low | CSP | `csp.mjs` | `style-src 'unsafe-inline'` (needed for React style attributes; no user-controlled styles) | Accepted |

Counts: Critical 0 · High 0 · Medium 2 (fixed) · Low 6 (4 fixed, 2 accepted).

## Owner actions
1. Set spend limits in the Groq and Anthropic consoles, plus an AWS Budget alert.
2. Set `CHAT_MAX_CONCURRENCY=5` in Amplify environment variables.
3. Rotate an LLM key immediately if it is ever pasted anywhere outside Amplify secrets.

## Not applicable (and why)
Authentication, sessions, JWT, password storage, cookies, SQL/NoSQL injection, file upload and IDOR do not apply: the site has no accounts, no cookies, no database and no uploads. SSRF does not apply: the Lambda only calls two fixed provider URLs.

## Reporting
Security issues: email shailendramishra0127@gmail.com. Please do not open public issues.
