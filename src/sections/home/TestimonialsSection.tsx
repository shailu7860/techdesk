import { type Testimonial, testimonials } from "../../data/testimonials";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

/** Client quotes: one highlighted, the rest in a grid. Renders nothing if there are none. */
export function TestimonialsSection() {
  const [lead, ...rest] = testimonials;
  if (!lead) return null;

  return (
    <section aria-labelledby="testimonials-title" className="border-t border-hairline py-(--section-y)">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="testimonials-title" className="font-display text-headline" data-reveal>
            What clients say
          </h2>
          <p className="max-w-[40ch] text-muted" data-reveal>
            What the people we build for say about working with us.
          </p>
        </div>

        <figure className="mt-12 rounded-lg border border-signal/60 bg-panel p-8 md:p-12" data-reveal>
          <blockquote className="max-w-[48ch] font-display text-title md:text-headline">
            <p>“{lead.quote}”</p>
          </blockquote>
          <Caption t={lead} />
        </figure>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {rest.map((t) => (
            <li key={t.name} data-reveal>
              <figure className="glass flex h-full flex-col justify-between gap-8 rounded-lg p-8">
                <blockquote className="text-body">
                  <p>“{t.quote}”</p>
                </blockquote>
                <Caption t={t} />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Caption({ t }: { t: Testimonial }) {
  return (
    <figcaption className="mt-8 flex items-center gap-4">
      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-full border border-hairline bg-panel font-medium text-signal"
      >
        {initials(t.name)}
      </span>
      <span className="text-small">
        <span className="block font-medium text-ink">{t.name}</span>
        <span className="block text-muted">{[t.role, t.location, t.project].filter(Boolean).join(" · ")}</span>
      </span>
    </figcaption>
  );
}
