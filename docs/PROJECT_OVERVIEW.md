# Project Overview: TechDesk Website

## What it is
The marketing website for **TechDesk**, a technology studio that builds AI agents, software platforms, automation, web products and digital marketing systems. It is designed as an interactive experience that doubles as TechDesk's strongest portfolio piece. Strategic detail is in `../PRODUCT.md`; the visual system is in `../DESIGN.md`.

## Business objective
Turn qualified visitors into conversations. The secondary objective is to prove engineering capability through the site itself.

## Target audience
Founders and startup leaders, business owners (India-first, SMB), and enterprise or CTO buyers, weighted equally and positioned as industry-neutral.

## Positioning
"We engineer digital systems for what's next." A near-future technology studio: precise, calm-confident, inventive and warm. It sells business outcomes first and technology second, and never over-claims.

## Core experience
A single cinematic homepage scroll with one WebGL signature moment (the hero "system core"), scroll-choreographed AI and work sequences, and calm clarity everywhere else. A human contact route is always one tap away: WhatsApp, call, AI chat, quote calculator and project brief. See `briefs/homepage.md`.

## Major pages (milestone 1)
Home · Services (overview plus five service lines) · Work (index) · Project detail `/work/:slug` · About · Contact · 404.
Later: Industries, Process, Insights, legal pages.

## Major features
| Feature | Summary |
|---|---|
| Cinematic homepage | Hero system core (WebGL, SVG fallback), services, AI agent trace, work gallery, process, industries, estimate, final CTA |
| Project system | Data-driven case studies (`src/data/projects.ts`). Adding a project needs no component changes, and each one is prerendered to its own SEO page |
| Quick-contact dock | WhatsApp deep link (prefilled), `tel:` call, chat launcher. Persistent and thumb-friendly |
| AI chatbot | Answers questions about TechDesk grounded only in site data. Serverless (Amplify function) with a Groq-then-Claude provider chain. Graceful handoff to a human |
| Quote calculator | Indicative price range from type, size and add-ons. Hands off to the brief or WhatsApp with the selection prefilled |
| Multi-step brief | Five-step contact flow (spec §26) through a form service behind `submitLead()` |
| Analytics | Provider-agnostic `track()` events (spec §42) |

## Technology
Vite · React 19 · TypeScript (strict) · React Router v7 (framework mode, `ssr: false` plus prerender) · Tailwind CSS v4 plus CSS tokens · GSAP and ScrollTrigger · Lenis · Three.js / React Three Fiber (hero only, lazy) · AWS Amplify Hosting plus one Amplify Gen 2 function (chatbot). Full rationale is in `ARCHITECTURE.md`.

## Future roadmap (not built now)
CMS (content already isolated behind `src/data`), lead management and CRM, blog and Insights, newsletter, client portal, multi-language, personalised landing pages. See spec §79.
