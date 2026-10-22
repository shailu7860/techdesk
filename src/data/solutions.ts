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
    slug: "ai-agent-development",
    keyword: "AI agent development company",
    secondary: ["hire AI agent developer", "custom AI agent development", "AI agent developers in India"],
    title: "AI agent development company and developers",
    description:
      "Hire AI agent developers who ship: agents that research, decide and act inside your tools, with model failover, guardrails and a human in the loop.",
    h1: "AI agent development by developers who run agents in production",
    intro: [
      "An AI agent is software that reads a situation, decides what to do and takes the action itself: answering a customer, updating a CRM, researching a market or drafting a document. The hard part is not the demo, it is keeping the agent correct, safe and online every day.",
      "Our AI agent development work runs in production: the AI layer of our algo trading platform produces live research every five minutes across several model providers, with timeouts, failover and cooldowns so one outage never stops the feature.",
    ],
    build: [
      "Customer-facing agents for WhatsApp, web chat and email",
      "Internal agents that act inside your CRM, ERP and tools",
      "Research and analysis agents on live data",
      "RAG search over your documents and knowledge base",
      "Multi-step workflows with approvals and a human in the loop",
      "Multi-provider model layers with failover and cost control",
    ],
    steps: [
      { name: "Pick the job", detail: "One task the agent owns end to end, and how we will measure it." },
      { name: "Connect the tools", detail: "The data it reads and the actions it is allowed to take, nothing more." },
      { name: "Add guardrails", detail: "Limits, approvals, logging and a fallback when a model is down." },
      { name: "Launch and tune", detail: "Review real conversations and actions every week and improve them." },
    ],
    why: [
      {
        title: "Agents in production, not demos",
        detail: "Our trading platform's AI research and swing-trade agents run on live market data every day.",
      },
      {
        title: "Built to stay up",
        detail: "Provider chains with per-attempt timeouts and cooldowns, so one model outage degrades, never breaks.",
      },
      {
        title: "Safe by default",
        detail: "Agents get only the permissions their job needs, and risky actions wait for a person to approve.",
      },
    ],
    proof: ["algo-trading-platform", "e-bidding-automation", "agency-website"],
    services: ["ai-automation", "software-engineering"],
    estimateType: "ai",
    guide: "ai-agent-development-cost",
    faq: [
      {
        q: "What is the difference between a chatbot and an AI agent?",
        a: "A chatbot answers questions. An AI agent also takes actions: it can look up an order, update a record, book a slot or start a workflow, within limits you set.",
      },
      {
        q: "Which AI models do you use?",
        a: "We choose per task, for example Claude, Groq-hosted open models or other OpenAI-compatible APIs, and usually put two or more providers behind a failover chain.",
      },
      {
        q: "How much does AI agent development cost?",
        a: "A focused agent starts at an indicative ₹75k in India or $2k worldwide; the estimate tool and our cost guide give a range for your scope.",
      },
    ],
  },
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
          "Our AI layers run a provider chain with timeouts and fallbacks, the same pattern we built for our algo trading platform, so one model outage does not take your support line down.",
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
    proof: ["algo-trading-platform"],
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
      "Custom algo trading platforms: strategy builders, backtesting, paper trading, broker APIs and AI research, from a team that runs a live one.",
    h1: "Algo trading software development, from strategy builder to live execution",
    intro: [
      "Trading software has to be right every time: a duplicate order or a missed stop-loss costs real money. We build algorithmic trading platforms and bots with the safety rails designed in from the start.",
      "We engineered a live algo trading platform where traders build strategies without code, backtest them, paper trade by default and go live through their own broker. We bring that experience to your platform.",
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
          "Our algo trading platform runs strategies for Indian derivatives through Angel One and crypto through Delta Exchange, with AI research on a 5-minute cycle.",
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
    proof: ["algo-trading-platform", "financial-analytics"],
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
      "Online marketplace development with listings, search, bidding, KYC, payments and admin. Planned around trust, verification and clear deal flow.",
    h1: "Marketplace development for platforms where trust decides the deal",
    intro: [
      "A marketplace lives or dies on trust and liquidity: buyers must find the right listing quickly, and both sides must believe the other is real. We build marketplaces where verification, structure and clear timelines are part of the product.",
      "We design the deal flow first (who lists, who buys, what must be verified) and build listings, search, bidding and admin around it, on the same engineering base as our e-commerce and enterprise platforms.",
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
        title: "Built on real platforms",
        detail:
          "Payments, inventory, roles and approvals come from systems we have already shipped, such as our e-commerce platform and enterprise software.",
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
    proof: ["ecommerce-platform", "enterprise-software"],
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
    slug: "erp-hrms-software-development",
    keyword: "ERP software development company",
    secondary: ["HRMS software development", "custom ERP development", "enterprise management software"],
    title: "ERP and HRMS software development company",
    description:
      "Custom ERP, HRMS and management software: inventory, purchase, attendance, payroll, approvals and reporting, built around how your company works.",
    h1: "ERP, HRMS and management software built around your business",
    intro: [
      "Off-the-shelf ERP makes you change how you work to fit the software. We build enterprise software the other way round: your departments, roles and approvals become the system, on one shared data core.",
      "Our enterprise work covers ERP for operations and inventory, HRMS for people, attendance and payroll, and management systems for projects, assets and approvals.",
    ],
    build: [
      "ERP modules for purchase, sales, inventory and vendors",
      "HRMS with employee records, attendance, leave and payroll",
      "Approval workflows with a full audit trail",
      "Role-based access by department, branch and action",
      "Dashboards and exportable management reports",
      "Integrations with accounting, biometric devices and existing tools",
    ],
    steps: [
      { name: "Map the business", detail: "Departments, roles, approvals and the reports management actually reads." },
      { name: "Build the core module", detail: "The one workflow that hurts most today, live first." },
      { name: "Connect the rest", detail: "Add modules on the same data, so nothing is entered twice." },
      { name: "Roll out", detail: "Data migration, team training and support after go-live." },
    ],
    why: [
      {
        title: "Fits how you work",
        detail: "Modules follow your process and hierarchy instead of forcing a generic template on every team.",
      },
      {
        title: "One source of truth",
        detail: "Operations, people and finance share one data core, so reports agree across departments.",
      },
      {
        title: "Access done properly",
        detail: "Permissions are enforced on the server for every action, not just hidden in the interface.",
      },
    ],
    proof: ["enterprise-software", "e-bidding-automation", "real-estate-crm"],
    services: ["software-engineering", "digital-transformation"],
    estimateType: "web-app",
    faq: [
      {
        q: "Should we build a custom ERP or buy one?",
        a: "Buy when a standard product fits your process. Build when your workflows, approvals or reporting are what set you apart, or when licences per user get expensive as you grow.",
      },
      {
        q: "Can you migrate data from spreadsheets or our old system?",
        a: "Yes. We map your existing data, clean it and import it, then run both side by side until the team is confident.",
      },
      {
        q: "Can we start with HRMS only and add ERP later?",
        a: "Yes. Each module sits on the same core, so you can start with the one you need most and add the rest later.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    keyword: "custom software development company",
    secondary: ["backend development company", "server and API development", "Node.js backend development"],
    title: "Custom software and backend development company",
    description:
      "Custom software, servers and APIs built to stay correct under load: data models, queues, integrations and cloud hosting. Node.js, PostgreSQL and AWS.",
    h1: "Custom software development, from the server up",
    intro: [
      "Most software problems are backend problems: data that drifts, jobs that run twice, integrations that fail quietly and servers that slow down as users grow. We build custom software with the server, database and APIs designed first, so the product on top stays fast and correct.",
      "Our custom software development work includes the backend of a multi-brand gaming platform with an immutable double-entry ledger, the execution engine of an algo trading platform, and ERP and HRMS systems.",
    ],
    build: [
      "Custom business software and internal tools",
      "Backend servers and REST APIs with OpenAPI docs",
      "Database design on PostgreSQL, MongoDB and Redis",
      "Background jobs and queues with retries",
      "Third-party integrations, webhooks and payment callbacks",
      "Cloud hosting on AWS with monitoring and backups",
    ],
    steps: [
      { name: "Model the data", detail: "Every entity, state and rule, before any screen is designed." },
      { name: "Design the APIs", detail: "One schema that validates input, types the code and documents the API." },
      { name: "Build and test", detail: "Tests against real databases for everything that matters." },
      { name: "Run it", detail: "Deployment, logging, alerts and backups, so you know it is healthy." },
    ],
    why: [
      {
        title: "Correct under load",
        detail: "Idempotency and uniqueness live in the database, so a retried request never creates a duplicate.",
      },
      {
        title: "Built to grow",
        detail:
          "Stateless servers, queues for heavy work and indexed queries, so more users means more servers, not a rewrite.",
      },
      {
        title: "No black boxes",
        detail: "Structured logs, documented APIs and a repository you own from day one.",
      },
    ],
    proof: ["gaming-platform", "algo-trading-platform", "enterprise-software"],
    services: ["software-engineering", "web-product-engineering"],
    estimateType: "web-app",
    faq: [
      {
        q: "Can you take over or fix an existing backend?",
        a: "Yes. We start with a short review of the code, database and hosting, then fix the riskiest problems first before adding features.",
      },
      {
        q: "Which backend stack do you use?",
        a: "Usually Node.js with Fastify or Express, PostgreSQL or MongoDB, Redis for caching and queues, and AWS for hosting, chosen per project.",
      },
      {
        q: "Do you build APIs for mobile apps and partners?",
        a: "Yes. We design versioned REST APIs with authentication, rate limits and OpenAPI documentation that your app and partner teams can build against.",
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
      "We built a Manifest V3 extension for vendors on SAP e-bidding portals: the bid is prepared in advance and saved the instant the bidding window opens, with the vendor still confirming.",
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
        detail: "Our e-bidding extension works on live SAP e-bidding portals where seconds matter.",
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
    proof: ["e-bidding-automation"],
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
    title: "SaaS product development company for startups",
    description:
      "SaaS product development from MVP to scale: accounts, subscriptions, dashboards, admin and APIs, built with React and Node.js. Indicative INR and USD pricing.",
    h1: "SaaS product development, from first version to the product customers pay for",
    intro: [
      "A SaaS product has more moving parts than it looks: accounts and roles, subscriptions and billing, admin tools, reporting and an API, all while staying fast and secure. We design and build all of it, and we keep the first version small enough to launch.",
      "Our own products include a subscription algo trading platform with Starter, Pro and Ultra Pro plans, and a real-time task management SaaS for teams.",
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
        detail: "Our trading platform has plans, billing cycles, plan enforcement and an admin console in production.",
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
    proof: ["algo-trading-platform", "task-management-saas", "learning-platform"],
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
    slug: "gaming-platform-development",
    keyword: "gaming platform development company",
    secondary: ["iGaming software development", "sportsbook software development", "casino platform development"],
    title: "Gaming platform development company",
    description:
      "Gaming platform development with wallets, a double-entry ledger, payments, bonuses and an operator back office, multi-brand from day one. By TechDesk.",
    h1: "Gaming platform development where every balance has to add up",
    intro: [
      "A gaming platform is a money system first. A single bet touches the wallet, the odds, the bonus and the risk rules at the same moment, and players notice the first time a balance is wrong.",
      "We are building the foundation of a multi-brand gaming platform: sportsbook, casino aggregation, instant games, wallet, payments, bonuses, VIP, affiliates and an operator back office, as one configurable codebase.",
    ],
    build: [
      "Player wallets on an immutable double-entry ledger",
      "Sportsbook, casino aggregation and instant games",
      "Payments and provider callbacks that are idempotent and signature-verified",
      "Bonuses, VIP tiers and affiliate tracking",
      "Operator back office with roles and audit logs",
      "Multi-brand, multi-currency configuration from one codebase",
    ],
    steps: [
      { name: "Model the money", detail: "Wallets, currencies and every state a bet or payment can be in." },
      { name: "Build the core", detail: "Ledger, accounts and one game vertical working end to end." },
      { name: "Add verticals", detail: "More games, bonuses and payment methods on the same core." },
      {
        name: "Launch per brand",
        detail: "Brand, currency and market rules set by configuration, not by forking code.",
      },
    ],
    why: [
      {
        title: "Money as integers",
        detail: "Amounts are integer minor units with an explicit currency, and floating-point money is a lint error.",
      },
      {
        title: "Exactly once",
        detail: "Every financial operation is idempotent, enforced by a unique database index, not by hope.",
      },
      {
        title: "Compliance on the server",
        detail: "Market and player rules are enforced server-side and deny by default.",
      },
    ],
    proof: ["gaming-platform", "algo-trading-platform"],
    services: ["software-engineering", "web-product-engineering"],
    estimateType: "web-app",
    faq: [
      {
        q: "Do you provide gaming licences?",
        a: "No. We build the software. Licensing, regulatory approval and the choice of markets stay with you as the operator, and we build the platform to follow those rules.",
      },
      {
        q: "Can one platform run several brands?",
        a: "Yes. Brand, currency and market settings are configuration, so new brands launch without a separate codebase.",
      },
      {
        q: "Can you integrate game and payment providers?",
        a: "Yes. Provider integrations sit behind adapters, with signed, replay-protected and idempotent callbacks.",
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
        detail: "The same engineers built our algo trading, ERP and HRMS, e-bidding and gaming platforms.",
      },
    ],
    proof: ["algo-trading-platform", "enterprise-software", "gaming-platform"],
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
      "Fintech software built to be correct first: trading platforms, marketplaces with KYC, ledgers and analytics, from a team with live fintech systems.",
    h1: "Fintech software development where every number has to be right",
    intro: [
      "Financial software is judged on correctness. Money must never be lost to a rounding error, an order must never fire twice, and every sensitive action must leave an audit trail. We build with those rules enforced in code and in the database.",
      "Our fintech work includes a live algo trading platform, payroll inside our HRMS, a multi-brand platform foundation with a double-entry ledger, and a financial analytics tool.",
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
          "In our gaming platform, money is bigint minor units with an explicit currency, and floats on money are a lint error.",
      },
      {
        title: "Trust built in",
        detail:
          "Our trading platform ships consent records and audit logs as core features, and our ERP and HRMS keep an audit trail on every approval.",
      },
      {
        title: "Compliance-aware engineering",
        detail: "Server-side, deny-by-default rules, never hidden only in the interface.",
      },
    ],
    proof: ["algo-trading-platform", "gaming-platform", "financial-analytics", "enterprise-software"],
    services: ["software-engineering", "web-product-engineering"],
    estimateType: "web-app",
    faq: [
      {
        q: "Do you handle KYC integrations?",
        a: "Yes. We integrate KYC and identity providers (for example Aadhaar-based verification) inside onboarding, so users are verified before they can transact.",
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
      "ERP, HRMS and internal business software",
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
        detail:
          "The same team built platforms such as an algo trading platform and ERP and HRMS software, used beyond Indore.",
      },
      { title: "Clear pricing in rupees", detail: "Indicative INR ranges for every kind of project, before we meet." },
    ],
    proof: ["algo-trading-platform", "enterprise-software", "e-bidding-automation"],
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
