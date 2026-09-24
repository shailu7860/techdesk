import { Link } from "react-router";
import { PageIntro } from "../components/layout/PageIntro";
import { Button } from "../components/ui/Button";
import { services } from "../data/services";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Services | TechDesk",
    description:
      "Web and product engineering, AI agents and automation, software engineering, digital marketing and digital transformation, built around business outcomes.",
    path: "/services",
  });

export default function Services() {
  return (
    <main id="main">
      <PageIntro
        label="Services"
        title="Outcomes first. Technology second."
        lead="Five ways we help, each measured by what changes in your business, not by how many frameworks we used."
      />
      <section aria-label="Service lines" className="container-page pb-(--section-y)">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <article className="group relative flex h-full flex-col glass rounded-md p-8 transition-[border-color,transform] duration-(--duration-base) hover:-translate-y-0.5 hover:border-signal/50">
                <span className="inline-flex size-10 items-center justify-center rounded-sm bg-signal-lo text-small font-bold text-signal-hi">
                  {s.code}
                </span>
                <h2 className="mt-6 font-display text-title">
                  <Link to={`/services/${s.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {s.name}
                  </Link>
                </h2>
                <p className="mt-3 font-medium text-ink">{s.outcome}</p>
                <p className="mt-3 text-small text-muted">{s.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.capabilities.slice(0, 4).map((c) => (
                    <li key={c} className="rounded-sm bg-panel-hi px-3 py-1 text-label font-medium text-muted">
                      {c}
                    </li>
                  ))}
                </ul>
                <p aria-hidden="true" className="mt-auto pt-8 text-small font-semibold text-signal">
                  Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-wrap gap-4">
          <Button href="/contact" size="lg" trailing="→">
            Start a project
          </Button>
          <Button href="/contact#estimate" variant="secondary" size="lg">
            Get an estimate
          </Button>
        </div>
      </section>
    </main>
  );
}
