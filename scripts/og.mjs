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
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#0b1a14;color:#f3f8f5;font-family:A;padding:72px;display:flex;flex-direction:column;justify-content:center;gap:56px;border:1px solid #1f3a2e}
.k{font-size:24px;font-weight:600;color:#007f3d}
h1{font-weight:700;font-size:${title.length > 18 ? 76 : 110}px;line-height:1.02;letter-spacing:-.03em;max-width:16ch}
p{font-size:30px;color:#b9c9c0;margin-top:20px;max-width:38ch}
.f{display:flex;justify-content:space-between;align-items:center;font-size:22px;font-weight:500;color:#b9c9c0}
.w{display:flex;align-items:center;gap:12px;font-weight:700;font-size:30px;letter-spacing:-.01em;color:#f3f8f5}
</style></head><body><div><h1>${title}</h1><p>${sub}</p></div>
<div class="f"><span class="w"><svg width="36" height="36" viewBox="0 0 32 32"><path d="M12 7H7v18h5M20 7h5v18h-5" fill="none" stroke="#f3f8f5" stroke-width="2.5"/><rect x="13.5" y="12" width="5" height="8" fill="#3ee07a"/></svg>TechDesk</span><span>AI · Platforms · Automation</span></div></body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const jobs = [
  {
    file: "default",
    kicker: "TechDesk · Engineering studio",
    title: "We engineer digital systems for what's next.",
    sub: "AI agents, software platforms and intelligent automation for ambitious businesses.",
  },
  ...flagships.map((p) => ({
    file: p.slug,
    kicker: `Case study · ${p.industry}`,
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
