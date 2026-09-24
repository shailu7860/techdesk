import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Canonical/OG base URL. On Amplify, the branch URL is derived from its build env vars
// until a custom domain is set via SITE_URL.
const { SITE_URL, AWS_APP_ID, AWS_BRANCH } = process.env;
process.env.VITE_SITE_URL ??=
  SITE_URL ??
  (AWS_APP_ID && AWS_BRANCH ? `https://${AWS_BRANCH}.${AWS_APP_ID}.amplifyapp.com` : "http://localhost:4173");

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
});
