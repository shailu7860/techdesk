import { QuoteCalculator } from "../../components/contact/QuoteCalculator";

export function EstimateSection() {
  return (
    <section id="estimate" aria-labelledby="est-title" className="border-t border-hairline py-(--section-y)">
      <div className="container-page">
        <h2 id="est-title" className="font-display text-headline" data-reveal>
          What would it take?
        </h2>
        <p className="mt-6 max-w-[55ch] text-muted" data-reveal>
          Three quick choices, one indicative range. INR for India, USD for everywhere else.
        </p>
        <div className="mt-12">
          <QuoteCalculator />
        </div>
      </div>
    </section>
  );
}
