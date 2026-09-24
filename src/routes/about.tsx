import { EngagementModels } from "../components/content/EngagementModels";
import { StackGrid } from "../components/content/StackGrid";
import { PageIntro } from "../components/layout/PageIntro";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { commitments, strengths } from "../data/company";
import { contact } from "../data/contact";
import { process } from "../data/process";
import { organizationLd, seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "About | TechDesk",
    description:
      "TechDesk is a technology studio in Indore, India, building AI agents, software platforms and automation for clients worldwide, with engineers you talk to directly.",
    path: "/about",
    jsonLd: organizationLd,
  });

export default function About() {
  return (
    <main id="main">
      <PageIntro
        title="A small studio that builds serious systems."
        lead={`We are a technology studio in ${contact.city}, working with founders, businesses and enterprise teams worldwide. We design, build and run the software: AI agents, platforms, automation and the marketing that brings people to them.`}
      />

      <section
        aria-labelledby="belief"
        className="container-page grid gap-10 border-t border-hairline py-(--section-y) md:grid-cols-[1fr_1.4fr]"
      >
        <h2 id="belief" className="font-display text-headline">
          What we believe
        </h2>
        <div className="grid gap-8 text-title leading-snug">
          <p>
            Good software is judged by what changes for the business that uses it: fewer manual steps, faster decisions,
            more qualified leads. Technology choices come second, and we explain them in plain language.
          </p>
          <p className="text-muted">
            We would rather ship a smaller system that works every day than a bigger one that impresses in a demo. That
            is why our case studies list the problem, the architecture and the trade-offs, and never numbers we cannot
            prove.
          </p>
        </div>
      </section>

      <section aria-labelledby="strengths" className="container-page border-t border-hairline py-(--section-y)">
        <h2 id="strengths" className="font-display text-headline">
          Where we are strongest
        </h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {strengths.map((x) => (
            <li key={x.title} className="glass rounded-lg p-8" data-reveal>
              <p className="font-display text-title">{x.title}</p>
              <p className="mt-3 text-muted">{x.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="commit" className="container-page border-t border-hairline py-(--section-y)">
        <h2 id="commit" className="font-display text-headline">
          Four commitments
        </h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {commitments.map((c) => (
            <li key={c.title} className="glass rounded-md p-8">
              <p className="font-display text-title">{c.title}</p>
              <p className="mt-3 text-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="where"
        className="container-page grid gap-10 border-t border-hairline py-(--section-y) md:grid-cols-[1fr_1.4fr]"
      >
        <h2 id="where" className="font-display text-headline">
          Indore-based, working worldwide
        </h2>
        <div className="grid gap-6 text-title leading-snug">
          <p>
            Our team works from {contact.city}. Office hours are {contact.hours}, which overlap with European mornings
            and US evenings, and WhatsApp messages are welcome at any time.
          </p>
          <p className="text-muted">
            Every project gets a weekly live demo at a time that suits you, a shared channel with the engineers, and
            written decisions you can come back to. {contact.replyPromise}
          </p>
        </div>
      </section>

      <section aria-labelledby="engage" className="container-page border-t border-hairline py-(--section-y)">
        <h2 id="engage" className="font-display text-headline">
          Ways to work with us
        </h2>
        <div className="mt-12">
          <EngagementModels />
        </div>
      </section>

      <section aria-labelledby="stack" className="container-page border-t border-hairline py-(--section-y)">
        <h2 id="stack" className="font-display text-headline">
          Technology we use
        </h2>
        <p className="mt-4 max-w-[60ch] text-muted">
          Taken from the systems in our portfolio. We pick per project and explain the choice in plain language.
        </p>
        <div className="mt-12">
          <StackGrid />
        </div>
      </section>

      <section aria-labelledby="how" className="container-page border-t border-hairline py-(--section-y)">
        <h2 id="how" className="font-display text-headline">
          How a project runs
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-7">
          {process.map((st) => (
            <li key={st.code} className="border-t border-signal/60 pt-4">
              <Label>{st.code}</Label>
              <p className="mt-2 font-medium">{st.name}</p>
              <p className="mt-2 text-small text-muted">{st.objective}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page border-t border-hairline py-(--section-y)">
        <p className="max-w-[24ch] font-display text-headline">Talk to the people who will build it.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" size="lg" trailing="→">
            Start a project
          </Button>
          <Button href={`tel:${contact.phoneE164}`} variant="secondary" size="lg">
            Call {contact.phoneDisplay}
          </Button>
        </div>
      </section>
    </main>
  );
}
