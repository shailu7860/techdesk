import type { Faq } from "../../data/faq";

/** Native <details> accordion: keyboard and screen-reader accessible, works without JS. */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div className="glass divide-y divide-hairline rounded-lg">
      {items.map((f) => (
        <details key={f.q} className="group px-6 md:px-8">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-hairline text-signal transition-transform duration-(--duration-base) group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[70ch] pb-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqLd = (items: readonly Faq[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
