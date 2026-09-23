# Design Brief: Homepage

Status: **CONFIRMED by owner 2026-09-23** · Source: `/impeccable shape homepage` · Anchors: `PRODUCT.md`, `DESIGN.md`, `SPEC.md` §6–§23

## 1. Feature Summary
The TechDesk homepage is a single cinematic scroll. It must make founders, SMB owners and enterprise buyers all understand what TechDesk does, believe it is serious, and contact it. The page itself is the capability demo: one WebGL moment, two scroll-choreographed sequences, and calm, fast clarity everywhere else.

## 2. Primary User Action
**Start a conversation.** That means WhatsApp, a call, the chatbot, the quote calculator or the project brief, whichever suits the visitor. The secondary action is opening a flagship case study.

## 3. Design Direction
- **Colour strategy:** Restrained. Pure near-black canvas, Ink, Signal Blue at most 10%. **Agent Violet appears only in the AI section and the chatbot** (DESIGN.md, The Signal Rule).
- **Scene sentence:** a founder or CTO opens the link at night on a laptop or phone after a referral, curious but sceptical, and should feel they have stepped into a quiet control room where something precise is already running. The dark theme is forced by the scene.
- **Anchors:** *Lusion / Active Theory* for the hero system core and the AI trace; *Stripe* for how the services and work sections explain with visuals rather than decorate.
- **Per-surface override:** none.

## 4. Scope
Production quality for the full homepage, built in the spec's order: **static layout → content → interaction → motion → WebGL** (spec §62–63). The page must be complete and shippable at each stage.

## 5. Layout Strategy
One dominant idea per viewport. Rhythm alternates between **loud** (hero, AI, work) and **quiet** (services, process, industries, estimate). This deliberately avoids repeating one reveal pattern down the page.

| # | Section | Idea | Layout (desktop → mobile) |
|---|---|---|---|
| 0 | **Nav** | Wordmark · Work · Services · Process · About · `Start a project` | Thin top bar that hides on scroll-down and returns on scroll-up → full-screen menu sheet |
| 1 | **Hero: "The system core"** | *We engineer digital systems for what's next.* An outcome subline, `Start a project →`, and `Explore our work ↓` | Headline sits left over a WebGL field of connected nodes. Each node is one of TechDesk's five capabilities. Nodes assemble on load and lean toward the cursor; hovering one labels it (mono). → Static SVG constellation with no WebGL |
| 2 | **Services: "What we build"** | The five service lines, written as outcomes (spec §4, §19) | The hero nodes scatter into five rows as you scroll. List on the left; a sticky visual panel on the right swaps per service (architecture sketch, agent flow, UI preview, SEO signal, legacy-to-modern) → accordion with an inline visual |
| 3 | **AI: "Intelligence that acts."** | A real agent trace: *a lead messages on WhatsApp → the agent qualifies → checks the calendar tool → books a call → logs to CRM → replies* | Pinned, scroll-scrubbed trace (User → Agent → Reason → Tools → Data → Action → Result). This is the only violet section. It ends with **"Ask our agent"**, which opens the real chatbot, so the demo becomes live proof → vertical stepped trace, no pinning |
| 4 | **Work: "Proof"** | Four flagship "mission files": **Biexor, Stratos, BidMaster, 1Bull** | Pinned horizontal gallery. Each file shows its ID (mono), name, industry, problem, system and stack, plus a `View case study` action (cursor label reads VIEW) → vertical stack. Below it: an **index list** of the other eight builds as a sortable table-like list (project · industry · stack), **not** a card grid |
| 5 | **Process: "From idea → product"** | Seven stages: Discover → Define → Design → Engineer → Test → Deploy → Evolve | A single line draws as you scroll and nodes light up in turn. Tapping or focusing a stage expands its objective, activities and deliverables. The numbers are real sequence (One-Kicker Rule allows it) → vertical timeline |
| 6 | **Industries: "Built for real business"** | Only industries backed by real work: Fintech · Marketplaces · E-commerce · Healthcare · Education · Real estate · Enterprise/procurement · Gaming | Selector on the left; the right side swaps an example solution and the linked project → horizontal chip scroller plus a panel |
| 7 | **Estimate: "What would it take?"** | Inline quote calculator, three quick steps, showing an **indicative range** | A compact instrument panel (type → size → add-ons → range in mono). It hands off to "Send this to us" (brief prefilled) or WhatsApp (prefilled text) |
| 8 | **Final CTA: "What will you build next?"** | A climax statement with three equal-weight routes: **WhatsApp · Call · Start a project** | Full-viewport, quiet type. The system core returns as a faint echo and resolves into the footer |
| 9 | **Footer** | Spec §23 links, contact, legal | Dense, calm, hairline grid |
| ∞ | **Quick-contact dock** | WhatsApp · Call · Chat | Fixed bottom-right cluster on desktop; bottom bar on mobile (thumb zone, 44px or larger). It hides only while the full-screen menu or chatbot is open |

Spec items **deliberately merged**: "Capability signal" and "Technology intro" become the hero-to-services transition, because a separate stats band would be the hero-metric anti-pattern. "Case studies" are folded into Work. "Why us" is **omitted until the owner supplies real commitments** (Open Question 2); it will not be filled with generic claims.

## 6. Key States
| Surface | States |
|---|---|
| Whole page | **No-JS / pre-hydration:** the prerendered HTML is fully readable, with all content visible and no motion gating. **Reduced motion:** no pinning, scrubbing or parallax; instant or crossfade reveals; static SVG hero. **Low-end or mobile:** no WebGL, simplified sequences |
| Hero WebGL | Static SVG poster first (it is the LCP-safe default) → the scene lazy-loads after idle → if the GPU fails or is unavailable, the poster stays. There is no preloader; the boot animation is the node assembly itself and runs at most 1.2s |
| Work | Missing screenshot shows a system-diagram treatment plus `[CONTENT NEEDED]` in dev builds only. Unconfirmed outcomes are omitted, never estimated |
| Calculator | Pristine (a helpful default preselected) · computing (instant) · result range · "prices unconfirmed" dev flag · handoff success |
| Chatbot (from AI section and dock) | Lazy chunk loading → greeting with suggested prompts → typing state then answer (streaming P2) → **unavailable** (every provider failed, timed out or rate-limited), which offers WhatsApp, call and brief instead of an error dead-end → handoff |
| Dock | Default · menu or chat open (hidden) · outside business hours (optional note, [CONTENT NEEDED]) |

## 7. Interaction Model
- **Scroll** drives the story: GSAP ScrollTrigger scrubs are tied directly to input, and Lenis only smooths, never delays. Only sections 2, 3, 4 and 5 are choreographed; sections 6–9 respond to interaction only.
- **Cursor** (desktop only, fine pointer): the native cursor stays. A small label follower appears only on work files (VIEW), CTAs (START) and the gallery (DRAG).
- **Keyboard:** every choreographed section is fully operable with Tab and arrow keys. Pinned sections never trap focus. A skip link goes to main content.
- **Click on a flagship:** a short (≤400ms) dark-layer transition leads to `/work/:slug`, which is prerendered.
- **Every CTA** fires a provider-agnostic analytics event (spec §42).

## 8. Content Requirements
- **Copy:** hero line (spec) plus the subline; five service outcome headlines (spec §4 rewritten as outcomes); the AI trace scenario; seven process stages with objective, activities and deliverables; industry examples tied to real projects; final CTA; calculator labels and the disclaimer ("Indicative range, not a quote").
- **Project data (4 flagships):** problem, system, stack, role, and optional outcome (only if real). Sources are the Stratos PRD/TRD/overview, the 1Bull README and docs, the BidMaster manifest, and the Biexor live app.
- **Media roles:** flagship screenshots or recordings (**owner to supply**: Biexor QA and production, Stratos UI, BidMaster in use, 1Bull); service visuals as semantic SVG diagrams built in code; the hero as WebGL plus an SVG poster; OG images per route. **No stock photography and no AI-brain imagery.**
- **Contact:** WhatsApp number, phone number, email, location and business hours are all **[CONTENT NEEDED]**.

## 9. Recommended References (for implementation)
`animate.md` (the choreographed sequences) · `layout.md` (loud/quiet rhythm) · `typeset.md` (font selection in Phase 2) · `interaction-design` guidance for the calculator and chatbot · `harden.md` (chatbot failure and handoff states) · `adapt.md` (mobile simplification) · `audit.md` before ship.

## 10. Open Questions
1. **Pricing for the calculator:** which currency (INR, USD, or both with a toggle), and what are the real base prices and multipliers? digital-ascent's USD figures ($3k web / $4k AI, ×1/2.5/5) are placeholders until you confirm them.
2. **"Why TechDesk" commitments:** give 3–4 true statements (e.g. "You own the code", "Weekly demos", "Direct line to the engineer"). Without them, the section stays out.
3. **Contact details:** WhatsApp and call number(s), email, city.
