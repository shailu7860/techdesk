import { Link } from "react-router";
import { PageIntro } from "../components/layout/PageIntro";
import { solutions } from "../data/solutions";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Software solutions: AI agents, SaaS, fintech | TechDesk",
    description:
      "WhatsApp AI agents, algo trading software, marketplaces, SaaS, Chrome extensions and dedicated developers in India. Solutions backed by real projects.",
    path: "/solutions",
    breadcrumbs: [["Solutions", "/solutions"]],
  });

export default function Solutions() {
  return (
    <main id="main">
      <PageIntro
        title="Solutions for what you need to build."
        lead="Focused pages for the products we build most, each backed by a real project and honest price ranges."
      />
      <section aria-label="All solutions" className="container-page pb-(--section-y)">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <li key={s.slug}>
              <article className="group glass relative flex h-full flex-col rounded-lg p-8 transition-[border-color,transform] duration-(--duration-base) hover:-translate-y-0.5 hover:border-signal/60">
                <h2 className="font-display text-title">
                  <Link to={`/solutions/${s.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {s.title}
                  </Link>
                </h2>
                <p className="mt-3 text-small text-muted">{s.description}</p>
                <p aria-hidden="true" className="mt-auto pt-6 text-small font-semibold text-signal">
                  Learn more <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
