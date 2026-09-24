/**
 * Hero planet: flat, solid-colour shading (no gradients, by rule): a dark disc, a lit face offset
 * toward the light, an inclined ring and two orbiting moons. Pure SVG + CSS. Decorative.
 */
export function Planet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="pl-disc">
          <circle cx="300" cy="300" r="150" />
        </clipPath>
        <clipPath id="pl-front">
          <rect x="0" y="300" width="600" height="300" />
        </clipPath>
      </defs>
      {/* back half of the ring */}
      <ellipse
        cx="300"
        cy="300"
        rx="265"
        ry="62"
        fill="none"
        stroke="oklch(0.72 0.14 155)"
        strokeWidth="2"
        opacity="0.35"
        transform="rotate(-16 300 300)"
      />
      {/* planet: base, lit face, highlight band */}
      <circle cx="300" cy="300" r="150" fill="oklch(0.26 0.06 170)" />
      <g clipPath="url(#pl-disc)">
        <circle cx="262" cy="262" r="150" fill="oklch(0.42 0.12 158)" />
        <circle cx="236" cy="236" r="112" fill="oklch(0.55 0.15 155)" />
        <ellipse
          cx="300"
          cy="248"
          rx="220"
          ry="14"
          fill="oklch(0.62 0.15 152)"
          opacity="0.5"
          transform="rotate(-16 300 300)"
        />
        <ellipse
          cx="300"
          cy="330"
          rx="220"
          ry="9"
          fill="oklch(0.34 0.09 165)"
          opacity="0.6"
          transform="rotate(-16 300 300)"
        />
      </g>
      {/* front half of the ring passes over the planet */}
      <g clipPath="url(#pl-front)" transform="rotate(-16 300 300)">
        <ellipse
          cx="300"
          cy="300"
          rx="265"
          ry="62"
          fill="none"
          stroke="oklch(0.85 0.12 155)"
          strokeWidth="2.5"
          opacity="0.8"
        />
      </g>
      {/* moons */}
      <g className="orbit" style={{ ["--orbit-s" as string]: "28s" }}>
        <circle cx="300" cy="40" r="9" fill="oklch(0.9 0.05 160)" />
      </g>
      <g className="orbit" style={{ ["--orbit-s" as string]: "46s", animationDirection: "reverse" }}>
        <circle cx="560" cy="300" r="5" fill="oklch(0.8 0.19 152)" />
      </g>
    </svg>
  );
}
