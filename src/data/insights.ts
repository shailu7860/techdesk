// Long-form guides targeting high-volume informational queries (research: docs/SEO_KEYWORDS.md).
// All prices come from pricing.ts (the owner's indicative bands); no invented market statistics.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "cta"; text: string; href: string; label: string };

export const categories = ["Cost guides", "AI and automation", "Product and process"] as const;

export type Insight = {
  slug: string;
  category: (typeof categories)[number];
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
    category: "Cost guides",
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
    category: "Cost guides",
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
  {
    slug: "website-development-cost-india",
    category: "Cost guides",
    keyword: "website development cost in India",
    title: "Website development cost in India in 2026",
    description:
      "What a business website costs in India and worldwide in 2026: indicative INR and USD ranges by scope, what changes the price and what to ask before you pay.",
    h1: "How much does website development cost in India in 2026?",
    published: "2026-09-27",
    readMinutes: 6,
    summary:
      "A focused business website or landing experience typically costs ₹40k to ₹1.2L in India or $1.2k to $3.5k worldwide. A full website with a CMS, custom design, integrations and multiple languages costs ₹1.2L to ₹3L or $3.5k to $8k. Large, content-heavy or high-traffic sites start from ₹3L or $8k. These are indicative ranges from our own pricing.",
    body: [
      { type: "h2", text: "Website cost by scope" },
      {
        type: "table",
        caption: "Indicative website development cost by scope (before add-ons)",
        head: ["Scope", "Typical example", "India (INR)", "Worldwide (USD)"],
        rows: [
          ["Focused", "Landing page or 5 to 8 page business site", "₹40k – ₹1.2L", "$1.2k – $3.5k"],
          ["Full website", "CMS, custom design, blog, forms and integrations", "₹1.2L – ₹3L", "$3.5k – $8k"],
          ["Large site", "Many templates, languages, heavy content or traffic", "From ₹3L", "From $8k"],
        ],
      },
      { type: "h2", text: "What changes the price of a website" },
      {
        type: "list",
        items: [
          "Custom design versus a clean standard layout.",
          "Number of unique page templates, not the number of pages.",
          "A CMS so your team can publish without a developer.",
          "Integrations: CRM, booking, payments, WhatsApp and analytics.",
          "Motion and interactive elements, which need extra care for speed and accessibility.",
          "Content: whether you supply copy and photos or need them written and produced.",
        ],
      },
      { type: "h2", text: "What a good website should include at any budget" },
      {
        type: "list",
        items: [
          "Fast loading on mobile networks, measured with Core Web Vitals.",
          "Technical SEO: titles, descriptions, structured data, a sitemap and clean URLs.",
          "Accessibility to WCAG 2.2 AA, so everyone can use it and read it.",
          "A clear way to contact you on every page.",
          "Your own hosting and domain accounts, so you are never locked in.",
        ],
      },
      { type: "h2", text: "Questions to ask before you pay" },
      {
        type: "list",
        items: [
          "Who owns the code, design files and accounts after launch?",
          "What happens if I need changes after launch, and what do they cost?",
          "Will I be able to edit the content myself?",
          "How will you measure speed and SEO before handover?",
        ],
      },
      {
        type: "cta",
        text: "See an indicative range for your website in INR or USD.",
        href: "/contact?type=website#estimate",
        label: "Estimate my website",
      },
    ],
    faq: [
      {
        q: "How long does it take to build a business website?",
        a: "A focused business site usually takes 2 to 4 weeks. A full website with a CMS and integrations usually takes 4 to 8 weeks.",
      },
      {
        q: "Is a website builder cheaper than a custom website?",
        a: "Upfront, often yes. A custom site usually wins on speed, SEO control and flexibility once the site matters to your business.",
      },
      {
        q: "Does a website have monthly costs?",
        a: "Hosting, the domain and any paid tools such as a CMS or forms. For a static business site these are usually small.",
      },
    ],
    related: ["software-development-company-indore", "saas-development-company"],
  },
  {
    slug: "chrome-extension-development-cost",
    category: "Cost guides",
    keyword: "chrome extension development cost",
    title: "Chrome extension development cost in 2026",
    description:
      "How much does it cost to build a Chrome extension? Indicative INR and USD ranges, what drives the price, Chrome Web Store review and a realistic timeline.",
    h1: "How much does it cost to build a Chrome extension?",
    published: "2026-09-26",
    readMinutes: 6,
    summary:
      "A focused Chrome extension that automates one task on one site typically costs ₹50k to ₹1.5L in India or $1.5k to $4k worldwide. A full extension with accounts, a backend and several workflows costs ₹1.5L to ₹4L or $4k to $10k. Extension platforms used across teams start from ₹4L or $10k. These are indicative ranges from our own pricing.",
    body: [
      { type: "h2", text: "Chrome extension cost by scope" },
      {
        type: "table",
        caption: "Indicative Chrome extension development cost by scope (before add-ons)",
        head: ["Scope", "Typical example", "India (INR)", "Worldwide (USD)"],
        rows: [
          ["Focused", "One task on one site: fill forms, extract data, add a button", "₹50k – ₹1.5L", "$1.5k – $4k"],
          ["Full extension", "Accounts, backend sync, settings, several workflows", "₹1.5L – ₹4L", "$4k – $10k"],
          ["Platform", "Team roles, admin dashboard, audit logs, many sites", "From ₹4L", "From $10k"],
        ],
      },
      { type: "h2", text: "What drives the cost of an extension" },
      {
        type: "list",
        items: [
          "How many websites it works on: every site has its own page structure to handle.",
          "Whether it needs a backend for accounts, sync or shared data.",
          "How often the target sites change, which sets the maintenance you will need.",
          "Permissions: the fewer it asks for, the easier the store review and the more users trust it.",
          "Browsers: Chrome, Edge and Brave share one codebase; Firefox and Safari need extra work.",
        ],
      },
      { type: "h2", text: "Chrome Web Store review and Manifest V3" },
      {
        type: "p",
        text: "New extensions are built on Manifest V3, the current Chrome platform. Every public extension goes through Chrome Web Store review, which checks permissions, privacy disclosures and a clear single purpose. Internal tools can be published privately to your organisation instead. We plan permissions and the privacy policy from day one so review is not a surprise at the end.",
      },
      { type: "h2", text: "How long does it take to build a Chrome extension?" },
      {
        type: "p",
        text: "A focused extension usually takes 2 to 4 weeks, plus store review. A full extension with a backend usually takes 6 to 10 weeks. You get a working build to install every week.",
      },
      {
        type: "cta",
        text: "Get an indicative range for your extension in under a minute.",
        href: "/contact?type=extension#estimate",
        label: "Estimate my extension",
      },
    ],
    faq: [
      {
        q: "Can a Chrome extension work on Edge too?",
        a: "Yes. Edge, Brave and other Chromium browsers run the same extension with little or no change.",
      },
      {
        q: "Do I need a server for my Chrome extension?",
        a: "Only if it needs accounts, shared data across devices or heavy processing. Many useful extensions run entirely in the browser.",
      },
      {
        q: "What does it cost to maintain an extension?",
        a: "Mostly updates when the sites it works on change their layout, plus Chrome platform updates. We quote this as a small monthly plan.",
      },
    ],
    related: ["chrome-extension-development"],
  },
  {
    slug: "whatsapp-ai-agent-guide",
    category: "AI and automation",
    keyword: "WhatsApp AI agent for business",
    title: "How to automate WhatsApp with an AI agent",
    description:
      "How to automate WhatsApp for your business with an AI agent: what it can handle, what you need, how to launch safely and when a person should take over.",
    h1: "How to automate WhatsApp for your business with an AI agent",
    published: "2026-09-24",
    readMinutes: 8,
    summary:
      "A WhatsApp AI agent answers customers, qualifies leads and books appointments on the official WhatsApp Business Platform, using your own content and tools. You need a verified business number, clear rules for what the agent may do, and a simple way for a person to take over. Start with one workflow, launch with a person reviewing, then widen what it handles week by week.",
    body: [
      { type: "h2", text: "What a WhatsApp AI agent can handle" },
      {
        type: "list",
        items: [
          "Answering product, pricing and policy questions from your own documents.",
          "Qualifying leads with a few questions and sending them to your CRM.",
          "Booking, rescheduling and reminding customers of appointments.",
          "Order and delivery status from your system.",
          "Collecting documents or details before a person follows up.",
        ],
      },
      { type: "h2", text: "What you need before you start" },
      {
        type: "list",
        items: [
          "A phone number for the WhatsApp Business Platform (it cannot also be used in the regular WhatsApp app).",
          "A verified Meta business account.",
          "Approved message templates for messages you send first, such as reminders.",
          "The content the agent will answer from: FAQs, price lists, policies.",
          "A named person or team who takes over when the agent should not decide.",
        ],
      },
      { type: "h2", text: "How to launch safely" },
      {
        type: "list",
        items: [
          "Write down what the agent may and may not do, including topics it must hand off.",
          "Test with real past questions before any customer sees it.",
          "Launch to a small share of conversations with a person reviewing replies.",
          "Read transcripts every week and fix wrong or weak answers at the source.",
          "Log every conversation and respect opt-outs and data retention rules.",
        ],
      },
      { type: "h2", text: "When a person should take over" },
      {
        type: "p",
        text: "Good agents know their limits. Hand off on complaints, refunds, anything legal or medical, a customer who asks for a person, or when the agent is not confident in its answer. The handoff should carry the full conversation, so the customer never repeats themselves.",
      },
      {
        type: "cta",
        text: "Planning a WhatsApp agent? Get an indicative range for your scope.",
        href: "/contact?type=ai#estimate",
        label: "Estimate my agent",
      },
    ],
    faq: [
      {
        q: "Is it allowed to use AI on WhatsApp for business?",
        a: "Yes, through the official WhatsApp Business Platform, following Meta's policies on templates, opt-in and message types.",
      },
      {
        q: "Can the agent reply in Hindi and other languages?",
        a: "Yes. Modern models handle Hindi, Hinglish and many other languages; we test each language with real questions before launch.",
      },
      {
        q: "How much does a WhatsApp AI agent cost?",
        a: "A focused agent for one workflow starts at an indicative ₹75k or $2k to build, plus WhatsApp platform fees and model usage each month.",
      },
    ],
    related: ["whatsapp-ai-agent-development", "hire-developers-india"],
  },
  {
    slug: "how-to-build-an-mvp",
    category: "Product and process",
    keyword: "how to build an MVP",
    title: "How to build an MVP in six weeks",
    description:
      "A week-by-week plan to build and launch a software MVP in six weeks: choosing the one workflow, scoping, weekly releases, launch and what to measure after.",
    h1: "How to build an MVP in six weeks",
    published: "2026-09-22",
    readMinutes: 7,
    summary:
      "Pick the one workflow customers will pay for, write it down as a short scope, and build it in weekly releases you can click. Six weeks is realistic for a focused MVP: one week to scope and design, four weeks to build and test, one week to launch. Everything that is not needed to prove that one workflow waits for version two.",
    body: [
      { type: "h2", text: "Week 1: choose the one workflow" },
      {
        type: "p",
        text: "Write one sentence: who the user is, what they do in the product and why they would pay for it. Then list the screens that workflow needs and nothing else. A clickable prototype at the end of the week lets you test the idea with a few real users before a line of production code.",
      },
      { type: "h2", text: "Weeks 2 to 5: build in weekly releases" },
      {
        type: "list",
        items: [
          "Every week ends with a working build you can use, not a status report.",
          "Use proven building blocks for sign-in, payments and email.",
          "Keep one list of what is in and out of scope, and move ideas to version two freely.",
          "Test on real phones and slow networks, not only a fast laptop.",
        ],
      },
      { type: "h2", text: "Week 6: launch" },
      {
        type: "list",
        items: [
          "Analytics on the steps of the core workflow, so you see where people drop off.",
          "Error monitoring, so you hear about problems before customers tell you.",
          "A simple way for early users to reach you directly.",
          "Backups and access to all accounts in your name.",
        ],
      },
      { type: "h2", text: "What to measure after launch" },
      {
        type: "p",
        text: "Measure whether people complete the core workflow and come back to do it again. Those two numbers tell you more than sign-ups. Talk to the first users every week and let what they do, not what they say, decide version two.",
      },
      {
        type: "cta",
        text: "Have an MVP in mind? See an indicative range in INR or USD.",
        href: "/contact?type=web-app#estimate",
        label: "Estimate my MVP",
      },
    ],
    faq: [
      {
        q: "Can an MVP really be built in six weeks?",
        a: "A focused MVP with one core workflow, yes. Products with several user types or complex integrations take longer.",
      },
      {
        q: "Should my MVP be a web app or a mobile app?",
        a: "Usually a responsive web app first. It is faster to build, works on every phone and is easy to update daily.",
      },
      {
        q: "What does an MVP cost?",
        a: "A focused SaaS MVP typically costs an indicative ₹1.5L to ₹4L in India or $3k to $8k worldwide.",
      },
    ],
    related: ["saas-development-company", "marketplace-development"],
  },
  {
    slug: "hire-software-developers-india-guide",
    category: "Product and process",
    keyword: "how to hire software developers in India",
    title: "How to hire software developers in India",
    description:
      "A practical checklist for hiring a software team in India: engagement models, how to evaluate a team, contracts, IP ownership and working across time zones.",
    h1: "How to hire software developers in India: a practical checklist",
    published: "2026-09-20",
    readMinutes: 7,
    summary:
      "Decide first whether you need a fixed-scope project or an ongoing team. Evaluate teams on shipped work you can see, how they communicate and how they test, not on hourly rate alone. Put IP ownership, code access and a notice period in writing, and agree a weekly rhythm with a demo you can click.",
    body: [
      { type: "h2", text: "Choose the right engagement model" },
      {
        type: "table",
        caption: "Common ways to work with a development team in India",
        head: ["Model", "Best for", "How you pay"],
        rows: [
          ["Fixed-scope project", "A clear product or feature with a defined end", "Fixed price, in milestones"],
          ["Dedicated team", "An ongoing roadmap that changes month to month", "Monthly, per engineer"],
          ["Discovery sprint", "An idea or process that still needs shaping", "Fixed price, one to two weeks"],
        ],
      },
      { type: "h2", text: "How to evaluate a development team" },
      {
        type: "list",
        items: [
          "Ask to see working products they built, and what exactly their role was.",
          "Talk to the engineers who will build yours, not only the salesperson.",
          "Ask how they test, deploy and monitor, and what happens when something breaks.",
          "Give a small paid task or a scoping session before a large commitment.",
          "Check how quickly and clearly they reply during the sales process.",
        ],
      },
      { type: "h2", text: "What to put in the contract" },
      {
        type: "list",
        items: [
          "You own the code, designs and IP on payment.",
          "Code lives in a repository you own from day one.",
          "Cloud, domain and third-party accounts are in your name.",
          "A clear notice period and a handover process.",
          "Confidentiality and data protection terms.",
        ],
      },
      { type: "h2", text: "Working across time zones" },
      {
        type: "p",
        text: "India overlaps with European mornings and with US East Coast evenings or mornings, depending on the season. Agree a fixed daily overlap window, a weekly demo, and written updates for everything else. Async by default, a call when it saves time.",
      },
      {
        type: "cta",
        text: "Looking for a team? Tell us what you are building.",
        href: "/contact",
        label: "Start a conversation",
      },
    ],
    faq: [
      {
        q: "Is it safe to outsource software development to India?",
        a: "Yes, with the right contract and setup: IP assigned to you, code and accounts in your name, and weekly working builds you can check.",
      },
      {
        q: "Freelancer or agency?",
        a: "A freelancer can suit a small, well-defined task. An agency gives you design, engineering, testing and cover for holidays and illness.",
      },
      {
        q: "How do I pay a team in India from abroad?",
        a: "Usually by international bank transfer or a payment platform, invoiced in USD or your currency against agreed milestones.",
      },
    ],
    related: ["hire-developers-india", "software-development-company-indore"],
  },
];

// Newest first (ISO dates sort as strings).
export const latestInsights = [...insights].sort((a, b) => b.published.localeCompare(a.published));

export const getInsight = (slug: string | undefined) => insights.find((i) => i.slug === slug);
