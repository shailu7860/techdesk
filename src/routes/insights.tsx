import { Link } from "react-router";
import { PageIntro } from "../components/layout/PageIntro";
import { insights } from "../data/insights";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Insights: software and AI cost guides | TechDesk",
    description:
      "Practical guides on the real cost and timeline of AI agents, SaaS platforms and custom software, with indicative INR and USD ranges from TechDesk.",
    path: "/insights",
    breadcrumbs: [["Insights", "/insights"]],
  });

export default function Insights() {
  return (
    <main id="main">
      <PageIntro
        title="Straight answers before you build."
        lead="What things really cost, how long they take and how to spend less, from the team that builds them."
      />
      <section aria-label="Articles" className="container-page pb-(--section-y)">
        <ul className="grid gap-4 md:grid-cols-2">
          {insights.map((a) => (
            <li key={a.slug}>
              <article className="group glass relative flex h-full flex-col rounded-lg p-8 transition-[border-color,transform] duration-(--duration-base) hover:-translate-y-0.5 hover:border-signal/60">
                <p className="text-small text-muted">
                  <time dateTime={a.published}>{a.published}</time> · {a.readMinutes} min read
                </p>
                <h2 className="mt-3 font-display text-title">
                  <Link to={`/insights/${a.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {a.h1}
                  </Link>
                </h2>
                <p className="mt-3 text-small text-muted">{a.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
