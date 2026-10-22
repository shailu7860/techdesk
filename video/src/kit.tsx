// Shared motion pieces. Every entrance is a spring on 2-3 properties; nothing is linear.
import type React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SCENE, theme } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const useSpring = (delay = 0, config: keyof typeof theme.spring = "smooth") => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: theme.spring[config] });
};

/** Eased 0→1 progress between two frames. */
export const useProgress = (from: number, to: number, ease: keyof typeof theme.ease = "out") => {
  const frame = useCurrentFrame();
  return interpolate(frame, [from, to], [0, 1], { ...clamp, easing: theme.ease[ease] });
};

/** Sin-wave micro motion for anything that stays on screen. */
export const useBreathe = (amp = 4, speed = 40, phase = 0) => {
  const frame = useCurrentFrame();
  return Math.sin(frame / speed + phase) * amp;
};

export const In: React.FC<{
  delay?: number;
  y?: number;
  x?: number;
  config?: keyof typeof theme.spring;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, y = 28, x = 0, config = "smooth", style, children }) => {
  const p = useSpring(delay, config);
  return (
    <div
      style={{
        opacity: p,
        transform: `translate(${interpolate(p, [0, 1], [x, 0])}px, ${interpolate(p, [0, 1], [y, 0])}px) scale(${interpolate(p, [0, 1], [0.94, 1])})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Counter: React.FC<{ to: number; from?: number; delay?: number; dur?: number; fmt?: (n: number) => string }> = ({
  to,
  from = 0,
  delay = 0,
  dur = 40,
  fmt = (n) => Math.round(n).toLocaleString("en-IN"),
}) => {
  const p = useProgress(delay, delay + dur);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{fmt(from + (to - from) * p)}</span>;
};

/** Bars that grow in with a stagger. */
export const Bars: React.FC<{
  values: number[];
  color: string;
  height: number;
  delay?: number;
  gap?: number;
  radius?: number;
  highlight?: number;
  highlightColor?: string;
}> = ({ values, color, height, delay = 0, gap = 10, radius = 6, highlight, highlightColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap, height }}>
      {values.map((v, i) => {
        const p = spring({ frame: frame - delay - i * 4, fps, config: theme.spring.smooth });
        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            key={i}
            style={{
              flex: 1,
              height: height * v * p,
              background: i === highlight ? highlightColor : color,
              borderRadius: radius,
            }}
          />
        );
      })}
    </div>
  );
};

/** A line that draws itself across an SVG box. */
export const Spark: React.FC<{
  points: number[];
  w: number;
  h: number;
  color: string;
  delay?: number;
  dur?: number;
  width?: number;
}> = ({ points, w, h, color, delay = 0, dur = 45, width = 4 }) => {
  const p = useProgress(delay, delay + dur, "inOut");
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 8) - 4}`)
    .join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline
        points={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
      />
    </svg>
  );
};

export const Ring: React.FC<{ value: number; size: number; color: string; track: string; delay?: number; stroke?: number }> = ({
  value,
  size,
  color,
  track,
  delay = 0,
  stroke = 18,
}) => {
  const p = useProgress(delay, delay + 50);
  const r = (size - stroke) / 2;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - value * p}
      />
    </svg>
  );
};

/** Deterministic pseudo-random walk for charts. */
export const walk = (seed: string, n: number, start = 50, vol = 6) => {
  const out = [start];
  for (let i = 1; i < n; i++) out.push(out[i - 1] + (random(`${seed}${i}`) - 0.47) * vol);
  return out;
};

/** Soft solid-colour blobs drifting behind the scene (the site's nebula look, no gradients). */
export const Blobs: React.FC<{ colors: string[]; bg: string; blur?: number; opacity?: number }> = ({
  colors,
  bg,
  blur = 110,
  opacity = 0.55,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      {colors.map((c, i) => {
        const size = width * (0.55 - i * 0.08);
        const x = width * [0.05, 0.55, 0.2][i % 3] + Math.sin(frame / (50 + i * 9) + i) * 40;
        const y = height * [0.0, 0.35, 0.6][i % 3] + Math.cos(frame / (60 + i * 7) + i) * 36;
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: c,
              opacity,
              filter: `blur(${blur}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: noise,
        backgroundSize: "220px",
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  );
};

/**
 * Scene wrapper: background, content stage with a whole-scene entrance and a faster exit,
 * optional caption, grain on top. Scenes are SCENE frames long and loop cleanly.
 */
export const Stage: React.FC<{
  background: React.ReactNode;
  caption?: { title: string; style: string; kind: string; dark?: boolean };
  children: React.ReactNode;
}> = ({ background, caption, children }) => {
  const frame = useCurrentFrame();
  const enter = useSpring(0, "smooth");
  const exit = interpolate(frame, [SCENE - 12, SCENE], [0, 1], { ...clamp, easing: theme.ease.in });
  const ink = caption?.dark === false ? "#10211a" : theme.colors.text;
  const dim = caption?.dark === false ? "#3d5348" : theme.colors.textDim;
  return (
    <AbsoluteFill style={{ fontFamily: theme.font, color: theme.colors.text }}>
      {background}
      <AbsoluteFill
        style={{
          opacity: enter * (1 - exit),
          transform: `translateY(${interpolate(enter, [0, 1], [40, 0]) - exit * 30}px) scale(${interpolate(enter, [0, 1], [0.95, 1]) - exit * 0.03})`,
        }}
      >
        {children}
      </AbsoluteFill>
      {caption && (
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            bottom: 56,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 24,
            opacity: 1 - exit,
          }}
        >
          <In delay={10} y={20}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em", color: ink, fontStretch: "118%" }}>
              {caption.title}
            </div>
          </In>
          <In delay={16} y={20}>
            <div style={{ fontSize: 24, fontWeight: 500, color: dim, textAlign: "right" }}>
              {caption.style} · {caption.kind}
            </div>
          </In>
        </div>
      )}
      <Grain />
    </AbsoluteFill>
  );
};
