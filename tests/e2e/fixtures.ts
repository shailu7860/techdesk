import { test as base, expect } from "@playwright/test";

/** Fails any test that logs a console error or throws in the page (includes CSP violations). */
export const test = base.extend<{ consoleErrors: string[]; quietPrompt: undefined }>({
  // The 5 s contact prompt would cover controls mid-test: treat it as already closed (its own test opts out).
  quietPrompt: [
    async ({ page }, use, info) => {
      if (!info.tags.includes("@prompt"))
        await page.addInitScript(() => localStorage.setItem("techdesk.contactPrompt.closedAt", String(Date.now())));
      await use(undefined);
    },
    { auto: true },
  ],
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        // Browser network logs ("Failed to load resource") are expected when a test simulates an HTTP failure.
        if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(m.text());
      });
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});
export { expect };
