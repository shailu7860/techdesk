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

## Content gaps (owner to supply)
1. Screenshots or recordings for Biexor, Stratos, BidMaster and 1Bull (plus the client builds, if available).
2. Real outcomes per project, or confirmation to omit them.
3. Client or industry names that may be published for the six client builds.
4. WhatsApp number, phone, email, city and business hours.
5. Calculator currency and real price bands.
6. Three to four true "Why TechDesk" commitments.
7. TechDesk social profiles (LinkedIn, X, GitHub, Instagram), or confirmation to use the personal ones.
