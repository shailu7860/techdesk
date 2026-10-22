// Renders every composition, then encodes web versions into ../public/video/.
// Usage: npm run render   (needs Chrome and ffmpeg on PATH; set CHROME=/path to override)
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const chrome = process.env.CHROME ?? "/usr/bin/google-chrome";
const out = "../public/video";
mkdirSync("out", { recursive: true });
mkdirSync(out, { recursive: true });

const jobs = [
  { id: "Hero", name: "hero", width: 720, poster: 2 },
  ...["algo-trading-platform", "enterprise-software", "e-bidding-automation", "gaming-platform"].map((c) => ({
    id: `case-${c}`,
    name: `case-${c}`,
    width: 720,
    poster: 3.2,
  })),
  ...[
    "task-management-saas",
    "agency-website",
    "ecommerce-platform",
    "healthcare-dashboard",
    "learning-platform",
    "real-estate-crm",
    "financial-analytics",
    "developer-portfolio",
  ].map((t) => ({ id: `tile-${t}`, name: t, width: 640, poster: 2.6 })),
];

const only = process.argv[2];
const run = (cmd, args) => execFileSync(cmd, args, { stdio: "inherit" });
for (const j of jobs.filter((x) => !only || x.id.startsWith(only))) {
  const master = `out/${j.name}.mp4`;
  run("npx", ["remotion", "render", "src/index.ts", j.id, master, "--codec", "h264", "--crf", "16", "--overwrite", `--browser-executable=${chrome}`]);
  const scale = `scale=${j.width}:-2:flags=lanczos`;
  run("ffmpeg", ["-v", "error", "-y", "-i", master, "-vf", scale, "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0", "-row-mt", "1", "-an", `${out}/${j.name}.webm`]);
  run("ffmpeg", ["-v", "error", "-y", "-i", master, "-vf", scale, "-c:v", "libx264", "-crf", "28", "-preset", "slow", "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", `${out}/${j.name}.mp4`]);
  run("ffmpeg", ["-v", "error", "-y", "-ss", String(j.poster), "-i", master, "-frames:v", "1", "-vf", scale, "-c:v", "libwebp", "-quality", "78", `${out}/${j.name}.webp`]);
}
