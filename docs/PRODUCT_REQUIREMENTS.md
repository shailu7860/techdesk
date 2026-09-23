# Product Requirements

Priority: **P0** is milestone 1 and ships blocking · **P1** is milestone 1 and desirable · **P2** is later.
Status: `Planned` · `In progress` · `Done` · `Blocked (content)`, where Blocked means waiting on owner-supplied content.

## Business (BR)
| ID | Description | Priority | Status |
|---|---|---|---|
| BR-01 | A visitor understands what TechDesk does, in business outcomes, within the first viewport | P0 | Planned |
| BR-02 | Multiple conversion points: hero CTA, dock, AI section, work, estimate, final CTA | P0 | Planned |
| BR-03 | Industry-neutral positioning; the three buyer types are served equally | P0 | Planned |
| BR-04 | No invented clients, metrics, testimonials or stats anywhere | P0 | Planned |
| BR-05 | "Why TechDesk" section with 3–4 real commitments | P1 | Planned |

## Functional (FR)
| ID | Description | Priority | Status |
|---|---|---|---|
| FR-01 | Routes: `/`, `/services`, `/services/:slug`, `/work`, `/work/:slug`, `/about`, `/contact`, 404 | P0 | Planned |
| FR-02 | Every route and every project slug is prerendered to static HTML | P0 | Planned |
| FR-03 | Responsive nav: hides on scroll-down, full-screen mobile menu, skip link | P0 | Planned |
| FR-04 | Error boundary plus a designed 404 ("System error / 404 … Return to base") | P0 | Planned |
| FR-05 | Page transition of 400ms or less, never blocking interaction | P1 | Planned |
| FR-06 | Desktop cursor label follower (VIEW / START / DRAG) with the native cursor kept | P2 | Planned |

## Lead generation (LG)
| ID | Description | Priority | Status |
|---|---|---|---|
| LG-01 | Persistent quick-contact dock: WhatsApp (`wa.me`, prefilled text), call (`tel:`), chat | P0 | Planned |
| LG-02 | Five-step contact brief (spec §26) with validation and loading, success and error states | P0 | Planned |
| LG-03 | `submitLead()` is the single submission boundary (form service now, Node later) | P0 | Planned |
| LG-04 | Spam protection: honeypot plus the form service's built-in filtering; no captcha friction by default | P0 | Planned |
| LG-05 | Quote calculator: type, size and add-ons give an **indicative range**, with a clear disclaimer | P0 | Planned |
| LG-06 | The calculator hands off to the brief (prefilled) or WhatsApp (prefilled summary) | P0 | Planned |
| LG-07 | AI chatbot answers from site data only, shows a typing state (streaming is P2), and suggests prompts | P1 | Planned |
| LG-08 | When every provider is unavailable, the chatbot shows a handoff (WhatsApp, call, brief), never a dead end | P0 (if LG-07 ships) | Planned |
| LG-09 | The chatbot never quotes prices outside the calculator's ranges and never invents claims | P0 (if LG-07 ships) | Planned |

## Portfolio (PF)
| ID | Description | Priority | Status |
|---|---|---|---|
| PF-01 | Projects are data-driven (`src/data/projects.ts`); adding one needs no component change | P0 | Planned |
| PF-02 | Four flagship case studies: Biexor, Stratos, BidMaster, 1Bull | P0 | Blocked (content: visuals) |
| PF-03 | Eight further builds in an index list (industry, stack) | P0 | Planned |
| PF-04 | Case study template sections per spec §17; empty sections are omitted, never padded | P0 | Planned |
| PF-05 | A placeholder flag on data; the production build fails if a featured item renders a placeholder | P0 | Planned |

## Services (SV)
| ID | Description | Priority | Status |
|---|---|---|---|
| SV-01 | Five service lines written as outcomes (spec §4), data-driven | P0 | Planned |
| SV-02 | Homepage services section: selecting a service swaps the visual panel (desktop) or opens an accordion (mobile) | P0 | Planned |
| SV-03 | Service detail pages `/services/:slug` listing capabilities, stack and related work | P1 | Planned |

## SEO (SE)
| ID | Description | Priority | Status |
|---|---|---|---|
| SE-01 | Per-route title, description, canonical, Open Graph and Twitter meta, rendered into the prerendered HTML | P0 | Planned |
| SE-02 | JSON-LD: `Organization` (site), `CreativeWork` (projects), `Service` (services) | P1 | Planned |
| SE-03 | `sitemap.xml` and `robots.txt` generated from data at build time | P0 | Planned |
| SE-04 | Per-route OG images (1200×630) | P1 | Planned |

## Non-functional: Performance (PE)
| ID | Description | Priority | Status |
|---|---|---|---|
| PE-01 | LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms (p75, mid-range mobile on 4G) | P0 | Planned |
| PE-02 | Initial JS for `/` ≤ 170 KB gzip, excluding lazy WebGL and chatbot chunks | P0 | Planned |
| PE-03 | WebGL and chatbot are lazy chunks loaded after idle or interaction; no WebGL on mobile or reduced motion | P0 | Planned |
| PE-04 | Self-hosted, subset fonts with `font-display: swap` and at most 2 families | P0 | Planned |
| PE-05 | Images in AVIF/WebP with explicit dimensions; videos lazy-loaded with posters | P0 | Planned |

## Non-functional: Accessibility (AC)
| ID | Description | Priority | Status |
|---|---|---|---|
| AC-01 | WCAG 2.2 AA: contrast, keyboard, focus visible, landmarks, labels | P0 | Planned |
| AC-02 | `prefers-reduced-motion` gives instant or crossfade equivalents; no pinning, scrubbing or WebGL | P0 | Planned |
| AC-03 | Content is visible without JS and never gated on a reveal animation | P0 | Planned |
| AC-04 | Touch targets of at least 44px; colour is never the only carrier of state | P0 | Planned |
| AC-05 | The chatbot is keyboard- and screen-reader-operable (dialog semantics, live region for replies) | P0 (if LG-07) | Planned |

## Non-functional: Security (SC)
| ID | Description | Priority | Status |
|---|---|---|---|
| SC-01 | No secrets in the frontend bundle; LLM keys live only in Amplify `secret()` | P0 | Planned |
| SC-02 | Chatbot endpoint: CORS limited to the site origin, input length and turn caps, reserved-concurrency cap, output rendered as text (no HTML injection) | P0 (if LG-07) | Planned |
| SC-03 | Security headers through Amplify custom headers (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) | P0 | Planned |
| SC-04 | A `security-audit` pass before every deploy, with no open Critical or High findings | P0 | Planned |

## Analytics (AN)
| ID | Description | Priority | Status |
|---|---|---|---|
| AN-01 | Provider-agnostic `track(event, props)`; one provider only (choice deferred, Plausible suggested for privacy) | P1 | Planned |
| AN-02 | Events: page_view, cta_click, project_view, contact_start, contact_complete, service_interaction, calc_complete, whatsapp_click, call_click, chat_open | P1 | Planned |
| AN-03 | Consent-respecting: no cookies without consent, or a cookieless provider | P1 | Planned |
