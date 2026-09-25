import { Link } from "react-router";
import { insights } from "../../data/insights";
import { solutions } from "../../data/solutions";

/** Internal links to the keyword landing pages and guides (helps visitors and search engines find them). */
export function Explore() {
  return (
    <section aria-labelledby="explore-title" className="py-(--section-y)">
      <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 id="explore-title" className="font-display text-headline" data-reveal>
            Popular solutions
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/solutions/${s.slug}`}
                  className="glass inline-flex min-h-11 items-center rounded-sm px-4 text-small font-medium transition-colors hover:border-signal hover:text-signal"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-headline" data-reveal>
            Cost guides
          </h2>
          <ul className="mt-8 grid gap-3">
            {insights.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/insights/${a.slug}`}
                  className="group glass flex items-center justify-between gap-4 rounded-lg p-5 transition-colors hover:border-signal"
                >
                  <span className="font-medium">{a.h1}</span>
                  <span aria-hidden="true" className="text-signal transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
