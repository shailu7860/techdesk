// Single source of truth for the TechDesk showcase videos (colours match src/styles/tokens.css).
import { Easing } from "remotion";

export const theme = {
  colors: {
    bg: "#07130e",
    bgAlt: "#0d1f17",
    primary: "#3ee07a", // site "signal" green, the hero colour
    teal: "#2fb5a8",
    violet: "#9b8cff", // site "agent" violet, AI only
    text: "#f3f8f5",
    textDim: "#b9c9c0",
    up: "#3ee07a",
    down: "#ff6b6b",
  },
  font: "Archivo, system-ui, sans-serif",
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;

/** Frames per scene in the hero reel and in each showcase clip. */
export const SCENE = 120;
export const FPS = 30;
