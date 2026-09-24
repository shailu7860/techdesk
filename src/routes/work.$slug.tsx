import type { ReactNode } from "react";
import { Link } from "react-router";
import { NotFound } from "../components/NotFound";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { SystemDiagram } from "../components/work/SystemDiagram";
import { flagships, getProject } from "../data/projects";
import { getService } from "../data/services";
import { seo } from "../lib/seo";
import { waLink } from "../lib/whatsapp";
import type { Route } from "./+types/work.$slug";

export const meta = ({ params }: Route.MetaArgs) => {
  const p = getProject(params.slug);
  if (!p?.caseStudy)
    return seo({ title: "Project not found | TechDesk", description: "", path: "/404", noindex: true });
  return seo({
    title: `${p.title}: ${p.tagline} | TechDesk case study`,
    description: p.summary,
    path: `/work/${p.slug}`,
    image: `/og/${p.slug}.png`,
    type: "article",
    jsonLd: {
      "@type": "CreativeWork",
      name: p.title,
      headline: `${p.title}: ${p.tagline}`,
      description: p.summary,
      creator: { "@type": "Organization", name: "TechDesk" },
      keywords: p.stack.join(", "),
      ...(p.url ? { url: p.url } : {}),
    },
  });
};

function Block({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const id = `s-${n}`;
  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-hairline py-16 md:grid-cols-[14rem_1fr] md:gap-12"
    >
      <h2 id={id} className="flex flex-col gap-2">
        <Label>{String(n).padStart(2, "0")}</Label>
        <span className="font-display text-title">{title}</span>
      </h2>
      <div className="max-w-[70ch]">{children}</div>
    </section>
  );
}

export default function CaseStudy({ params }: Route.ComponentProps) {
  const p = getProject(params.slug);
  if (!p?.caseStudy)
    return (
      <NotFound
        title="Project not found."
        body="That case study does not exist, or its link has changed. The full index is one click away."
      />
    );
  const cs = p.caseStudy;
  const i = flagships.findIndex((f) => f.slug === p.slug);
  const next = flagships[(i + 1) % flagships.length];
  let n = 0;

  return (
    <main id="main">
      <article>
        <header className="container-page pt-16 pb-12 md:pt-24">
          <nav aria-label="Breadcrumb" className="text-label font-medium text-muted">
            <Link to="/work" className="hover:text-ink">
              Work
            </Link>{" "}
            / {p.title}
          </nav>
          <h1 className="mt-8 font-display text-display">{p.title}</h1>
          <p className="mt-4 max-w-[40ch] font-display text-title text-muted">{p.tagline}</p>
          <dl className="mt-12 grid gap-6 border-t border-hairline pt-8 text-small sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Industry", p.industry],
              ["Status", p.status],
              ["Our role", cs.role],
              ["Services", p.services.map((s) => getService(s)?.name).join(", ")],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-label font-medium text-muted">{k}</dt>
                <dd className="mt-2">{v}</dd>
              </div>
            ))}
          </dl>
          {p.url && (
            <p className="mt-8">
              <Button href={p.url} external variant="ghost" trailing="↗">
                Visit {p.url.replace(/^https?:\/\//, "")}
              </Button>
            </p>
          )}
        </header>

        <div className="container-page">
          <Block n={++n} title="Overview">
            <p className="text-title leading-snug">{p.summary}</p>
          </Block>
          <Block n={++n} title="The problem">
            <ul className="flex flex-col gap-4">
              {cs.problem.map((x) => (
                <li key={x} className="text-muted">
                  {x}
                </li>
              ))}
            </ul>
          </Block>
          <Block n={++n} title="The approach">
            <p>{cs.approach}</p>
          </Block>
          <section aria-labelledby="architecture" className="border-t border-hairline py-16">
            <h2 id="architecture" className="flex flex-col gap-2">
              <Label>{String(++n).padStart(2, "0")}</Label>
              <span className="font-display text-title">System architecture</span>
            </h2>
            <div className="mt-10">
              <SystemDiagram nodes={cs.architecture} />
            </div>
          </section>
          <Block n={++n} title="Technology">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-sm border border-hairline px-3 py-1.5 text-label font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </Block>
          <Block n={++n} title="Key features">
            <ul className="grid gap-4">
              {cs.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-signal" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>
          {cs.challenges && (
            <Block n={++n} title="Challenges solved">
              <div className="grid gap-8">
                {cs.challenges.map((c) => (
                  <div key={c.title}>
                    <h3 className="font-medium">{c.title}</h3>
                    <p className="mt-2 text-muted">{c.detail}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}
          {cs.visualsPending && import.meta.env.DEV && (
            <p className="border border-dashed border-danger p-4 text-label font-medium text-danger">
              [CONTENT NEEDED] Screenshots or recordings for {p.title}. Hidden in production builds.
            </p>
          )}
        </div>
      </article>

      <aside aria-label="Next steps" className="container-page border-t border-hairline py-(--section-y)">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Label>Build something like this</Label>
            <p className="mt-4 max-w-[24ch] font-display text-headline">Your system could be next.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`/contact?ref=${p.slug}`} size="lg" trailing="→">
                Start a project
              </Button>
              <Button
                href={waLink(`Hi TechDesk, I read the ${p.title} case study and want to discuss something similar.`)}
                external
                variant="secondary"
                size="lg"
              >
                WhatsApp us
              </Button>
            </div>
          </div>
          {next && next.slug !== p.slug && (
            <Link
              to={`/work/${next.slug}`}
              className="group block border border-hairline p-8 transition-colors hover:border-signal/60"
            >
              <Label>Next project</Label>
              <p className="mt-6 font-display text-headline">{next.title}</p>
              <p className="mt-2 text-muted">{next.tagline}</p>
              <p aria-hidden="true" className="mt-8 text-signal transition-transform group-hover:translate-x-1">
                →
              </p>
            </Link>
          )}
        </div>
      </aside>
    </main>
  );
}
