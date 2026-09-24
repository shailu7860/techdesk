import { Button } from "../../components/ui/Button";
import { MissionFile } from "../../components/work/MissionFile";
import { builds, flagships } from "../../data/projects";

/** Selected work: the four flagship case studies in a grid, then the build index. */
export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-hairline py-(--section-y)">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="work-title" className="font-display text-headline" data-reveal>
          Selected work
        </h2>
        <p className="max-w-[40ch] text-muted" data-reveal>
          Real systems, real constraints. Four flagships, each a full case study.
        </p>
      </div>

      <div className="container-page mt-12">
        <ul className="grid gap-6 md:grid-cols-2">
          {flagships.map((p) => (
            <li key={p.slug}>
              <MissionFile project={p} />
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page mt-20">
        <h3 className="text-label font-medium text-muted">Also built</h3>
        <ul className="mt-6 border-t border-hairline">
          {builds.map((p) => (
            <li
              key={p.slug}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-hairline py-4 md:grid-cols-[3rem_1.2fr_1fr_1.4fr]"
            >
              <span className="text-label font-medium text-muted">{p.code}</span>
              <span className="font-medium">{p.title}</span>
              <span className="col-start-2 text-small text-muted md:col-start-auto">{p.industry}</span>
              <span className="col-start-2 hidden text-label font-medium text-muted md:col-start-auto md:block">
                {p.stack.slice(0, 4).join(" · ")}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href="/work" variant="secondary" trailing="→">
            All work
          </Button>
        </div>
      </div>
    </section>
  );
}
