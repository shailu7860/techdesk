import type { Service } from "../../data/services";

const S = "var(--color-hairline)";
const INK = "var(--color-ink)";
const SIG = "var(--color-signal)";
const AG = "var(--color-agent)";

function Box({
  x,
  y,
  w = 96,
  h = 36,
  label,
  accent,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  accent?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="var(--color-void)" stroke={accent ?? S} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 3}
        textAnchor="middle"
        fill={accent ?? INK}
        fontFamily="var(--font-mono)"
        fontSize="9"
      >
        {label}
      </text>
    </g>
  );
}

const Line = ({ d, c = S }: { d: string; c?: string }) => <path d={d} fill="none" stroke={c} />;

/** One explanatory diagram per service (spec §19): what the thing actually is, drawn. */
export function ServiceVisual({ visual }: { visual: Service["visual"] }) {
  const common = { viewBox: "0 0 400 260", className: "h-full w-full", role: "img" as const };
  switch (visual) {
    case "platform":
      return (
        <svg {...common} aria-label="Browser client, API and database layers of a web platform">
          <rect x="40" y="24" width="320" height="120" fill="none" stroke={S} />
          <Line d="M40 44h320" />
          {[52, 62, 72].map((x) => (
            <circle key={x} cx={x} cy="34" r="3" fill={S} />
          ))}
          <rect x="56" y="58" width="120" height="70" fill="none" stroke={SIG} />
          <rect x="188" y="58" width="156" height="30" fill="none" stroke={S} />
          <rect x="188" y="98" width="156" height="30" fill="none" stroke={S} />
          <Line d="M200 144v30M200 210v14" c={SIG} />
          <Box x={152} y={174} label="API" accent={SIG} />
          <Box x={152} y={224} w={96} h={26} label="DATABASE" />
        </svg>
      );
    case "agent":
      return (
        <svg {...common} aria-label="An AI agent loop: observe, reason, use tools, act">
          <circle cx="200" cy="130" r="86" fill="none" stroke={AG} strokeDasharray="3 5" />
          <Box x={152} y={112} label="AGENT" accent={AG} />
          <Box x={152} y={26} label="OBSERVE" />
          <Box x={286} y={112} w={90} label="REASON" />
          <Box x={152} y={198} label="ACT" />
          <Box x={24} y={112} w={90} label="TOOLS" />
          <Line d="M200 62v50M248 130h38M200 148v50M152 130h-38" c={AG} />
        </svg>
      );
    case "systems":
      return (
        <svg {...common} aria-label="Services connected through a queue to a ledger database and cache">
          <Box x={24} y={30} label="SERVICE A" />
          <Box x={24} y={112} label="SERVICE B" />
          <Box x={24} y={194} label="WEBHOOKS" />
          <Box x={160} y={112} label="QUEUE" accent={SIG} />
          <Box x={290} y={60} w={86} label="LEDGER" />
          <Box x={290} y={164} w={86} label="CACHE" />
          <Line d="M120 48h20v82h20M120 130h40M120 212h20v-82" />
          <Line d="M256 130h14v-52h20M270 130v52h20" c={SIG} />
        </svg>
      );
    case "growth":
      return (
        <svg {...common} aria-label="A search and campaign funnel from visibility to qualified leads">
          {[
            ["SEARCH VISIBILITY", 360, 20],
            ["VISITS", 290, 80],
            ["ENGAGEMENT", 220, 140],
            ["QUALIFIED LEADS", 150, 200],
          ].map(([l, w, y]) => (
            <Box
              key={l as string}
              x={200 - (w as number) / 2}
              y={y as number}
              w={w as number}
              label={l as string}
              accent={l === "QUALIFIED LEADS" ? SIG : undefined}
            />
          ))}
        </svg>
      );
    default:
      return (
        <svg {...common} aria-label="Manual steps consolidated into one automated system">
          {[34, 94, 154, 214].map((y, i) => (
            <Box
              key={y}
              x={24}
              y={y - 12}
              w={110}
              h={30}
              label={["SPREADSHEET", "EMAIL", "PAPER FORM", "PHONE CALL"][i] ?? ""}
            />
          ))}
          <Line d="M134 37h40v93M134 97h40M134 157h40M134 217h40v-87M174 130h40" />
          <Box x={214} y={100} w={162} h={60} label="ONE SYSTEM" accent={SIG} />
        </svg>
      );
  }
}
