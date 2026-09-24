import { Button } from "../../components/ui/Button";
import { MissionFile } from "../../components/work/MissionFile";
import { builds, flagships } from "../../data/projects";

/** Proof. Flagship mission files (pinned horizontal gallery on desktop in Phase 5), then the build index. */
export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="border-t border-hairline py-(--section-y)"
      data-work-section
    >
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="work-title" className="font-display text-display uppercase" data-reveal>
          Proof
        </h2>
        <p className="max-w-[40ch] text-muted" data-reveal>
          Real systems, real constraints. Four flagships, each a full case study.
        </p>
      </div>

      <div className="mt-16 overflow-hidden" data-work-viewport>
        <ul
          className="container-page grid gap-4 md:grid-cols-2 xl:flex xl:w-max xl:max-w-none xl:gap-6"
          data-work-track
        >
          {flagships.map((p) => (
            <li key={p.slug} className="xl:w-[34rem]">
              <MissionFile project={p} />
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page mt-20">
        <h3 className="font-mono text-label uppercase text-muted">Also built</h3>
        <ul className="mt-6 border-t border-hairline">
          {builds.map((p) => (
            <li
              key={p.slug}
              className="grid grid-cols-[3rem_1fr] gap-4 border-b border-hairline py-4 md:grid-cols-[3rem_1.2fr_1fr_1.4fr]"
            >
              <span className="font-mono text-label text-muted">{p.code}</span>
              <span className="font-medium">{p.title}</span>
              <span className="col-start-2 text-small text-muted md:col-start-auto">{p.industry}</span>
              <span className="col-start-2 hidden font-mono text-label text-muted md:col-start-auto md:block">
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
