import { lazy, Suspense, useEffect, useState } from "react";
import { Button } from "../../components/ui/Button";
import { services } from "../../data/services";
import { SystemCorePoster } from "./SystemCorePoster";

// ponytail: WebGL scene is a separate lazy chunk; the SVG poster is the LCP-safe default (brief §6).
const SystemCore = lazy(() => import("./SystemCore"));
const serviceNames = services.map((s) => s.name);

function canRunWebGL() {
  if (typeof window === "undefined") return false;
  const ok = window.matchMedia(
    "(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  ).matches;
  if (!ok) return false;
  try {
    return Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    return false;
  }
}

export function Hero() {
  const [webgl, setWebgl] = useState(false);
  useEffect(() => {
    const run = () => setWebgl(canRunWebGL());
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = idle(run);
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-20 md:left-[38%] md:opacity-30 lg:left-[52%] lg:opacity-100"
      >
        {webgl ? (
          <Suspense fallback={<SystemCorePoster />}>
            <SystemCore nodes={serviceNames} fallback={<SystemCorePoster />} />
          </Suspense>
        ) : (
          <SystemCorePoster />
        )}
      </div>
      <div className="container-page flex min-h-[calc(100svh-4.5rem)] flex-col justify-center py-20">
        <p className="font-mono text-label uppercase text-signal" data-hero-reveal>
          TechDesk / engineering studio
        </p>
        <h1 id="hero-title" className="mt-6 max-w-[13ch] font-display text-display uppercase" data-hero-title>
          We engineer digital systems for what's next.
        </h1>
        <p className="mt-8 max-w-[52ch] text-body text-muted md:text-title md:leading-snug" data-hero-reveal>
          AI agents, software platforms, intelligent automation and high-performance digital experiences engineered for
          ambitious businesses.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4" data-hero-reveal>
          <Button href="/contact" size="lg" trailing="→">
            Start a project
          </Button>
          <Button href="#work" variant="secondary" size="lg" trailing="↓">
            Explore our work
          </Button>
        </div>
      </div>
    </section>
  );
}
