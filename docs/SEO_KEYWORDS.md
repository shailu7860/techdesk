# SEO keyword research and map

Research date: 2026-09-25. Target market: **worldwide** (owner), with India and Indore as a secondary local layer.

## Method and limits
- **Demand signals:** Google Autocomplete (India and US) for about 40 seed queries. Autocomplete only shows queries people actually type, so it confirms demand and reveals phrasing and intent (cost, company, services, near me).
- **Competition:** live search results for sample head and long-tail terms.
- **Limit:** no paid keyword tool (Ahrefs, SEMrush, Keyword Planner) was available, so there are **no exact monthly volumes** here. After launch, Google Search Console shows the real impressions and positions per query. Re-prioritise with that data after 6 to 8 weeks.

## Findings
1. **Head terms are saturated** by large agencies and listicles with years of backlinks: "AI agent development company", "software development company", "custom software development company India", "SaaS development company". A new domain will not rank for these quickly, so they are targeted only indirectly (titles and service pages).
2. **Winnable long-tail terms match real TechDesk proof:**
   - WhatsApp AI agents: "whatsapp chatbot development", "whatsapp ai agent for business", "whatsapp chatbot development cost", "whatsapp ai agent price". Results are thin (freelancers, small agencies, no-code tools).
   - Algo trading: "algo trading software development", "crypto algo trading software development", "algo trading software cost". Proof: Stratos.
   - Marketplaces: "marketplace development company", "b2b marketplace development company", "online marketplace development company". Proof: Biexor.
   - Browser extensions: "chrome extension development company", "chrome extension development services", "browser extension development company". Few competitors. Proof: BidMaster.
   - Global outsourcing intent: "outsource software development to india", "hire dedicated developers in india", "hire ai developers in india", "offshore software development company in india".
3. **Cost questions carry high informational demand:** "ai agent development cost 2026", "how much does it cost to build an ai agent", "cost to build a saas platform", "how much does it cost to build a saas platform in india". Current results quote five- and six-figure USD sums; TechDesk's INR/USD bands are a real differentiator.
4. **Local:** "software development company in indore", "web development company in indore", "app development company indore", "seo company in indore", "digital marketing agency in indore".

## Keyword → page map (one primary keyword per page)
| Page | Primary keyword | Secondary |
|---|---|---|
| `/` | AI agent and software development company | AI and software development company in India; worldwide |
| `/services/ai-automation` | AI agent and automation development | AI chatbot development, RAG, workflow automation |
| `/services/web-product-engineering` | web app and SaaS development | React, Next.js, dashboards, e-commerce |
| `/services/software-engineering` | backend, API and integration engineering | Node.js, PostgreSQL, integrations |
| `/services/digital-marketing` | SEO and digital marketing for leads | technical SEO |
| `/services/digital-transformation` | digital transformation and MVP development | legacy modernisation, internal tools |
| `/solutions/whatsapp-ai-agent-development` | WhatsApp AI agent development | WhatsApp chatbot development (cost), for business |
| `/solutions/algo-trading-software-development` | algo trading software development | algo trading platform, trading bot, crypto algo trading |
| `/solutions/marketplace-development` | marketplace development company | B2B / online marketplace development |
| `/solutions/chrome-extension-development` | Chrome extension development company | browser extension development |
| `/solutions/saas-development-company` | SaaS development company | SaaS product development, SaaS company in India |
| `/solutions/hire-developers-india` | hire dedicated developers in India | outsource to India, hire AI developers, offshore |
| `/solutions/fintech-software-development` | fintech software development company | trading platform, financial software |
| `/solutions/software-development-company-indore` | software development company in Indore | web development company in Indore, AI development company in Indore |
| `/blog/ai-agent-development-cost` | AI agent development cost | how much does it cost to build an AI agent (2026) |
| `/blog/saas-development-cost` | cost to build a SaaS platform | SaaS MVP cost in India |
| `/work/*` | "<project> case study" | brand and proof queries |

Uniqueness of primary keywords is enforced by `tests/unit/seo-content.test.ts`.

## Technical SEO in place
- Every page prerendered to static HTML: full content, including FAQ answers, is visible to crawlers without JavaScript.
- Unique titles (60 characters or fewer) and descriptions (70 to 160) per page, enforced by `npm run seo:audit` (part of `npm run verify`).
- Canonical, robots (`max-image-preview:large`), Open Graph (with locale and image alt) and X cards on every page; 20 generated share images.
- Structured data: ProfessionalService (address, hours, contact point, service area, offer catalog), WebSite, BreadcrumbList, Service, CreativeWork (case studies), Article (guides), FAQPage.
- `sitemap.xml` with `lastmod` and priority; `robots.txt`; `llms.txt` for AI search engines; web manifest and icons.
- Internal linking: header and footer to solutions and guides; solutions link to services, case studies and guides; guides link back to solutions and the estimator.
- Real 404 status for unknown URLs (Amplify rewrite rule in DEPLOYMENT.md).

## Owner actions after launch (these matter as much as the code)
1. Canonical URLs and the sitemap use `https://www.techdesks.in` on Amplify builds (set in `vite.config.ts`).
2. **Google Search Console:** verify the domain, submit `/sitemap.xml`, and request indexing of the solution pages and guides.
3. **Google Business Profile** for "TechDesk, Indore": the strongest single lever for the Indore keywords. Use the same name, phone and address as the site.
4. **Bing Webmaster Tools:** import from Search Console (also feeds ChatGPT search and Copilot).
5. **Backlinks:** list TechDesk on Clutch, GoodFirms and DesignRush; link to it from LinkedIn, GitHub, the Stratos and Biexor sites ("Built by TechDesk") and the BidMaster store listing.
6. **Publish regularly:** one guide per month. Candidates from the research: "WhatsApp chatbot development cost", "Chrome extension development cost", "algo trading software cost in India", "outsourcing software development to India: a buyer's guide".
7. **Add screenshots** to the case studies (image search and richer previews).
