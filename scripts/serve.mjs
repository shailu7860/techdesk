// Static server that mimics Amplify Hosting for local preview and e2e tests:
// /path → /path/index.html, unknown → /404/index.html with status 404, same security headers.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";
import { securityHeaders } from "./security-headers.mjs";

const root = normalize(process.argv[2] ?? "build/client");
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
};

const resolve = (urlPath) => {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  } catch {
    return null; // malformed %-encoding → 404, not a crash
  }
  const clean = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const p = join(root, clean);
  if (!p.startsWith(root)) return null; // path traversal guard
  if (existsSync(p) && statSync(p).isFile()) return p;
  const idx = join(p, "index.html");
  return existsSync(idx) ? idx : null;
};

createServer((req, res) => {
  let file = resolve(req.url ?? "/");
  let status = 200;
  if (!file) {
    file = join(root, "404/index.html");
    status = 404;
  }
  const type = types[extname(file)] ?? "application/octet-stream";
  // Compress text like CloudFront does in production, so local performance numbers are realistic.
  const gzip = /text|javascript|json|xml|svg/.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  res.writeHead(status, {
    ...securityHeaders,
    "Content-Type": type,
    ...(gzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}),
  });
  const stream = createReadStream(file);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
