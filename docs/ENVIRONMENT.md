# Environment

| Variable | Where | Public? | Purpose |
|---|---|---|---|
| `VITE_WEB3FORMS_KEY` | Amplify env vars / `.env.local` | Yes (by design) | Lead form delivery. Without it, the brief shows a WhatsApp/email fallback |
| `VITE_CHAT_URL` | Auto from `amplify_outputs.json` | Yes | Chat endpoint. Without it, the chat shows the human handoff |
| `SITE_URL` | Amplify env vars | Yes | Canonical/OG base and the allowed chat origin (set when a custom domain exists) |
| `ALLOWED_ORIGINS` | Amplify env vars | – | Extra allowed chat origins, comma-separated |
| `CHAT_MAX_CONCURRENCY` | Amplify env vars | – | Reserved concurrency cap for the chat Lambda (recommended: 5) |
| `GROQ_API_KEY` | Amplify **secret** | **No** | Chat provider 1 |
| `ANTHROPIC_API_KEY` | Amplify **secret** | **No** | Chat provider 2 (fallback) |
| `CHAT_CHAIN` | `amplify/functions/chat/resource.ts` | – | Provider order, e.g. `groq:openai/gpt-oss-20b,anthropic:claude-haiku-4-5` |
| `BUILD_DIR` | tests only | – | Separate e2e build directory |

Rule: anything prefixed `VITE_` is compiled into public JavaScript. Never put a secret there.
