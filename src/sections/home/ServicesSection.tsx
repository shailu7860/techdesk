import { Link } from "react-router";
import { Label } from "../../components/ui/Label";
import { type Service, services } from "../../data/services";
import { ServiceVisual } from "./ServiceVisual";

// Bento layout (ui-ux-pro-max "Bento Grid Showcase"): the AI line leads as the large tile.
const layout: Record<Service["slug"], string> = {
  "ai-automation": "lg:col-span-4 lg:row-span-2",
  "web-product-engineering": "lg:col-span-2",
  "software-engineering": "lg:col-span-2",
  "digital-marketing": "lg:col-span-3",
  "digital-transformation": "lg:col-span-3",
};
const order: Service["slug"][] = [
  "ai-automation",
  "web-product-engineering",
  "software-engineering",
  "digital-marketing",
  "digital-transformation",
];

function Tile({ s, big }: { s: Service; big: boolean }) {
  const ai = s.visual === "agent";
  return (
    <article
      className={`group glass relative flex h-full flex-col rounded-lg p-6 transition-[border-color,transform] duration-(--duration-base) ease-(--ease-out-quart) hover:-translate-y-1 md:p-8 ${
        ai ? "hover:border-agent/60" : "hover:border-signal/60"
      }`}
      data-reveal
    >
      <div className="flex items-center justify-between gap-4">
        <Label tone={ai ? "agent" : "signal"}>Service {s.code}</Label>
        <span
          aria-hidden="true"
          className="text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink"
        >
          →
        </span>
      </div>
      <div className={`mt-6 opacity-90 ${big ? "min-h-56 flex-1" : "h-44 md:h-52"}`}>
        <ServiceVisual visual={s.visual} />
      </div>
      <h3 className={`mt-6 font-display ${big ? "text-headline" : "text-title"}`}>
        <Link to={`/services/${s.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {s.name}
        </Link>
      </h3>
      <p className="mt-2 font-medium text-ink">{s.outcome}</p>
      {big && <p className="mt-3 max-w-[56ch] text-muted">{s.summary}</p>}
    </article>
  );
}

/** Five service lines as a bento grid of glass tiles, each with its own explanatory diagram. */
export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-20 py-(--section-y)">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="services-title" className="font-display text-headline" data-reveal>
            What we build
          </h2>
          <p className="max-w-[44ch] text-muted" data-reveal>
            Five service lines, each written as the outcome you get rather than the framework we use.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {order.map((slug) => {
            const s = services.find((x) => x.slug === slug);
            if (!s) return null;
            const big = slug === "ai-automation";
            return (
              <li key={slug} className={`${layout[slug]} ${big ? "md:col-span-2" : ""}`}>
                <Tile s={s} big={big} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
