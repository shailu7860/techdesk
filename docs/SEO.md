# SEO

| Item | Implementation |
|---|---|
| Rendering | Every route and every `/work/:slug` and `/services/:slug` is prerendered to static HTML (crawlers see full content without JS) |
| Per-route tags | `seo()` in `src/lib/seo.ts`: title, description, canonical, Open Graph (type, title, description, url, 1200×630 image), X/Twitter large card |
| Structured data | `Organization` (home, about), `CreativeWork` (case studies), `Service` (service pages) |
| Sitemap / robots | Prerendered from data: `/sitemap.xml`, `/robots.txt` (excludes `/system`) |
| OG images | `public/og/default.png` + one per case study (`node scripts/og.mjs`) |
| Canonical base | `https://www.techdesks.in` on Amplify builds (`vite.config.ts`); `SITE_URL` overrides |
| 404 | Real 404 status (Amplify rewrite) with a `noindex` designed page |
| Headings | Exactly one `h1` per page (asserted in e2e) |

Once a domain exists: set `SITE_URL`, redeploy, submit the sitemap in Google Search Console, and verify the domain for the WhatsApp/LinkedIn link previews.
