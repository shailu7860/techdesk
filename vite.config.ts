import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Canonical/OG/sitemap base URL: the production domain on Amplify builds, localhost for local builds.
// SITE_URL overrides both (e.g. a staging domain).
const { SITE_URL, AWS_APP_ID } = process.env;
process.env.VITE_SITE_URL ??= SITE_URL ?? (AWS_APP_ID ? "https://www.techdesks.in" : "http://localhost:4173");

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  // No data: URIs, so the CSP can stay strict (font-src/img-src 'self').
  build: { assetsInlineLimit: 0 },
});
