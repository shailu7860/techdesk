import { type KeyboardEvent, useRef, useState } from "react";
import { Link } from "react-router";
import { Label } from "../../components/ui/Label";
import { industries } from "../../data/industries";
import { getProject } from "../../data/projects";
import { getService } from "../../data/services";

/** WAI-ARIA tabs: arrow keys move between industries, the panel swaps example + linked project. */
export function IndustriesSection() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = industries[active] ?? industries[0];
  const project = getProject(current?.project);

  const onKey = (e: KeyboardEvent) => {
    const d =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const n =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? industries.length - 1
          : (active + d + industries.length) % industries.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="industries" aria-labelledby="ind-title" className="border-t border-hairline py-(--section-y)">
      <div className="container-page">
        <h2 id="ind-title" className="max-w-[18ch] font-display text-headline" data-reveal>
          Built for real business
        </h2>
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div
            role="tablist"
            aria-label="Industries"
            aria-orientation="vertical"
            onKeyDown={onKey}
            className="-mx-(--gutter) flex gap-2 overflow-x-auto px-(--gutter) pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
          >
            {industries.map((ind, i) => (
              <button
                key={ind.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${ind.key}`}
                aria-selected={i === active}
                aria-controls="industry-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={`min-h-11 shrink-0 cursor-pointer rounded-sm border px-4 py-2 text-left text-small transition-colors lg:border-0 lg:border-l-2 lg:px-5 lg:py-3 lg:text-body ${
                  i === active
                    ? "border-signal bg-signal-lo text-ink lg:bg-transparent"
                    : "border-hairline text-muted hover:text-ink lg:border-transparent"
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>
          {current && (
            <div
              id="industry-panel"
              role="tabpanel"
              aria-labelledby={`tab-${current.key}`}
              className="glass rounded-md p-8 md:p-10"
            >
              <Label tone="signal">Example solution</Label>
              <p className="mt-6 font-display text-title leading-snug">{current.example}</p>
              <p className="mt-8 text-label font-medium text-muted">Relevant services</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {current.services.map((s) => (
                  <li key={s}>
                    <Link
                      to={`/services/${s}`}
                      className="inline-flex min-h-11 items-center rounded-sm border border-hairline px-3 text-small hover:border-signal"
                    >
                      {getService(s)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {project && (
                <p className="mt-8 border-t border-hairline pt-6 text-small">
                  <span className="text-muted">Built by us: </span>
                  {project.caseStudy ? (
                    <Link to={`/work/${project.slug}`} className="text-signal underline underline-offset-4">
                      {project.title}, {project.tagline} →
                    </Link>
                  ) : (
                    <span>
                      {project.title}, {project.tagline}
                    </span>
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
