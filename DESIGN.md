---
name: TechDesk
description: A technology studio from the near future — cinematic, precise, and one tap from a human.
---

<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: TechDesk

## 1. Overview

**Creative North Star: "The Instrument in the Dark."**

TechDesk looks like a precision instrument switched on in a dark room. A near-black field, crisp white type, and a single electric-blue signal that marks what is live and actionable. The darkness is the room. The light is the work. Nothing glows unless it has a job.

The experience is **choreographed, not decorated**. The hero load is orchestrated. Two or three signature scroll sequences carry the story: the AI agent workflow (observe, reason, act), the project showcase, and the idea-to-product pipeline. Each is a *demonstration* in the spirit of Active Theory and Lusion, where the viewer should ask "how was this built?". Everything between those moments is calm, responsive and fast, with Stripe-grade clarity: information hierarchy first, delightful detail second.

This system explicitly rejects **generic agency templates** (hero plus three icon cards plus testimonials plus a pricing grid, as in the owner's earlier `digital-ascent` and portfolio sites), **fake spaceship dashboards**, and **neon overload**.

**Key Characteristics:**
- Pure near-black canvas, white ink, one electric-blue signal colour.
- Violet appears only where AI is thinking or acting.
- An engineered display face does the talking; mono is reserved for system labels.
- Two or three choreographed signature moments; everything else stays still until touched.
- A human contact route (WhatsApp, call, chat, quote) is always within reach.

## 2. Colors

**The Signal Rule.** Colour means something here. Blue marks "live / actionable". Violet marks "AI at work". Everything else is neutral. If a colour is on screen, a visitor must be able to say what it means.

### Primary
- **Signal Blue** (electric blue leaning cyan, `[to be resolved during implementation]`): the only accent on the canvas. Used for primary CTAs, focus rings, active states, live indicators and links. It covers at most 10% of any viewport.

### Secondary
- **Agent Violet** (indigo-violet anchored at OKLCH hue ≈294, `[to be resolved during implementation]`): appears **only** in the AI agent section, the chatbot and AI-specific project states. Never used for decoration, never on generic UI.

### Neutral
- **Void** (pure near-black, chroma 0, `[to be resolved during implementation]`): the page canvas. Never tinted warm or blue.
- **Panel** (Void lifted slightly toward white): raised surfaces such as the dock, chatbot, calculator and inputs.
- **Ink** (near-white): headlines and body text. At least 7:1 contrast against Void.
- **Muted Ink**: secondary text and metadata. At least 4.5:1 against Void, because it carries real information.
- **Hairline** (low-contrast white): thin structural borders, grid lines and corner markers.

**The Ten Percent Rule.** Signal Blue never covers more than about 10% of a viewport. When everything glows, nothing signals.

**The No-Neon Rule.** Glow, bloom and outer shadows are forbidden, with one exception: the single live indicator of an active system state. Gradient text is prohibited.

## 3. Typography

**Display Font:** `[engineered display face to be chosen at implementation]`
**Body Font:** the display family at text sizes, unless the chosen face lacks a text optical size.
**Label/Mono Font:** `[monospace to be chosen at implementation]`

**Character:** display plus mono. A distinctive, engineered display face carries the voice: headlines, body and CTAs. A monospace is used **only** for system language: project IDs (`PROJECT / 01`), status (`STATUS / ONLINE`), coordinates, technology names and calculator figures.

Selection brief for implementation: three physical-object words, **"machined, calm, luminous"**, like the engraved face-plate of lab equipment. Reject the reflex list in the brand reference, which includes Space Grotesk, Inter, Space Mono, IBM Plex, Outfit, DM Sans and Syne, and any "sci-fi" display face such as Orbitron or Exo. Fonts are self-hosted and subset.

### Hierarchy
- **Display** (heavy contrast, fluid `clamp()` with a maximum of 6rem or less, letter-spacing no tighter than −0.04em, `text-wrap: balance`): hero statements and section climaxes only.
- **Headline** (a step at least 1.25× below Display): section headings.
- **Title**: project names, service names, form step titles.
- **Body** (lines capped at 65–75ch, line-height increased 0.05–0.1 for light-on-dark text, `text-wrap: pretty`): all prose.
- **Label** (mono, small, used sparingly): system metadata only.

**The Mono-Is-Metadata Rule.** Monospace is never used for headlines or paragraphs. It is the instrument's engraving, not its voice.

**The One-Kicker Rule.** No small uppercase tracked eyebrow above every section. Numbered markers (`01 / 02`) appear only where order is real: the process pipeline, the contact steps and the project index.

## 4. Elevation

Layered, with depth expressed through **light and parallax, not drop shadows**. Surfaces separate from Void through slight lightening (Panel) and hairline borders. In the choreographed sequences, depth comes from scroll-driven parallax layers and, at most once per page, a lazy-loaded WebGL scene that is desktop-only and has a static fallback. Shadows as a lifting device are prohibited on the dark canvas.

**The Flat-at-Rest Rule.** Surfaces are flat at rest. Depth appears only in response to scroll or interaction.

## 5. Components

`[Omitted in seed. Components are documented on the first scan-mode run, after the Phase 2 design system is built.]`

## 6. Do's and Don'ts

### Do:
- **Do** make every signature moment demonstrate a capability TechDesk sells. If an effect proves nothing, cut it.
- **Do** keep WhatsApp, call, chat and quote reachable from every scroll position, with touch targets of at least 44px.
- **Do** render every section fully visible without JavaScript or motion. Reveals enhance a visible default and never gate it.
- **Do** give every animation a `prefers-reduced-motion` alternative (instant or crossfade).
- **Do** use real project visuals such as Biexor, Stratos and BidMaster screens and system diagrams. Use honest `[CONTENT NEEDED]` placeholders where assets are missing.

### Don't:
- **Don't** build a **generic agency template**: hero plus three icon cards plus testimonials plus a pricing grid. If a section could appear on `digital-ascent`, redesign it.
- **Don't** build a **fake spaceship dashboard**: HUD chrome everywhere, blinking panels, gaming aesthetics, "sci-fi" fonts.
- **Don't** use **neon overload**: multiple glowing colours, gradient text, cheap particle backgrounds, random glows.
- **Don't** use **generic AI imagery**: glowing brains, robot hands, blue circuit boards.
- **Don't** use the **SaaS hero-metric template** (big number, small label, gradient accent), and never with invented stats.
- **Don't** use liquid-glass or glassmorphism as decoration.
- **Don't** make visitors wait. No preloader longer than the real load, and no scroll-jacking that fights input.
- **Don't** use identical card grids, side-stripe accent borders, or colour as the only carrier of state.
