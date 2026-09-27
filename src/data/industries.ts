import type { IndustryKey } from "./projects";
import type { ServiceSlug } from "./services";

export type Industry = {
  key: IndustryKey;
  name: string;
  /** A realistic solution, grounded in work we have actually shipped. */
  example: string;
  services: ServiceSlug[];
  /** Related project slug from projects.ts. */
  project: string;
};

// Only industries backed by real work (homepage brief §5, section 6).
export const industries: Industry[] = [
  {
    key: "fintech",
    name: "Fintech",
    example: "Trading automation with paper-first safety, broker integrations and an AI research layer.",
    services: ["ai-automation", "software-engineering"],
    project: "algo-trading-platform",
  },
  {
    key: "marketplaces",
    name: "Marketplaces",
    example:
      "A business exchange with mandates, auctions, watchlists and identity verification built into the deal flow.",
    services: ["web-product-engineering", "software-engineering"],
    project: "business-exchange-platform",
  },
  {
    key: "enterprise",
    name: "Enterprise & procurement",
    example: "Browser automation that prepares vendor bids ahead of time and saves them the instant the window opens.",
    services: ["ai-automation", "digital-transformation"],
    project: "e-bidding-automation",
  },
  {
    key: "gaming",
    name: "Gaming",
    example:
      "A multi-brand platform foundation with a double-entry ledger, idempotent money movement and deny-by-default compliance.",
    services: ["software-engineering"],
    project: "gaming-platform",
  },
  {
    key: "ecommerce",
    name: "E-commerce",
    example: "Storefront, payments, inventory and an admin dashboard in one system.",
    services: ["web-product-engineering", "digital-marketing"],
    project: "ecommerce-platform",
  },
  {
    key: "healthcare",
    name: "Healthcare",
    example: "Appointment scheduling, patient records and telemedicine video in one dashboard.",
    services: ["web-product-engineering", "digital-transformation"],
    project: "healthcare-dashboard",
  },
  {
    key: "education",
    name: "Education",
    example: "Course creation, progress tracking and live classes with community features.",
    services: ["web-product-engineering"],
    project: "learning-platform",
  },
  {
    key: "real-estate",
    name: "Real estate",
    example: "A CRM for agents: leads, properties on a map and automated follow-ups.",
    services: ["web-product-engineering", "digital-transformation"],
    project: "real-estate-crm",
  },
];
