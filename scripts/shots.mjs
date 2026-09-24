// Full-page screenshots at the spec §67 breakpoints. Usage: node scripts/shots.mjs <outDir> [paths...]
import { chromium } from "@playwright/test";

const [out = "shots", ...paths] = process.argv.slice(2);
const base = process.env.BASE_URL ?? "http://localhost:4173";
const widths = (process.env.WIDTHS ?? "1440,390").split(",").map(Number);
const browser = await chromium.launch({
  channel: "chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const p of paths.length ? paths : ["/"]) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    // Scroll through so scroll-triggered reveals run, then back to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${out}/${w}${p.replace(/\//g, "_") || "_"}.png`;
    await page.screenshot({ path: name, fullPage: true });
    console.log(`${name}${overflow > 0 ? `  ⚠ horizontal overflow ${overflow}px` : ""}`);
  }
  if (errors.length) console.log(`console errors @${w}:`, errors);
  await page.close();
}
await browser.close();
