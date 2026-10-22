// Showcase clips (4:3) for the "Also built" projects: one product UI per design style.
// A shared dashboard layout, skinned per style, keeps every clip consistent in motion and pacing.
import type React from "react";
import { AbsoluteFill } from "remotion";
import { Bars, Blobs, Counter, In, Ring, Spark, Stage, useBreathe, walk } from "./kit";

type Skin = {
  bg: () => React.ReactNode;
  card: React.CSSProperties;
  ink: string;
  dim: string;
  accent: string;
  muted: string;
  heading?: React.CSSProperties;
  /** Text colour for the title row, which sits on the background, not on a card. */
  headInk?: string;
};

type Tile = {
  id: string;
  skin: keyof typeof SKINS;
  app: string;
  title: string;
  kpis: [string, number, string?][];
  bars: number[];
  list: [string, string][];
  ring?: number;
  ringLabel?: string;
};

const solid = (c: string) => () => <AbsoluteFill style={{ background: c }} />;

const SKINS = {
  bento: {
    bg: solid("#f2f0ea"),
    card: { background: "#ffffff", borderRadius: 28, border: "1.5px solid #e2ded3" },
    ink: "#1b1a17",
    dim: "#6d6a61",
    accent: "#ff6a3d",
    muted: "#e9e5da",
  },
  brutal: {
    bg: solid("#fff45c"),
    card: { background: "#ffffff", borderRadius: 0, border: "4px solid #000", boxShadow: "10px 10px 0 #000" },
    ink: "#000000",
    dim: "#333333",
    accent: "#ff3b30",
    muted: "#d9d9d9",
    heading: { textTransform: "none", fontWeight: 900 },
  },
  skeuo: {
    bg: solid("#3b2a20"),
    card: {
      background: "#efe4d2",
      borderRadius: 16,
      border: "1px solid #c8b493",
      boxShadow: "inset 0 1px 0 #fffaf0, inset 0 -2px 0 #c9b38f, 0 6px 14px rgba(0,0,0,0.35)",
    },
    ink: "#3a2a1c",
    dim: "#7a6550",
    accent: "#2f7d4f",
    muted: "#d8c7a8",
    headInk: "#f3e6cf",
  },
  aurora: {
    bg: () => <Blobs bg="#eef4ff" colors={["#9ad8ff", "#c5b5ff", "#a8f0d0"]} opacity={0.75} blur={90} />,
    card: {
      background: "rgba(255,255,255,0.55)",
      borderRadius: 26,
      border: "1.5px solid rgba(255,255,255,0.9)",
      backdropFilter: "blur(20px)",
    },
    ink: "#18233b",
    dim: "#56627c",
    accent: "#3b6cff",
    muted: "rgba(59,108,255,0.15)",
  },
  material: {
    bg: solid("#f6f7fb"),
    card: { background: "#ffffff", borderRadius: 16, boxShadow: "0 2px 4px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.08)" },
    ink: "#1c1b1f",
    dim: "#5f5d66",
    accent: "#6750a4",
    muted: "#e8def8",
  },
  editorial: {
    bg: solid("#f7f3ec"),
    card: { background: "transparent", borderRadius: 0, borderTop: "2px solid #1d1d1b" },
    ink: "#1d1d1b",
    dim: "#6b665c",
    accent: "#c2410c",
    muted: "#e4ddd0",
    heading: { fontStretch: "75%", fontWeight: 800 },
  },
  terminal: {
    bg: solid("#050806"),
    card: { background: "#0a110c", borderRadius: 8, border: "1.5px solid #1f3a28" },
    ink: "#d6ffe0",
    dim: "#5f8f6c",
    accent: "#39ff88",
    muted: "#12261a",
  },
  swiss: {
    bg: solid("#ffffff"),
    card: { background: "#ffffff", borderRadius: 0, border: "1.5px solid #111" },
    ink: "#111111",
    dim: "#666666",
    accent: "#e30613",
    muted: "#eeeeee",
  },
} satisfies Record<string, Skin>;

export const TILES: Tile[] = [
  {
    id: "task-management-saas",
    skin: "bento",
    app: "Bento grid",
    title: "Sprint board",
    kpis: [["Tasks done", 128], ["In review", 14], ["Team online", 9]],
    bars: [0.4, 0.65, 0.5, 0.8, 0.95, 0.7, 0.85],
    list: [["Design onboarding flow", "Done"], ["Billing webhooks", "In review"], ["Realtime comments", "Live"]],
    ring: 0.78,
    ringLabel: "Sprint progress",
  },
  {
    id: "agency-website",
    skin: "brutal",
    app: "Neo-brutalism",
    title: "Get a quote",
    kpis: [["Project type", 3, "Web app"], ["Pages", 12], ["Weeks", 6]],
    bars: [0.5, 0.9, 0.6, 0.75],
    list: [["Services", "→"], ["Portfolio", "→"], ["AI assistant", "Chat"]],
  },
  {
    id: "ecommerce-platform",
    skin: "skeuo",
    app: "Skeuomorphism",
    title: "Store admin",
    kpis: [["Orders today", 86], ["In stock", 1240], ["Payments", 99, "Settled"]],
    bars: [0.45, 0.6, 0.55, 0.9, 0.7, 0.8],
    list: [["Leather wallet", "Packed"], ["Canvas tote", "Shipped"], ["Desk lamp", "Paid"]],
  },
  {
    id: "healthcare-dashboard",
    skin: "aurora",
    app: "Aurora glass",
    title: "Clinic today",
    kpis: [["Appointments", 42], ["Video visits", 11], ["Records updated", 37]],
    bars: [0.3, 0.55, 0.85, 0.7, 0.5, 0.4],
    list: [["Dr. Rao · 10:30", "Video call"], ["Dr. Shah · 11:00", "In clinic"], ["Dr. Iyer · 11:30", "Booked"]],
    ring: 0.64,
    ringLabel: "Slots filled",
  },
  {
    id: "learning-platform",
    skin: "editorial",
    app: "Editorial",
    title: "Your courses",
    kpis: [["Lessons", 48], ["Learners", 320], ["Live today", 2]],
    bars: [0.6, 0.75, 0.5, 0.9, 0.65],
    list: [["Intro to data science", "72%"], ["Product design basics", "40%"], ["Live: Q&A session", "6 pm"]],
    ring: 0.72,
    ringLabel: "Course progress",
  },
  {
    id: "real-estate-crm",
    skin: "material",
    app: "Material design",
    title: "Lead pipeline",
    kpis: [["New leads", 24], ["Site visits", 9], ["Follow-ups", 31]],
    bars: [0.9, 0.7, 0.45, 0.3, 0.2],
    list: [["3 BHK, Vijay Nagar", "Visit Sat"], ["Office, AB Road", "Follow up"], ["Plot, Bypass", "New lead"]],
  },
  {
    id: "financial-analytics",
    skin: "terminal",
    app: "Terminal dark",
    title: "Portfolio",
    kpis: [["Holdings", 18], ["Watchlist", 42], ["Alerts", 5]],
    bars: [0.55, 0.62, 0.48, 0.7, 0.66, 0.82, 0.76, 0.9],
    list: [["NIFTY 50", "▲ live"], ["BANKNIFTY", "▼ live"], ["USD/INR", "▲ live"]],
  },
  {
    id: "developer-portfolio",
    skin: "swiss",
    app: "Swiss minimal",
    title: "Selected projects",
    kpis: [["Projects", 12], ["Stack", 5, "MERN"], ["Reply", 24, "1 day"]],
    bars: [0.35, 0.6, 0.85, 0.5],
    list: [["Booking app", "React"], ["API gateway", "Node"], ["Contact form", "Email"]],
  },
];

export function TileScene({ tile }: { tile: Tile }) {
  const skin: Skin = SKINS[tile.skin];
  const b = useBreathe(4, 36);
  const line = walk(tile.id, 24, 50, 8);
  const card = (extra?: React.CSSProperties): React.CSSProperties => ({ ...skin.card, padding: 26, ...extra });
  return (
    <Stage background={skin.bg()}>
      <div style={{ position: "absolute", inset: 48, display: "flex", flexDirection: "column", gap: 22, color: skin.ink }}>
        <In delay={2}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", color: skin.headInk ?? skin.ink, ...skin.heading }}>
              {tile.title}
            </div>
            <div style={{ fontSize: 22, color: skin.headInk ?? skin.dim, fontWeight: 600, opacity: 0.85 }}>{tile.app}</div>
          </div>
        </In>
        <div style={{ display: "flex", gap: 20 }}>
          {tile.kpis.map(([k, v, label], i) => (
            <In key={k} delay={8 + i * 5} style={{ flex: 1 }}>
              <div style={card({ transform: `translateY(${i === 1 ? b : 0}px)` })}>
                <div style={{ fontSize: 19, color: skin.dim }}>{k}</div>
                <div style={{ fontSize: 40, fontWeight: 800, marginTop: 6, color: i === 0 ? skin.accent : skin.ink }}>
                  {label ?? <Counter to={v} delay={10 + i * 5} />}
                </div>
              </div>
            </In>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, flex: 1 }}>
          <In delay={22} style={{ flex: 1.3, display: "flex" }}>
            <div style={card({ flex: 1, display: "flex", flexDirection: "column", gap: 16 })}>
              <div style={{ fontSize: 20, color: skin.dim }}>This week</div>
              <Bars values={tile.bars} color={skin.muted} height={250} delay={26} highlight={tile.bars.indexOf(Math.max(...tile.bars))} highlightColor={skin.accent} radius={skin.card.borderRadius ? 8 : 0} />
              <Spark points={line} w={440} h={80} color={skin.accent} delay={34} />
            </div>
          </In>
          <In delay={28} x={30} y={0} style={{ flex: 1, display: "flex" }}>
            <div style={card({ flex: 1, display: "flex", flexDirection: "column", gap: 20 })}>
              {tile.ring !== undefined ? (
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <Ring value={tile.ring} size={96} color={skin.accent} track={skin.muted} delay={32} stroke={12} />
                  <div>
                    <div style={{ fontSize: 18, color: skin.dim }}>{tile.ringLabel}</div>
                    <div style={{ fontSize: 30, fontWeight: 800 }}>
                      <Counter to={tile.ring * 100} delay={32} dur={50} />%
                    </div>
                  </div>
                </div>
              ) : null}
              {tile.list.map(([name, meta], i) => (
                <In key={name} delay={38 + i * 6} x={20} y={0}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 24, paddingTop: 16, paddingBottom: 4, borderTop: `1.5px solid ${skin.muted}` }}>
                    <span style={{ fontWeight: 600 }}>{name}</span>
                    <span style={{ color: skin.accent, fontWeight: 700, whiteSpace: "nowrap" }}>{meta}</span>
                  </div>
                </In>
              ))}
            </div>
          </In>
        </div>
      </div>
    </Stage>
  );
}
