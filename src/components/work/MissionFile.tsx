import { Link } from "react-router";
import type { Project } from "../../data/projects";
import { Label } from "../ui/Label";

/**
 * A flagship project as a "mission file" (spec §15): ID, name, industry, problem,
 * system and stack. The whole file is one link, so the target is large on touch.
 */
export function MissionFile({ project, headingLevel: H = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const cs = project.caseStudy;
  return (
    <article className="group relative flex h-full flex-col border border-hairline bg-void p-6 transition-colors duration-(--duration-base) hover:border-signal/60 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <Label>Project / {project.code}</Label>
        <Label tone={project.status === "Live" ? "signal" : "muted"} live={project.status === "Live"}>
          {project.status}
        </Label>
      </div>
      <H className="mt-10 font-display text-headline uppercase">
        <Link to={`/work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {project.title}
        </Link>
      </H>
      <p className="mt-2 text-muted">{project.tagline}</p>
      <dl className="mt-8 grid gap-5 text-small sm:grid-cols-2">
        <div>
          <dt className="font-mono text-label uppercase text-muted">Industry</dt>
          <dd className="mt-1">{project.industry}</dd>
        </div>
        {cs && (
          <div className="sm:col-span-2">
            <dt className="font-mono text-label uppercase text-muted">Problem</dt>
            <dd className="mt-1 max-w-[60ch]">{cs.problem[0]}</dd>
          </div>
        )}
        <div className="sm:col-span-2">
          <dt className="font-mono text-label uppercase text-muted">Stack</dt>
          <dd className="mt-1 font-mono text-label text-ink/85">{project.stack.slice(0, 6).join(" · ")}</dd>
        </div>
      </dl>
      <p className="mt-auto flex items-center gap-2 pt-10 text-small font-medium text-signal" aria-hidden="true">
        View case study <span className="transition-transform group-hover:translate-x-1">→</span>
      </p>
    </article>
  );
}
