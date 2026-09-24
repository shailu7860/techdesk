// Generates 1200×630 Open Graph images (default + one per case study) into public/og/.
// Run after content changes: node scripts/og.mjs
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

// Fonts are inlined: a setContent page cannot load file:// URLs. (Offline generator, not site code.)
const font = (p) =>
  `data:font/woff2;base64,${readFileSync(resolve("node_modules/@fontsource-variable", p)).toString("base64")}`;
const { flagships } = await import(pathToFileURL(resolve("src/data/projects.ts")).href);

const card = ({ kicker, title, sub }) => `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(${font("archivo/files/archivo-latin-wdth-normal.woff2")}) format("woff2");font-stretch:62% 125%;font-weight:100 900}
@font-face{font-family:M;src:url(${font("martian-mono/files/martian-mono-latin-wght-normal.woff2")}) format("woff2");font-weight:100 800}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#090909;color:#f5f5f5;font-family:A;padding:72px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid #333}
.k{font-family:M;font-size:22px;letter-spacing:.04em;color:#52e6ff;text-transform:uppercase}
h1{font-stretch:118%;font-weight:640;font-size:${title.length > 18 ? 72 : 104}px;line-height:.95;letter-spacing:-.03em;text-transform:uppercase;max-width:15ch}
p{font-size:30px;color:#ababab;margin-top:20px;max-width:38ch}
.f{display:flex;justify-content:space-between;align-items:center;font-family:M;font-size:22px;color:#ababab}
.w{display:flex;align-items:center;gap:14px;font-family:A;font-stretch:125%;font-weight:700;font-size:28px;letter-spacing:.06em;color:#f5f5f5}
</style></head><body><div class="k">${kicker}</div><div><h1>${title}</h1><p>${sub}</p></div>
<div class="f"><span class="w"><svg width="36" height="36" viewBox="0 0 32 32"><path d="M12 7H7v18h5M20 7h5v18h-5" fill="none" stroke="#f5f5f5" stroke-width="2.5"/><rect x="13.5" y="12" width="5" height="8" fill="#52e6ff"/></svg>TECHDESK</span><span>AI · Platforms · Automation</span></div></body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const jobs = [
  {
    file: "default",
    kicker: "TechDesk / engineering studio",
    title: "We engineer digital systems for what's next.",
    sub: "AI agents, software platforms and intelligent automation for ambitious businesses.",
  },
  ...flagships.map((p) => ({
    file: p.slug,
    kicker: `Case study / ${p.code} · ${p.industry}`,
    title: p.title,
    sub: p.tagline,
  })),
];
for (const j of jobs) {
  await page.setContent(card(j), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${j.file}.png` });
  console.log(`public/og/${j.file}.png`);
}
await browser.close();
