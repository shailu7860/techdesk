// Screenshot each <main> section separately (full-page capture distorts pinned ScrollTrigger sections).
// Usage: node scripts/sections.mjs <outDir> [path] [width]
import { chromium } from "@playwright/test";

const [out = "shots", path = "/", width = "1440"] = process.argv.slice(2);
const browser = await chromium.launch({
  channel: "chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto((process.env.BASE_URL ?? "http://localhost:4173") + path, { waitUntil: "networkidle" });
const sections = page.locator("main > section, main > article, main > aside, footer");
const n = await sections.count();
for (let i = 0; i < n; i++) {
  const s = sections.nth(i);
  await s.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await s.screenshot({ path: `${out}/${width}-${String(i).padStart(2, "0")}.png` });
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(
  `${n} sections @${width}`,
  overflow > 0 ? `⚠ overflow ${overflow}px` : "no overflow",
  errors.length ? errors : "no console errors",
);
await browser.close();
