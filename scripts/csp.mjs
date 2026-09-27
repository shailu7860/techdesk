// Post-build: inject a strict Content-Security-Policy <meta> into every prerendered HTML page.
// Executable inline scripts (React Router hydration) are allowed by exact SHA-256 hash, not 'unsafe-inline'.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? "build/client";

const walk = (d) =>
  readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(root).filter((f) => f.endsWith(".html"));

let total = 0;
for (const file of files) {
  const html = readFileSync(file, "utf8");
  const hashes = new Set();
  for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    const attrs = m[1] ?? "";
    if (/\bsrc=/.test(attrs) || /type="application\/ld\+json"/.test(attrs)) continue; // external or data block
    hashes.add(
      `'sha256-${createHash("sha256")
        .update(m[2] ?? "")
        .digest("base64")}'`,
    );
  }
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self' https://api.web3forms.com",
    "form-action 'self' https://api.web3forms.com",
    "base-uri 'self'",
    "object-src 'none'",
    "worker-src 'self'",
  ].join("; ");
  const out = html.replace(/<head>/, `<head><meta http-equiv="Content-Security-Policy" content="${csp}"/>`);
  if (out === html) throw new Error(`no <head> in ${file}`);
  writeFileSync(file, out);
  total++;
}
console.log(`CSP injected into ${total} HTML files`);
