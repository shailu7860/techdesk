// E-bidding automation extension, claymorphism: puffy pastel shapes, a countdown, then the save.
import type React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { In, Stage, useBreathe, useProgress, useSpring } from "../kit";

const BG = "#f4ecff";
const INK = "#2b2240";
const DIM = "#6f6590";
const MINT = "#8ee6b8";
const LILAC = "#c9b6ff";
const PEACH = "#ffc9a8";

const clay = (c: string, r = 40): React.CSSProperties => ({
  background: c,
  borderRadius: r,
  boxShadow: "inset -8px -10px 18px rgba(0,0,0,0.12), inset 8px 10px 18px rgba(255,255,255,0.6), 16px 20px 34px rgba(80,50,140,0.18)",
});

export function Bidding({ caption = true }: { caption?: boolean }) {
  const frame = useCurrentFrame();
  const b = useBreathe(6, 34);
  const pop = useSpring(16, "bouncy");
  // Countdown 3 → 0 across frames 30..75, then the bid is saved.
  const left = Math.max(0, 3 - Math.floor(interpolate(frame, [30, 75], [0, 3.99], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const saved = useProgress(76, 90);
  const savedPop = useSpring(76, "bouncy");
  return (
    <Stage
      background={<AbsoluteFill style={{ background: BG }} />}
      caption={caption ? { title: "E-bidding extension", style: "Claymorphism", kind: "Our project", dark: false } : undefined}
    >
      <div style={{ position: "absolute", left: 70, right: 70, top: 70, height: 800 }}>
        {/* The vendor portal behind the extension */}
        <In delay={2}>
          <div style={{ ...clay("#ffffff", 44), width: 600, height: 760, padding: 36, display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: INK }}>Vendor e-bidding portal</div>
            <div style={{ fontSize: 22, color: DIM }}>Tender: Industrial pumps, lot 4</div>
            {["Unit price", "Quantity", "Delivery (days)", "Remarks"].map((f, i) => (
              <In key={f} delay={8 + i * 5}>
                <div style={{ fontSize: 20, color: DIM, marginBottom: 8 }}>{f}</div>
                <div style={{ ...clay("#f3efff", 22), height: 64, display: "flex", alignItems: "center", padding: "0 22px", fontSize: 24, fontWeight: 700, color: INK }}>
                  {["₹ 48,500", "120", "21", "Prepared in advance"][i]}
                </div>
              </In>
            ))}
            <div style={{ ...clay(MINT, 26), marginTop: "auto", padding: "20px 0", textAlign: "center", fontSize: 24, fontWeight: 800, color: INK, opacity: 0.4 + saved * 0.6 }}>
              Submit bid
            </div>
          </div>
        </In>
        {/* The extension popup */}
        <div
          style={{
            ...clay(LILAC, 48),
            position: "absolute",
            right: 0,
            top: 90 + b,
            width: 380,
            padding: 32,
            opacity: pop,
            transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])}) rotate(${interpolate(pop, [0, 1], [8, -2])}deg)`,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 800, color: INK }}>Bid assistant</div>
          <div style={{ ...clay(MINT, 26), padding: "16px 20px", fontSize: 22, fontWeight: 700, color: INK }}>Bid prepared</div>
          <div style={{ ...clay("#ffffff", 30), padding: 22, textAlign: "center" }}>
            <div style={{ fontSize: 20, color: DIM }}>Window opens in</div>
            <div style={{ fontSize: 76, fontWeight: 900, color: INK, fontVariantNumeric: "tabular-nums" }}>00:0{left}</div>
          </div>
          <div
            style={{
              ...clay(saved > 0.5 ? MINT : PEACH, 26),
              padding: "18px 20px",
              fontSize: 24,
              fontWeight: 800,
              color: INK,
              textAlign: "center",
              transform: `scale(${interpolate(savedPop, [0, 1], [1, 1.06])})`,
            }}
          >
            {saved > 0.5 ? "Saved the instant it opened" : "Waiting for the window"}
          </div>
          <div style={{ fontSize: 18, color: DIM, textAlign: "center" }}>You still confirm the final submission</div>
        </div>
      </div>
    </Stage>
  );
}
