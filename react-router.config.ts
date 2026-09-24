import type { Config } from "@react-router/dev/config";
import { flagships } from "./src/data/projects";
import { services } from "./src/data/services";

export default {
  appDirectory: "src",
  buildDirectory: process.env.BUILD_DIR ?? "build",
  // Static hosting on Amplify: no runtime server. Every route is prerendered to HTML.
  ssr: false,
  async prerender({ getStaticPaths }) {
    return [
      ...getStaticPaths(),
      ...flagships.map((p) => `/work/${p.slug}`),
      ...services.map((s) => `/services/${s.slug}`),
      "/404", // served by Amplify for unknown URLs with a 404 status (amplify customRules)
    ];
  },
} satisfies Config;
