import { useEffect, useRef, useState } from "react";
import { LoopVideo } from "../../components/space/LoopVideo";

// Order and length match the Hero composition in video/src/Root.tsx (5 scenes × 4 s).
const SCENE_SECONDS = 4;
const PRODUCTS = [
  { label: "Trading", name: "Algo trading platform", style: "Glassmorphism" },
  { label: "ERP and HRMS", name: "ERP and HRMS suite", style: "Neumorphism" },
  { label: "Gaming", name: "Gaming platform", style: "Neon cyber" },
  { label: "E-bidding", name: "E-bidding extension", style: "Claymorphism" },
  { label: "AI agent", name: "WhatsApp AI agent", style: "Flat minimal" },
] as const;

/** Hero visual: an app window playing our product reel, with tabs that follow (and jump) the video. */
export function HeroShowcase() {
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const sync = () => setActive(Math.min(PRODUCTS.length - 1, Math.floor(v.currentTime / SCENE_SECONDS)));
    v.addEventListener("timeupdate", sync);
    v.addEventListener("seeked", sync);
    return () => {
      v.removeEventListener("timeupdate", sync);
      v.removeEventListener("seeked", sync);
    };
  }, []);

  const jump = (i: number) => {
    const v = video.current;
    // Land after the scene's entrance, so a paused video still shows the finished screen.
    if (v) v.currentTime = i * SCENE_SECONDS + 2.6;
    setActive(i);
  };

  const current = PRODUCTS[active] ?? PRODUCTS[0];
  return (
    <div className="mx-auto w-full max-w-[40rem] overflow-hidden rounded-lg border border-hairline bg-panel xl:max-w-[46rem]">
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-hairline" />
          <span className="size-2.5 rounded-full bg-hairline" />
          <span className="size-2.5 rounded-full bg-hairline" />
        </span>
        <fieldset className="m-0 flex min-w-0 gap-1 overflow-x-auto border-0 p-0">
          <legend className="sr-only">Product previews</legend>
          {PRODUCTS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              aria-pressed={i === active}
              onClick={() => jump(i)}
              className={`shrink-0 cursor-pointer rounded-sm px-2.5 py-1.5 text-label font-medium whitespace-nowrap transition-colors ${
                i === active ? "bg-panel-hi text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </fieldset>
      </div>
      <LoopVideo videoRef={video} name="hero" width={720} height={626} eager />
      <div className="flex items-baseline justify-between gap-4 border-t border-hairline px-4 py-3 text-small">
        <span className="font-medium text-ink">{current.name}</span>
        <span className="text-muted">{current.style} mockup</span>
      </div>
    </div>
  );
}
