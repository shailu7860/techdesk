import { Link } from "react-router";
import { faqLd } from "../components/content/FaqList";
import { NotFound } from "../components/NotFound";
import { Button } from "../components/ui/Button";
import { MissionFile } from "../components/work/MissionFile";
import { faqs, faqsFor } from "../data/faq";
import { projectTypes, sizes } from "../data/pricing";
import { process } from "../data/process";
import { projects } from "../data/projects";
import { getService, services } from "../data/services";
import { formatBand } from "../lib/estimate";
import { ORG_ID, seo } from "../lib/seo";
import { waLink } from "../lib/whatsapp";
import { FaqSection } from "../sections/home/FaqSection";
import type { Route } from "./+types/services.$slug";

const serviceFaqs = (slug: Parameters<typeof faqsFor>[0]) => {
  const own = faqsFor(slug);
  return own.length >= 3 ? own : [...own, ...faqs.filter((f) => !f.services && !own.includes(f))].slice(0, 5);
};

export const meta = ({ params }: Route.MetaArgs) => {
  const s = getService(params.slug);
  if (!s) return seo({ title: "Service not found | TechDesk", description: "", path: "/404", noindex: true });
  return seo({
    title: `${s.seo.title} | TechDesk`,
    description: s.seo.description,
    image: `/og/service-${s.slug}.png`,
    imageAlt: `${s.name} by TechDesk`,
    breadcrumbs: [
      ["Services", "/services"],
      [s.name, `/services/${s.slug}`],
    ],
    path: `/services/${s.slug}`,
    jsonLd: [
      faqLd(serviceFaqs(s.slug)),
      {
        "@type": "Service",
        name: s.name,
        description: s.summary,
        provider: { "@id": ORG_ID },
        areaServed: "Worldwide",
      },
    ],
  });
};

export default function ServiceDetail({ params }: Route.ComponentProps) {
  const s = getService(params.slug);
  if (!s) return <NotFound title="Service not found." body="That service page does not exist. See all five below." />;
  const related = projects.filter((p) => p.caseStudy && p.services.includes(s.slug));
  const others = services.filter((o) => o.slug !== s.slug);
  const type = projectTypes.find((t) => t.id === s.estimateType);

  return (
    <main id="main">
      <header className="container-page pt-16 pb-12 md:pt-24">
        <h1 className="max-w-[18ch] font-display text-headline md:text-display">{s.outcome}</h1>
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

      <section aria-labelledby="deliver" className="container-page border-t border-hairline py-16">
        <h2 id="deliver" className="font-display text-title">
          How we deliver it
        </h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.slice(0, 4).map((st) => (
            <li key={st.code} className="glass rounded-lg p-6">
              <p className="text-label font-semibold text-signal">Step {Number(st.code)}</p>
              <p className="mt-2 font-display text-title">{st.name}</p>
              <p className="mt-2 text-small text-muted">{st.objective}</p>
              <p className="mt-4 text-small text-ink/90">You get: {st.deliverables.join(", ").toLowerCase()}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-small text-muted">
          Then test, deploy and evolve: the same seven-stage process on every project.
        </p>
      </section>

      {type && (
        <section aria-labelledby="price" className="container-page border-t border-hairline py-16">
          <h2 id="price" className="font-display text-title">
            Indicative investment
          </h2>
          <p className="mt-3 max-w-[60ch] text-muted">
            Ranges for {type.name.toLowerCase()} work, before any add-ons. Not a quote: you get a fixed price after a
            short scoping call.
          </p>
          <div className="mt-8">
            <table className="glass w-full rounded-lg text-left text-small md:text-body">
              <caption className="sr-only">Indicative price ranges by project size</caption>
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
                      <span className="block text-small font-normal text-muted">{z.detail}</span>
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
          </div>
        </section>
      )}

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

      <FaqSection items={serviceFaqs(s.slug)} title={`${s.name}: common questions`} />

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
