import { Link } from "react-router";
import type { Project } from "../../data/projects";

/**
 * A flagship project as a "mission file" (spec §15): ID, name, industry, problem,
 * system and stack. The whole file is one link, so the target is large on touch.
 */
export function MissionFile({ project, headingLevel: H = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const cs = project.caseStudy;
  return (
    <article className="group relative flex h-full flex-col glass rounded-md p-6 transition-[border-color,transform] duration-(--duration-base) hover:-translate-y-0.5 hover:border-signal/50 md:p-8">
      <H className="font-display text-headline">
        <Link
          to={`/work/${project.slug}`}
          viewTransition
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {project.title}
        </Link>
      </H>
      <p className="mt-2 text-muted">{project.tagline}</p>
      <dl className="mt-8 grid gap-5 text-small sm:grid-cols-2">
        <div>
          <dt className="text-label text-muted">Industry</dt>
          <dd className="mt-1">{project.industry}</dd>
        </div>
        <div>
          <dt className="text-label text-muted">Status</dt>
          <dd className="mt-1">{project.status}</dd>
        </div>
        {cs && (
          <div className="sm:col-span-2">
            <dt className="text-label font-medium text-muted">Problem</dt>
            <dd className="mt-1 max-w-[60ch]">{cs.problem[0]}</dd>
          </div>
        )}
        <div className="sm:col-span-2">
          <dt className="text-label font-medium text-muted">Stack</dt>
          <dd className="mt-1 text-label font-medium text-ink/85">{project.stack.slice(0, 6).join(" · ")}</dd>
        </div>
      </dl>
      <p className="mt-auto flex items-center gap-2 pt-10 text-small font-medium text-signal" aria-hidden="true">
        View case study <span className="transition-transform group-hover:translate-x-1">→</span>
      </p>
    </article>
  );
}
