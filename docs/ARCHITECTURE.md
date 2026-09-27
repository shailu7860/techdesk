# Architecture

Status: **implemented** (2026-09-24). Verified against the React Router pre-rendering docs (v7.18 API, shipped on v8.4) and the Amplify Gen 2 functions/secrets docs.

## 1. Application architecture
```
Browser ──► Amplify Hosting (CDN, static files)
             ├─ /index.html, /work/biexor/index.html …   ← prerendered at build
             ├─ /assets/*.js|css (hashed, immutable)     ← code-split chunks
             └─ /__spa-fallback.html                     ← client-rendered 404 / unknown routes
Browser ──► Form service endpoint (leads)
```
It is a fully static site with no server code (the AI chatbot was removed 2026-09-27). Leads go to a form service. There is no database.

## 2. Rendering and routing
- **React Router v7 framework mode** with `ssr: false` and a `prerender()` config. Every static route and every `/work/:slug` and `/services/:slug` is built to HTML at build time. Slugs come from `src/data`, the same data the pages render, so adding a project automatically adds a page.
  ```ts
  // react-router.config.ts
  export default {
    appDirectory: "src",
    ssr: false,
    async prerender({ getStaticPaths }) {
      return [...getStaticPaths(),
        ...projects.map(p => `/work/${p.slug}`),
        ...services.map(s => `/services/${s.slug}`)];
    },
  } satisfies Config;
  ```
- Constraint (from the docs): with `ssr: false` there are **no `action`s and no `headers` exports**. Build-time `loader`s are allowed on prerendered routes. Forms therefore submit client-side through `submitLead()`.
- Route `meta` exports produce title, description, canonical, OG and Twitter tags in the static HTML (requirement SE-01).
- Routes are declared in `src/routes.ts`: home, services, services/:slug, work, work/:slug, about, contact, and a catch-all `*` for the 404.

## 3. Source structure
This follows spec §27, trimmed so that no empty folders exist "for later". A folder is created when its first file is.
```
src/
  root.tsx               # html shell, fonts, <Meta/>, error boundary, dock, analytics init
  routes.ts              # route table
  routes/                # one file per route: home.tsx, work.tsx, work.$slug.tsx …
  sections/home/         # Hero/, Services/, AgentTrace/, Work/, Process/, Industries/, Estimate/, FinalCTA/
  components/            # ui primitives (Button, Label, Field…), layout (Nav, Footer), contact (Dock, QuoteCalculator, BriefForm)
  animations/            # reusable GSAP utilities: reveal.ts, scrub.ts, pin.ts, pageTransition.ts
  hooks/                 # useReducedMotion, useMediaQuery, useGsap (context + cleanup)
  data/                  # projects.ts, services.ts, industries.ts, process.ts, pricing.ts, contact.ts, navigation.ts
  lib/                   # leads.ts (submitLead), analytics.ts (track), seo.ts (meta builders), whatsapp.ts
  styles/                # tokens.css (DESIGN.md tokens), globals.css
  three/                 # HeroCore scene, lazy-loaded
public/                  # fonts, og/, favicons, robots.txt
```

## 4. State management
There is no global store. State is local component state, plus URL state where it should be shareable (the selected industry and calculator selections go in query params, so a WhatsApp or brief handoff can link back).

## 5. Data layer
- `src/data/*.ts` holds typed content and is the **single source** for pages, prerender paths, sitemap, JSON-LD.
- Types live next to the data (`Project`, `Service`, `Industry`, `PriceBand`). Every content object has an optional `placeholder?: true`. A build-time check fails the production build if any `featured` item or rendered field is a placeholder (requirement PF-05).
- CMS migration path: replace the data module's exports with build-time fetches, keeping the same types.

## 6. Animation layer
- GSAP and ScrollTrigger are loaded in the client only. Every usage goes through a `useGsap(scope, fn)` hook that wraps `gsap.context()` and reverts on unmount, and through `gsap.matchMedia()` so desktop, mobile and reduced-motion variants are declared side by side.
- Timelines live in `src/animations/*` and sections call them. There are no inline mega-timelines (spec §28).
- Lenis runs only when motion is allowed and the pointer is fine; it drives ScrollTrigger through `lenis.on('scroll', ScrollTrigger.update)`.
- **Default-visible rule:** the prerendered HTML is final-state. Animations run `from()` states only after hydration, so no content is ever hidden waiting for JS.
- WebGL (the hero system core) uses **plain three.js with named imports** (React Three Fiber was removed: 239 → 129 KB gz), loaded with `React.lazy` after `requestIdleCallback`, only when `(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)` and WebGL2 is available. Otherwise the static SVG poster stays in place.

## 7. API layer
### Leads: `src/lib/leads.ts`
`submitLead(payload): Promise<Result>` is the only function that knows the destination. v1 posts to a form service (Web3Forms or Formspree class) using a **public** form key, with a honeypot field. Client-side validation mirrors what the form service enforces. A later Node backend replaces the function body; no caller changes.

### Chatbot
Removed 2026-09-27 (static-only deploy). Re-adding it requires a server-side function so LLM keys never reach the browser; the previous Amplify Lambda implementation is in git history.

### Quick contact: `src/lib/whatsapp.ts`
`waLink(text)` returns `https://wa.me/<E.164 number>?text=<encoded>` and `tel:` links come from `src/data/contact.ts`. There is no SDK and no third-party widget script.

### Analytics: `src/lib/analytics.ts`
`track(event, props)` is a no-op until one provider is configured by env var. Components call only `track()`.

## 8. Asset handling
- Fonts are self-hosted WOFF2, subset, and the display face is preloaded.
- Images are AVIF/WebP with explicit width and height; case-study media is lazy-loaded.
- Video is poster-first, `preload="none"`, and replaced by the poster under reduced motion.
- OG images are 1200×630 static files per route in `public/og/`.

## 9. Deployment (AWS Amplify)
- Amplify Hosting (static) connected to the git repo. `main` is production, and other branches get preview environments.
- Build runs `npm ci && npm run build`. Artifacts come from `build/client`.
- Hosting rules: prerendered `*/index.html` files are served as-is. Unknown paths are rewritten to the prerendered `/404/index.html` with a **404 status** (see DEPLOYMENT.md). `scripts/serve.mjs` emulates this locally and e2e asserts it. Confirm on Amplify after the first deploy.
- Headers (requirement SC-03): `customHttp.yml` (generated from `scripts/security-headers.mjs`) sets HSTS, nosniff, `X-Frame-Options: DENY`, referrer/permissions policies and caching (`immutable` for `/assets/**`). The **CSP** is a per-page `<meta>` injected after build by `scripts/csp.mjs`, with SHA-256 hashes of React Router's inline scripts, because those hashes change every build and cannot live in a committed header file.
- Secrets are set in the Amplify console under **Hosting → Secrets**.

## 10. Future backend
When lead management or a CMS arrives: Node/Express (or more Amplify functions) plus Postgres or Mongo. `submitLead()` and the data modules are the only integration seams, so the frontend does not change shape.

## Decisions and alternatives
| Decision | Alternatives rejected | Why |
|---|---|---|
| RR7 framework mode with prerender | Plain SPA (weak SEO) · Next.js static export (off-spec stack) | Static HTML per route on the spec's stack |
| Form service for leads | Backend now · EmailJS | No ops; spam protection included; swappable |
