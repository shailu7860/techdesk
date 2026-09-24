// Single source for response headers: written to customHttp.yml (Amplify) and used by scripts/serve.mjs (local/e2e).
export const securityHeaders = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
};

export const cacheRules = [
  { pattern: "/assets/**", value: "public, max-age=31536000, immutable" },
  { pattern: "**/*.html", value: "public, max-age=0, must-revalidate" },
];
