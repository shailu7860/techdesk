# Deployment (AWS Amplify Gen 2)

The repository is deploy-ready. The steps below need the owner's AWS, Groq and Anthropic accounts, so they are done by the owner. They take about 20 minutes once.

## What gets deployed
| Piece | Where | Defined in |
|---|---|---|
| Static site (prerendered HTML, JS, CSS, fonts) | Amplify Hosting (CloudFront) | `amplify.yml` → `build/client` |
| Chat assistant | AWS Lambda with a public Function URL | `amplify/backend.ts`, `amplify/functions/chat/*` |
| Security + cache headers | Amplify custom headers | `customHttp.yml` (generated) |
| Content-Security-Policy | `<meta>` in every HTML page | `scripts/csp.mjs` (runs in `npm run build`) |

## One-time setup

1. **Push the repo** to GitHub, GitLab, Bitbucket or CodeCommit (run the `security-audit` skill first, per the pre-ship gate).
2. **Create the app:** AWS console → Amplify → *Create new app* → connect the repository → branch `main`. Amplify detects `amplify.yml`. Deploy region: Mumbai (`ap-south-1`) is closest to the owner's market.
3. **Secrets** (Amplify console → your app → *Hosting* → *Secrets* → *Manage secrets*), for the `main` branch:
   - `GROQ_API_KEY`: from console.groq.com
   - `ANTHROPIC_API_KEY`: from console.anthropic.com
   Either key alone works; with both, Groq answers first and Claude is the fallback.
4. **Environment variables** (*Hosting* → *Environment variables*):
   - `VITE_WEB3FORMS_KEY`: free access key from web3forms.com, created with `shailendramishra0127@gmail.com`. It is public by design and only allows sending to that inbox.
   - `CHAT_MAX_CONCURRENCY=5` (recommended; caps worst-case LLM spend. Leave unset only if the deploy fails with a concurrency-quota error on a brand-new AWS account.)
   - `SITE_URL=https://yourdomain.com`: only once a custom domain exists (it also becomes the only allowed chat origin).
5. **Rewrites and redirects** (*Hosting* → *Rewrites and redirects* → *Manage* → JSON editor). This serves the designed 404 page with a real 404 status:
   ```json
   [
     { "source": "/<*>", "target": "/404/index.html", "status": "404" }
   ]
   ```
   Amplify serves existing files (including `/work/stratos/index.html` for `/work/stratos`) before this rule applies. Status `404` (rewrite) returns the designed page with a real 404 status, which is correct for crawlers and is what `scripts/serve.mjs` emulates. **Verify after the first deploy:** `/work/stratos` loads the case study and `/does-not-exist` shows the designed 404.
6. **Spend limits:** set a monthly budget in the Groq and Anthropic consoles, and an AWS Budget alert. The chat function also caps input (1,000 characters, 12 turns), output (500 tokens) and per-IP rate (20 requests per 10 minutes per instance).

## Every deploy
Push to `main`. Amplify runs:
1. **Backend:** `npm ci` → `ampx pipeline-deploy` (deploys the chat Lambda and writes `amplify_outputs.json` with `custom.chat_url`).
2. **Frontend gate:** `npm run lint`, `npm run typecheck`, `npm test`. A failure stops the deploy.
3. **Build:** `npm run build`. The chat URL is read from `amplify_outputs.json`, and the CSP `connect-src` automatically includes the chat origin.

Preview environments: connect another branch in Amplify; it gets its own URL and its own Lambda.

## After the first deploy: checklist
- [ ] Home, `/work/stratos`, `/contact` load on the `*.amplifyapp.com` URL (HTTPS)
- [ ] `/does-not-exist` shows the designed 404
- [ ] `curl -I https://<url>/` shows `strict-transport-security`, `x-frame-options: DENY`, `x-content-type-options: nosniff`
- [ ] Send a test brief and confirm it arrives in the inbox
- [ ] Open chat, ask "What do you build?", and get an answer; then check the Lambda logs contain no message content
- [ ] WhatsApp and Call buttons open the right number on a phone
- [ ] Share `/work/stratos` in WhatsApp or LinkedIn and confirm the preview image appears
- [ ] Submit `https://<url>/sitemap.xml` in Google Search Console

## Local backend testing (optional)
`npx ampx sandbox` deploys a personal cloud sandbox of the chat function (needs local AWS credentials). Set secrets with `npx ampx sandbox secret set GROQ_API_KEY`. The sandbox writes `amplify_outputs.json`, which `npm run dev` then uses automatically.

## Rollback
Amplify console → *Deployments* → redeploy a previous build, or `git revert` and push.
