// Delegated by the owner on 2026-09-23 ("decide yourself, but best"). Edit freely.
export const commitments = [
  { title: "You own everything", detail: "Code, designs, IP and repository access from day one." },
  { title: "Working software every week", detail: "Live demo builds you can click, not status reports." },
  { title: "Talk to the people building it", detail: "A direct line to the engineers on WhatsApp." },
  { title: "Estimate before commitment", detail: "Written scope and a price range before any invoice." },
] as const;

export const site = {
  name: "TechDesk",
  tagline: "We engineer digital systems for what's next.",
  description:
    "TechDesk engineers AI agents, software platforms, intelligent automation and high-performance digital experiences for ambitious businesses. Indore, India, serving clients worldwide.",
} as const;

// Engagement models (delegated by the owner). Prices live in pricing.ts; these describe how we work together.
export const engagements = [
  {
    name: "Fixed-scope project",
    fit: "You know what you need built.",
    points: ["Written scope and fixed price", "Weekly demo builds", "Launch, handover and 30 days of fixes"],
  },
  {
    name: "Dedicated team",
    fit: "You have an ongoing roadmap.",
    points: [
      "Engineers who work on your product each month",
      "Flexible priorities, planned weekly",
      "Scale up or down with notice",
    ],
  },
  {
    name: "Discovery sprint",
    fit: "You have an idea or a messy process to untangle.",
    points: [
      "One to two weeks",
      "Problem map, architecture and clickable prototype",
      "A costed plan you can take anywhere",
    ],
  },
] as const;

// Grouped from the stacks of our real projects (projects.ts).
export const stackGroups = [
  { layer: "Frontend", items: ["React", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "Material UI"] },
  { layer: "Backend", items: ["Node.js", "Fastify", "Express", "Socket.io", "BullMQ", "REST and OpenAPI"] },
  { layer: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Drizzle", "D3.js"] },
  { layer: "AI", items: ["Claude", "Groq", "OpenAI-compatible APIs", "Provider failover", "On-device OCR"] },
  { layer: "Cloud and delivery", items: ["AWS", "AWS Amplify", "Lambda", "S3", "Chrome extensions"] },
] as const;

export const strengths = [
  {
    title: "Products that handle money and trust",
    detail: "Ledgers, KYC, consent and audit logs, built to be correct first (Stratos, Biexor, 1Bull).",
  },
  {
    title: "AI that stays up",
    detail:
      "Multi-provider model layers with timeouts, fallbacks and cooldowns, so one outage does not stop the feature.",
  },
  {
    title: "Automation around real workflows",
    detail: "From browser extensions that save seconds in live bidding to agents that qualify leads overnight.",
  },
] as const;
