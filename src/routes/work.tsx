import { Link, useSearchParams } from "react-router";
import { PageIntro } from "../components/layout/PageIntro";
import { Button } from "../components/ui/Button";
import { MissionFile } from "../components/work/MissionFile";
import { industries } from "../data/industries";
import { builds, flagships, type IndustryKey, projects } from "../data/projects";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Work | TechDesk",
    description:
      "Selected systems engineered by TechDesk: Biexor, Stratos, BidMaster, 1Bull and more across fintech, marketplaces, procurement, gaming, healthcare and education.",
    path: "/work",
  });

const filterable = industries.filter((i) => projects.some((p) => p.industries.includes(i.key)));

export default function Work() {
  const [params, setParams] = useSearchParams();
  const active = params.get("industry") as IndustryKey | null;
  const list = active ? builds.filter((p) => p.industries.includes(active)) : builds;

  return (
    <main id="main">
      <PageIntro
        label="Our work"
        title="Systems, shipped."
        lead="Every project here is real and built by us. No stock mockups, no invented numbers. Four flagships as full case studies, plus the builds behind them."
      />

      <section aria-labelledby="flagships" className="container-page pb-(--section-y)">
        <h2 id="flagships" className="sr-only">
          Flagship case studies
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {flagships.map((p) => (
            <li key={p.slug}>
              <MissionFile project={p} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="builds" className="container-page border-t border-hairline py-(--section-y)">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="builds" className="font-display text-headline">
            More builds
          </h2>
          <fieldset className="flex flex-wrap gap-2">
            <legend className="sr-only">Filter by industry</legend>
            {[{ key: null, name: "All" }, ...filterable].map((i) => {
              const pressed = active === i.key;
              return (
                <button
                  key={i.name}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setParams(i.key ? { industry: i.key } : {}, { preventScrollReset: true })}
                  className={`min-h-11 cursor-pointer rounded-sm border px-4 text-small transition-colors ${
                    pressed ? "border-signal bg-signal-lo text-ink" : "border-hairline text-muted hover:text-ink"
                  }`}
                >
                  {i.name}
                </button>
              );
            })}
          </fieldset>
        </div>

        {list.length === 0 ? (
          <div className="mt-12 border border-hairline p-8">
            <p className="text-muted">
              No smaller builds in this industry yet. See the flagship case studies above, or{" "}
              <Link to="/contact" className="text-signal underline underline-offset-4">
                tell us what you need
              </Link>
              .
            </p>
          </div>
        ) : (
          <table className="mt-12 w-full border-collapse text-left">
            <caption className="sr-only">Other builds with industry and stack</caption>
            <thead className="text-label font-medium text-muted">
              <tr className="border-b border-hairline">
                <th scope="col" className="w-16 py-3 font-normal">
                  ID
                </th>
                <th scope="col" className="py-3 font-normal">
                  Project
                </th>
                <th scope="col" className="hidden py-3 font-normal md:table-cell">
                  Industry
                </th>
                <th scope="col" className="hidden py-3 font-normal lg:table-cell">
                  Stack
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.slug} className="border-b border-hairline align-top">
                  <td className="py-6 text-label font-medium text-muted">{p.code}</td>
                  <td className="py-6 pr-6">
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 max-w-[60ch] text-small text-muted">{p.summary}</p>
                    <p className="mt-2 text-label font-medium text-muted md:hidden">{p.industry}</p>
                  </td>
                  <td className="hidden py-6 pr-6 text-small md:table-cell">{p.industry}</td>
                  <td className="hidden py-6 text-label font-medium text-ink/80 lg:table-cell">
                    {p.stack.join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-16">
          <Button href="/contact" size="lg" trailing="→">
            Start a project like these
          </Button>
        </div>
      </section>
    </main>
  );
}
