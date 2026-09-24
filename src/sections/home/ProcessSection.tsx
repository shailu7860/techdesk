import { process } from "../../data/process";

/** Seven real stages, so numbering carries information (One-Kicker Rule). Native <details> per stage. */
export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-20 border-t border-hairline bg-panel py-(--section-y)"
    >
      <div className="container-page">
        <h2 id="process-title" className="max-w-[16ch] font-display text-headline" data-reveal>
          From idea → product
        </h2>
        <p className="mt-6 max-w-[55ch] text-muted" data-reveal>
          The same seven stages on every project, so you always know where you are and what you get next.
        </p>

        <ol className="relative mt-16 grid gap-0 lg:grid-cols-7" data-process>
          <span aria-hidden="true" className="absolute top-[5px] right-0 left-0 hidden h-px bg-hairline lg:block" />
          <span
            aria-hidden="true"
            className="absolute top-[5px] left-0 hidden h-px w-full origin-left bg-signal lg:block"
            data-process-line
          />
          {process.map((st) => (
            <li
              key={st.code}
              className="relative border-l border-hairline pb-8 pl-6 lg:border-l-0 lg:pt-10 lg:pr-4 lg:pb-0 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-1 -left-[6px] size-[11px] rounded-full border border-signal bg-void lg:top-0 lg:left-0"
                data-process-node
              />
              <details className="group" open>
                <summary className="flex min-h-11 cursor-pointer list-none flex-col [&::-webkit-details-marker]:hidden">
                  <span className="text-label font-medium text-muted">{st.code}</span>
                  <span className="mt-1 font-display text-title">{st.name}</span>
                </summary>
                <p className="mt-2 text-small text-ink/90">{st.objective}</p>
                <p className="mt-4 text-label font-medium text-muted">You get</p>
                <ul className="mt-1 text-small text-muted">
                  {st.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
