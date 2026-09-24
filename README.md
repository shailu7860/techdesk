# TechDesk

Website for **TechDesk**, a technology studio (Indore, India, serving clients worldwide) that builds AI agents, software platforms and automation. The site is the lead-generation engine and the studio's portfolio piece.

- **Stack:** Vite 8, React 19, TypeScript 7 (strict), React Router 8 (every route prerendered to static HTML), Tailwind CSS 4, GSAP + Lenis, three.js (hero only)
- **Hosting:** AWS Amplify Gen 2. Static site plus one Lambda function for the AI chat assistant.
- **Leads:** WhatsApp / call deep links, a 5-step project brief (Web3Forms), an INR/USD quote calculator and a grounded AI assistant with human handoff.

## Quick start

```bash
npm install
cp .env.example .env.local        # optional: add VITE_WEB3FORMS_KEY
npm run dev                       # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build: prerendered HTML in `build/client`, per-page CSP injected |
| `npm start` | Serve `build/client` like Amplify does (index files, real 404, security headers, gzip) |
| `npm run preview` | Build, then serve |
| `npm run lint` / `lint:fix` | Biome lint + format |
| `npm run typecheck` | Route typegen + `tsc` |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests on desktop + mobile, with axe WCAG 2.2 AA scans (Playwright) |
| `npm run check:contrast` | Fails if any colour token pairing drops below WCAG AA |
| `npm run verify` | Lint, types, contrast, build |
| `node scripts/og.mjs` | Regenerate Open Graph images in `public/og/` |

## Where things live

```
src/data/        all content: projects, services, industries, process, pricing, contact (edit here)
src/routes/      one file per page (routes table: src/routes.ts)
src/sections/    homepage sections
src/components/  UI primitives, layout, contact (dock, brief, calculator), chat, work
src/animations/  GSAP choreography (loaded on demand)
src/lib/         leads, chat client, estimate maths, SEO, WhatsApp links
amplify/         Amplify Gen 2 backend: the chat Lambda (Groq → Claude chain)
scripts/         CSP injection, headers, local server, OG images, contrast check
tests/           unit (Vitest) and e2e (Playwright)
docs/            product, design, architecture and operations documentation
```

**Adding a project or service:** add an entry to `src/data/projects.ts` or `services.ts`. Pages, prerendering, sitemap, SEO tags and the chat assistant's knowledge update automatically. Run `node scripts/og.mjs` for its share image.

## Documentation

Start with [`CLAUDE.md`](./CLAUDE.md) (project rules and decisions), then [`docs/README.md`](./docs/README.md) for the index. Deployment: [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md).
