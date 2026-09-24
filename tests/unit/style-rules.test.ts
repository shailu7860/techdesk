import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Owner rule (CLAUDE.md): no gradients and no box shadows anywhere, including glows and gradient masks.
const BANNED: [string, RegExp][] = [
  ["CSS gradient", /\b(linear|radial|conic|repeating-linear|repeating-radial)-gradient\s*\(/],
  [
    "Tailwind gradient utility",
    /\bbg-(gradient|linear|radial|conic)-|\b(from|via|to)-(transparent|void|signal|panel|ink|white|black)\b/,
  ],
  ["SVG gradient", /<(linear|radial)Gradient\b/],
  ["box-shadow", /\bbox-shadow\s*:/],
  ["Tailwind shadow utility", /(^|[\s"'`:])(shadow|inset-shadow|drop-shadow|text-shadow)(-|\[|\b)(?!-?\(--none)/],
  ["shadow token", /--shadow-(card|lift)/],
  ["text-shadow", /\btext-shadow\s*:/],
];

const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = [...walk("src"), ...walk("public")].filter((f) => /\.(tsx?|css|svg)$/.test(f));

// Owner rule: no em dashes in site copy (comments are fine: visitors never see them).
const isComment = (line: string) => /^\s*(\/\/|\*|\/\*)/.test(line);
describe("copy rules: no em dashes in anything a visitor can read", () => {
  for (const file of files.filter((f) => /\.(tsx?)$/.test(f))) {
    it(file, () => {
      const hits = readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, i) =>
          line.includes("\u2014") && !isComment(line) ? [`${file}:${i + 1} ${line.trim().slice(0, 100)}`] : [],
        );
      expect(hits).toEqual([]);
    });
  }
});

describe("visual rules: no gradients, no shadows", () => {
  for (const file of files) {
    it(file, () => {
      const hits = readFileSync(file, "utf8")
        .split("\n")
        .flatMap((line, i) =>
          BANNED.filter(([, re]) => re.test(line)).map(
            ([name]) => `${file}:${i + 1} ${name}: ${line.trim().slice(0, 100)}`,
          ),
        );
      expect(hits).toEqual([]);
    });
  }
});
