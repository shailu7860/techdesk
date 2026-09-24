// WCAG contrast check for the OKLCH tokens in src/styles/tokens.css.
// ponytail: no color lib — OKLCH→sRGB is ~15 lines of published math (Björn Ottosson).
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/g)].map(([, name, l, c, h]) => [
    name,
    [+l, +c, +h],
  ]),
);

function luminance([L, C, H]) {
  const a = C * Math.cos((H * Math.PI) / 180),
    b = C * Math.sin((H * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((v) => Math.min(1, Math.max(0, v))); // clamp to sRGB gamut
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
const ratio = (fg, bg) => {
  const [hi, lo] = [luminance(tokens[fg]), luminance(tokens[bg])].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum] — every text/UI pairing the design uses.
const pairs = [
  ["ink", "void", 7],
  ["muted", "panel-hi", 4.5],
  ["signal", "panel", 4.5], // green links on white
  ["ink", "panel", 7],
  ["ink", "panel-hi", 4.5],
  ["muted", "void", 4.5],
  ["muted", "panel", 4.5],
  ["subtle", "void", 4.5],
  ["subtle", "panel", 3],
  ["signal", "void", 4.5],
  ["signal", "panel", 4.5],
  ["void", "signal", 4.5], // off-white text on green primary button
  ["void", "signal-hi", 4.5],
  ["agent", "void", 4.5],
  ["agent", "panel", 4.5],
  ["danger", "void", 4.5],
  ["danger", "panel", 4.5],
  ["success", "void", 4.5],
  ["hairline", "panel", 1.15], // non-text structure: border on white, just visible
];

let failed = 0;
for (const [fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${fg.padEnd(9)} on ${bg.padEnd(9)} ${r.toFixed(2)}:1  (min ${min})`);
}
process.exit(failed ? 1 : 0);
