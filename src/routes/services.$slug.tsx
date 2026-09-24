import { Link } from "react-router";
import { NotFound } from "../components/NotFound";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { MissionFile } from "../components/work/MissionFile";
import { projects } from "../data/projects";
import { getService, services } from "../data/services";
import { seo } from "../lib/seo";
import { waLink } from "../lib/whatsapp";
import type { Route } from "./+types/services.$slug";

export const meta = ({ params }: Route.MetaArgs) => {
  const s = getService(params.slug);
  if (!s) return seo({ title: "Service not found | TechDesk", description: "", path: "/404", noindex: true });
  return seo({
    title: `${s.name} | TechDesk`,
    description: `${s.outcome} ${s.summary}`,
    path: `/services/${s.slug}`,
    jsonLd: {
      "@type": "Service",
      name: s.name,
      description: s.summary,
      provider: { "@type": "Organization", name: "TechDesk" },
      areaServed: "Worldwide",
    },
  });
};

export default function ServiceDetail({ params }: Route.ComponentProps) {
  const s = getService(params.slug);
  if (!s) return <NotFound title="Service not found." body="That service page does not exist. See all five below." />;
  const related = projects.filter((p) => p.caseStudy && p.services.includes(s.slug));
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <main id="main">
      <header className="container-page pt-16 pb-12 md:pt-24">
        <Label tone={s.slug === "ai-automation" ? "agent" : "signal"}>
          {s.name}
        </Label>
        <h1 className="mt-6 max-w-[18ch] font-display text-headline md:text-display">{s.outcome}</h1>
        <p className="mt-6 max-w-[60ch] text-title leading-snug text-muted">{s.summary}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={`/contact?type=${s.estimateType}#estimate`} size="lg" trailing="→">
            Estimate this
          </Button>
          <Button href={waLink(`Hi TechDesk, I'm interested in ${s.name}.`)} external variant="secondary" size="lg">
            Discuss on WhatsApp
          </Button>
        </div>
      </header>

      <section
        aria-labelledby="caps"
        className="container-page grid gap-10 border-t border-hairline py-16 md:grid-cols-2"
      >
        <div>
          <h2 id="caps" className="font-display text-title">
            What we build
          </h2>
          <ul className="mt-8 grid gap-3">
            {s.capabilities.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-signal" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-title">Tools we reach for</h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <li key={t} className="rounded-sm border border-hairline px-3 py-1.5 text-label font-medium">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-muted">
            Chosen per project. We pick the simplest stack that meets the requirement, and explain why.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="proof" className="container-page border-t border-hairline py-16">
          <h2 id="proof" className="font-display text-title">
            Proof
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <MissionFile project={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-labelledby="more" className="container-page border-t border-hairline py-16">
        <h2 id="more" className="text-label font-medium text-muted">
          Other services
        </h2>
        <ul className="mt-6 grid gap-2 md:grid-cols-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                to={`/services/${o.slug}`}
                className="flex items-baseline gap-4 py-3 transition-colors hover:text-signal"
              >
                <span className="text-label font-medium text-muted">{o.code}</span>
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
