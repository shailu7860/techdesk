/**
 * Hero planet, pure SVG + CSS, flat solid colours only (no gradients or shadows, by rule).
 * - Rotation: surface bands drift across the disc inside a circular clip (the outline stays still,
 *   the surface moves, which is how a spinning planet reads). A fixed night-side crescent sells the light.
 * - Rings: a Saturn-like system (several bands of different width and brightness, a dark gap),
 *   with the back half behind the planet and the front half over it; particle rings drift.
 * - Moons orbit. Everything pauses with the Pause motion toggle and stops under reduced motion.
 */

const TILT = -18; // axial tilt, degrees
const RING = [
  // [rx, ry, strokeWidth, color, opacity, particles?]
  [212, 50, 3, "oklch(0.55 0.08 160)", 0.55, false],
  [226, 53, 9, "oklch(0.72 0.1 155)", 0.7, false],
  [241, 57, 5, "oklch(0.82 0.08 150)", 0.8, false],
  // Cassini-style gap between 241 and 254
  [258, 61, 7, "oklch(0.7 0.09 155)", 0.6, true],
  [270, 64, 2, "oklch(0.85 0.06 150)", 0.5, true],
] as const;

function Rings({ half }: { half: "back" | "front" }) {
  return (
    <g clipPath={`url(#pl-${half})`}>
      <g transform={`rotate(${TILT} 300 300)`}>
        {RING.map(([rx, ry, w, color, op, particles]) => (
          <ellipse
            key={rx}
            cx="300"
            cy="300"
            rx={rx}
            ry={ry}
            fill="none"
            stroke={color}
            strokeWidth={w}
            opacity={half === "back" ? op * 0.6 : op}
            className={particles ? "ring-flow" : undefined}
            strokeDasharray={particles ? "1 7" : undefined}
            strokeLinecap="round"
          />
        ))}
      </g>
    </g>
  );
}

// One period of surface bands; drawn twice side by side so the drift loops seamlessly.
const BANDS = [
  { y: 176, h: 22, c: "oklch(0.5 0.13 156)" },
  { y: 204, h: 10, c: "oklch(0.62 0.15 150)" },
  { y: 222, h: 30, c: "oklch(0.44 0.12 160)" },
  { y: 258, h: 14, c: "oklch(0.6 0.14 152)" },
  { y: 280, h: 36, c: "oklch(0.52 0.14 155)" },
  { y: 322, h: 12, c: "oklch(0.66 0.13 150)" },
  { y: 340, h: 28, c: "oklch(0.46 0.12 160)" },
  { y: 374, h: 16, c: "oklch(0.58 0.14 153)" },
  { y: 396, h: 30, c: "oklch(0.42 0.11 162)" },
];
// Storms/spots that make the rotation visible.
const SPOTS = [
  { x: 190, y: 292, rx: 26, ry: 11, c: "oklch(0.72 0.12 148)" },
  { x: 330, y: 238, rx: 16, ry: 6, c: "oklch(0.38 0.1 162)" },
  { x: 410, y: 352, rx: 20, ry: 8, c: "oklch(0.7 0.12 150)" },
];

function Surface() {
  const period = 300; // width of one repeat
  const tile = (dx: number) => (
    <g key={dx} transform={`translate(${dx} 0)`}>
      {BANDS.map((b) => (
        <rect key={b.y} x={150} y={b.y} width={period + 1} height={b.h} fill={b.c} />
      ))}
      {SPOTS.map((s) => (
        <ellipse key={s.x} cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill={s.c} />
      ))}
    </g>
  );
  return (
    <g className="planet-spin" style={{ ["--spin-distance" as string]: `-${period}px` }}>
      {[0, period, -period].map(tile)}
    </g>
  );
}

export function Planet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="pl-disc">
          <circle cx="300" cy="300" r="150" />
        </clipPath>
        {/* back = everything above the ring's centre line (behind the planet), front = below it */}
        <clipPath id="pl-back">
          <rect x="0" y="0" width="600" height="300" transform={`rotate(${TILT} 300 300)`} />
        </clipPath>
        <clipPath id="pl-front">
          <rect x="0" y="300" width="600" height="300" transform={`rotate(${TILT} 300 300)`} />
        </clipPath>
      </defs>

      <Rings half="back" />

      {/* planet body */}
      <circle cx="300" cy="300" r="150" fill="oklch(0.34 0.08 165)" />
      <g clipPath="url(#pl-disc)">
        <g transform={`rotate(${TILT} 300 300)`}>
          <Surface />
        </g>
        {/* night side: a fixed solid crescent, so the surface rotates under a constant light */}
        <path d="M300 150 A150 150 0 0 1 300 450 A108 150 0 0 0 300 150 Z" fill="oklch(0.16 0.03 175)" opacity="0.78" />
        {/* soft day-side sheen as a flat shape */}
        <ellipse cx="248" cy="232" rx="58" ry="40" fill="oklch(0.9 0.08 150)" opacity="0.14" />
      </g>
      {/* planet rim */}
      <circle cx="300" cy="300" r="150" fill="none" stroke="oklch(0.78 0.12 152)" strokeWidth="1.5" opacity="0.45" />

      <Rings half="front" />

      {/* moons */}
      <g className="orbit" style={{ ["--orbit-s" as string]: "28s" }}>
        <circle cx="300" cy="36" r="10" fill="oklch(0.88 0.04 160)" />
        <path d="M300 26 A10 10 0 0 1 300 46 A6 10 0 0 0 300 26 Z" fill="oklch(0.3 0.03 170)" opacity="0.7" />
      </g>
      <g className="orbit" style={{ ["--orbit-s" as string]: "46s", animationDirection: "reverse" }}>
        <circle cx="566" cy="300" r="5" fill="oklch(0.8 0.19 152)" />
      </g>
    </svg>
  );
}
