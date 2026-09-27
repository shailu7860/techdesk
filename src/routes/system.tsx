import { type ReactNode, useState } from "react";
import { Mark, Wordmark } from "../components/brand/Wordmark";
import { Button } from "../components/ui/Button";
import { Field } from "../components/ui/Field";
import { Label } from "../components/ui/Label";
import type { Route } from "./+types/system";

// Internal design-system specimen. Not linked from the site, excluded from indexing.
export const meta: Route.MetaFunction = () => [
  { title: "Design system | TechDesk" },
  { name: "robots", content: "noindex, nofollow" },
];

const swatches = [
  ["void", "Page canvas"],
  ["panel", "Raised surfaces"],
  ["panel-hi", "Panel hover"],
  ["hairline", "Structure lines"],
  ["ink", "Headlines, body"],
  ["muted", "Secondary text"],
  ["subtle", "Disabled, placeholder"],
  ["signal", "Live / actionable (≤10%)"],
  ["agent", "AI at work only"],
  ["danger", "Error (with text)"],
  ["success", "Success (with text)"],
] as const;

const type = [
  ["text-display font-display", "Display", "Systems for what's next"],
  ["text-headline font-display", "Headline", "Intelligence that acts."],
  ["text-title font-medium", "Title", "Business Exchange Platform"],
  [
    "text-body",
    "Body",
    "Structured, auditable deal processes for buying and selling businesses, from mandate to close.",
  ],
  ["text-small text-muted", "Small", "Indicative range, not a quote."],
] as const;

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-hairline py-16">
      <h2 id={id} className="font-display text-title mb-10">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function System() {
  const [loading, setLoading] = useState(false);
  return (
    <main id="main" className="container-page py-16">
      <Label tone="signal" live>
        System / online
      </Label>
      <h1 className="font-display text-headline mt-4">TechDesk design system</h1>
      <p className="mt-4 max-w-[60ch] text-muted">
        Tokens and components from <code className=" text-small">src/styles/tokens.css</code>. Contrast pairs are
        verified by <code className=" text-small">npm run check:contrast</code>.
      </p>

      <Section id="brand" title="Brand">
        <div className="flex flex-wrap items-center gap-12">
          <Wordmark />
          <Mark className="size-16" />
        </div>
      </Section>

      <Section id="color" title="Color">
        <ul className="grid border-t border-l border-hairline [grid-template-columns:repeat(auto-fill,minmax(12rem,1fr))]">
          {swatches.map(([name, use]) => (
            <li key={name} className="border-r border-b border-hairline p-4">
              <div className="h-16 rounded-sm border border-hairline" style={{ background: `var(--color-${name})` }} />
              <p className="mt-3 text-label font-medium text-ink">{name}</p>
              <p className="text-small text-muted">{use}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" title="Typography">
        <dl className="flex flex-col gap-10">
          {type.map(([cls, name, sample]) => (
            <div key={name} className="grid gap-2 md:grid-cols-[10rem_1fr] md:items-baseline">
              <dt>
                <Label>{name}</Label>
              </dt>
              <dd className={cls}>{sample}</dd>
            </div>
          ))}
          <div className="grid gap-2 md:grid-cols-[10rem_1fr] md:items-baseline">
            <dt>
              <Label>Label</Label>
            </dt>
            <dd className="flex flex-wrap gap-6">
              <Label>Project / 01</Label>
              <Label tone="signal" live>
                Status / live
              </Label>
              <Label tone="agent">Module / AI-engine</Label>
            </dd>
          </div>
        </dl>
      </Section>

      <Section id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button trailing="→">Start a project</Button>
          <Button size="lg" trailing="→">
            Start a project
          </Button>
          <Button variant="secondary" trailing="↓">
            Explore our work
          </Button>
          <Button variant="ghost" trailing="→">
            View case study
          </Button>
          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1500);
            }}
          >
            {loading ? "Sending" : "Click for loading state"}
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section id="fields" title="Fields">
        <form className="grid max-w-2xl gap-8" onSubmit={(e) => e.preventDefault()} noValidate>
          <Field label="Your name" name="name" autoComplete="name" required />
          <Field
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue="not-an-email"
            error="Enter an email like name@company.com."
          />
          <Field
            as="select"
            label="Project type"
            name="type"
            hint="Pick the closest; we'll refine it together."
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Web app / SaaS platform</option>
            <option>AI agent / chatbot / automation</option>
          </Field>
          <Field as="textarea" label="What are you building?" name="message" placeholder="A few sentences is plenty." />
        </form>
      </Section>
    </main>
  );
}
