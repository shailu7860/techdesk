// Algo trading platform, glassmorphism: frosted panels over a bright nebula.
import type React from "react";
import { random, useCurrentFrame } from "remotion";
import { Blobs, Counter, In, Stage, useBreathe, useProgress, walk } from "../kit";
import { theme } from "../theme";

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1.5px solid rgba(255,255,255,0.22)",
  backdropFilter: "blur(26px)",
  borderRadius: 28,
};

const series = walk("nifty", 34, 60, 9);

function Candles({ w, h }: { w: number; h: number }) {
  const frame = useCurrentFrame();
  const max = Math.max(...series) + 6;
  const min = Math.min(...series) - 6;
  const y = (v: number) => h - ((v - min) / (max - min)) * h;
  const step = w / series.length;
  return (
    <svg width={w} height={h}>
      {series.slice(1).map((close, i) => {
        const open = series[i];
        const wick = random(`w${i}`) * 5 + 2;
        const show = Math.min(1, Math.max(0, (frame - 14 - i * 1.6) / 6));
        const up = close >= open;
        const c = up ? theme.colors.up : theme.colors.down;
        const x = i * step + step / 2;
        return (
          <g key={x} opacity={show} transform={`translate(0 ${(1 - show) * 14})`}>
            <line x1={x} x2={x} y1={y(Math.max(open, close) + wick)} y2={y(Math.min(open, close) - wick)} stroke={c} strokeWidth={2} />
            <rect
              x={x - step * 0.32}
              width={step * 0.64}
              y={y(Math.max(open, close))}
              height={Math.max(3, Math.abs(y(open) - y(close)))}
              fill={c}
              rx={2}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function Trading({ caption = true }: { caption?: boolean }) {
  const b = useBreathe(5, 38);
  const signal = useProgress(70, 84);
  return (
    <Stage
      background={<Blobs bg="#06110d" colors={[theme.colors.primary, theme.colors.teal, "#3d6bff"]} opacity={0.6} />}
      caption={caption ? { title: "Algo trading platform", style: "Glassmorphism", kind: "Our project" } : undefined}
    >
      <div style={{ position: "absolute", left: 70, right: 70, top: 70, height: 800, display: "flex", gap: 24 }}>
        <div style={{ ...glass, flex: 1.65, padding: 32, display: "flex", flexDirection: "column", gap: 22 }}>
          <In delay={4}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 22, color: theme.colors.textDim }}>Strategy</div>
                <div style={{ fontSize: 34, fontWeight: 700 }}>Opening range breakout</div>
              </div>
              <div style={{ ...glass, borderRadius: 14, padding: "10px 18px", fontSize: 22, fontWeight: 600 }}>
                Paper mode
              </div>
            </div>
          </In>
          <div style={{ ...glass, borderRadius: 20, padding: 18, transform: `translateY(${b * 0.4}px)` }}>
            <Candles w={530} h={470} />
          </div>
          <In delay={30}>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                ["Backtest", "Complete"],
                ["Mode", "Paper"],
                ["Broker", "Connected"],
              ].map(([k, v], i) => (
                <div key={k} style={{ ...glass, borderRadius: 18, flex: 1, padding: "16px 18px" }}>
                  <div style={{ fontSize: 18, color: theme.colors.textDim }}>{k}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, marginTop: 4, color: i === 2 ? theme.colors.primary : theme.colors.text }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </In>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <In delay={22} x={40} y={0}>
            <div style={{ ...glass, padding: 28, transform: `translateY(${-b}px)` }}>
              <div style={{ fontSize: 20, color: theme.colors.violet, fontWeight: 600 }}>AI live research</div>
              <div style={{ fontSize: 30, fontWeight: 700, marginTop: 8 }}>Index long setup</div>
              {[
                ["Entry", 24180],
                ["Stop-loss", 24095],
                ["Target", 24350],
              ].map(([k, v], i) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 24, marginTop: 14 }}>
                  <span style={{ color: theme.colors.textDim }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>
                    <Counter to={v as number} from={(v as number) - 400} delay={30 + i * 5} />
                  </span>
                </div>
              ))}
            </div>
          </In>
          <In delay={34} x={40} y={0}>
            <div style={{ ...glass, padding: 28 }}>
              <div style={{ fontSize: 20, color: theme.colors.textDim }}>Execution engine</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, fontSize: 26, fontWeight: 700 }}>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                    background: theme.colors.primary,
                    opacity: 0.6 + Math.abs(b) / 12,
                  }}
                />
                Watching signals
              </div>
            </div>
          </In>
          <div
            style={{
              ...glass,
              padding: 28,
              background: `rgba(62,224,122,${0.08 + signal * 0.22})`,
              opacity: signal,
              transform: `scale(${0.9 + signal * 0.1})`,
            }}
          >
            <div style={{ fontSize: 20, color: theme.colors.textDim }}>Signal</div>
            <div style={{ fontSize: 30, fontWeight: 700, marginTop: 6 }}>Paper order placed</div>
            <div style={{ fontSize: 20, color: theme.colors.textDim, marginTop: 6 }}>Stop-loss and target armed</div>
          </div>
        </div>
      </div>
    </Stage>
  );
}
