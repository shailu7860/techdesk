# Phase 0: Discovery Report

Date: 2026-09-23 · Spec §58

## Checklist
| # | Spec item | Finding |
|---|---|---|
| 1 | Inspect repository | `techdesk/` was created empty, so there is nothing to overwrite. It is not yet a git repo; initialised in Phase 1. |
| 2 | Existing React project? | None for TechDesk. The sibling `digital-ascent/` is an unrelated Lovable template ("Lovable App"). |
| 3 | package.json | n/a. Toolchain: Node 24.0, npm 11.18, pnpm available, git 2.34. |
| 4 | Existing assets | None usable. digital-ascent and the portfolio site hold only template placeholders. |
| 5 | Branding | Brand name **TechDesk** (owner-confirmed). No logo, colours or fonts, so an SVG wordmark is designed in Phase 2. |
| 6 | Screenshots / videos | **None found. The owner must supply them** (see the Content gaps section). |
| 7 | Existing case studies | Stratos has full PRD, TRD and product overview docs. 1Bull has a README, docs and a changelog. The others have no docs. |
| 8 | Company name / logo | TechDesk / none. |
| 9 | Domain | None yet. |
| 10 | Deployment | None. Target is **AWS Amplify Hosting** (owner decision). |

## Portfolio inventory (owner-approved for public display)
| Project | Type | Source of truth | Known facts |
|---|---|---|---|
| **Biexor** | Business exchange / M&A marketplace | `qa.biexor.com` live app (meta tags and UI strings) | "Buy and sell businesses through structured, auditable deal processes." Auctions and bidding, mandates, watchlists and auto-watchlist, expressions of interest, Aadhaar and Digio KYC, verified events, Standard and Enterprise tiers. React, MUI, Vite, per-page SEO meta. |
| **Stratos** | Algo-trading automation | `../PRODUCT_OVERVIEW.md`, `../PRD.md`, `../TRD.md`, `../StratOS/` | "Your Trading Buddy: automated strategies, your broker, your control." Multi-provider LLM layer with failover (`Some learnings/algo-backend`). |
| **BidMaster** | Chrome extension (MV3), SAP e-bidding | `../biding agent/*/manifest.json` | Prepare a bid; it auto-saves the instant the bid window opens. v1 uses local OCR as a suggestion for the user to confirm. **Positioned as procurement automation. CAPTCHA reading is not marketed.** |
| **1Bull** | Multi-brand gaming platform | `../1Bull/README.md` | Sportsbook, casino aggregation, instant games, wallet, payments, bonuses, VIP, affiliates, operator back office. Multi-brand, multi-jurisdiction pnpm monorepo. Status: Phase 0 foundation. |
| **digital-ascent** | Agency website | `../digital-ascent/` | Multi-page site with AI chatbot and quote calculator. Vite, React, shadcn. |
| **Portfolio site** | MERN portfolio | `../portfolio website/` | Vite, React, shadcn, EmailJS. |
| E-Commerce Platform | Client build | old portfolio `Portfolio.tsx` | React, Node, MongoDB, Stripe, Express. Payments, inventory, admin. |
| Task Management SaaS | Client build | same | React, Socket.io, Node, MongoDB, JWT. Real-time collaboration. |
| Healthcare Dashboard | Client build | same | React, Node, MongoDB, WebRTC, AWS. Appointments, records, telemedicine. |
| Social Learning Platform | Client build | same | React, Node, MongoDB, Redis, S3. Courses, progress, live streaming. |
| Real Estate CRM | Client build | same | React, Express, MongoDB, Nodemailer, Mapbox. Leads, properties, workflows. |
| Financial Analytics Tool | Client build | same | React, D3, Node, MongoDB, Alpha Vantage. Charts, portfolio tracking. |

The old portfolio's descriptions include the claim "HIPAA-compliant" (Healthcare). **Do not publish that claim unless the owner confirms it.**

## Excluded content
- Old-portfolio testimonials (Sarah Chen, Michael Rodriguez, Emily Thompson) and stats (50+ projects, 30+ clients, 99.9% uptime, 100K+ LOC): template content.
- The digital-ascent chatbot's canned claims ("helped 50+ companies save 40%"): unverified.

## Reusable engineering (patterns, not code)
- `Some learnings/algo-backend/src/utils/llmProvider.js`: env-driven `provider:model` chain, per-attempt timeout plus overall deadline, failure classification with per-provider cooldown, secret redaction. Informs the chatbot function design (see `ARCHITECTURE.md` §7).
- `digital-ascent/src/components/QuoteCalculator.tsx`: pricing shape `base × size multiplier + add-ons → range`. Only the shape is reused; the prices are unconfirmed.

## Business content (resolved 2026-09-23)
Owner-supplied items are marked **(owner)**. Items the owner delegated ("decide yourself, but best") are marked **(delegated)**; the owner can edit any of them in `src/data/*`.

| Item | Value |
|---|---|
| WhatsApp and call | **+91 92033 87375** (owner). `wa.me/919203387375`, `tel:+919203387375` |
| Email | **shailendramishra0127@gmail.com** (owner). Swap to a TechDesk-domain address once the domain exists |
| Location | **Indore, India. Serving clients worldwide** (owner) |
| Currency | **INR and USD**, with a toggle (owner). Default is INR for visitors in the `Asia/Kolkata` timezone and USD otherwise, and the choice is remembered (delegated). Bands are priced per market, not FX-converted |
| Hours | Mon–Sat, 10:00–19:00 IST; WhatsApp messages accepted anytime (delegated) |
| Reply promise | "We reply within one business day." (delegated) |
| Why TechDesk | 1. **You own everything**: code, designs, IP and repo access from day one. 2. **Working software every week**: live demo builds, not status reports. 3. **Talk to the people building it**: a direct line to the engineers on WhatsApp. 4. **Estimate before commitment**: written scope and price range before any invoice. (delegated) |
| Project outcomes | **Omitted** until real numbers are supplied. Case studies describe problem, system, stack and role only (delegated, per spec rules 6–7) |
| "HIPAA-compliant" claim | **Omitted**: unverifiable (delegated) |
| 1Bull | Kept as a flagship, framed honestly as *platform architecture* (multi-brand, multi-jurisdiction foundation), not as a live operator (delegated) |
| Social links | **Hidden** until TechDesk profiles exist; the old portfolio's personal URLs were unverified template values (delegated) |
| Form service | **Web3Forms** (free, public access key, delivers to the email above). The owner creates the key at build time (delegated) |
| Analytics | Deferred to Phase 12; it will be a cookieless provider so no consent banner is needed (delegated) |
| Screenshots | Owner supplies later; the system-diagram treatment is used until then |

### Indicative price bands (delegated; `src/data/pricing.ts`)
A range is shown per size. Large is "from" (open-ended). All figures are indicative, not quotes.

| Service | Small | Medium | Large |
|---|---|---|---|
| Website / landing experience | ₹40k–1.2L · $1.2k–3.5k | ₹1.2L–3L · $3.5k–8k | from ₹3L · from $8k |
| Web app / SaaS platform | ₹1.5L–4L · $3k–8k | ₹4L–12L · $8k–25k | from ₹12L · from $25k |
| AI agent / chatbot / automation | ₹75k–2.5L · $2k–6k | ₹2.5L–8L · $6k–18k | from ₹8L · from $18k |
| Browser extension / internal tool | ₹50k–1.5L · $1.5k–4k | ₹1.5L–4L · $4k–10k | from ₹4L · from $10k |
| Digital marketing (per month) | ₹25k–60k · $800–2k | ₹60k–1.5L · $2k–5k | from ₹1.5L · from $5k |

Add-ons multiply the range: custom UI/UX design ×1.15, priority timeline ×1.25, 6-month support and maintenance ×1.10, team training ×1.05.

## Remaining gaps (owner to supply)
1. Screenshots or recordings for Biexor, Stratos, BidMaster, 1Bull and the client builds.
2. Real outcomes per project (optional).
3. Client or industry names that may be published for the six client builds.
4. Web3Forms access key (free; created with the email above).
5. Domain (optional; Amplify URL until then).
