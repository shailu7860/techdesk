# Environment

| Variable | Where | Public? | Purpose |
|---|---|---|---|
| `VITE_WEB3FORMS_KEY` | Amplify env vars / `.env.local` | Yes (by design) | Lead form delivery. Without it, the brief shows a WhatsApp/email fallback |
| `SITE_URL` | Amplify env vars | No | Overrides the canonical/OG base (defaults to `https://www.techdesks.in` on Amplify) |
| `BUILD_DIR` | tests only | – | Separate e2e build directory |

Rule: anything prefixed `VITE_` is compiled into public JavaScript. Never put a secret there.
