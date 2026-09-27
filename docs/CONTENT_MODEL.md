# Content Model

All content is typed TypeScript in `src/data/`. It is the single source for pages, prerender paths, the sitemap and JSON-LD. To move to a CMS later, replace each module's exports with build-time fetches that return the same types.

| File | Type | Key fields | Used by |
|---|---|---|---|
| `projects.ts` | `Project` (+ optional `CaseStudy`) | `slug`, `code`, `title`, `tagline`, `industry`, `industries[]`, `services[]`, `status`, `url?`, `summary`, `stack[]`, `caseStudy?` {`problem[]`, `approach`, `architecture[]`, `features[]`, `challenges?`, `role`, `visualsPending?`} | Work, case studies, home, industries, chat, sitemap, OG images |
| `services.ts` | `Service` | `slug`, `code`, `name`, `outcome`, `summary`, `capabilities[]`, `stack[]`, `visual`, `estimateType` | Services pages, home, footer, chat |
| `industries.ts` | `Industry` | `key`, `name`, `example`, `services[]`, `project` | Home industries tabs, work filter |
| `process.ts` | `Stage` | `code`, `name`, `objective`, `activities[]`, `deliverables[]` | Home, about, chat |
| `pricing.ts` | `ProjectType`, sizes, add-ons | per-size bands in INR and USD (`max: null` = "from") | Calculator, chat |
| `company.ts` | `commitments`, `site` | | Home, about, chat, SEO |
| `contact.ts` | `contact` | phone, WhatsApp, email, city, hours, reply promise | Dock, footer, contact, legal, chat |
| `navigation.ts` | nav arrays | | Header, footer |

## Rules
- A case study exists only if `caseStudy` is present; other projects appear in the build index.
- Never add metrics, outcomes, clients or testimonials unless they are real and approved (`CLAUDE.md`). `tests/unit/data.test.ts` fails on known template filler.
- Missing screenshots: set `visualsPending: true`. The page shows the system diagram, with a `[CONTENT NEEDED]` note in dev builds only.
- References are checked by tests: industry→project, industry/project→service, service→calculator type.
