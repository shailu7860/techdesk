// Gaming platform, neon cyber: hard neon strokes on near-black, odds that tick live.
import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { In, Stage, useBreathe, useProgress, useSpring } from "../kit";

const BG = "#07060d";
const CYAN = "#22e6ff";
const PINK = "#ff3da8";
const LIME = "#b6ff3d";
const DIM = "#8f8aa8";

const panel = (c: string): React.CSSProperties => ({
  background: "#0e0c19",
  border: `2px solid ${c}`,
  borderRadius: 18,
});

const MATCHES = [
  ["Mumbai", "Chennai", [1.85, 3.4, 2.1]],
  ["Arsenal", "Madrid", [2.4, 3.1, 2.9]],
  ["Lakers", "Celtics", [1.72, 0, 2.15]],
  ["Delhi", "Kolkata", [1.95, 3.6, 1.9]],
  ["Milan", "Porto", [2.05, 3.25, 2.6]],
  ["Warriors", "Suns", [1.66, 0, 2.3]],
] as const;

function Odd({ v, i, row }: { v: number; i: number; row: number }) {
  const frame = useCurrentFrame();
  const tick = Math.floor((frame + row * 11 + i * 7) / 26);
  const delta = ((tick * 37 + row * 13 + i * 5) % 7) - 3;
  const val = v + delta * 0.02;
  const up = delta >= 0;
  const picked = row === 0 && i === 0 && frame > 44;
  if (v === 0) return <div style={{ flex: 1 }} />;
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        padding: "12px 0",
        borderRadius: 12,
        fontSize: 26,
        fontWeight: 800,
        fontVariantNumeric: "tabular-nums",
        border: `2px solid ${picked ? LIME : "#2a2640"}`,
        background: picked ? LIME : "transparent",
        color: picked ? BG : up ? CYAN : PINK,
      }}
    >
      {val.toFixed(2)}
    </div>
  );
}

export function Gaming({ caption = true }: { caption?: boolean }) {
  const frame = useCurrentFrame();
  const b = useBreathe(4, 30);
  const slip = useSpring(44, "bouncy");
  const placed = useProgress(78, 88);
  const scan = interpolate(frame % 60, [0, 60], [0, 1]);
  return (
    <Stage
      background={
        <AbsoluteFill style={{ background: BG }}>
          <AbsoluteFill style={{ transform: `translateY(${scan * 48}px)` }}>
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 48 - 48, height: 2, background: "#ffffff0a" }} />
            ))}
          </AbsoluteFill>
        </AbsoluteFill>
      }
      caption={caption ? { title: "Gaming platform", style: "Neon cyber", kind: "Our project" } : undefined}
    >
      <div style={{ position: "absolute", left: 70, right: 70, top: 70, height: 800, display: "flex", flexDirection: "column", gap: 22 }}>
        <In delay={2}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.02em", color: CYAN, fontStretch: "118%" }}>Sportsbook</div>
            <div style={{ ...panel(PINK), padding: "12px 22px", fontSize: 24, fontWeight: 700 }}>
              Wallet{" "}
              <span style={{ color: LIME }}>
                ₹{Math.round(12650 - 500 * placed).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </In>
        <div style={{ display: "flex", gap: 22, flex: 1 }}>
          <div style={{ ...panel(CYAN), flex: 1.6, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 10, fontSize: 18, color: DIM, paddingLeft: 230 }}>
              {["1", "X", "2"].map((h) => (
                <div key={h} style={{ flex: 1, textAlign: "center" }}>
                  {h}
                </div>
              ))}
            </div>
            {MATCHES.map(([a, c, odds], row) => (
              <In key={a} delay={8 + row * 5} x={-30} y={0}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: "1px solid #1f1c31" }}>
                  <div style={{ width: 220, fontSize: 22, lineHeight: 1.3 }}>
                    <div style={{ fontWeight: 700 }}>{a}</div>
                    <div style={{ color: DIM }}>{c}</div>
                  </div>
                  {odds.map((v, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed columns
                    <Odd key={i} v={v} i={i} row={row} />
                  ))}
                </div>
              </In>
            ))}
            <div style={{ marginTop: "auto", display: "flex", gap: 12, fontSize: 20, color: DIM }}>
              <span style={{ color: PINK, fontWeight: 800 }}>LIVE</span> Odds update in real time
            </div>
          </div>
          <div
            style={{
              ...panel(LIME),
              flex: 1,
              padding: 24,
              opacity: slip,
              transform: `translateX(${(1 - slip) * 60}px) translateY(${b}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 800 }}>Bet slip</div>
            <div style={{ border: "2px solid #2a2640", borderRadius: 14, padding: 16, fontSize: 20 }}>
              <div style={{ color: DIM }}>Match winner</div>
              <div style={{ fontWeight: 700, fontSize: 24, marginTop: 4 }}>Mumbai @ 1.85</div>
            </div>
            {[
              ["Stake", "₹500"],
              ["Potential return", "₹925"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
                <span style={{ color: DIM }}>{k}</span>
                <span style={{ fontWeight: 800 }}>{v}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #1f1c31", paddingTop: 16, fontSize: 20, color: DIM }}>Ledger</div>
            {[
              ["Stake debited", "−₹500", PINK],
              ["Bet open", "Mumbai", CYAN],
            ].map(([k, v, c], i) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 20,
                  opacity: interpolate(frame, [86 + i * 5, 96 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}
              >
                <span>{k}</span>
                <span style={{ color: c, fontWeight: 800 }}>{v}</span>
              </div>
            ))}
            <div
              style={{
                marginTop: "auto",
                textAlign: "center",
                padding: "18px 0",
                borderRadius: 14,
                fontSize: 24,
                fontWeight: 900,
                background: placed > 0.5 ? CYAN : LIME,
                color: BG,
                transform: `scale(${1 - Math.sin(placed * Math.PI) * 0.06})`,
              }}
            >
              {placed > 0.5 ? "Bet placed" : "Place bet"}
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}
