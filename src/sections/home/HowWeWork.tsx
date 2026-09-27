import { EngagementModels } from "../../components/content/EngagementModels";

export function HowWeWork() {
  return (
    <section aria-labelledby="engage-title" className="py-(--section-y)">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="engage-title" className="font-display text-headline" data-reveal>
            Ways to work with us
          </h2>
          <p className="max-w-[44ch] text-muted" data-reveal>
            Pick the shape that fits where you are. Every option starts with a written scope.
          </p>
        </div>
        <div className="mt-12">
          <EngagementModels />
        </div>
      </div>
    </section>
  );
}
