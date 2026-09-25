// Long-form guides targeting high-volume informational queries (research: docs/SEO_KEYWORDS.md).
// All prices come from pricing.ts (the owner's indicative bands); no invented market statistics.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "cta"; text: string; href: string; label: string };

export type Insight = {
  slug: string;
  keyword: string;
  title: string; // ≤ 50 chars, brand appended
  description: string; // ≤ 160 chars
  h1: string;
  published: string; // ISO date
  readMinutes: number;
  summary: string; // the short answer, shown first (featured-snippet friendly)
  body: Block[];
  faq: { q: string; a: string }[];
  related: string[]; // solution slugs
};

export const insights: Insight[] = [
  {
    slug: "ai-agent-development-cost",
    keyword: "AI agent development cost",
    title: "AI agent development cost in 2026",
    description:
      "How much does it cost to build an AI agent in 2026? Real INR and USD price ranges by agent type, what drives the cost, running costs and how to spend less.",
    h1: "How much does it cost to build an AI agent in 2026?",
    published: "2026-09-25",
    readMinutes: 7,
    summary:
      "A focused AI agent that handles one workflow (for example answering customers or qualifying leads on WhatsApp) typically costs ₹75k to ₹2.5L in India or $2k to $6k for clients worldwide. A complete agent product with integrations, admin and several workflows costs ₹2.5L to ₹8L or $6k to $18k. Multi-agent platforms at enterprise scale start from ₹8L or $18k. These are indicative ranges from our own pricing; the real number depends on scope.",
    body: [
      { type: "h2", text: "AI agent cost by type" },
      {
        type: "table",
        caption: "Indicative AI agent development cost by scope (before add-ons)",
        head: ["Agent scope", "Typical example", "India (INR)", "Worldwide (USD)"],
        rows: [
          ["Focused agent", "One workflow: FAQ answering, lead qualification or booking", "₹75k – ₹2.5L", "$2k – $6k"],
          [
            "Full agent product",
            "Several workflows, CRM and calendar integration, admin, analytics",
            "₹2.5L – ₹8L",
            "$6k – $18k",
          ],
          ["Agent platform", "Multiple agents, user roles, compliance, custom data pipelines", "From ₹8L", "From $18k"],
        ],
      },
      {
        type: "p",
        text: "Published agency guides for the US and European market often quote five- and six-figure dollar sums for similar scopes. The difference usually comes from team location and overheads, not from a different kind of engineering: the same model providers, the same tools and the same testing apply.",
      },
      { type: "h2", text: "What drives the cost of an AI agent" },
      {
        type: "list",
        items: [
          "Number of workflows: an agent that books appointments is smaller than one that also handles refunds, orders and complaints.",
          "Integrations: every tool the agent reads from or acts in (CRM, calendar, database, payment system) adds build and testing time.",
          "Your data: answering from documents needs retrieval (RAG) and clean, current source content.",
          "Channels: WhatsApp, website chat, email and voice each have their own setup and rules.",
          "Human handoff: rules for when a person takes over, and the tools your team uses to do it.",
          "Reliability: timeouts, fallback between model providers and monitoring, so one outage does not stop the agent.",
          "Compliance: consent, audit logs, data retention and access control for regulated industries.",
        ],
      },
      { type: "h2", text: "Running costs after launch" },
      {
        type: "p",
        text: "An AI agent also has running costs: model usage (charged by the provider per amount of text processed), hosting, the WhatsApp Business Platform or other channel fees, and monitoring. For a low-volume agent these are usually small next to the build cost; for high-volume agents they grow with every conversation, so we design prompts and model choices to keep usage efficient.",
      },
      {
        type: "list",
        items: [
          "Choose the smallest model that does the job, and a larger one only for the hard steps.",
          "Answer common questions from your own data instead of long model calls.",
          "Cap message length and conversation turns so costs stay predictable.",
          "Keep two model providers configured, so pricing or outages at one never block you.",
        ],
      },
      { type: "h2", text: "How to reduce the cost of your first AI agent" },
      {
        type: "list",
        items: [
          "Start with one workflow that already costs your team hours every week.",
          "Use the channels and tools you already have instead of new platforms.",
          "Keep a person in the loop for decisions that matter, and automate the rest.",
          "Launch, read real transcripts, and improve weekly rather than designing everything upfront.",
        ],
      },
      { type: "h2", text: "How long does it take to build an AI agent?" },
      {
        type: "p",
        text: "A focused agent for one workflow usually takes 2 to 4 weeks including testing. A full agent product with several integrations usually takes 2 to 3 months. We show a working version every week, so you see progress long before launch.",
      },
      {
        type: "cta",
        text: "Get an indicative range for your own agent in under a minute.",
        href: "/contact?type=ai#estimate",
        label: "Estimate my AI agent",
      },
    ],
    faq: [
      {
        q: "What is the cheapest way to build an AI agent?",
        a: "Start with one workflow on a channel you already use, answer from your own data, and keep a person in the loop for exceptions. A focused agent like this starts at an indicative ₹75k or $2k.",
      },
      {
        q: "Is it cheaper to build an AI agent in India?",
        a: "Usually yes, because team costs are lower, while the models, tools and engineering practices are the same as anywhere else.",
      },
      {
        q: "Do AI agents have monthly costs?",
        a: "Yes: model usage, hosting, channel fees such as the WhatsApp Business Platform, and maintenance. For low-volume agents these are usually small compared with the build.",
      },
    ],
    related: ["whatsapp-ai-agent-development", "hire-developers-india"],
  },
  {
    slug: "saas-development-cost",
    keyword: "cost to build a SaaS platform",
    title: "Cost to build a SaaS platform in 2026",
    description:
      "How much does it cost to build a SaaS platform in India and worldwide? Indicative ranges by stage, what drives the cost, hidden costs and a realistic timeline.",
    h1: "How much does it cost to build a SaaS platform in 2026?",
    published: "2026-09-25",
    readMinutes: 7,
    summary:
      "A focused SaaS MVP (one core workflow, accounts and basic admin) typically costs ₹1.5L to ₹4L in India or $3k to $8k worldwide. A full SaaS product with roles, subscriptions, integrations and reporting costs ₹4L to ₹12L or $8k to $25k. Platforms with multiple user types and enterprise requirements start from ₹12L or $25k. These are indicative ranges from our own pricing.",
    body: [
      { type: "h2", text: "SaaS development cost by stage" },
      {
        type: "table",
        caption: "Indicative SaaS development cost by stage (before add-ons)",
        head: ["Stage", "What is included", "India (INR)", "Worldwide (USD)"],
        rows: [
          ["MVP", "One core workflow, accounts, basic admin, deployment", "₹1.5L – ₹4L", "$3k – $8k"],
          [
            "Full product",
            "Roles, subscriptions and billing, integrations, reporting, admin",
            "₹4L – ₹12L",
            "$8k – $25k",
          ],
          ["Platform", "Multiple user types, heavy integrations, enterprise security", "From ₹12L", "From $25k"],
        ],
      },
      { type: "h2", text: "What drives the cost of a SaaS product" },
      {
        type: "list",
        items: [
          "Number of user types: an app for one kind of user is far smaller than one for customers, staff and admins.",
          "Subscriptions and billing: plans, trials, upgrades and feature limits add real logic.",
          "Integrations: payments, email, CRMs and third-party APIs each need building and testing.",
          "Real-time features: live updates, chat and notifications add infrastructure.",
          "Data and reporting: dashboards and exports that customers rely on.",
          "Security and compliance: roles, audit logs and data protection for business customers.",
          "Custom design: a bespoke interface costs more than a clean, standard one, and is often worth it for SaaS.",
        ],
      },
      { type: "h2", text: "Costs founders often miss" },
      {
        type: "list",
        items: [
          "Hosting, databases, email delivery and monitoring every month.",
          "Maintenance and updates after launch: security patches, library updates and small fixes.",
          "Payment provider fees on every subscription.",
          "Onboarding, help content and support tools for your first customers.",
        ],
      },
      { type: "h2", text: "How long does it take to build a SaaS platform?" },
      {
        type: "p",
        text: "A focused MVP usually takes 3 to 6 weeks. A full product with accounts, subscriptions, admin and integrations usually takes 2 to 4 months. Working in weekly releases means you can put the MVP in front of customers early and let their feedback shape the next version.",
      },
      { type: "h2", text: "How to spend less and launch sooner" },
      {
        type: "list",
        items: [
          "Launch the one workflow customers will pay for, not the full vision.",
          "Use proven building blocks for authentication, payments and email.",
          "Design for growth without building for scale you do not have yet.",
          "Own your code and infrastructure accounts from day one, so you are never locked in.",
        ],
      },
      {
        type: "cta",
        text: "See an indicative range for your SaaS in INR or USD.",
        href: "/contact?type=web-app#estimate",
        label: "Estimate my SaaS",
      },
    ],
    faq: [
      {
        q: "How much does a SaaS MVP cost in India?",
        a: "A focused SaaS MVP typically costs ₹1.5L to ₹4L with an India-based team, depending on scope.",
      },
      {
        q: "Should I build my SaaS MVP with no-code tools?",
        a: "No-code is fine to validate demand. Once customers pay, custom code usually wins on performance, cost at scale and ownership.",
      },
      {
        q: "What does a SaaS cost to run every month?",
        a: "Hosting, database, email, monitoring and payment fees. For an early-stage SaaS these are usually modest and grow with customers.",
      },
    ],
    related: ["saas-development-company", "hire-developers-india"],
  },
];

export const getInsight = (slug: string | undefined) => insights.find((i) => i.slug === slug);
