// Client testimonials. Project rule: never invent testimonials (CLAUDE.md, spec §71).
// Every entry below is a PLACEHOLDER drafted for layout and tone only. Placeholders render in dev with a
// [CONTENT NEEDED] note and are stripped from production builds. Replace each with a real, approved quote
// (with the client's written permission) and delete `placeholder: true` to publish it.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  project: string; // what we built, never a client brand name
  placeholder?: true;
};

const placeholders: Testimonial[] = [
  {
    quote:
      "We had a working trading dashboard to click through in the first week, and a new build every Friday after that. Nothing about the process felt like a black box.",
    name: "Arjun M.",
    role: "Founder",
    location: "Mumbai, India",
    project: "Algo Trading Platform",
    placeholder: true,
  },
  {
    quote:
      "Our WhatsApp inbox used to eat half a day. The agent now answers the routine questions and hands the tricky ones to us with the whole chat attached.",
    name: "Priya S.",
    role: "Operations lead",
    location: "Pune, India",
    project: "WhatsApp AI agent",
    placeholder: true,
  },
  {
    quote:
      "They asked better questions about our ledger than our previous vendor did in a year. The platform has been boringly reliable since launch, which is exactly what we wanted.",
    name: "Daniel K.",
    role: "CTO",
    location: "London, UK",
    project: "Business Exchange Platform",
    placeholder: true,
  },
  {
    quote:
      "The procurement extension turned a two-hour daily routine into a few clicks. Store review went through first time because they planned permissions from day one.",
    name: "Rakesh V.",
    role: "Director",
    location: "Indore, India",
    project: "E-bidding Automation Extension",
    placeholder: true,
  },
  {
    quote:
      "Clear written scope, a price range before any invoice, and the range held. That alone made them easy to recommend.",
    name: "Sofia L.",
    role: "Product manager",
    location: "Berlin, Germany",
    project: "SaaS MVP",
    placeholder: true,
  },
  {
    quote:
      "Talking directly to the engineers on WhatsApp saved us weeks. Questions got answered the same day, usually within the hour.",
    name: "Neha T.",
    role: "Co-founder",
    location: "Bengaluru, India",
    project: "Marketplace platform",
    placeholder: true,
  },
  {
    quote:
      "Our new site loads fast on a 4G phone and ranks for the terms we care about. They handled the technical SEO without us having to ask.",
    name: "Michael R.",
    role: "Managing director",
    location: "Toronto, Canada",
    project: "Agency Website",
    placeholder: true,
  },
  {
    quote:
      "Real-money gaming means KYC, wallets and audit trails. They treated correctness as the feature, and it shows in how few issues we see.",
    name: "Vikram D.",
    role: "Head of product",
    location: "Hyderabad, India",
    project: "Gaming Platform",
    placeholder: true,
  },
  {
    quote:
      "We own the repo, the cloud accounts and every design file. Handover was a non-event, which is the best compliment I can give.",
    name: "Aisha N.",
    role: "Founder",
    location: "Dubai, UAE",
    project: "Internal operations tool",
    placeholder: true,
  },
  {
    quote:
      "The discovery sprint gave us an architecture and a costed plan in ten days. We used it to raise our seed round, then hired them to build it.",
    name: "Tom H.",
    role: "CEO",
    location: "Austin, USA",
    project: "Discovery sprint and platform build",
    placeholder: true,
  },
];

export const testimonials: Testimonial[] = [
  // Real, approved quotes go here (no `placeholder` flag).
  // ponytail: compile-time gate, so placeholder text is dropped from the production bundle entirely.
  ...(import.meta.env.DEV ? placeholders : []),
];
