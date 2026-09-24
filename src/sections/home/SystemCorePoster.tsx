import { services } from "../../data/services";

// Static constellation: five capability nodes around a core. Deterministic layout, no JS.
const R = 150;
const nodes = services.map((s, i) => {
  const a = (i / services.length) * Math.PI * 2 - Math.PI / 2;
  return { label: s.name.split(" ")[0] ?? s.name, x: 250 + Math.cos(a) * R, y: 250 + Math.sin(a) * R };
});

export function SystemCorePoster() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 500 500"
      className="h-full w-full opacity-60 lg:opacity-100"
      preserveAspectRatio="xMidYMid slice"
    >
      {[80, 150, 215].map((r) => (
        <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="var(--color-hairline)" strokeDasharray="2 6" />
      ))}
      {nodes.map((n, i) => {
        const m = nodes[(i + 2) % nodes.length];
        return m ? (
          <line key={`l${n.label}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="var(--color-hairline)" />
        ) : null;
      })}
      {nodes.map((n) => (
        <line
          key={`c${n.label}`}
          x1="250"
          y1="250"
          x2={n.x}
          y2={n.y}
          stroke="var(--color-signal)"
          strokeOpacity="0.35"
        />
      ))}
      <rect x="238" y="238" width="24" height="24" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" />
      <rect x="245" y="243" width="10" height="14" fill="var(--color-signal)" />
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="5" fill="var(--color-void)" stroke="var(--color-signal)" strokeWidth="1.5" />
          <text
            x={n.x}
            y={n.y + (n.y > 250 ? 24 : -14)}
            textAnchor="middle"
            fill="var(--color-muted)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.06em"
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
