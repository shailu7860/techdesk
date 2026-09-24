# Contributing

1. Read `CLAUDE.md` (rules and decisions), `PRODUCT.md` (who and why) and `DESIGN.md` (visual system).
2. Content changes go in `src/data/`. Never invent metrics, clients or testimonials.
3. Before a PR: `npm run verify && npm test && npm run test:e2e`.
4. New dependency: add a one-line reason to `docs/TECH_STACK.md`, and prefer the platform or a few lines of code.
5. New animation: follow the rules in `docs/ANIMATION_SYSTEM.md` (static first, AA at every frame, reduced-motion path).
6. UI: use the tokens in `src/styles/tokens.css`, never raw colours; run `npm run check:contrast` after token changes.
7. Before any deploy or push: run the `security-audit` skill; no open Critical/High findings.
8. Commits: imperative mood, one concern per commit.
