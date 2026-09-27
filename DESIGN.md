---
name: TechDesk
description: A technology studio from the near future — cinematic, precise, and one tap from a human.
colors:
  void: "oklch(0.13 0.02 175)"
  panel: "oklch(0.18 0.025 170)"
  panel-hi: "oklch(0.23 0.03 168)"
  hairline: "oklch(0.34 0.04 165)"
  ink: "oklch(0.97 0.01 160)"
  muted: "oklch(0.78 0.025 160)"
  subtle: "oklch(0.66 0.025 160)"
  signal: "oklch(0.8 0.19 152)"
  signal-hi: "oklch(0.87 0.16 152)"
  agent: "oklch(0.76 0.14 290)"
  danger: "oklch(0.74 0.16 25)"
  nebula-a: "oklch(0.62 0.17 155)"
  nebula-b: "oklch(0.6 0.13 190)"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.1rem + 5.6vw, 6rem)"
    fontWeight: 640
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.35rem + 2.6vw, 3.5rem)"
    fontWeight: 640
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Martian Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "2px"
  md: "4px"
  lg: "8px"
spacing:
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 3rem)"
  section: "clamp(5rem, 3rem + 8vw, 11rem)"
  container: "88rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.void}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.signal-hi}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 20px"
  field:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 16px"
  dock-button:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    width: "48px"
    height: "48px"
---
<!-- Updated 2026-09-24 for the owner's "green nebula galaxy" direction. Tokens in frontmatter are normative. -->

> **Current direction (owner, 2026-09-24):** dark deep-space site with an animated starfield, solid-colour
> nebula blurs, a flat-shaded green planet, glass panels, green accent, sentence case, 1280px (xl) width.
> **No gradients and no box shadows anywhere** (enforced by `tests/unit/style-rules.test.ts`). Every ambient
> animation obeys reduced motion and the site-wide Pause motion toggle. Where older prose below conflicts
> (e.g. "no glow", mono labels, uppercase), this note wins.

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
- **Signal Blue** (electric cyan-blue, pale enough that void text sits on it at 13:1): the only accent on the canvas. Used for primary CTAs, focus rings, active states, live indicators and links. It covers at most 10% of any viewport.

### Secondary
- **Agent Violet** (indigo-violet, hue 294, the palette seed; used as text and lines, never as a fill carrying text): appears **only** in the AI agent section and AI-specific project states. Never used for decoration, never on generic UI.

### Neutral
- **Void** (pure near-black, chroma 0): the page canvas. Never tinted warm or blue.
- **Panel** (Void lifted slightly toward white): raised surfaces such as the dock, calculator and inputs.
- **Ink** (near-white): headlines and body text. At least 7:1 contrast against Void.
- **Muted Ink**: secondary text and metadata. At least 4.5:1 against Void, because it carries real information.
- **Hairline** (low-contrast white): thin structural borders, grid lines and corner markers.

**The Ten Percent Rule.** Signal Blue never covers more than about 10% of a viewport. When everything glows, nothing signals.

**The No-Neon Rule.** Glow, bloom and outer shadows are forbidden, with one exception: the single live indicator of an active system state. Gradient text is prohibited.

## 3. Typography

**Display and Body Font:** **Archivo** (Omnibus-Type, variable: width 62–125, weight 100–900). Display runs expanded (118% width, weight 640) like an engraved equipment plate; body runs at normal width. One family, contrast carried by *width*, not by a second face.
**Label/Mono Font:** **Martian Mono** (Evil Martians, variable), a distinctive technical mono for system labels only.
Both are self-hosted through Fontsource; `unicode-range` subsets mean only the Latin files load for English pages.

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

Live specimen: `/system` (noindex). Components live in `src/components/`.

### Buttons
- **Primary** (Signal fill, Void text, 2px radius, 44px minimum height, 52px when large): one per viewport. Hover lifts to Signal-hi; the trailing glyph (→ ↓) nudges 2px. Loading shows a small spinner, keeps the label, sets `aria-busy`, and disables the button.
- **Secondary** (hairline outline, Ink text): hover turns the border to Ink. Used beside a primary action.
- **Ghost** (text only): hover shows Signal plus an underline. Used for in-flow links such as "View case study".
- All buttons use Archivo at 112% width and weight 500. Transitions run 220ms with ease-out-quart on colour properties only, so hover never shifts layout.

### Labels (system engraving)
Martian Mono, 12px, uppercase, tone muted, signal or agent. The optional live dot is the single permitted glow; its ping stops under reduced motion, and it is always paired with status text.

### Inputs / Fields
Panel fill, hairline border, 2px radius, 48px minimum height, Subtle placeholder (5:1). Focus turns the border Signal and adds the global 2px Signal focus ring. Errors turn the border Danger and add a `!` message wired through `aria-describedby`, so they never rely on colour alone. Labels are always visible, and required fields say "(required)" in text.

### Navigation
A sticky hairline bar (wordmark · Work · Services · Process · About · primary CTA) that hides on scroll-down and returns on scroll-up or focus. The active route is marked by a Signal underline, never colour alone. Mobile: a full-screen native `<dialog>` with display-size links and WhatsApp/Call buttons.

### Mission file (signature component)
A flagship project as an instrument panel: mono `PROJECT / 01` plus live status, the name in Display, then Industry / Problem / Stack as labelled rows. The whole panel is one link; hover shifts the border toward Signal. Laid out as a pinned horizontal track on wide screens and a grid or stack elsewhere. Never used as a generic card grid.

### Chat panel
The only surface with an Agent Violet border and bubbles. It is a modal dialog: a bottom-right panel on desktop, full screen on mobile. Replies are plain text. Failure states always resolve to WhatsApp / Call / Brief buttons, never a dead end.

### Quote calculator
Native radios and checkboxes styled as bordered choices (the `:has(:checked)` state shows a Signal border and tint). The result sits in a Panel column in Martian Mono, next to an INR/USD segmented toggle. "Indicative range, not a quote" is always visible.

### Quick-contact dock (signature component)
Plain anchors (`wa.me`, `tel:`), so it works without JS. On desktop it is a bottom-right stack of 48px Panel squares with mono text tooltips on hover and focus. On mobile it is a full-width bottom bar with labelled buttons (64px tall, safe-area aware) and body padding so no content hides behind it.

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
