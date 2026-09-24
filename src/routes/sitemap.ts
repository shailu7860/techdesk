import { flagships } from "../data/projects";
import { services } from "../data/services";
import { SITE_URL } from "../lib/seo";

const paths = [
  "/",
  "/work",
  ...flagships.map((p) => `/work/${p.slug}`),
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

// Prerendered to build/client/sitemap.xml (SE-03).
export function loader() {
  const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
