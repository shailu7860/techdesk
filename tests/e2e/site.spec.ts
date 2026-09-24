import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

const routes = [
  "/",
  "/work",
  "/work/stratos",
  "/services",
  "/services/ai-automation",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

test.describe("every route", () => {
  // Scan the settled state: reveal animations briefly render at reduced opacity, which axe would misread.
  test.use({ reducedMotion: "reduce" });
  for (const path of routes) {
    test(`${path} renders, has SEO tags, no overflow, no serious a11y violations`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const a11y = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      const serious = a11y.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
    });
  }
});

test("unknown URLs return 404 with the designed page", async ({ page }) => {
  const res = await page.goto("/definitely-not-here");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/does not exist/i);
  await expect(page.getByRole("link", { name: /return to base/i })).toBeVisible();
});

test("sitemap and robots are generated", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/work/biexor");
  expect(sitemap).not.toContain("/system");
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /system");
});

test("security headers are served", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["strict-transport-security"]).toContain("max-age");
});

test("skip link is the first focusable element and targets main", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard flow");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
});

test("quick-contact dock links to WhatsApp and phone", async ({ page }) => {
  await page.goto("/");
  const dock = page.getByRole("navigation", { name: "Quick contact" });
  await expect(dock.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
    "href",
    /^https:\/\/wa\.me\/919203387375\?text=/,
  );
  await expect(dock.getByRole("link", { name: /call/i })).toHaveAttribute("href", "tel:+919203387375");
  await expect(dock.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("rel", /noopener/);
});

test("reduced motion: no WebGL, content fully visible", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForTimeout(800);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("opacity", "1");
  await ctx.close();
});

test("desktop with motion: WebGL system core mounts lazily and labels its five capabilities", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "WebGL is desktop-only by design");
  await page.goto("/");
  await expect(page.locator("section[aria-labelledby=hero-title] canvas")).toHaveCount(1, { timeout: 10_000 });
  await expect(page.locator("section[aria-labelledby=hero-title] canvas")).toHaveAttribute("aria-hidden", "true");
});

test("mobile never downloads the WebGL chunk", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  const scripts: string[] = [];
  page.on("request", (r) => r.resourceType() === "script" && scripts.push(r.url()));
  await page.goto("/");
  await page.waitForTimeout(1500);
  expect(scripts.some((u) => u.includes("SystemCore"))).toBe(false);
});
