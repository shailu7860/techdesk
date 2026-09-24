// Portfolio content. Sources: docs/DISCOVERY.md (owner-approved projects).
// Rule: only verifiable facts. No invented clients, metrics or outcomes (spec §71 rules 6–8).
import type { ServiceSlug } from "./services";

export type Project = {
  slug: string;
  /** Mono index shown on mission files, e.g. "01". */
  code: string;
  title: string;
  tagline: string;
  industry: string;
  industries: IndustryKey[];
  services: ServiceSlug[];
  status: string;
  url?: string;
  summary: string;
  stack: string[];
  /** Flagships get a full case study page at /work/:slug. */
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  problem: string[];
  approach: string;
  architecture: { node: string; role: string }[];
  features: string[];
  challenges?: { title: string; detail: string }[];
  role: string;
  /** No screenshots supplied yet: the page renders the system diagram instead. */
  visualsPending?: true;
};

export type IndustryKey =
  | "fintech"
  | "marketplaces"
  | "ecommerce"
  | "healthcare"
  | "education"
  | "real-estate"
  | "enterprise"
  | "gaming"
  | "saas";

export const projects: Project[] = [
  {
    slug: "biexor",
    code: "01",
    title: "Biexor",
    tagline: "The Business Exchange",
    industry: "Marketplaces · M&A",
    industries: ["marketplaces", "fintech"],
    services: ["web-product-engineering", "software-engineering"],
    status: "Live",
    url: "https://biexor.com",
    summary:
      "A platform for buying and selling businesses through structured, auditable deal processes: clear timelines, verified parties and professional execution.",
    stack: ["React", "Vite", "Material UI", "Digio KYC", "Aadhaar verification"],
    caseStudy: {
      problem: [
        "Buying or selling a business usually runs on email threads, spreadsheets and counterparties nobody has verified.",
        "Serious buyers need to find the right mandates quickly; sellers need every step to be traceable.",
      ],
      approach:
        "Model the deal as a structured process instead of a listing board. Every mandate, bid and expression of interest becomes an auditable step, with identity verification built into the flow instead of bolted on after.",
      architecture: [
        { node: "Discovery", role: "Mandates filtered by industry, location, asset type and ticket size" },
        { node: "Watchlists", role: "Private watchlists plus an auto-watchlist that tracks new matches" },
        { node: "Deal flow", role: "Expressions of interest, auctions and bidding, verified events" },
        { node: "Trust layer", role: "Aadhaar KYC through Digio before a party can transact" },
        { node: "Plans", role: "Standard and Enterprise subscriptions gate advanced features" },
      ],
      features: [
        "Mandate discovery with multi-select filters for industry, location, asset type and ticket size",
        "Auctions and bidding with a calendar view of active events",
        "Expressions of interest and a contact-seller flow gated by preferences",
        "Private watchlists and an auto-watchlist that can be toggled",
        "Identity verification (Aadhaar through Digio) inside the onboarding flow",
        "Per-page search metadata and Open Graph images for shareable listings",
      ],
      role: "Product engineering",
      visualsPending: true,
    },
  },
  {
    slug: "stratos",
    code: "02",
    title: "Stratos",
    tagline: "Automated strategies, your broker, your control",
    industry: "Fintech · Trading automation",
    industries: ["fintech", "saas"],
    services: ["ai-automation", "web-product-engineering", "software-engineering"],
    status: "Live",
    url: "https://shailendratradingbot.shop",
    summary:
      "A cloud algorithmic-trading platform: build strategies without code, backtest them, paper trade by default and go live through the trader's own broker, with AI research running alongside.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Node.js",
      "MongoDB",
      "AWS Amplify",
      "Groq · NVIDIA · OpenRouter LLMs",
    ],
    caseStudy: {
      problem: [
        "Manual execution is slow and emotional; active traders cannot watch charts all day.",
        "Testing an idea usually means writing code, and going live too early is costly.",
        "Equity and crypto usually live in two separate worlds.",
      ],
      approach:
        "One Strategy Builder where traders compose rules from forms and settings, then backtest, paper trade and only then go live, with explicit consent. The engine runs on the server during market hours, so the trader's laptop does not have to.",
      architecture: [
        { node: "Strategy Builder", role: "Point-and-click rules: indicators, opening range, risk settings" },
        { node: "Backtester", role: "Historical simulation on any stock, index or index basket" },
        {
          node: "Execution engine",
          role: "Fetches candles, evaluates signals, monitors stop-loss and targets every few seconds",
        },
        { node: "Broker adapters", role: "Angel One (Indian derivatives) and Delta Exchange (crypto, 24/7)" },
        {
          node: "AI layer",
          role: "Live Research on a 5-minute cycle and Swing Trade AI, with multi-provider LLM failover",
        },
        { node: "Trust layer", role: "Paper by default, recorded live consent, audit log, encrypted broker tokens" },
      ],
      features: [
        "No-code Strategy Builder with backtesting before any live order",
        "Paper trading by default; live trading only after recorded consent",
        "Trade guards, cooldowns and database-level duplicate-trade prevention",
        "AI Live Research cards with entry, stop-loss and targets, placeable in one click",
        "Swing Trade AI with a dedicated position monitor",
        "Telegram and WhatsApp alerts; audit log for logins, consent and mode changes",
        "Starter, Pro and Ultra Pro plans billed monthly, half-yearly or yearly",
      ],
      challenges: [
        {
          title: "Model layers that fail silently",
          detail:
            "A single LLM provider can go down or rate-limit without warning. The AI layer runs an environment-driven provider chain with per-attempt timeouts, an overall deadline, failure classification and per-provider cooldowns, so one outage degrades a feature instead of killing it.",
        },
        {
          title: "Duplicate or runaway trades",
          detail:
            "Guards live in the database, not just in code: partial unique indexes make a second identical order impossible even under concurrent signals.",
        },
      ],
      role: "Design, engineering and operations",
      visualsPending: true,
    },
  },
  {
    slug: "bidmaster",
    code: "03",
    title: "BidMaster",
    tagline: "Procurement automation for SAP e-bidding",
    industry: "Enterprise · Procurement",
    industries: ["enterprise"],
    services: ["ai-automation", "digital-transformation"],
    status: "In use (v2.1)",
    summary:
      "A browser extension for vendors on SAP e-bidding portals: prepare the bid in advance, and it is saved the instant the bidding window opens.",
    stack: ["Chrome Extension (Manifest V3)", "JavaScript", "On-device OCR"],
    caseStudy: {
      problem: [
        "E-bidding windows open at a precise moment, and a manual submission loses seconds that matter.",
        "Re-typing a prepared bid under time pressure invites mistakes.",
      ],
      approach:
        "Move the preparation out of the critical moment. The vendor prepares the bid calmly; the extension watches the window and saves it the instant it opens, with the vendor still in control of the final confirmation.",
      architecture: [
        { node: "Bid prep", role: "Vendor enters and reviews the bid ahead of time" },
        { node: "Window watch", role: "Detects the moment the bidding window opens" },
        { node: "Auto-save", role: "Saves the prepared bid immediately" },
        { node: "On-device assist", role: "Local processing suggests inputs; the vendor confirms" },
      ],
      features: [
        "Prepare-then-fire workflow for time-critical bids",
        "Runs as a Manifest V3 extension inside the vendor's own browser",
        "Human confirmation kept in the loop",
      ],
      role: "Design and engineering",
      visualsPending: true,
    },
  },
  {
    slug: "1bull",
    code: "04",
    title: "1Bull",
    tagline: "Multi-brand gaming platform architecture",
    industry: "Gaming · Platform architecture",
    industries: ["gaming", "fintech"],
    services: ["software-engineering", "web-product-engineering"],
    status: "Foundation phase",
    summary:
      "The foundation for a multi-product gaming platform (sportsbook, casino aggregation, instant games, wallet, payments, bonuses, VIP, affiliates and an operator back office) as one configurable, multi-brand, multi-jurisdiction codebase.",
    stack: [
      "Fastify 5",
      "TypeScript",
      "PostgreSQL 17",
      "Drizzle",
      "Redis 8",
      "BullMQ",
      "Next.js 16",
      "React 19",
      "Tailwind v4",
      "Vitest",
    ],
    caseStudy: {
      problem: [
        "A bet touches wallet, odds, bonus and risk at the same time; getting money wrong once is unacceptable.",
        "Operators need several brands and jurisdictions without forking the code.",
      ],
      approach:
        "A modular monolith with strict domain boundaries: a bet is one database transaction, not a distributed saga, while modules stay isolated enough to extract later. Correctness rules are enforced by tests and lint rules, not by good intentions.",
      architecture: [
        { node: "Platform API", role: "Fastify 5; one Zod schema is validator, type and OpenAPI source" },
        { node: "Ledger", role: "Immutable double-entry ledger in PostgreSQL; balances are derived, never mutated" },
        { node: "Realtime + jobs", role: "Redis 8 pub/sub for live odds; BullMQ jobs with retries" },
        { node: "Player app", role: "Next.js 16, dark-first and mobile-first, brand-driven tokens" },
        { node: "Config", role: "Brand config, currency registry and environment validation per deployment" },
      ],
      features: [
        "Money as bigint minor units with an explicit currency; floats on money are a lint error",
        "Every financial operation idempotent, enforced by a unique index",
        "Compliance server-side and deny-by-default",
        "External callbacks signature-verified, replay-protected and idempotent",
        "Structured logging with mandatory redaction",
      ],
      role: "Architecture and engineering",
      visualsPending: true,
    },
  },
  {
    slug: "digital-ascent",
    code: "05",
    title: "Digital Ascent",
    tagline: "Agency website with AI chatbot and quote calculator",
    industry: "Professional services",
    industries: ["saas"],
    services: ["web-product-engineering", "digital-marketing"],
    status: "Delivered",
    summary:
      "A multi-page agency site with services, portfolio, pricing, blog and careers, plus an AI chat assistant and a step-by-step quote calculator.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui"],
  },
  {
    slug: "ecommerce-platform",
    code: "06",
    title: "E-commerce Platform",
    tagline: "Payments, inventory and admin in one system",
    industry: "E-commerce",
    industries: ["ecommerce"],
    services: ["web-product-engineering"],
    status: "Delivered",
    summary:
      "Full-stack e-commerce with payment integration, inventory management and an admin dashboard for a growing retail business.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
  },
  {
    slug: "task-management-saas",
    code: "07",
    title: "Task Management SaaS",
    tagline: "Real-time team collaboration",
    industry: "SaaS · Productivity",
    industries: ["saas"],
    services: ["web-product-engineering"],
    status: "Delivered",
    summary: "A collaborative project-management tool with real-time updates, team features and reporting.",
    stack: ["React", "Node.js", "Socket.io", "MongoDB", "JWT"],
  },
  {
    slug: "healthcare-dashboard",
    code: "08",
    title: "Healthcare Dashboard",
    tagline: "Scheduling, records and telemedicine",
    industry: "Healthcare",
    industries: ["healthcare"],
    services: ["web-product-engineering", "digital-transformation"],
    status: "Delivered",
    summary: "A patient-management system with appointment scheduling, medical records and telemedicine video calls.",
    stack: ["React", "Node.js", "MongoDB", "WebRTC", "AWS"],
  },
  {
    slug: "learning-platform",
    code: "09",
    title: "Social Learning Platform",
    tagline: "Courses, progress and live classes",
    industry: "Education",
    industries: ["education"],
    services: ["web-product-engineering"],
    status: "Delivered",
    summary: "An education platform with course creation, progress tracking, live streaming and community features.",
    stack: ["React", "Node.js", "MongoDB", "Redis", "AWS S3"],
  },
  {
    slug: "real-estate-crm",
    code: "10",
    title: "Real Estate CRM",
    tagline: "Leads, properties and automated follow-ups",
    industry: "Real estate",
    industries: ["real-estate"],
    services: ["web-product-engineering", "digital-transformation"],
    status: "Delivered",
    summary: "A CRM for real-estate agents with lead tracking, property management, maps and automated workflows.",
    stack: ["React", "Express", "MongoDB", "Nodemailer", "Mapbox"],
  },
  {
    slug: "financial-analytics",
    code: "11",
    title: "Financial Analytics Tool",
    tagline: "Market data, visualised",
    industry: "Fintech · Analytics",
    industries: ["fintech"],
    services: ["web-product-engineering"],
    status: "Delivered",
    summary: "A data-visualisation platform for financial analysis with real-time charts and portfolio tracking.",
    stack: ["React", "D3.js", "Node.js", "MongoDB", "Alpha Vantage API"],
  },
  {
    slug: "developer-portfolio",
    code: "12",
    title: "Developer Portfolio",
    tagline: "Personal site with direct contact",
    industry: "Professional services",
    industries: ["saas"],
    services: ["web-product-engineering"],
    status: "Delivered",
    summary: "A MERN developer portfolio with services, projects and a contact form that delivers straight to email.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "EmailJS"],
  },
];

export const flagships = projects.filter((p) => p.caseStudy);
export const builds = projects.filter((p) => !p.caseStudy);
export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);
