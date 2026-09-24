import { defineFunction, secret } from "@aws-amplify/backend";
import { allowedOrigins, siteUrl } from "../../site";

export const chat = defineFunction({
  name: "chat",
  entry: "./handler.ts",
  timeoutSeconds: 20,
  memoryMB: 256,
  environment: {
    CHAT_CHAIN: "groq:openai/gpt-oss-20b,anthropic:claude-haiku-4-5",
    GROQ_API_KEY: secret("GROQ_API_KEY"),
    ANTHROPIC_API_KEY: secret("ANTHROPIC_API_KEY"),
    SITE_URL: siteUrl,
    ALLOWED_ORIGINS: allowedOrigins.join(","),
  },
});
