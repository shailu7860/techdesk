// Client testimonials (owner, 2026-09-27): feedback given in person or on calls; wording drafted from it and
// approved by each client. Never publish a quote a client has not approved (CLAUDE.md, spec §71).

export type Testimonial = {
  quote: string;
  name: string;
  project: string; // what we built, never a client brand name
  role?: string;
  location?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "TechDesk understood our business quickly and delivered exactly what we asked for, on time. Any change we needed was handled the same day.",
    name: "Murari Mishra",
    project: "Business website",
  },
  {
    quote:
      "Our new website is clean, fast and easy for people to use. The team explained every step, so we always knew where things stood.",
    name: "St. Thomas",
    project: "Website",
  },
  {
    quote:
      "The software fits the way we actually work. Our daily tasks take less effort now, and support has been quick whenever we needed it.",
    name: "Jhon Deo",
    project: "Business software",
  },
  {
    quote:
      "Professional, patient and easy to talk to. They turned our rough idea into working software and kept us involved throughout.",
    name: "Christien",
    project: "Business solution software",
  },
];
