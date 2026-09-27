import { defineConfig, devices } from "@playwright/test";

// E2E runs against a separate production build with test-only endpoint values; the endpoints
// themselves are intercepted with page.route, so no real emails or AI calls are made.
const env = "BUILD_DIR=build-e2e VITE_WEB3FORMS_KEY=e2e-key";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4174", trace: "retain-on-failure" },
  webServer: {
    command: `${env} npx react-router build && ${env} node scripts/csp.mjs build-e2e/client && PORT=4174 node scripts/serve.mjs build-e2e/client`,
    url: "http://localhost:4174",
    timeout: 240_000,
    reuseExistingServer: false,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } },
    },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
});
