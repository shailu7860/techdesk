// Keyword-targeted landing pages (research: docs/SEO_KEYWORDS.md). One primary keyword per page,
// no two pages targeting the same query. Proof only from real projects in projects.ts.
import type { ServiceSlug } from "./services";

export type Solution = {
  slug: string;
  /** The search query this page is built to rank for. */
  keyword: string;
  secondary: string[];
  title: string; // <title> without brand, ≤ 50 chars
  description: string; // meta description, ≤ 160 chars
  h1: string;
  intro: string[];
  build: string[];
  steps: { name: string; detail: string }[];
  why: { title: string; detail: string }[];
  proof: string[]; // project slugs
  services: ServiceSlug[];
  estimateType: string; // pricing.ts id
  faq: { q: string; a: string }[];
  guide?: string; // insights slug
};

export const solutions: Solution[] = [
  {
    slug: "whatsapp-ai-agent-development",
    keyword: "WhatsApp AI agent development",
    secondary: ["WhatsApp chatbot development", "WhatsApp AI agent for business", "WhatsApp chatbot development cost"],
    title: "WhatsApp AI agent development for business",
    description:
      "Custom WhatsApp AI agents that answer, qualify leads, book appointments and update your CRM, built on the WhatsApp Business API. Priced in INR and USD.",
    h1: "WhatsApp AI agent development for businesses that live on WhatsApp",
    intro: [
      "Your customers already message you on WhatsApp. A custom AI agent answers them in seconds, day or night: it understands the question, looks up the right information, asks the qualifying questions a salesperson would, and books the next step.",
      "We build WhatsApp AI agents on the official WhatsApp Business Platform, connected to the tools you already use, with a person taking over whenever the conversation needs one.",
    ],
    build: [
      "Lead qualification agents that ask the right questions and score each enquiry",
      "Appointment and demo booking with your calendar",
      "Order status, support and FAQ answering from your own documents (RAG)",
      "CRM and spreadsheet updates after every conversation",
      "Human handoff to your team inside the same chat",
      "English, Hindi and other languages your customers write in",
    ],
    steps: [
      {
        name: "Map the conversations",
        detail: "We read real chats with you and list what the agent should handle and what it must hand over.",
      },
      {
        name: "Connect the tools",
        detail: "WhatsApp Business API, your calendar, CRM or database, with only the access each task needs.",
      },
      { name: "Build and test", detail: "Weekly demos on a test number, with the edge cases your team knows about." },
      {
        name: "Launch and improve",
        detail: "Go live on your number, review transcripts, and tune answers every week.",
      },
    ],
    why: [
      {
        title: "Agents that stay up",
        detail:
          "Our AI layers run a provider chain with timeouts and fallbacks, the same pattern we built for the Stratos trading platform, so one model outage does not take your support line down.",
      },
      {
        title: "Grounded answers only",
        detail:
          "The agent answers from your data and says so when it does not know, instead of inventing prices or promises.",
      },
      {
        title: "Priced for real businesses",
        detail:
          "A focused WhatsApp agent starts at an indicative ₹75k in India or $2k worldwide. See the estimate tool for your case.",
      },
    ],
    proof: ["stratos"],
    services: ["ai-automation"],
    estimateType: "ai",
    guide: "ai-agent-development-cost",
    faq: [
      {
        q: "Do I need the WhatsApp Business API?",
        a: "Yes, for an AI agent on your business number. We set up the official WhatsApp Business Platform access with you and connect it to the agent.",
      },
      {
        q: "Can the agent hand a chat to a person?",
        a: "Yes. You decide the rules, for example pricing questions, complaints or high-value leads, and the chat moves to your team with the full history.",
      },
      {
        q: "How long does a WhatsApp AI agent take to build?",
        a: "A focused agent for one workflow usually takes 2 to 4 weeks, including testing on a separate number before launch.",
      },
    ],
  },
  {
    slug: "algo-trading-software-development",
    keyword: "algo trading software development",
    secondary: [
      "algo trading platform development",
      "trading bot development",
      "crypto algo trading software development",
    ],
    title: "Algo trading software and platform development",
    description:
      "Custom algo trading platforms: strategy builders, backtesting, paper trading, broker APIs and AI research. From the team that built the Stratos platform.",
    h1: "Algo trading software development, from strategy builder to live execution",
    intro: [
      "Trading software has to be right every time: a duplicate order or a missed stop-loss costs real money. We build algorithmic trading platforms and bots with the safety rails designed in from the start.",
      "We engineered Stratos, a live platform where traders build strategies without code, backtest them, paper trade by default and go live through their own broker. We bring that experience to your platform.",
    ],
    build: [
      "No-code strategy builders with indicators, opening range and risk settings",
      "Backtesting on historical data with trade lists and drawdown",
      "Paper trading by default and recorded consent before live orders",
      "Broker and exchange integrations for Indian markets and crypto",
      "Execution engines that monitor stop-loss and targets every few seconds",
      "AI research layers with multi-provider failover",
    ],
    steps: [
      {
        name: "Define the strategy model",
        detail: "Rules, instruments, brokers and the risk limits that must never be crossed.",
      },
      {
        name: "Build the engine",
        detail: "Signal evaluation, order management and position monitoring with database-level duplicate protection.",
      },
      {
        name: "Backtest and paper trade",
        detail: "Prove the behaviour on historical and live data before any real order.",
      },
      { name: "Go live with guardrails", detail: "Consent, audit logs, alerts and a dashboard your users trust." },
    ],
    why: [
      {
        title: "We have shipped one",
        detail:
          "Stratos runs strategies for Indian derivatives through Angel One and crypto through Delta Exchange, with AI research on a 5-minute cycle.",
      },
      {
        title: "Correctness before features",
        detail: "Partial unique indexes make duplicate orders impossible even when signals arrive at the same moment.",
      },
      {
        title: "Compliance-aware",
        detail:
          "Paper-first defaults, recorded live consent, audit logs and encrypted broker tokens are part of the design, not an afterthought.",
      },
    ],
    proof: ["stratos", "financial-analytics"],
    services: ["software-engineering", "ai-automation"],
    estimateType: "web-app",
    faq: [
      {
        q: "Can you integrate my broker or exchange?",
        a: "Yes, if it offers an API. We have integrated Angel One for Indian derivatives and Delta Exchange for crypto, and follow the same adapter pattern for others.",
      },
      {
        q: "Do you give trading advice or strategies?",
        a: "No. We build the software; the trading logic and the decision to trade stay with you and your users.",
      },
      {
        q: "Can the platform run strategies 24/7?",
        a: "Yes. Execution runs on servers, not on a laptop, and can cover market hours for equities and around the clock for crypto.",
      },
    ],
  },
  {
    slug: "marketplace-development",
    keyword: "marketplace development company",
    secondary: ["online marketplace development", "B2B marketplace development", "marketplace platform development"],
    title: "Marketplace development company for B2B and B2C",
    description:
      "Online marketplace development with listings, search, bidding, KYC, payments and admin. Built by the team behind a live business exchange platform.",
    h1: "Marketplace development for platforms where trust decides the deal",
    intro: [
      "A marketplace lives or dies on trust and liquidity: buyers must find the right listing quickly, and both sides must believe the other is real. We build marketplaces where verification, structure and clear timelines are part of the product.",
      "We engineered a business exchange platform for buying and selling businesses through structured, auditable deal processes, with mandates, auctions, watchlists and identity verification.",
    ],
    build: [
      "Listings with rich filters for category, location, size and price",
      "Auctions, bidding and expressions of interest",
      "Identity verification and KYC inside onboarding",
      "Private watchlists and automatic match alerts",
      "Subscription plans and gated features",
      "Admin tools for moderation, approvals and reporting",
    ],
    steps: [
      {
        name: "Design the deal flow",
        detail: "Who lists, who buys, what must be verified and where the platform earns.",
      },
      { name: "Build the core loop", detail: "List, discover, engage and transact, before any nice-to-have." },
      { name: "Add trust", detail: "Verification, audit trails and clear status at every step." },
      { name: "Grow", detail: "Search metadata, shareable listings and analytics to bring in both sides." },
    ],
    why: [
      {
        title: "Proof in production",
        detail:
          "Our business exchange platform is live, with Aadhaar KYC through Digio and Standard and Enterprise subscription tiers.",
      },
      {
        title: "Search-ready by default",
        detail: "Per-page metadata and share images, so every listing can bring its own traffic.",
      },
      {
        title: "Structured, not a listing board",
        detail: "We model the deal as steps you can audit, which is what serious buyers and sellers expect.",
      },
    ],
    proof: ["business-exchange-platform", "ecommerce-platform"],
    services: ["web-product-engineering", "software-engineering"],
    estimateType: "web-app",
    faq: [
      {
        q: "Can you add payments and escrow?",
        a: "Yes. We integrate payment providers such as Stripe and Razorpay, and design escrow or milestone flows with your payment partner's rules.",
      },
      {
        q: "Do you build B2B and B2C marketplaces?",
        a: "Both. B2B platforms usually need verification, approvals and quotes; B2C platforms need speed, search and checkout. The architecture differs, and we plan for yours.",
      },
      {
        q: "How long does a marketplace MVP take?",
        a: "A focused marketplace MVP with listings, search, accounts and admin usually takes 6 to 10 weeks.",
      },
    ],
  },
  {
    slug: "chrome-extension-development",
    keyword: "Chrome extension development company",
    secondary: ["browser extension development", "Chrome extension development services", "custom Chrome extension"],
    title: "Chrome extension development company",
    description:
      "Custom Chrome and browser extensions (Manifest V3) that automate repetitive web work, from form filling to time-critical submissions. Built by TechDesk.",
    h1: "Chrome extension development that removes repetitive work from your team's day",
    intro: [
      "Many business processes still live inside a website you do not control: a supplier portal, a government system, a CRM. A browser extension can automate the repetitive parts right where your team already works.",
      "We built BidMaster, a Manifest V3 extension for vendors on SAP e-bidding portals: the bid is prepared in advance and saved the instant the bidding window opens, with the vendor still confirming.",
    ],
    build: [
      "Manifest V3 extensions for Chrome and Chromium-based browsers",
      "Form filling and data capture on third-party portals",
      "Time-critical actions that fire at an exact moment",
      "On-device processing so data stays in the browser",
      "Side panels and popups that add tools to any site",
      "Chrome Web Store publishing or private team distribution",
    ],
    steps: [
      {
        name: "Record the workflow",
        detail: "We watch the task on the real portal and mark every click that can be automated.",
      },
      { name: "Prototype", detail: "A working extension on one step, so you see the time saved early." },
      {
        name: "Harden",
        detail: "Handle portal changes, slow pages and errors, and keep a human confirmation where it matters.",
      },
      { name: "Ship", detail: "Publish to the Chrome Web Store or distribute privately to your team." },
    ],
    why: [
      {
        title: "Real portal experience",
        detail: "BidMaster works on live SAP e-bidding portals where seconds matter.",
      },
      {
        title: "Privacy by design",
        detail: "We keep processing on the device wherever we can, so sensitive data does not leave the browser.",
      },
      {
        title: "Human in the loop",
        detail: "Automation prepares and speeds up the work; the person still approves the action.",
      },
    ],
    proof: ["bidmaster"],
    services: ["ai-automation", "digital-transformation"],
    estimateType: "extension",
    faq: [
      {
        q: "Will the extension break when the website changes?",
        a: "Websites do change. We build selectors defensively, add clear error messages, and offer maintenance so updates ship quickly.",
      },
      {
        q: "Can you publish it privately for our company only?",
        a: "Yes. Extensions can be published as unlisted or distributed privately to your organisation's browsers.",
      },
      {
        q: "How much does a Chrome extension cost?",
        a: "A focused extension starts at an indicative ₹50k in India or $1.5k worldwide; the estimate tool gives a range for your scope.",
      },
    ],
  },
  {
    slug: "saas-development-company",
    keyword: "SaaS development company",
    secondary: ["SaaS development services", "SaaS product development", "SaaS development company in India"],
    title: "SaaS development company for startups and teams",
    description:
      "SaaS product development from MVP to scale: accounts, subscriptions, dashboards, admin and APIs, built with React and Node.js. Indicative INR and USD pricing.",
    h1: "SaaS development from first version to the product customers pay for",
    intro: [
      "A SaaS product has more moving parts than it looks: accounts and roles, subscriptions and billing, admin tools, reporting and an API, all while staying fast and secure. We design and build all of it, and we keep the first version small enough to launch.",
      "Our own products include Stratos, a subscription trading platform with Starter, Pro and Ultra Pro plans, and a real-time task management SaaS for teams.",
    ],
    build: [
      "Multi-user accounts, roles and permissions",
      "Subscription plans, billing cycles and feature gating",
      "Dashboards, reporting and exports",
      "Real-time collaboration and notifications",
      "Public APIs and integrations",
      "Admin back office and support tools",
    ],
    steps: [
      {
        name: "Scope the MVP",
        detail: "The one workflow customers will pay for, and nothing else, with a written price.",
      },
      { name: "Design", detail: "Flows and screens you can click through before we write production code." },
      { name: "Build weekly", detail: "Working software every week, in a repository you own." },
      { name: "Launch and scale", detail: "Monitoring, backups and a roadmap for the version after launch." },
    ],
    why: [
      {
        title: "We run our own SaaS",
        detail: "Stratos has plans, billing cycles, plan enforcement and an admin console in production.",
      },
      {
        title: "Launch small, grow safely",
        detail: "Architecture that starts simple and has room for more users, plans and integrations.",
      },
      {
        title: "Transparent pricing",
        detail: "A focused SaaS MVP starts at an indicative ₹1.5L in India or $3k worldwide.",
      },
    ],
    proof: ["stratos", "task-management-saas", "learning-platform"],
    services: ["web-product-engineering", "software-engineering"],
    estimateType: "web-app",
    guide: "saas-development-cost",
    faq: [
      {
        q: "Which tech stack do you use for SaaS?",
        a: "Usually React or Next.js with TypeScript on the front end, Node.js on the back end, and PostgreSQL or MongoDB, chosen per product and explained in plain language.",
      },
      {
        q: "Can you add subscriptions and billing?",
        a: "Yes. Plans, trials, billing cycles and feature limits per plan are part of most SaaS builds we do.",
      },
      {
        q: "Will I own the code?",
        a: "Yes. The code lives in a repository you own or can access from day one.",
      },
    ],
  },
  {
    slug: "hire-developers-india",
    keyword: "hire dedicated developers in India",
    secondary: [
      "outsource software development to India",
      "hire AI developers in India",
      "offshore software development company in India",
    ],
    title: "Hire dedicated developers in India",
    description:
      "Hire dedicated React, Node.js and AI developers in India who work on your roadmap, with weekly demos, USD pricing and time-zone overlap. TechDesk, Indore.",
    h1: "Hire dedicated developers in India without losing sight of the work",
    intro: [
      "Outsourcing to India works when you can see the work and talk to the people doing it. Our dedicated developers join your roadmap, show working software every week, and are reachable directly on your team chat or WhatsApp.",
      "We are based in Indore and work with clients worldwide, with office hours that overlap European mornings and US evenings.",
    ],
    build: [
      "React, Next.js and TypeScript front-end developers",
      "Node.js back-end and API engineers",
      "AI engineers for agents, chatbots and LLM integrations",
      "Full-stack developers for SaaS and internal tools",
      "SEO and performance specialists for existing sites",
      "Flexible team size, planned weekly",
    ],
    steps: [
      {
        name: "Tell us the roadmap",
        detail: "What needs building in the next three months and which skills it takes.",
      },
      { name: "Meet the team", detail: "Talk to the developers who would work on your product before you commit." },
      { name: "Start with a sprint", detail: "Two weeks of real work, so you judge by output, not by CVs." },
      { name: "Scale up or down", detail: "Adjust the team with notice as your priorities change." },
    ],
    why: [
      {
        title: "Direct line to engineers",
        detail: "No account-manager relay: you talk to the people writing your code.",
      },
      { title: "Visible progress", detail: "Weekly demos and a repository you own, so nothing happens out of sight." },
      {
        title: "Proven stack",
        detail:
          "The same engineers built Stratos, a business exchange platform, BidMaster and the 1Bull platform foundation.",
      },
    ],
    proof: ["stratos", "business-exchange-platform", "1bull"],
    services: ["web-product-engineering", "ai-automation"],
    estimateType: "web-app",
    faq: [
      {
        q: "What time zones do you cover?",
        a: "Our office hours are Monday to Saturday, 10:00 to 19:00 IST, which overlaps European mornings and US evenings, and we schedule weekly demos at a time that suits you.",
      },
      {
        q: "How is a dedicated team billed?",
        a: "Monthly, per team, in USD or INR. You can scale the team up or down with notice.",
      },
      {
        q: "Do you sign NDAs and IP agreements?",
        a: "Yes. We sign a mutual NDA before you share details, and IP transfers to you as agreed in the contract.",
      },
    ],
  },
  {
    slug: "fintech-software-development",
    keyword: "fintech software development company",
    secondary: ["fintech app development", "trading platform development", "financial software development"],
    title: "Fintech software development company",
    description:
      "Fintech software built to be correct first: trading platforms, marketplaces with KYC, ledgers and analytics, from the team behind Stratos and 1Bull.",
    h1: "Fintech software development where every number has to be right",
    intro: [
      "Financial software is judged on correctness. Money must never be lost to a rounding error, an order must never fire twice, and every sensitive action must leave an audit trail. We build with those rules enforced in code and in the database.",
      "Our fintech work includes a live algo trading platform, a business exchange with KYC, a multi-brand platform foundation with a double-entry ledger, and a financial analytics tool.",
    ],
    build: [
      "Trading and investment platforms",
      "Marketplaces with KYC and verified parties",
      "Double-entry ledgers and wallet foundations",
      "Idempotent payment and callback handling",
      "Analytics dashboards with live market data",
      "Audit logs, consent records and compliance tooling",
    ],
    steps: [
      { name: "Model the money", detail: "Ledgers, currencies and every state a transaction can be in." },
      { name: "Enforce the rules", detail: "Constraints in the database, not only checks in code." },
      { name: "Build the product", detail: "The experience users see, on top of a core that cannot drift." },
      { name: "Prove it", detail: "Tests against real databases, not mocks, for everything that moves money." },
    ],
    why: [
      {
        title: "Money as integers",
        detail:
          "In 1Bull, money is bigint minor units with an explicit currency, and floats on money are a lint error.",
      },
      {
        title: "Trust built in",
        detail: "Stratos and our business exchange platform ship consent records, audit logs and KYC as core features.",
      },
      {
        title: "Compliance-aware engineering",
        detail: "Server-side, deny-by-default rules, never hidden only in the interface.",
      },
    ],
    proof: ["stratos", "business-exchange-platform", "1bull", "financial-analytics"],
    services: ["software-engineering", "web-product-engineering"],
    estimateType: "web-app",
    faq: [
      {
        q: "Do you handle KYC integrations?",
        a: "Yes. Our business exchange platform uses Aadhaar verification through Digio inside onboarding, and we can integrate other KYC providers.",
      },
      {
        q: "Are you a licensed financial institution?",
        a: "No. We are a software company. We build the technology; licensing and regulatory approvals stay with you.",
      },
      {
        q: "How do you prevent duplicate transactions?",
        a: "Idempotency enforced by unique database constraints, so a retried request can never create a second transaction.",
      },
    ],
  },
  {
    slug: "software-development-company-indore",
    keyword: "software development company in Indore",
    secondary: [
      "web development company in Indore",
      "custom software development company in Indore",
      "AI development company in Indore",
    ],
    title: "Software development company in Indore",
    description:
      "TechDesk is a software and AI development company in Indore building web apps, SaaS, AI agents and automation for local businesses and clients worldwide.",
    h1: "Software development company in Indore, building for the world",
    intro: [
      "TechDesk is an Indore-based technology studio. We build custom software, web applications, SaaS products, AI agents and automation for businesses in Indore and Madhya Pradesh, and for clients across the world.",
      "Meet us in person or talk on WhatsApp: you work directly with the engineers who build your product, and see it working every week.",
    ],
    build: [
      "Custom software and internal business tools",
      "Websites and web applications",
      "SaaS platforms and dashboards",
      "AI agents, chatbots and WhatsApp automation",
      "E-commerce and marketplaces",
      "Technical SEO and digital marketing",
    ],
    steps: [
      { name: "Meet or call", detail: "A short conversation in Indore or online about what you need." },
      { name: "Written scope", detail: "A clear scope and price range before any invoice." },
      { name: "Weekly demos", detail: "Working software every week, in person or on a call." },
      { name: "Launch and support", detail: "We stay available after launch for fixes and improvements." },
    ],
    why: [
      {
        title: "Local and reachable",
        detail: "Based in Indore, Monday to Saturday, 10:00 to 19:00, with WhatsApp messages welcome anytime.",
      },
      {
        title: "Work at a global standard",
        detail: "The same team built platforms such as Stratos and a business exchange platform used beyond Indore.",
      },
      { title: "Clear pricing in rupees", detail: "Indicative INR ranges for every kind of project, before we meet." },
    ],
    proof: ["stratos", "business-exchange-platform", "bidmaster"],
    services: ["web-product-engineering", "ai-automation", "digital-marketing"],
    estimateType: "web-app",
    faq: [
      {
        q: "Can we meet in Indore?",
        a: "Yes. Call or WhatsApp +91 92033 87375 to arrange a meeting in Indore, or talk online if that is easier.",
      },
      {
        q: "Do you work with small businesses in Indore?",
        a: "Yes. Focused projects such as a business website or a WhatsApp agent are priced for small and growing businesses.",
      },
      {
        q: "Do you also serve clients outside Indore?",
        a: "Yes. Most of our work is for clients across India and worldwide, managed online with weekly demos.",
      },
    ],
  },
];

export const getSolution = (slug: string | undefined) => solutions.find((s) => s.slug === slug);
