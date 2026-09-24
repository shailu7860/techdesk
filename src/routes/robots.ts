import { SITE_URL } from "../lib/seo";

export function loader() {
  const body = `User-agent: *\nAllow: /\nDisallow: /system\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
