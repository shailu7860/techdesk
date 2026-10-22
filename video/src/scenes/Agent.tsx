// AI agent on WhatsApp, flat minimal: solid colours, one violet accent for the AI.
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { In, Stage, useBreathe } from "../kit";
import { theme } from "../theme";

const BG = "#0f1714";
const CHAT = "#111e19";
const ME = "#1f6b45";
const THEM = "#1c2a24";

const MESSAGES: { from: "user" | "agent" | "tool"; text: string; at: number }[] = [
  { from: "user", text: "Hi, can you build an HRMS for our 60-person team?", at: 6 },
  { from: "agent", text: "Yes. Do you need attendance, leave and payroll, or payroll only?", at: 30 },
  { from: "user", text: "All three, plus approvals on mobile.", at: 52 },
  { from: "tool", text: "Lead qualified · call booked Tuesday 11:00", at: 76 },
];

function Typing({ at }: { at: number }) {
  const frame = useCurrentFrame();
  if (frame < at - 14 || frame >= at) return null;
  return (
    <div style={{ alignSelf: "flex-start", display: "flex", gap: 8, background: THEM, padding: "18px 22px", borderRadius: 22 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: theme.colors.textDim, opacity: 0.4 + 0.6 * Math.abs(Math.sin(frame / 4 + i)) }} />
      ))}
    </div>
  );
}

export function Agent({ caption = true }: { caption?: boolean }) {
  const frame = useCurrentFrame();
  const b = useBreathe(4, 40);
  return (
    <Stage
      background={<AbsoluteFill style={{ background: BG }} />}
      caption={caption ? { title: "WhatsApp AI agent", style: "Flat minimal", kind: "What we build" } : undefined}
    >
      <div style={{ position: "absolute", left: 70, right: 70, top: 70, height: 800, display: "flex", gap: 28 }}>
        <In delay={2} style={{ flex: 1.35 }}>
          <div style={{ background: CHAT, borderRadius: 32, height: 800, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 28px", background: "#16251f" }}>
              <div style={{ width: 52, height: 52, borderRadius: 26, background: theme.colors.violet }} />
              <div>
                <div style={{ fontSize: 26, fontWeight: 700 }}>Sales assistant</div>
                <div style={{ fontSize: 18, color: theme.colors.primary }}>online</div>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, padding: 28 }}>
              {MESSAGES.map((m) => {
                const out = m.from !== "user";
                const typing = m.from === "agent";
                if (m.from === "tool")
                  return (
                    <In key={m.text} delay={m.at} config="bouncy" style={{ alignSelf: "center" }}>
                      <div style={{ background: theme.colors.violet, color: "#140f2b", padding: "14px 22px", borderRadius: 16, fontSize: 22, fontWeight: 700 }}>
                        {m.text}
                      </div>
                    </In>
                  );
                return [
                  typing ? <Typing key={`t${m.at}`} at={m.at} /> : null,
                  <In key={m.text} delay={m.at} y={20} config="snappy" style={{ alignSelf: out ? "flex-start" : "flex-end", maxWidth: "82%" }}>
                    <div style={{ background: out ? THEM : ME, padding: "18px 22px", borderRadius: 22, fontSize: 24, lineHeight: 1.35 }}>{m.text}</div>
                  </In>,
                ];
              })}
            </div>
          </div>
        </In>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            ["Reads", "Your services, prices and FAQs"],
            ["Decides", "Asks the questions that qualify a lead"],
            ["Acts", "Books the call and updates the CRM"],
            ["Hands over", "A person takes over when it matters"],
          ].map(([k, v], i) => (
            <In key={k} delay={12 + i * 6} x={30} y={0}>
              <div
                style={{
                  background: "#16251f",
                  borderRadius: 24,
                  padding: 26,
                  border: `2px solid ${frame > 76 && i === 2 ? theme.colors.violet : "#22352d"}`,
                  transform: `translateY(${i % 2 ? b : -b}px)`,
                }}
              >
                <div style={{ fontSize: 20, color: theme.colors.violet, fontWeight: 700 }}>{k}</div>
                <div style={{ fontSize: 24, marginTop: 6, lineHeight: 1.3 }}>{v}</div>
              </div>
            </In>
          ))}
        </div>
      </div>
    </Stage>
  );
}
