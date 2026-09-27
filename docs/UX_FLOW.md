# UX Flow

This file covers journeys across the site.

## 1. Visitor journey
```
Landing (referral / LinkedIn / search, often mobile)
  ↓
Hero: understands the offer in outcomes (BR-01) ─────────────┐
  ↓                                                           │ any moment:
Services: "they build what I need"                            │ Dock → WhatsApp · Call · Chat
  ↓                                                           │
AI trace: "they build real agents" → Discuss your AI project  │
  ↓                                                           │
Proof: flagship mission files → case study /work/:slug        │
  ↓                                                           │
Process + Industries: trust ("they've done my kind of thing") │
  ↓                                                           │
Estimate: "what would it cost?" → indicative range            │
  ↓                                                           │
Contact: brief · WhatsApp · Call ◄────────────────────────────┘
```

## 2. Calls to action
| Level | CTA | Where | Goes to |
|---|---|---|---|
| Primary | **Start a project** | Nav, hero, final CTA, case study end | `/contact` (brief step 1) |
| Instant | **WhatsApp** | Dock, final CTA, calculator result, contact page | `wa.me` with context-prefilled text (page, project or estimate) |
| Instant | **Call** | Dock, final CTA, contact page | `tel:` (on desktop the number is shown and copyable, since many desktops cannot dial) |
| Secondary | **Explore our work ↓** | Hero | Scrolls to Work |
| Secondary | **View case study** | Work files, industries panel | `/work/:slug` |
| Tertiary | **Ask our agent** | AI section, dock | Chat panel |
| Tertiary | **Get an estimate** | Services, contact page | Calculator |

Rule: a viewport shows at most one primary CTA. The dock does not count; it is persistent chrome.

## 3. Navigation
- **Desktop:** the TECHDESK wordmark (home) plus Work · Services · Process · About, and a `Start a project` button. The bar hides on scroll-down and reappears on scroll-up or focus. The current route is marked by more than colour alone.
- **Mobile:** wordmark plus a menu button, which opens a full-screen sheet with large links, WhatsApp, Call and Start a project. Focus is trapped while open, Esc closes it, and focus returns to the menu button.
- A skip link ("Skip to content") is the first focusable element on every page.

## 4. Quick-contact dock
- **Desktop:** a bottom-right vertical cluster of three icon buttons (WhatsApp, Call, Chat) with visible text tooltips on hover and focus.
- **Mobile:** a slim bottom bar with three labelled buttons (44px or taller, safe-area inset). It hides while the menu or chat is open and while the contact form is focused (the keyboard is up).
- WhatsApp prefill is contextual: `Hi TechDesk, I'm looking at <page/project> and would like to discuss…`. It never includes personal data.

## 5. Contact journey (brief)
1. **Who are you?** Name, company (optional), role (optional).
2. **What are you building?** Project type (from services), industry, short description.
3. **What do you need?** Scope chips, timeline, budget band (the calculator range is carried over if present).
4. **How can we reach you?** Email (required), phone or WhatsApp (optional), preferred channel.
5. **Transmit request.** Review, then submit: loading → success ("Received. We reply within [CONTENT NEEDED: SLA]", with a WhatsApp shortcut) or error (inputs kept, retry, and WhatsApp offered as a fallback).

Validation happens on blur and on step advance, with inline messages announced to screen readers. Progress is shown as `Step n of 5`. Inputs survive back navigation.

## 6. Estimate journey (calculator)
Type → size → add-ons → **range** (mono, with a disclaimer that it is an indicative range and not a quote) → "Send this to us" (the brief opens with the selection prefilled) or "Discuss on WhatsApp" (prefilled summary). Selections are kept in URL params so the estimate is shareable.

## 7. Chat journey
Open from the dock or "Ask our agent" → greeting plus 3 suggested prompts ("What do you build?", "Have you built a marketplace?", "How do I start?") → typing state → answer grounded in site data, with links to the relevant work or service → if the question is project-specific or pricing-heavy, it offers the calculator, brief or WhatsApp. Unavailable state: a single calm message plus the three human routes. The panel is a modal `<dialog>`: Esc closes it and focus returns to the launcher.

## 8. Project discovery journey
Home work gallery or `/work` index → filter by industry or service (URL param) → `/work/:slug` case study (sections from spec §17, empty ones omitted) → "Next project" plus "Start a project like this" (the brief is prefilled with the project type) → WhatsApp.

## 9. Error and edge journeys
| Case | Behaviour |
|---|---|
| Unknown URL | 404: "System error / 404. The requested module does not exist." → Return to base · View work · WhatsApp |
| Unknown project slug | The same 404 with "Project not found" and links to the work index |
| Offline or network error on submit | Inputs kept; retry; WhatsApp or call offered |
| JS fails to load | The prerendered pages remain fully readable; `wa.me` and `tel:` links still work (plain anchors) |
