import type { MetaDescriptor } from "react-router";
import { site } from "../data/company";
import { contact } from "../data/contact";

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "http://localhost:4173").replace(/\/$/, "");

type Seo = {
  title: string;
  description: string;
  path: string;
  /** Path under /public, 1200×630. */
  image?: string;
  noindex?: boolean;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
};

/** Title, description, canonical, Open Graph and X metadata for one route (SE-01). */
export function seo({ title, description, path, image = "/og/default.png", noindex, type = "website", jsonLd }: Seo) {
  const url = `${SITE_URL}${path}`;
  const img = `${SITE_URL}${image}`;
  const tags: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
  ];
  if (noindex) tags.push({ name: "robots", content: "noindex, nofollow" });
  if (jsonLd) tags.push({ "script:ld+json": { "@context": "https://schema.org", ...jsonLd } });
  return tags;
}

export const organizationLd = {
  "@type": "Organization",
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: contact.email,
  telephone: contact.phoneE164,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  areaServed: "Worldwide",
};
