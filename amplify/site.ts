// Site origin(s) at deploy time. Amplify pipelines expose AWS_APP_ID/AWS_BRANCH; a custom domain
// is set with SITE_URL (and extra origins with ALLOWED_ORIGINS, comma-separated).
const { SITE_URL, ALLOWED_ORIGINS, AWS_APP_ID, AWS_BRANCH } = process.env;

export const siteUrl =
  SITE_URL ??
  (AWS_APP_ID && AWS_BRANCH ? `https://${AWS_BRANCH}.${AWS_APP_ID}.amplifyapp.com` : "http://localhost:4173");

export const allowedOrigins = [
  ...new Set([
    siteUrl,
    ...(ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ]),
];
