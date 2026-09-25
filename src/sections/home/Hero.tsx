import { Typewriter } from "../../components/space/Typewriter";
import { Button } from "../../components/ui/Button";
import { contact } from "../../data/contact";
import { Planet } from "./Planet";

const PHRASES = ["AI agents", "SaaS platforms", "trading systems", "marketplaces", "automation"] as const;

// Floating "live system" cards: every line is a real project fact from projects.ts.
const SIGNALS = [
  {
    label: "Trading platform",
    status: "Live",
    detail: "Paper-first trading automation",
    pos: "top-[6%] left-[2%]",
    delay: "0s",
  },
  {
    label: "Business exchange",
    status: "Live",
    detail: "Business exchange with KYC",
    pos: "top-[40%] -right-[2%]",
    delay: "1.2s",
  },
  {
    label: "AI agent",
    status: "Running",
    detail: "Qualifying a lead on WhatsApp",
    pos: "bottom-[8%] left-[8%]",
    delay: "2.4s",
    ai: true,
  },
] as const;

const FACTS = [
  { k: "Based in", v: "Indore, India" },
  { k: "Clients", v: "Worldwide" },
  { k: "Reply time", v: "1 business day" },
  { k: "Pricing", v: "INR and USD" },
] as const;

/** Split hero: copy with a typewriter headline on the left, planet and live-system cards on the right. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <span aria-hidden="true" className="shooting-star top-[14%] right-[6%]" />
      <span aria-hidden="true" className="shooting-star top-[46%] right-[34%] [animation-delay:4.5s]" />

      <div className="container-page grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-16">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,1.6rem+3.4vw,4.25rem)] leading-[1.05] tracking-[-0.03em]"
            data-hero-title
          >
            <span className="sr-only">
              We engineer AI agents, SaaS platforms, trading systems, marketplaces and automation for what's next.
            </span>
            <span aria-hidden="true">We engineer</span> <Typewriter phrases={PHRASES} className="text-signal" />{" "}
            <span aria-hidden="true">for what's next.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-body text-muted md:text-[1.1875rem]" data-hero-reveal>
            TechDesk is an AI and software development company in Indore, India, building AI agents, SaaS platforms and
            automation for founders, growing businesses and enterprise teams worldwide. You talk directly to the
            engineers, see working software every week, and own everything we build.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4" data-hero-reveal>
            <Button href="/contact" size="lg" trailing="→">
              Start a project
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              Explore our work
            </Button>
          </div>
          <dl
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-hairline pt-8 sm:grid-cols-4"
            data-hero-reveal
          >
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt className="text-label text-muted">{f.k}</dt>
                <dd className="mt-1 font-semibold text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-small text-muted" data-hero-reveal>
            Prefer to talk now?{" "}
            <a href={`tel:${contact.phoneE164}`} className="font-medium text-signal underline underline-offset-4">
              Call {contact.phoneDisplay}
            </a>
          </p>
        </div>

        <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <Planet className="absolute inset-0 h-full w-full" />
          {SIGNALS.map((s) => (
            <div
              key={s.label}
              className={`float glass absolute ${s.pos} hidden w-56 rounded-md p-4 sm:block`}
              style={{ animationDelay: s.delay }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-ink">{s.label}</span>
                <span
                  className={`inline-flex items-center gap-1.5 text-label font-semibold ${"ai" in s ? "text-agent" : "text-signal"}`}
                >
                  <span
                    className={`size-1.5 rounded-full ${"ai" in s ? "bg-agent" : "bg-signal"} motion-safe:animate-pulse`}
                  />
                  {s.status}
                </span>
              </div>
              <p className="mt-1 text-small text-muted">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
