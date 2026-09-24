import { Link } from "react-router";
import { PageIntro } from "../components/layout/PageIntro";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
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
        label="Services / 05"
        title="Outcomes first. Technology second."
        lead="Five ways we help, each measured by what changes in your business, not by how many frameworks we used."
      />
      <section aria-label="Service lines" className="container-page pb-(--section-y)">
        <ul className="border-t border-hairline">
          {services.map((s) => (
            <li key={s.slug} className="group relative border-b border-hairline">
              <div className="grid gap-4 py-10 md:grid-cols-[5rem_1fr_1fr] md:gap-10 md:py-14">
                <Label>{s.code}</Label>
                <div>
                  <h2 className="font-display text-title">
                    <Link
                      to={`/services/${s.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      {s.name}
                    </Link>
                  </h2>
                  <p className="mt-3 font-display text-headline leading-tight uppercase transition-colors group-hover:text-signal">
                    {s.outcome}
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <p className="text-muted">{s.summary}</p>
                  <p className="font-mono text-label text-muted">{s.capabilities.slice(0, 4).join(" · ")}</p>
                </div>
              </div>
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
