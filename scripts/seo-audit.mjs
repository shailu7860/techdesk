// SEO audit over the prerendered build. Fails (exit 1) on errors; prints warnings.
// Usage: node scripts/seo-audit.mjs [build/client]
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? "build/client";
const walk = (d) =>
  readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = walk(root)
  .filter((f) => f.endsWith("index.html"))
  .map((f) => ({
    file: f,
    path: `/${relative(root, f)
      .replace(/index\.html$/, "")
      .replace(/\/$/, "")}`,
  }));

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const attr = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]) : null;
};
const meta = (html, key) =>
  attr(html, new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]+content="([^"]*)"`)) ??
  attr(html, new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${key}"`));
const exists = (p) => {
  const clean = p.split(/[?#]/)[0].replace(/\/$/, "");
  return clean === "" || existsSync(join(root, clean, "index.html")) || existsSync(join(root, clean));
};

const errors = [];
const warnings = [];
const titles = new Map();
const descs = new Map();

for (const { file, path } of pages) {
  const html = readFileSync(file, "utf8");
  const where = path || "/";
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = meta(html, "description");

  if (!title) errors.push(`${where}: missing <title>`);
  if (!noindex) {
    if (title && (title.length < 25 || title.length > 62))
      warnings.push(`${where}: title ${title.length} chars "${title}"`);
    if (!desc) errors.push(`${where}: missing meta description`);
    else if (desc.length < 70 || desc.length > 165) warnings.push(`${where}: description ${desc.length} chars`);
    if (title) titles.set(title, [...(titles.get(title) ?? []), where]);
    if (desc) descs.set(desc, [...(descs.get(desc) ?? []), where]);

    const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
    if (!canonical) errors.push(`${where}: missing canonical`);
    else if (!/^https?:\/\//.test(canonical)) errors.push(`${where}: canonical not absolute`);
    else if (new URL(canonical).pathname.replace(/\/$/, "") !== path.replace(/\/$/, ""))
      errors.push(`${where}: canonical ${canonical} is not self-referencing`);

    for (const k of [
      "og:title",
      "og:description",
      "og:url",
      "og:image",
      "og:type",
      "og:site_name",
      "og:locale",
      "og:image:alt",
      "twitter:card",
      "twitter:title",
      "twitter:image",
    ])
      if (!meta(html, k)) errors.push(`${where}: missing ${k}`);
    const ogImage = meta(html, "og:image");
    if (ogImage && !existsSync(join(root, new URL(ogImage).pathname)))
      errors.push(`${where}: og:image file not found ${ogImage}`);
  }

  if (!/<html lang="[a-z-]+"/.test(html)) errors.push(`${where}: <html lang> missing`);
  const h1s = html.match(/<h1\b/g)?.length ?? 0;
  if (h1s !== 1) errors.push(`${where}: ${h1s} <h1> elements`);
  let last = 0;
  for (const m of html.matchAll(/<h([1-6])\b/g)) {
    const lvl = Number(m[1]);
    if (last && lvl > last + 1) warnings.push(`${where}: heading jumps h${last} → h${lvl}`);
    last = lvl;
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) errors.push(`${where}: <img> without alt`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const d = JSON.parse(m[1]);
      if (!d["@context"]) errors.push(`${where}: JSON-LD without @context`);
    } catch {
      errors.push(`${where}: invalid JSON-LD`);
    }
  }
  for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)) {
    const href = decode(m[1]);
    if (!href.startsWith("//") && !exists(href)) errors.push(`${where}: broken internal link ${href}`);
  }
}

for (const [t, where] of titles) if (where.length > 1) errors.push(`duplicate title "${t}" on ${where.join(", ")}`);
for (const [, where] of descs) if (where.length > 1) errors.push(`duplicate description on ${where.join(", ")}`);

const sitemap = existsSync(join(root, "sitemap.xml")) ? readFileSync(join(root, "sitemap.xml"), "utf8") : "";
if (!sitemap) errors.push("sitemap.xml missing");
for (const loc of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const p = new URL(loc[1]).pathname;
  if (!exists(p)) errors.push(`sitemap lists missing page ${p}`);
}
if (!existsSync(join(root, "robots.txt"))) errors.push("robots.txt missing");

console.log(`SEO audit: ${pages.length} pages, ${errors.length} errors, ${warnings.length} warnings`);
for (const w of warnings) console.log(`  warn  ${w}`);
for (const e of errors) console.log(`  ERROR ${e}`);
process.exit(errors.length ? 1 : 0);
