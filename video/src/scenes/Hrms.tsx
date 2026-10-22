// ERP and HRMS, neumorphism: soft extruded surfaces on one light tone.
import type React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { Bars, Counter, In, Ring, Stage, useBreathe, useProgress, useSpring } from "../kit";

const BASE = "#e3ebe6";
const INK = "#1d2f26";
const DIM = "#5f7468";
const ACCENT = "#1f9d57";

const raised = (r = 30): React.CSSProperties => ({
  background: BASE,
  borderRadius: r,
  boxShadow: "12px 12px 26px #bcc7c0, -12px -12px 26px #ffffff",
});
const pressed: React.CSSProperties = {
  background: BASE,
  borderRadius: 18,
  boxShadow: "inset 6px 6px 12px #bcc7c0, inset -6px -6px 12px #ffffff",
};

function Approval({ name, type, delay }: { name: string; type: string; delay: number }) {
  const on = useSpring(delay + 28, "snappy");
  return (
    <In delay={delay} x={30} y={0}>
      <div style={{ ...pressed, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: INK }}>{name}</div>
          <div style={{ fontSize: 18, color: DIM }}>{type}</div>
        </div>
        <div style={{ ...raised(22), width: 84, height: 44, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 7,
              left: interpolate(on, [0, 1], [8, 46]),
              width: 30,
              height: 30,
              borderRadius: 15,
              background: interpolate(on, [0, 1], [0, 1]) > 0.5 ? ACCENT : "#b8c4bd",
            }}
          />
        </div>
      </div>
    </In>
  );
}

export function Hrms({ caption = true }: { caption?: boolean }) {
  const b = useBreathe(4, 42);
  const run = useProgress(40, 95, "inOut");
  return (
    <Stage
      background={<AbsoluteFill style={{ background: BASE }} />}
      caption={caption ? { title: "ERP and HRMS suite", style: "Neumorphism", kind: "Our project", dark: false } : undefined}
    >
      <div style={{ position: "absolute", left: 70, right: 70, top: 70, height: 800, display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 30 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <In delay={4}>
            <div style={{ ...raised(), padding: 30, display: "flex", alignItems: "center", gap: 26, transform: `translateY(${b}px)` }}>
              <div style={{ position: "relative" }}>
                <Ring value={0.92} size={170} color={ACCENT} track="#cfd9d3" delay={8} />
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 38, fontWeight: 800, color: INK }}>
                  <span>
                    <Counter to={92} delay={8} dur={50} />%
                  </span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 22, color: DIM }}>Attendance today</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: INK, marginTop: 4 }}>On time</div>
              </div>
            </div>
          </In>
          <In delay={12}>
            <div style={{ ...raised(), padding: 30 }}>
              <div style={{ fontSize: 22, color: DIM }}>Payroll run</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: INK, marginTop: 4 }}>{run < 1 ? "Processing" : "Completed"}</div>
              <div style={{ ...pressed, height: 26, marginTop: 20, padding: 5 }}>
                <div style={{ height: 16, width: `${run * 100}%`, borderRadius: 8, background: ACCENT }} />
              </div>
            </div>
          </In>
          <In delay={20}>
            <div style={{ ...raised(), padding: 30 }}>
              <div style={{ fontSize: 22, color: DIM, marginBottom: 18 }}>Inventory by warehouse</div>
              <Bars values={[0.55, 0.8, 0.45, 0.95, 0.7]} color="#b5c8bc" height={150} delay={26} highlight={3} highlightColor={ACCENT} radius={10} />
            </div>
          </In>
        </div>
        <In delay={10} x={40} y={0}>
          <div style={{ ...raised(), padding: 30, display: "flex", flexDirection: "column", gap: 20, height: 800 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: INK }}>Approvals</div>
            <Approval name="Leave request" type="HR · 2 days" delay={18} />
            <Approval name="Purchase order" type="ERP · Procurement" delay={24} />
            <Approval name="Expense claim" type="Finance · Travel" delay={30} />
            <Approval name="New hire onboarding" type="HR · Engineering" delay={36} />
            <Approval name="Asset allocation" type="Admin · Laptop" delay={42} />
            <Approval name="Vendor invoice" type="ERP · Accounts" delay={48} />
            <Approval name="Overtime" type="HR · Operations" delay={54} />
          </div>
        </In>
      </div>
    </Stage>
  );
}
