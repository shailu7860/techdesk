import { insights } from "../data/insights";
import { flagships } from "../data/projects";
import { services } from "../data/services";
import { solutions } from "../data/solutions";
import { SITE_URL } from "../lib/seo";

// Build date as lastmod for static pages; articles use their publish date.
const BUILT = new Date().toISOString().slice(0, 10);

// [path, lastmod, priority, Open Graph image under /og (listed as an image sitemap entry)]
type Entry = [string, string, string, string?];
const entries: Entry[] = [
  ["/", BUILT, "1.0", "default"],
  ["/services", BUILT, "0.9"],
  ...services.map((s): Entry => [`/services/${s.slug}`, BUILT, "0.9", `service-${s.slug}`]),
  ["/solutions", BUILT, "0.8"],
  ...solutions.map((s): Entry => [`/solutions/${s.slug}`, BUILT, "0.9", `solution-${s.slug}`]),
  ["/work", BUILT, "0.8"],
  ...flagships.map((p): Entry => [`/work/${p.slug}`, BUILT, "0.7", p.slug]),
  ["/blog", BUILT, "0.8"],
  ...insights.map((i): Entry => [`/blog/${i.slug}`, i.published, "0.8", `insight-${i.slug}`]),
  ["/about", BUILT, "0.6"],
  ["/contact", BUILT, "0.7"],
  ["/privacy", BUILT, "0.2"],
  ["/terms", BUILT, "0.2"],
];

export function loader() {
  const urls = entries
    .map(
      ([p, mod, pri, img]) =>
        `  <url><loc>${SITE_URL}${p}</loc><lastmod>${mod}</lastmod><priority>${pri}</priority>${
          img ? `<image:image><image:loc>${SITE_URL}/og/${img}.png</image:loc></image:image>` : ""
        }</url>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
