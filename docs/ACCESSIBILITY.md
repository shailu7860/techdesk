# Accessibility

Target: **WCAG 2.2 AA** (`PRODUCT.md`).

## Verified
- **Automated:** axe (WCAG 2.0/2.1/2.2 A+AA) on 9 routes × desktop and mobile in e2e, with 0 serious or critical violations. Lighthouse accessibility is 100 on the audited pages.
- **Contrast:** `npm run check:contrast` verifies 17 token pairings (ink on void 18:1, muted 8.6:1, signal 13:1, violet 7.6:1). Motion never dims text below AA; AN-002 and AN-003 were redesigned for this.
- **Keyboard (e2e):** the skip link is first and visible on focus; the mobile menu is a native `<dialog>` (focus contained, Esc closes, focus returns); industries use the WAI-ARIA tabs pattern with arrow, Home and End keys; the chat is a modal dialog; the brief moves focus to each step's heading.
- **Reduced motion (e2e):** no WebGL, no smooth scroll, no scrubbing, content fully visible.
- **Forms:** visible labels, "(required)" in text, errors linked with `aria-describedby` and `aria-invalid`, a summary alert, never colour-only.
- **Targets:** interactive controls are at least 44px; the dock is a thumb-zone bar on mobile.
- **Names:** icon buttons have accessible names that include their visible label (label-in-name).
- **Semantics:** landmarks (header, nav × n, main, footer, address), one `h1` per page, tables with captions and scoped headers, decorative SVG and canvas `aria-hidden`.

## Manual checks recommended before launch
- A VoiceOver (iOS) and TalkBack (Android) pass through the brief and the chat.
- 200% browser zoom on the case study and contact pages.
