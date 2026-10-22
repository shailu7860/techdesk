import { LoopVideo } from "../../components/space/LoopVideo";
import { Button } from "../../components/ui/Button";
import { MissionFile } from "../../components/work/MissionFile";
import { builds, flagships } from "../../data/projects";

/** Selected work: the four flagship case studies in a grid, then the other builds as short product clips. */
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
        <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {builds.map((p) => (
            <li key={p.slug}>
              <div className="overflow-hidden rounded-md border border-hairline">
                <LoopVideo name={p.slug} width={640} height={480} />
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-label font-medium text-muted">{p.code}</span>
                <span className="font-medium">{p.title}</span>
              </div>
              <p className="mt-1 text-small text-muted">
                {p.industry} · {p.stack.slice(0, 3).join(", ")}
              </p>
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
