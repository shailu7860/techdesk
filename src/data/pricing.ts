// Indicative price bands. Delegated by the owner 2026-09-23; see docs/DISCOVERY.md.
// Priced per market (INR for India, USD elsewhere), not FX-converted.
export type Currency = "INR" | "USD";
export type Band = { min: number; max: number | null }; // max null = "from"

export type ProjectType = {
  id: string;
  name: string;
  perMonth?: true;
  bands: Record<"small" | "medium" | "large", Record<Currency, Band>>;
};

const b = (min: number, max: number | null): Band => ({ min, max });

export const projectTypes: ProjectType[] = [
  {
    id: "website",
    name: "Website / landing experience",
    bands: {
      small: { INR: b(40_000, 120_000), USD: b(1_200, 3_500) },
      medium: { INR: b(120_000, 300_000), USD: b(3_500, 8_000) },
      large: { INR: b(300_000, null), USD: b(8_000, null) },
    },
  },
  {
    id: "web-app",
    name: "Web app / SaaS platform",
    bands: {
      small: { INR: b(150_000, 400_000), USD: b(3_000, 8_000) },
      medium: { INR: b(400_000, 1_200_000), USD: b(8_000, 25_000) },
      large: { INR: b(1_200_000, null), USD: b(25_000, null) },
    },
  },
  {
    id: "ai",
    name: "AI agent / chatbot / automation",
    bands: {
      small: { INR: b(75_000, 250_000), USD: b(2_000, 6_000) },
      medium: { INR: b(250_000, 800_000), USD: b(6_000, 18_000) },
      large: { INR: b(800_000, null), USD: b(18_000, null) },
    },
  },
  {
    id: "extension",
    name: "Browser extension / internal tool",
    bands: {
      small: { INR: b(50_000, 150_000), USD: b(1_500, 4_000) },
      medium: { INR: b(150_000, 400_000), USD: b(4_000, 10_000) },
      large: { INR: b(400_000, null), USD: b(10_000, null) },
    },
  },
  {
    id: "marketing",
    name: "Digital marketing",
    perMonth: true,
    bands: {
      small: { INR: b(25_000, 60_000), USD: b(800, 2_000) },
      medium: { INR: b(60_000, 150_000), USD: b(2_000, 5_000) },
      large: { INR: b(150_000, null), USD: b(5_000, null) },
    },
  },
];

export const sizes = [
  { id: "small", name: "Focused", detail: "An MVP, a landing experience or one core workflow" },
  { id: "medium", name: "Full product", detail: "A complete product with accounts, admin and integrations" },
  { id: "large", name: "Platform", detail: "Multiple user types, heavy integrations or enterprise scale" },
] as const;

export type SizeId = (typeof sizes)[number]["id"];

export const addOns = [
  { id: "design", name: "Custom UI/UX design", factor: 1.15 },
  { id: "priority", name: "Priority timeline", factor: 1.25 },
  { id: "support", name: "6 months support & maintenance", factor: 1.1 },
  { id: "training", name: "Team training", factor: 1.05 },
] as const;

export type AddOnId = (typeof addOns)[number]["id"];
