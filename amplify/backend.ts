import { defineBackend } from "@aws-amplify/backend";
import { FunctionUrlAuthType, HttpMethod } from "aws-cdk-lib/aws-lambda";
import { chat } from "./functions/chat/resource";
import { allowedOrigins } from "./site";

const backend = defineBackend({ chat });

// Public HTTPS endpoint for the chat assistant. Browsers may only call it from the site's own origins.
const url = backend.chat.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins,
    allowedMethods: [HttpMethod.POST],
    allowedHeaders: ["content-type"],
  },
});

backend.addOutput({ custom: { chat_url: url.url } });
