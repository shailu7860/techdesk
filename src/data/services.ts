export type ServiceSlug =
  | "web-product-engineering"
  | "ai-automation"
  | "software-engineering"
  | "digital-marketing"
  | "digital-transformation";

export type Service = {
  slug: ServiceSlug;
  code: string;
  name: string;
  /** Outcome-first headline (spec §2 Objective 4). */
  outcome: string;
  summary: string;
  capabilities: string[];
  stack: string[];
  /** Which diagram the services panel draws. */
  visual: "platform" | "agent" | "systems" | "growth" | "transform";
  /** Pre-selected project type in the quote calculator (pricing.ts id). */
  estimateType: string;
};

export const services: Service[] = [
  {
    slug: "web-product-engineering",
    code: "01",
    name: "Web & Product Engineering",
    outcome: "High-performance web applications built for scale.",
    summary:
      "SaaS platforms, dashboards, marketplaces and e-commerce, from the first MVP to the version your customers pay for.",
    capabilities: [
      "Custom web applications",
      "SaaS platforms",
      "Enterprise applications",
      "Dashboards and admin tools",
      "E-commerce",
      "Progressive web apps",
      "React and Next.js",
      "API development",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"],
    visual: "platform",
    estimateType: "web-app",
  },
  {
    slug: "ai-automation",
    code: "02",
    name: "AI & Intelligent Automation",
    outcome: "Intelligent AI agents that automate real business workflows.",
    summary:
      "Agents that read, decide and act inside your tools: support, sales qualification, document processing and research, with a human in the loop where it matters.",
    capabilities: [
      "AI agents and agentic workflows",
      "AI chatbots",
      "RAG and AI search",
      "Document processing",
      "LLM integrations with provider failover",
      "Business process automation",
      "AI-powered SaaS features",
    ],
    stack: ["Claude", "Groq", "OpenAI-compatible APIs", "Vector search", "Node.js", "Python"],
    visual: "agent",
    estimateType: "ai",
  },
  {
    slug: "software-engineering",
    code: "03",
    name: "Software Engineering",
    outcome: "Backends, APIs and integrations that hold up under real load.",
    summary:
      "The part users never see and always feel: data models, ledgers, queues, integrations and the architecture that keeps them correct.",
    capabilities: [
      "Custom software",
      "Backend systems",
      "API architecture",
      "Database architecture",
      "Cloud applications",
      "Microservices, when they earn it",
      "System and third-party integrations",
    ],
    stack: ["Node.js", "Fastify", "Express", "PostgreSQL", "Redis", "AWS"],
    visual: "systems",
    estimateType: "web-app",
  },
  {
    slug: "digital-marketing",
    code: "04",
    name: "Digital Marketing",
    outcome: "Search visibility and campaigns that turn traffic into qualified leads.",
    summary:
      "Technical SEO, content and performance campaigns measured against leads, not vanity numbers, built by people who can also fix the site.",
    capabilities: [
      "SEO and technical SEO",
      "Search marketing",
      "Content strategy",
      "Social media",
      "Performance marketing",
      "Conversion optimisation",
      "Analytics",
      "Marketing automation",
    ],
    stack: ["Search Console", "Google Ads", "Meta Ads", "Analytics", "Structured data"],
    visual: "growth",
    estimateType: "marketing",
  },
  {
    slug: "digital-transformation",
    code: "05",
    name: "Product & Digital Transformation",
    outcome: "From manual processes to software your team actually uses.",
    summary:
      "Product strategy, MVPs, legacy modernisation and internal tools: the spreadsheets and paper trails replaced by systems that fit how you work.",
    capabilities: [
      "Product strategy",
      "MVP development",
      "Legacy modernisation",
      "Workflow automation",
      "Internal business tools",
      "Process digitisation",
    ],
    stack: ["Discovery workshops", "Prototyping", "React", "Node.js", "Automation platforms"],
    visual: "transform",
    estimateType: "web-app",
  },
];

export const getService = (slug: string | undefined) => services.find((s) => s.slug === slug);
