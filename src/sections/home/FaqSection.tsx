import { Link } from "react-router";
import { FaqList } from "../../components/content/FaqList";
import type { Faq } from "../../data/faq";

export function FaqSection({ items, title = "Questions, answered" }: { items: readonly Faq[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="py-(--section-y)">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 id="faq-title" className="font-display text-headline" data-reveal>
            {title}
          </h2>
          <p className="mt-4 max-w-[34ch] text-muted" data-reveal>
            Something else on your mind?{" "}
            <Link to="/contact" className="text-signal underline underline-offset-4">
              Ask us directly
            </Link>
            .
          </p>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
