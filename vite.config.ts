import { existsSync, readFileSync } from "node:fs";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Canonical/OG base URL. On Amplify, the branch URL is derived from its build env vars
// until a custom domain is set via SITE_URL.
const { SITE_URL, AWS_APP_ID, AWS_BRANCH } = process.env;
process.env.VITE_SITE_URL ??=
  SITE_URL ??
  (AWS_APP_ID && AWS_BRANCH ? `https://${AWS_BRANCH}.${AWS_APP_ID}.amplifyapp.com` : "http://localhost:4173");

// Chat endpoint: written by the Amplify backend deploy into amplify_outputs.json (custom.chat_url).
if (!process.env.VITE_CHAT_URL && existsSync("amplify_outputs.json")) {
  const out = JSON.parse(readFileSync("amplify_outputs.json", "utf8")) as { custom?: { chat_url?: string } };
  if (out.custom?.chat_url) process.env.VITE_CHAT_URL = out.custom.chat_url;
}

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
});
