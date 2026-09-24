import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { industries } from "../../data/industries";

/**
 * Centered hero over a looping tech video (digital-ascent direction). The poster image renders
 * first (no layout shift, no JS needed); the video is attached after hydration only when motion
 * is allowed and the visitor has not asked to save data.
 */
export function Hero() {
  const [video, setVideo] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setVideo(!reduced && !saveData);
  }, []);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-hairline">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {video ? (
          <video
            className="h-full w-full object-cover opacity-60"
            src="/media/hero-network.mp4"
            poster="/media/hero-network.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            className="h-full w-full object-cover opacity-60"
            src="/media/hero-network.jpg"
            alt=""
            width={1280}
            height={720}
          />
        )}
        <div className="absolute inset-0 bg-void/[0.9]" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center py-24 text-center">
        <p
          className="inline-flex items-center gap-2 rounded-full border border-hairline bg-panel px-4 py-2 text-small font-medium text-ink shadow-(--shadow-card)"
          data-hero-reveal
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
          AI agents · Software platforms · Automation
        </p>
        <h1 id="hero-title" className="mt-8 max-w-[18ch] font-display text-display" data-hero-title>
          We engineer digital systems <span className="text-signal">for what's next.</span>
        </h1>
        <p className="mt-6 max-w-[58ch] text-body text-muted md:text-title md:leading-snug" data-hero-reveal>
          AI agents, software platforms, intelligent automation and high-performance digital experiences engineered for
          ambitious businesses.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4" data-hero-reveal>
          <Button href="/contact" size="lg" trailing="→">
            Start a project
          </Button>
          <Button href="/work" variant="secondary" size="lg">
            Explore our work
          </Button>
        </div>
        <div className="mt-14" data-hero-reveal>
          <p className="text-small text-muted">Industries we build for</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {industries.slice(0, 6).map((i) => (
              <li key={i.key}>
                <Link
                  to={`/work?industry=${i.key}`}
                  className="inline-flex min-h-11 items-center rounded-sm border border-hairline bg-panel px-4 text-small font-medium text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-signal/50 p-1.5">
          <span className="size-1.5 rounded-full bg-signal motion-safe:animate-bounce" />
        </span>
      </a>
    </section>
  );
}
