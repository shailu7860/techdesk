import { useState } from "react";
import { Link } from "react-router";
import { Label } from "../../components/ui/Label";
import { services } from "../../data/services";
import { ServiceVisual } from "./ServiceVisual";

/**
 * Desktop: list on the left, sticky visual panel on the right that follows hover/focus (SV-02).
 * Mobile: native <details> accordion with the visual inline.
 */
export function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active] ?? services[0];

  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-hairline py-(--section-y)">
      <div className="container-page">
        <h2 id="services-title" className="max-w-[16ch] font-display text-headline uppercase" data-reveal>
          What we build
        </h2>
        <p className="mt-6 max-w-[55ch] text-muted" data-reveal>
          Five service lines, each written as the outcome you get rather than the framework we use.
        </p>

        <div className="mt-16 hidden gap-16 lg:grid lg:grid-cols-[1.1fr_1fr]">
          <ul className="border-t border-hairline">
            {services.map((s, i) => (
              <li key={s.slug} className="border-b border-hairline">
                <Link
                  to={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={i === active ? "service-panel" : undefined}
                  className={`grid grid-cols-[3.5rem_1fr] gap-4 py-8 transition-colors duration-(--duration-base) ${
                    i === active ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className={`pt-1 font-mono text-label ${i === active ? "text-signal" : ""}`}>{s.code}</span>
                  <span>
                    <span className="block font-display text-title">{s.name}</span>
                    <span className="mt-2 block text-small">{s.outcome}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="sticky top-28 self-start">
            <div id="service-panel" className="border border-hairline bg-panel p-8">
              <div className="flex items-center justify-between">
                <Label tone={current?.visual === "agent" ? "agent" : "signal"}>Module / {current?.code}</Label>
                <Label>{current?.stack.slice(0, 3).join(" · ")}</Label>
              </div>
              <div className="mt-8 aspect-[400/260]">{current && <ServiceVisual visual={current.visual} />}</div>
              <p className="mt-8 text-muted">{current?.summary}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-hairline lg:hidden">
          {services.map((s) => (
            <details key={s.slug} className="group border-b border-hairline">
              <summary className="flex min-h-11 cursor-pointer list-none items-start gap-4 py-6 [&::-webkit-details-marker]:hidden">
                <span className="pt-1 font-mono text-label text-muted">{s.code}</span>
                <span className="flex-1">
                  <span className="block font-display text-title">{s.name}</span>
                  <span className="mt-1 block text-small text-muted">{s.outcome}</span>
                </span>
                <span aria-hidden="true" className="pt-1 text-signal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="pb-8">
                <div className="aspect-[400/260] border border-hairline bg-panel p-4">
                  <ServiceVisual visual={s.visual} />
                </div>
                <p className="mt-4 text-muted">{s.summary}</p>
                <Link to={`/services/${s.slug}`} className="mt-4 inline-flex min-h-11 items-center text-signal">
                  Explore {s.name} →
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
