# Component Architecture

Every component has one job. Data comes from `src/data`, never hard-coded in components.

```
root.tsx ── SiteHeader · <Outlet/> · SiteFooter · ContactDock
routes/
  home.tsx ─ Hero(SystemCorePoster | lazy SystemCore) · ServicesSection(ServiceVisual) · AgentTrace
             · WorkSection(MissionFile) · ProcessSection · IndustriesSection · CommitmentsBand
             · EstimateSection(QuoteCalculator) · FinalCTA
  work.tsx ─ PageIntro · MissionFile × 4 · build index table (industry filter)
  work.$slug.tsx ─ case study: header · Block × n · SystemDiagram · next project
  services.tsx / services.$slug.tsx ─ PageIntro · service rows / detail (MissionFile proof)
  contact.tsx ─ PageIntro · direct lines · BriefForm · QuoteCalculator
  about · privacy · terms (LegalPage) · not-found (NotFound) · sitemap.ts · robots.ts · system (specimen)
```

| Group | Components | Notes |
|---|---|---|
| `components/ui` | `Button` (link/button, 3 variants, loading), `Label` (mono metadata + live dot), `Field` (input/textarea/select with hint, error and ARIA wiring) | Design-system primitives, specimen at `/system` |
| `components/brand` | `Mark`, `Wordmark` | Live text, not text in an SVG |
| `components/layout` | `SiteHeader` (hide on scroll, `<dialog>` menu), `SiteFooter`, `PageIntro`, `LegalPage` | |
| `components/contact` | `ContactDock`, `BriefForm` (5 steps, all states), `QuoteCalculator` (native radios/checkboxes) | |
| `components/work` | `MissionFile` (whole-card link), `SystemDiagram` (architecture chain) | |
| `sections/home` | One component per homepage section | |

State: local component state only. Shareable state lives in URL params (`industry`, calculator ids). Preferences: currency in `localStorage` (non-essential, wrapped in try/catch).
