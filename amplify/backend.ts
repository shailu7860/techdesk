import { defineBackend } from "@aws-amplify/backend";
import { type CfnFunction, FunctionUrlAuthType, HttpMethod } from "aws-cdk-lib/aws-lambda";
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

// Hard ceiling on parallel chat executions (caps worst-case LLM spend under abuse). Opt-in because new AWS
// accounts with a low concurrency quota cannot reserve any and the deploy would fail. Recommended: 5.
const cap = Number(process.env.CHAT_MAX_CONCURRENCY);
if (cap > 0) (backend.chat.resources.lambda.node.defaultChild as CfnFunction).reservedConcurrentExecutions = cap;

backend.addOutput({ custom: { chat_url: url.url } });
