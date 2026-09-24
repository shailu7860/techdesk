import { useEffect, useRef } from "react";
import { isMotionPaused, onMotionChange } from "../../lib/motion";

type Star = { x: number; y: number; z: number; r: number; tw: number; ph: number };

/**
 * Site-wide deep-space backdrop: a 2D-canvas starfield (3 depth layers, twinkle, slow drift,
 * scroll parallax) under drifting nebula clouds (pure CSS). Fixed behind all content.
 * Performance: ~1 star per 6,000 px² (capped), DPR ≤ 1.5, ~30 fps, paused when the tab is hidden.
 * Reduced motion: stars are drawn once, nebulae do not drift.
 */
export function SpaceBackdrop() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let still = reduced || isMotionPaused();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];

    const seed = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(420, Math.round((w * h) / 6000));
      stars = Array.from({ length: count }, () => {
        const z = Math.random(); // depth: 0 far … 1 near
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.35 + z * 1.25,
          tw: 0.6 + Math.random() * 1.8,
          ph: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = (t: number) => {
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        // Parallax: nearer stars move more with scroll; everything drifts slowly left.
        const x = (((s.x - t * 0.004 * (0.2 + s.z)) % w) + w) % w;
        const y = (((s.y - scroll * (0.02 + s.z * 0.12)) % h) + h) % h;
        const a = still
          ? 0.55 + s.z * 0.4
          : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.tw + s.ph)) * (0.4 + s.z * 0.6);
        ctx.globalAlpha = a;
        ctx.fillStyle = s.z > 0.92 ? "#b9ffd6" : "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    seed();
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 33) return; // ~30 fps is plenty for stars
      last = t;
      draw(t);
    };
    const onResize = () => {
      seed();
      if (still) draw(0);
    };
    const onScroll = () => still && draw(0);
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !still) raf = requestAnimationFrame(loop);
    };
    const offMotion = onMotionChange(() => {
      still = reduced || isMotionPaused();
      onVisibility();
      if (still) draw(performance.now());
    });

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    if (still) draw(0);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      offMotion();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="nebula nebula-a" />
      <div className="nebula nebula-b" />
      <div className="nebula nebula-c" />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
