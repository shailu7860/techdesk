# Changelog

## [Unreleased]
### Added
- Three SEO landing pages for the queries the owner wants to rank for: `/solutions/ai-agent-development` (AI agent developers), `/solutions/custom-software-development` (custom software, servers and APIs) and `/solutions/gaming-platform-development` (gaming platforms). Each targets one keyword and cites only real projects; footer, sitemap, llms.txt and share images pick them up automatically.
### Changed
- SaaS page title and h1 now lead with "SaaS product development". The AI automation service page is retitled so it no longer competes with the new AI agent page. Site description and Organization `knowsAbout` mention SaaS products, custom software, backend and gaming.
**Files:** src/data/{solutions,services,company}.ts, src/lib/seo.ts, public/og/*, docs/SEO_KEYWORDS.md · **API/Schema:** none · **Migration:** none · **Breaking:** no · **Tests:** npm test, verify, e2e

### Changed
- Replaced the Business Exchange Platform everywhere on the site with an Enterprise Software Suite (ERP, HRMS and management systems), so our enterprise work is presented as a flagship case study (owner request). Homepage hero card, industries tab ("Enterprise software" replaces "Marketplaces"), strengths, work page meta, solution pages and the /system specimen updated. Marketplace and fintech pages no longer claim business exchange or Digio KYC work.
### Added
- `/solutions/erp-hrms-software-development` landing page (keyword "ERP software development company"); ERP and HRMS added to Organization `knowsAbout`.
### Removed
- `/work/business-exchange-platform` case study and its OG image; new `/work/enterprise-software` replaces it.
**Files:** src/data/{projects,industries,solutions,company}.ts, src/sections/home/Hero.tsx, src/routes/{work,system,solutions}.tsx, src/lib/seo.ts, public/og/*, tests/e2e/{site,flows}.spec.ts, CLAUDE.md, docs/SEO_KEYWORDS.md · **API/Schema:** none · **Migration:** none (old /work/business-exchange-platform URL now 404s; add an Amplify redirect to /work/enterprise-software if it was indexed) · **Breaking:** no · **Tests:** see verify run

## 0.2.0 (2026-09-27): static-only
- Removed the AI chat assistant and its Amplify Lambda backend (owner: deploy on Amplify with no server for now). Dock is now WhatsApp + Call; the home AI section links to /contact.
- Dropped AWS backend devDependencies (`@aws-amplify/backend*`, `aws-cdk-lib`, `constructs`) and the `mysql2`/`immutable` overrides; `amplify.yml` is frontend-only.
- Removed unused screenshot scripts (`scripts/shots.mjs`, `scripts/sections.mjs`).
- Moved the project into the GitHub repository (history preserved).

## 0.1.0 (2026-09-24): first production-ready build
- Phase 0–1: discovery, product/design context, requirements, architecture, UX flow
- Phase 2: design system (OKLCH tokens, Archivo + Martian Mono, wordmark, core components, contact dock)
- Phase 3: prerendered app shell, header/menu/footer, SEO, sitemap/robots, designed 404/500
- Phase 4: cinematic homepage (hero, services, AI agent trace, proof, process, industries, commitments, estimate, CTA)
- Phase 5: motion system (GSAP/ScrollTrigger/Lenis on demand), WebGL system core, view transitions
- Phase 6–7: 4 case studies + build index; 5 service pages
- Phase 8: about, contact (5-step brief, INR/USD calculator), legal pages, AI chat assistant (Amplify Lambda, Groq→Claude)
- Phase 9–10: responsive pass (360–1920), contrast-safe motion, LCP font preload
- Phase 11: 51 unit + 45 e2e tests with axe
- Phase 12: per-page CSP, security headers, Amplify build spec with test gate, security audit (no Critical/High open)
