import type { MetaDescriptor } from "react-router";
import { site } from "../data/company";
import { contact } from "../data/contact";
import { services } from "../data/services";

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "http://localhost:4173").replace(/\/$/, "");

type Ld = Record<string, unknown>;
type Seo = {
  title: string;
  description: string;
  path: string;
  /** Path under /public, 1200×630. */
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: "website" | "article";
  /** schema.org nodes for this page (emitted as one @graph together with the site-wide nodes). */
  jsonLd?: Ld | Ld[];
  /** Breadcrumb trail after "Home", e.g. [["Work", "/work"], ["Project", "/work/project"]]. */
  breadcrumbs?: [string, string][];
};

/** Title, description, canonical, Open Graph, X and structured data for one route. */
export function seo({
  title,
  description,
  path,
  image = "/og/default.png",
  imageAlt = "TechDesk: AI agents, software platforms and automation",
  noindex,
  type = "website",
  jsonLd,
  breadcrumbs,
}: Seo) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const img = `${SITE_URL}${image}`;
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1",
    },
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { name: "twitter:image:alt", content: imageAlt },
  ];
  if (noindex) return tags;

  const graph: Ld[] = [organizationLd, websiteLd, ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])];
  if (breadcrumbs?.length) graph.push(breadcrumbLd(breadcrumbs));
  tags.push({ "script:ld+json": { "@context": "https://schema.org", "@graph": graph } });
  return tags;
}

export const ORG_ID = `${SITE_URL}/#organization`;

/** The business as Google should understand it: a professional service, based in Indore, serving the world. */
const organizationLd: Ld = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: site.name,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icons/icon-512.png`,
  image: `${SITE_URL}/og/default.png`,
  description: site.description,
  email: contact.email,
  telephone: contact.phoneE164,
  priceRange: "₹₹",
  currenciesAccepted: "INR, USD",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  areaServed: "Worldwide",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: contact.phoneE164,
    email: contact.email,
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi"],
  },
  knowsAbout: [
    "AI agent development",
    "WhatsApp AI agents",
    "SaaS development",
    "Custom software development",
    "Algorithmic trading software",
    "Marketplace development",
    "Chrome extension development",
    "Technical SEO",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}/services/${s.slug}` },
    })),
  },
};

const websiteLd: Ld = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: site.name,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

function breadcrumbLd(trail: [string, string][]): Ld {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", "/"] as [string, string], ...trail].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}
