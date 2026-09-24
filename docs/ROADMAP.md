# Roadmap

## Needs owner input
- Screenshots or recordings for Biexor, Stratos, BidMaster and 1Bull (case studies currently use the system diagram)
- Real, approved outcomes per project (optional)
- Web3Forms key; Groq and/or Anthropic keys; custom domain
- TechDesk social profiles (the footer hides socials until they exist)

## Next (after launch)
- Field Core Web Vitals review; subset the display font if mobile LCP stays above 2.5s
- Cookieless analytics (Plausible or similar) behind the existing CTA hooks: page_view, cta_click, contact_start/complete, calc_complete, chat_open
- Streaming chat responses (Lambda response streaming)
- API Gateway throttling or WAF in front of chat if abuse appears
- Insights/blog and industry landing pages (spec §5, not in milestone 1)

## Later (spec §79, not built on purpose)
CMS (content already isolated in `src/data`), lead management / CRM, client portal, newsletter, multi-language, personalised landing pages.
