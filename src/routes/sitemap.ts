import { insights } from "../data/insights";
import { flagships } from "../data/projects";
import { services } from "../data/services";
import { solutions } from "../data/solutions";
import { SITE_URL } from "../lib/seo";

// Build date as lastmod for static pages; articles use their publish date.
const BUILT = new Date().toISOString().slice(0, 10);

const entries: [string, string, string][] = [
  ["/", BUILT, "1.0"],
  ["/services", BUILT, "0.9"],
  ...services.map((s): [string, string, string] => [`/services/${s.slug}`, BUILT, "0.9"]),
  ["/solutions", BUILT, "0.8"],
  ...solutions.map((s): [string, string, string] => [`/solutions/${s.slug}`, BUILT, "0.9"]),
  ["/work", BUILT, "0.8"],
  ...flagships.map((p): [string, string, string] => [`/work/${p.slug}`, BUILT, "0.7"]),
  ["/insights", BUILT, "0.7"],
  ...insights.map((i): [string, string, string] => [`/insights/${i.slug}`, i.published, "0.8"]),
  ["/about", BUILT, "0.6"],
  ["/contact", BUILT, "0.7"],
  ["/privacy", BUILT, "0.2"],
  ["/terms", BUILT, "0.2"],
];

export function loader() {
  const urls = entries
    .map(
      ([p, mod, pri]) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${mod}</lastmod><priority>${pri}</priority></url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
