import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

// Token hex equivalents (OKLCH → sRGB, computed from src/styles/tokens.css).
const SIGNAL = 0x52e6ff;
const INK = 0xf5f5f5;
const HAIR = 0x333333;
const RADIUS = 2.2;
const SATELLITES = 90;
const ASSEMBLE_S = 1.2; // AN-006

/**
 * Hero "system core" (spec §36: the five capabilities are one system around a core; depth shows the
 * connections). Plain three.js with named imports so the bundle only carries what the scene uses.
 * Renders only while visible; disposes everything on unmount; falls back to the SVG poster on failure.
 */
export default function SystemCore({ nodes, fallback }: { nodes: string[]; fallback: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [failed, setFailed] = useState(false);
  const labels = useMemo(() => nodes.map((n) => n.split(" ")[0] ?? n), [nodes]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    el.prepend(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7.5;
    const group = new Group();
    scene.add(group);
    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(x: T) => {
      disposables.push(x);
      return x;
    };

    group.add(
      new Mesh(track(new BoxGeometry(0.38, 0.38, 0.38)), track(new MeshBasicMaterial({ color: INK, wireframe: true }))),
      new Mesh(track(new BoxGeometry(0.14, 0.22, 0.14)), track(new MeshBasicMaterial({ color: SIGNAL }))),
    );

    const sphere = track(new SphereGeometry(0.07, 16, 16));
    const nodeMat = track(new MeshBasicMaterial({ color: SIGNAL }));
    const points = labels.map((_, i) => {
      const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
      const target = new Vector3(Math.cos(a) * RADIUS, Math.sin(a) * RADIUS, Math.sin(a * 2) * 0.6);
      const from = target
        .clone()
        .multiplyScalar(3.2)
        .add(new Vector3(0, 0, -4));
      const mesh = new Mesh(sphere, nodeMat);
      mesh.position.copy(from);
      group.add(mesh);
      return { target, from, mesh };
    });

    const spokes = track(new BufferGeometry());
    spokes.setAttribute("position", new BufferAttribute(new Float32Array(labels.length * 6), 3));
    group.add(
      new LineSegments(spokes, track(new LineBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0.35 }))),
    );
    const ring = track(new BufferGeometry());
    ring.setAttribute("position", new BufferAttribute(new Float32Array(labels.length * 6), 3));
    group.add(new LineSegments(ring, track(new LineBasicMaterial({ color: HAIR }))));

    const sat = track(new BufferGeometry());
    const sp = new Float32Array(SATELLITES * 3);
    for (let i = 0; i < SATELLITES; i++) {
      const r = 1.2 + Math.random() * 2.6;
      const a = Math.random() * Math.PI * 2;
      sp.set([Math.cos(a) * r, Math.sin(a) * r, (Math.random() - 0.5) * 1.4], i * 3);
    }
    sat.setAttribute("position", new BufferAttribute(sp, 3));
    group.add(new Points(sat, track(new PointsMaterial({ color: INK, size: 0.02, transparent: true, opacity: 0.5 }))));

    let w = 0;
    let h = 0;
    const resize = () => {
      w = el.clientWidth;
      h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // The canvas sits behind the hero copy, so track the pointer on window.
    const pointer = { x: 0, y: 0 };
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });

    const v = new Vector3();
    const t0 = performance.now();
    let last = t0;
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = Math.min(1, (now - t0) / 1000 / ASSEMBLE_S);
      const k = 1 - (1 - t) ** 4; // ease-out-quart

      group.rotation.z += dt * 0.05;
      group.rotation.x += (pointer.y * 0.25 - group.rotation.x) * 0.05;
      group.rotation.y += (pointer.x * 0.35 - group.rotation.y) * 0.05;
      group.updateMatrixWorld();

      const spa = spokes.attributes.position as BufferAttribute;
      const rga = ring.attributes.position as BufferAttribute;
      points.forEach((p, i) => {
        p.mesh.position.lerpVectors(p.from, p.target, k);
        const { x, y, z } = p.mesh.position;
        spa.setXYZ(i * 2 + 1, x, y, z);
        const q = points[(i + 2) % points.length];
        if (q) {
          rga.setXYZ(i * 2, x, y, z);
          rga.setXYZ(i * 2 + 1, q.mesh.position.x, q.mesh.position.y, q.mesh.position.z);
        }
        // Project to screen and move the HTML label directly (no React render per frame).
        const label = labelRefs.current[i];
        if (label) {
          v.copy(p.mesh.position).applyMatrix4(group.matrixWorld).project(camera);
          label.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h + 16}px) translateX(-50%)`;
          label.style.opacity = String(k);
        }
      });
      spa.needsUpdate = true;
      rga.needsUpdate = true;
      renderer.render(scene, camera);
    };

    // Render only while the hero is on screen: no GPU work while reading the rest of the page.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e?.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);

    const onLost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [labels]);

  if (failed) return fallback;
  return (
    <div ref={wrap} className="relative h-full w-full">
      {labels.map((l, i) => (
        <span
          key={l}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="pointer-events-none absolute top-0 left-0 font-mono text-label uppercase text-muted opacity-0"
        >
          {l}
        </span>
      ))}
    </div>
  );
}
