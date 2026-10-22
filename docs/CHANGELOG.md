# Changelog

## [Unreleased]
### Changed
- Quick-contact dock: WhatsApp and Call now sit on solid green (round 56 px buttons on desktop, green icon badges in the mobile bar) so the fastest way to reach us stands out (owner request).
- Hero, first screen: the typed phrase sits on its own line, so the headline no longer reflows while it types. The product reel now plays inside an app window whose tabs (Trading, ERP and HRMS, Gaming, E-bidding, AI agent) follow the video and jump to a product on click; the reel itself is rendered without its old in-video caption, and the window footer names the product and style.
- Header: transparent and borderless at the top of the page, so it reads as part of the banner; it becomes a solid bar with a hairline once the page scrolls (owner request).
**Files:** src/sections/home/{Hero,HeroShowcase}.tsx, src/components/space/LoopVideo.tsx, src/components/layout/SiteHeader.tsx, video/src/Root.tsx, public/video/hero.* · **API/Schema:** none · **Migration:** none · **Breaking:** no · **Tests:** verify, unit, e2e
### Added
- Case study pages (trading, ERP/HRMS, e-bidding, gaming) now show a product mockup video next to "Key features", captioned as a mockup with sample data. Clips are the hero scenes without their caption (`case-<slug>` compositions), enabled per project by `caseStudy.video`.
**Files:** src/routes/work.$slug.tsx, src/data/projects.ts, video/src/Root.tsx, video/render.mjs, public/video/case-* · **API/Schema:** none · **Migration:** none · **Breaking:** no · **Tests:** verify, unit, e2e

### Added
- Homepage hero: the planet and floating cards are replaced by a looping reel of our real products recreated as mockups, each in a different design style (trading platform in glassmorphism, ERP/HRMS in neumorphism, gaming in neon, the e-bidding extension in claymorphism, the WhatsApp AI agent in flat). Owner request: show the products, not a globe.
- Homepage "Also built": the text list is now a grid of short product clips, one style each (bento, neo-brutalism, skeuomorphism, aurora glass, editorial, material, terminal, Swiss minimal).
- `LoopVideo` component: muted, plays only on screen, stays on its poster under reduced motion or the Pause motion toggle; below-the-fold clips download nothing until scrolled near.
- `video/` Remotion project (pinned 4.0.530, own package.json, not shipped) with `npm run render` to rebuild every clip; `/video/**` cached for a week.
**Files:** src/components/space/LoopVideo.tsx, src/sections/home/{Hero,WorkSection}.tsx, video/**, public/video/*, scripts/security-headers.mjs, customHttp.yml, tsconfig.json, CLAUDE.md, docs/TECH_STACK.md · **API/Schema:** none · **Migration:** none · **Breaking:** no · **Tests:** see verify/e2e run

### Fixed
- Corrected a client testimonial name: "Murari Mishra" is now "Gaurav Fadnavis" (owner request).
**Files:** src/data/testimonials.ts · **API/Schema:** none · **Migration:** none · **Breaking:** no · **Tests:** npm test

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
