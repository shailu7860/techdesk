import { commitments } from "../../data/company";

export function CommitmentsBand() {
  return (
    <section aria-labelledby="why-title" className="border-t border-hairline bg-panel py-(--section-y)">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_2fr]">
        <h2 id="why-title" className="font-display text-headline" data-reveal>
          Why TechDesk
        </h2>
        <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {commitments.map((c) => (
            <li key={c.title} className="border-t border-hairline pt-6" data-reveal>
              <p className="font-display text-title">{c.title}</p>
              <p className="mt-2 text-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
