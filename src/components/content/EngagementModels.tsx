import { engagements } from "../../data/company";

export function EngagementModels() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {engagements.map((e, i) => (
        <li
          key={e.name}
          className={`glass flex h-full flex-col rounded-lg p-8 ${i === 0 ? "border-signal/50" : ""}`}
          data-reveal
        >
          <p className="font-display text-title">{e.name}</p>
          <p className="mt-2 text-signal">{e.fit}</p>
          <ul className="mt-6 grid gap-3 text-small text-muted">
            {e.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                {pt}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
