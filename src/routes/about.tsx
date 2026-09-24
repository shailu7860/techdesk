import { PageIntro } from "../components/layout/PageIntro";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/Label";
import { commitments } from "../data/company";
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
        label="About / TechDesk"
        title="A small studio that builds serious systems."
        lead={`We are a technology studio in ${contact.city}, working with founders, businesses and enterprise teams worldwide. We design, build and run the software: AI agents, platforms, automation and the marketing that brings people to them.`}
      />

      <section
        aria-labelledby="belief"
        className="container-page grid gap-10 border-t border-hairline py-(--section-y) md:grid-cols-[1fr_1.4fr]"
      >
        <h2 id="belief" className="font-display text-headline uppercase">
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

      <section aria-labelledby="commit" className="container-page border-t border-hairline py-(--section-y)">
        <h2 id="commit" className="font-display text-headline uppercase">
          Four commitments
        </h2>
        <ul className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
          {commitments.map((c) => (
            <li key={c.title} className="bg-void p-8">
              <p className="font-display text-title">{c.title}</p>
              <p className="mt-3 text-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="how" className="container-page border-t border-hairline py-(--section-y)">
        <h2 id="how" className="font-display text-headline uppercase">
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
        <p className="max-w-[24ch] font-display text-headline uppercase">Talk to the people who will build it.</p>
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
