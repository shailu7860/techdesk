# Deployment (AWS Amplify Hosting, static)

The site is fully static: no server, no Lambda, no database. The steps below need the owner's AWS account and take about 10 minutes once.

## What gets deployed
| Piece | Where | Defined in |
|---|---|---|
| Static site (prerendered HTML, JS, CSS, fonts) | Amplify Hosting (CloudFront) | `amplify.yml` → `build/client` |
| Security + cache headers | Amplify custom headers | `customHttp.yml` (generated) |
| Content-Security-Policy | `<meta>` in every HTML page | `scripts/csp.mjs` (runs in `npm run build`) |

## One-time setup

1. **Push the repo** to GitHub (run the `security-audit` skill first, per the pre-ship gate).
2. **Create the app:** AWS console → Amplify → *Create new app* → connect the repository → branch `main`. Amplify detects `amplify.yml`. Region: Mumbai (`ap-south-1`) is closest to the owner's market.
3. **Environment variables** (*Hosting* → *Environment variables*):
   - `VITE_WEB3FORMS_KEY`: free access key from web3forms.com, created with `shailendramishra0127@gmail.com`. Public by design; it only allows sending to that inbox.
   - `SITE_URL=https://yourdomain.com`: only once a custom domain exists.
4. **Rewrites and redirects** (*Hosting* → *Rewrites and redirects* → *Manage* → JSON editor). This serves the designed 404 page with a real 404 status:
   ```json
   [
     { "source": "/<*>", "target": "/404/index.html", "status": "404" }
   ]
   ```
   Amplify serves existing files (for example `/work/<slug>/index.html`) before this rule applies. `scripts/serve.mjs` emulates the same behaviour locally.

## Every deploy
Push to `main`. Amplify runs:
1. **Gate:** `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`. A failure stops the deploy.
2. **Build:** `npm run build`, then publishes `build/client`.

Preview environments: connect another branch in Amplify; it gets its own URL.

## After the first deploy: checklist
- [ ] Home, a `/work/<slug>` page and `/contact` load on the `*.amplifyapp.com` URL (HTTPS)
- [ ] `/does-not-exist` shows the designed 404
- [ ] `curl -I https://<url>/` shows `strict-transport-security`, `x-frame-options: DENY`, `x-content-type-options: nosniff`
- [ ] Send a test brief and confirm it arrives in the inbox
- [ ] WhatsApp and Call buttons open the right number on a phone
- [ ] Share a case study link in WhatsApp or LinkedIn and confirm the preview image appears
- [ ] Submit `https://<url>/sitemap.xml` in Google Search Console

## Rollback
Amplify console → *Deployments* → redeploy a previous build, or `git revert` and push.
