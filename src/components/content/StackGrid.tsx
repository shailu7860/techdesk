import { stackGroups } from "../../data/company";

export function StackGrid() {
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stackGroups.map((g) => (
        <div key={g.layer} className="glass rounded-lg p-6" data-reveal>
          <dt className="text-label font-semibold text-signal">{g.layer}</dt>
          <dd className="mt-4">
            <ul className="grid gap-2 text-small text-ink/90">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}
