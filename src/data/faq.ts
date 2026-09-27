// Delegated by the owner ("decide yourself, but best"), consistent with pricing.ts, company.ts and contact.ts.
import type { ServiceSlug } from "./services";

export type Faq = { q: string; a: string; services?: ServiceSlug[] };

export const faqs: Faq[] = [
  {
    q: "How long does a typical project take?",
    a: "A focused MVP or landing experience usually takes 3 to 6 weeks. A full product with accounts, admin and integrations usually takes 2 to 4 months. You get a written timeline with the scope, before any invoice.",
    services: ["web-product-engineering", "digital-transformation"],
  },
  {
    q: "How is pricing decided?",
    a: "We scope first, then quote a fixed price for that scope, or a monthly rate for a dedicated team. The estimate tool on this site shows indicative ranges in INR and USD so you can budget before we talk.",
  },
  {
    q: "Who owns the code and designs?",
    a: "You do, from day one. Code lives in a repository you own or can access, and the IP transfers to you as agreed in the contract.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. We are happy to sign a mutual NDA before you share anything sensitive.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We are based in Indore and work with clients worldwide. We overlap with European mornings and US evenings, and keep a weekly demo on a time that suits you.",
  },
  {
    q: "How do we communicate during a project?",
    a: "A shared chat channel or WhatsApp group with the engineers building your product, a weekly live demo, and written updates for decisions. You talk to the people doing the work.",
  },
  {
    q: "What happens after launch?",
    a: "We hand over documentation and access, then offer ongoing support and maintenance, monthly or as needed. We also keep improving the product as real users arrive.",
  },
  {
    q: "Can you build an AI agent that works with our existing tools?",
    a: "Yes. Agents can read from and act inside tools you already use, such as WhatsApp, email, CRMs, calendars and internal databases, with a human approving the steps that matter.",
    services: ["ai-automation"],
  },
  {
    q: "Which AI models do you use, and is our data safe?",
    a: "We pick the model per task (for example Claude or open models served by Groq) and design for failover between providers. Only the data a task needs is sent, keys stay on the server, and nothing is used to train models.",
    services: ["ai-automation"],
  },
  {
    q: "Can you take over or modernise an existing system?",
    a: "Yes. We start with a short audit of the code, infrastructure and risks, then modernise in steps so the business keeps running while it improves.",
    services: ["software-engineering", "digital-transformation"],
  },
  {
    q: "Do you only build, or also bring traffic?",
    a: "Both. Technical SEO, content and performance campaigns are measured against qualified leads, and we can fix the site ourselves when something needs to change.",
    services: ["digital-marketing"],
  },
];

export const faqsFor = (slug: ServiceSlug) => faqs.filter((f) => f.services?.includes(slug));
