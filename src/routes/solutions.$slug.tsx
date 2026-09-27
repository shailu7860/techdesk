import { Link } from "react-router";
import { FaqList, faqLd } from "../components/content/FaqList";
import { NotFound } from "../components/NotFound";
import { Button } from "../components/ui/Button";
import { MissionFile } from "../components/work/MissionFile";
import { getInsight } from "../data/insights";
import { projectTypes, sizes } from "../data/pricing";
import { getProject, type Project } from "../data/projects";
import { getService } from "../data/services";
import { getSolution } from "../data/solutions";
import { formatBand } from "../lib/estimate";
import { ORG_ID, seo } from "../lib/seo";
import { waLink } from "../lib/whatsapp";
import type { Route } from "./+types/solutions.$slug";

export const meta = ({ params }: Route.MetaArgs) => {
  const s = getSolution(params.slug);
  if (!s) return seo({ title: "Solution not found | TechDesk", description: "", path: "/404", noindex: true });
  return seo({
    title: `${s.title} | TechDesk`,
    description: s.description,
    path: `/solutions/${s.slug}`,
    image: `/og/solution-${s.slug}.png`,
    imageAlt: s.h1,
    breadcrumbs: [
      ["Solutions", "/solutions"],
      [s.title, `/solutions/${s.slug}`],
    ],
    jsonLd: [
      {
        "@type": "Service",
        name: s.title,
        serviceType: s.keyword,
        description: s.description,
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
      },
      faqLd(s.faq),
    ],
  });
};

export default function SolutionPage({ params }: Route.ComponentProps) {
  const s = getSolution(params.slug);
  if (!s)
    return <NotFound title="Solution not found." body="That page does not exist. See all solutions from the footer." />;
  const proof = s.proof.map(getProject).filter((p): p is Project => Boolean(p?.caseStudy));
  const type = projectTypes.find((t) => t.id === s.estimateType);
  const guide = getInsight(s.guide);

  return (
    <main id="main">
      <header className="container-page pt-16 pb-12 md:pt-24">
        <nav aria-label="Breadcrumb" className="text-small text-muted">
          <Link to="/solutions" className="hover:text-ink">
            Solutions
          </Link>{" "}
          / {s.title}
        </nav>
        <h1 className="mt-6 max-w-[22ch] font-display text-headline md:text-display">{s.h1}</h1>
        <div className="mt-8 grid max-w-[70ch] gap-4 text-body text-muted md:text-[1.1875rem]">
          {s.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={`/contact?type=${s.estimateType}#brief`} size="lg" trailing="→">
            Discuss your project
          </Button>
          <Button href={waLink(`Hi TechDesk, I'm interested in ${s.keyword}.`)} external variant="secondary" size="lg">
            WhatsApp us
          </Button>
        </div>
      </header>

      <section aria-labelledby="build" className="container-page border-t border-hairline py-16">
        <h2 id="build" className="font-display text-headline">
          What we build
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.build.map((b) => (
            <li key={b} className="glass flex gap-3 rounded-lg p-6">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="container-page border-t border-hairline py-16">
        <h2 id="how" className="font-display text-headline">
          How it works
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((st, i) => (
            <li key={st.name} className="glass rounded-lg p-6">
              <p className="text-label font-semibold text-signal">Step {i + 1}</p>
              <p className="mt-2 font-display text-title">{st.name}</p>
              <p className="mt-2 text-small text-muted">{st.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="why" className="container-page border-t border-hairline py-16">
        <h2 id="why" className="font-display text-headline">
          Why TechDesk
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {s.why.map((w) => (
            <li key={w.title} className="glass rounded-lg p-8">
              <p className="font-display text-title">{w.title}</p>
              <p className="mt-3 text-muted">{w.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {proof.length > 0 && (
        <section aria-labelledby="proof" className="container-page border-t border-hairline py-16">
          <h2 id="proof" className="font-display text-headline">
            Proof from our work
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {proof.map((p) => (
              <li key={p.slug}>
                <MissionFile project={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {type && (
        <section aria-labelledby="cost" className="container-page border-t border-hairline py-16">
          <h2 id="cost" className="font-display text-headline">
            Indicative cost
          </h2>
          <p className="mt-3 max-w-[60ch] text-muted">
            Ranges before add-ons. You get a fixed price after a short scoping call.
            {guide && (
              <>
                {" "}
                Read the full guide:{" "}
                <Link to={`/blog/${guide.slug}`} className="text-signal underline underline-offset-4">
                  {guide.h1}
                </Link>
              </>
            )}
          </p>
          <table className="glass mt-8 w-full rounded-lg text-left text-small md:text-body">
            <caption className="sr-only">Indicative cost by project size</caption>
            <thead className="text-label font-semibold text-muted">
              <tr className="border-b border-hairline">
                <th scope="col" className="p-3 md:p-4">
                  Size
                </th>
                <th scope="col" className="p-3 md:p-4">
                  India (INR)
                </th>
                <th scope="col" className="p-3 md:p-4">
                  Worldwide (USD)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((z) => (
                <tr key={z.id} className="border-b border-hairline last:border-0">
                  <th scope="row" className="p-3 font-medium md:p-4">
                    {z.name}
                  </th>
                  <td className="p-3 md:p-4">
                    {formatBand({ band: type.bands[z.id].INR, currency: "INR", perMonth: Boolean(type.perMonth) })}
                  </td>
                  <td className="p-3 md:p-4">
                    {formatBand({ band: type.bands[z.id].USD, currency: "USD", perMonth: Boolean(type.perMonth) })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section aria-labelledby="faq" className="container-page border-t border-hairline py-16">
        <h2 id="faq" className="font-display text-headline">
          Questions about {s.keyword.toLowerCase().replace(/ company$/, "")}
        </h2>
        <div className="mt-10">
          <FaqList items={s.faq} />
        </div>
      </section>

      <nav aria-labelledby="related" className="container-page border-t border-hairline py-16">
        <h2 id="related" className="font-display text-title">
          Related services
        </h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {s.services.map((slug) => (
            <li key={slug}>
              <Link
                to={`/services/${slug}`}
                className="glass inline-flex min-h-11 items-center rounded-sm px-4 transition-colors hover:border-signal hover:text-signal"
              >
                {getService(slug)?.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
