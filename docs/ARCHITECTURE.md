# Architecture

Status: Phase 1 proposal. Verified against React Router 7.18 pre-rendering docs and the Amplify Gen 2 functions/secrets docs (Context7, 2026-09-23).

## 1. Application architecture
```
Browser ──► Amplify Hosting (CDN, static files)
             ├─ /index.html, /work/biexor/index.html …   ← prerendered at build
             ├─ /assets/*.js|css (hashed, immutable)     ← code-split chunks
             └─ /__spa-fallback.html                     ← client-rendered 404 / unknown routes
Browser ──► Lambda Function URL (chat)  ──► Groq ──(fail)──► Anthropic Claude
Browser ──► Form service endpoint (leads)
```
It is a static-first site. The only server code is **one function** (the chatbot). Leads go to a form service. There is no database.

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
  components/            # ui primitives (Button, Label, Field…), layout (Nav, Footer), contact (Dock, ChatPanel, QuoteCalculator, BriefForm)
  animations/            # reusable GSAP utilities: reveal.ts, scrub.ts, pin.ts, pageTransition.ts
  hooks/                 # useReducedMotion, useMediaQuery, useGsap (context + cleanup)
  data/                  # projects.ts, services.ts, industries.ts, process.ts, pricing.ts, contact.ts, navigation.ts
  lib/                   # leads.ts (submitLead), chat.ts (client), analytics.ts (track), seo.ts (meta builders), whatsapp.ts
  styles/                # tokens.css (DESIGN.md tokens), globals.css
  three/                 # HeroCore scene, lazy-loaded
amplify/                 # Amplify Gen 2 backend: backend.ts, functions/chat/
public/                  # fonts, og/, favicons, robots.txt
```

## 4. State management
There is no global store. State is local component state, plus URL state where it should be shareable (the selected industry and calculator selections go in query params, so a WhatsApp or brief handoff can link back). Chat history lives in component state and is lost on reload by design (privacy).

## 5. Data layer
- `src/data/*.ts` holds typed content and is the **single source** for pages, prerender paths, sitemap, JSON-LD **and chatbot grounding**.
- Types live next to the data (`Project`, `Service`, `Industry`, `PriceBand`). Every content object has an optional `placeholder?: true`. A build-time check fails the production build if any `featured` item or rendered field is a placeholder (requirement PF-05).
- CMS migration path: replace the data module's exports with build-time fetches, keeping the same types.

## 6. Animation layer
- GSAP and ScrollTrigger are loaded in the client only. Every usage goes through a `useGsap(scope, fn)` hook that wraps `gsap.context()` and reverts on unmount, and through `gsap.matchMedia()` so desktop, mobile and reduced-motion variants are declared side by side.
- Timelines live in `src/animations/*` and sections call them. There are no inline mega-timelines (spec §28).
- Lenis runs only when motion is allowed and the pointer is fine; it drives ScrollTrigger through `lenis.on('scroll', ScrollTrigger.update)`.
- **Default-visible rule:** the prerendered HTML is final-state. Animations run `from()` states only after hydration, so no content is ever hidden waiting for JS.
- WebGL (the hero system core) uses React Three Fiber, loaded with `React.lazy` after `requestIdleCallback`, only when `(pointer: fine) and (min-width: 1024px) and not (prefers-reduced-motion)` and WebGL2 is available. Otherwise the static SVG poster stays in place.

## 7. API layer
### Leads: `src/lib/leads.ts`
`submitLead(payload): Promise<Result>` is the only function that knows the destination. v1 posts to a form service (Web3Forms or Formspree class) using a **public** form key, with a honeypot field. Client-side validation mirrors what the form service enforces. A later Node backend replaces the function body; no caller changes.

### Chatbot: `amplify/functions/chat` plus `src/lib/chat.ts`
- **Runtime:** an Amplify Gen 2 `defineFunction`, exposed through a **Lambda Function URL** (added in `amplify/backend.ts` with CDK `addFunctionUrl`). `authType: NONE`, and CORS limited to the site origins (Amplify URL now, domain later).
- **Secrets:** `GROQ_API_KEY` and `ANTHROPIC_API_KEY` come from `secret()` and are read from `env` at runtime. They never touch the frontend.
- **Provider chain.** This pattern is adapted from `Some learnings/algo-backend/src/utils/llmProvider.js`, as a small `fetch`-based implementation with no LangChain.
  - `CHAT_CHAIN="groq:openai/gpt-oss-20b,anthropic:claude-haiku-4-5"` is env-driven, so switching models is a config change.
  - Each attempt gets a timeout (8s), and the whole request has a deadline (15s).
  - Failures are classified as `rate_limit`, `timeout`, `auth`, `not_found` or `server`, and the failing provider is parked for a cooldown (in memory, per warm instance).
  - Error messages are redacted before logging.
  - Groq goes first for latency; Claude is the quality fallback.
- **Grounding:** the function imports `src/data/*` directly (esbuild bundles it), so the system prompt holds the real services, projects, process, price bands and contact routes. The rules are: answer only from this data, never invent clients, metrics or prices, and always offer WhatsApp, call or the brief for anything project-specific.
- **Abuse limits** (requirement SC-02): message of 1,000 characters or fewer, 12 turns or fewer, `max_tokens` about 500, reserved concurrency 5, and a best-effort per-IP token bucket.
  `// ponytail: in-memory limits reset per cold start; add API Gateway throttling or WAF if abused.`
- **Response:** v1 returns JSON (non-streaming) and the UI shows a typing state. Streaming through `RESPONSE_STREAM` is a P2 upgrade.
- **Failure:** every provider failing returns `503 {handoff:true}`, and the UI renders the human handoff (requirement LG-08).

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
- Amplify Gen 2 **full-stack app** connected to the git repo, so frontend plus the chat function deploy together per branch. `main` is production, and other branches get preview environments.
- Build runs `npm ci && npm run build`. Artifacts come from `build/client`.
- Hosting rules: prerendered `*/index.html` files are served as-is. Unknown paths are rewritten to `/__spa-fallback.html` with **404 status**, and the client renders the 404 route. **This must be verified on Amplify in Phase 3**, because Amplify rewrite ordering is order-sensitive.
- Custom headers (requirement SC-03): `Cache-Control: public, max-age=31536000, immutable` for `/assets/*` and `max-age=0, must-revalidate` for HTML. Security headers include a strict CSP that allows `self`, the form-service origin and the Function URL origin.
- Secrets are set in the Amplify console under **Hosting → Secrets**.

## 10. Future backend
When lead management or a CMS arrives: Node/Express (or more Amplify functions) plus Postgres or Mongo. `submitLead()` and the data modules are the only integration seams, so the frontend does not change shape.

## Decisions and alternatives
| Decision | Alternatives rejected | Why |
|---|---|---|
| RR7 framework mode with prerender | Plain SPA (weak SEO) · Next.js static export (off-spec stack) | Static HTML per route on the spec's stack |
| One Lambda for chat | Keys in the frontend (forbidden) · Express server (ops cost) | Secrets stay server-side and cost nothing at idle |
| Form service for leads | Backend now · EmailJS | No ops; spam protection included; swappable |
| Groq then Claude chain | A single provider | The owner's own production experience shows single-provider layers fail silently |
