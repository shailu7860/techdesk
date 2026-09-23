import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  // Static hosting on Amplify: no runtime server. Every route is prerendered to HTML.
  ssr: false,
  async prerender({ getStaticPaths }) {
    // Dynamic routes (/work/:slug, /services/:slug) are appended here from src/data in Phase 6–7.
    return getStaticPaths();
  },
} satisfies Config;
