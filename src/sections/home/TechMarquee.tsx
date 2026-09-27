import { MotionToggle } from "../../components/space/MotionToggle";
import { projects } from "../../data/projects";

// Real technologies from real projects (deduplicated), not a logo wall of clients.
const items = [...new Set(projects.flatMap((p) => p.stack))].filter((t) => t.length < 22).slice(0, 18);

/** Infinite horizontal strip. The track is duplicated so the loop is seamless; the copy is hidden from AT. */
export function TechMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap text-title font-semibold text-muted/80">
          {t}
          <span aria-hidden="true" className="size-1.5 rounded-full bg-signal/70" />
        </li>
      ))}
    </ul>
  );
  return (
    <section
      aria-label="Technologies we build with"
      className="marquee relative overflow-hidden border-y border-hairline/60 bg-void/40 py-6"
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
      <MotionToggle className="absolute top-1/2 right-2 -translate-y-1/2 bg-void/80 backdrop-blur-sm" />
    </section>
  );
}
