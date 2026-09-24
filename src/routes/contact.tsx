import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { BriefForm } from "../components/contact/BriefForm";
import { QuoteCalculator } from "../components/contact/QuoteCalculator";
import { PageIntro } from "../components/layout/PageIntro";
import { Label } from "../components/ui/Label";
import { contact } from "../data/contact";
import { projectTypes } from "../data/pricing";
import { getProject } from "../data/projects";
import { summaryFromParams } from "../lib/estimate";
import { seo } from "../lib/seo";
import { telLink, waLink } from "../lib/whatsapp";

export const meta = () =>
  seo({
    title: "Contact | Start a project with TechDesk",
    description: `Tell us what you're building. WhatsApp or call ${contact.phoneDisplay}, get an indicative estimate, or send a short project brief. ${contact.replyPromise}`,
    path: "/contact",
  });

const lines = [
  { label: "WhatsApp", value: contact.phoneDisplay, href: waLink(), external: true },
  { label: "Call", value: contact.phoneDisplay, href: telLink(), external: false },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
];

export default function Contact() {
  const [params] = useSearchParams();
  // URL context (from the calculator or a case study) is applied after hydration,
  // so the prerendered HTML and the first client render always match.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const typeId = hydrated ? (params.get("type") ?? "") : "";
  const typeName = projectTypes.find((t) => t.id === typeId)?.name ?? "";
  const ref = hydrated ? (getProject(params.get("ref") ?? "")?.title ?? "") : "";
  const estimate = hydrated ? summaryFromParams(params) : "";
  const prefillKey = `${typeId}|${ref}|${estimate}`;

  return (
    <main id="main">
      <PageIntro
        label="Contact / open channel"
        title="What will you build next?"
        lead={`Pick the fastest route for you. A human answers, usually the engineer who would build it. ${contact.replyPromise}`}
      />

      <section aria-label="Direct lines" className="container-page pb-16">
        <ul className="grid gap-px border border-hairline bg-hairline md:grid-cols-3">
          {lines.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full flex-col gap-3 bg-void p-6 transition-colors hover:bg-panel md:p-8"
              >
                <Label>{l.label}</Label>
                <span className="break-all font-display text-title transition-colors group-hover:text-signal">
                  {l.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-small text-muted">
          {contact.hours} · {contact.city}, {contact.reach.toLowerCase()} · WhatsApp messages welcome anytime.
        </p>
      </section>

      <section
        id="brief"
        aria-labelledby="brief-title"
        className="container-page scroll-mt-24 border-t border-hairline py-(--section-y)"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 id="brief-title" className="font-display text-headline uppercase">
              Send a brief
            </h2>
            <p className="mt-4 max-w-[36ch] text-muted">
              Five short steps, about two minutes. We reply with questions or a call slot, not a sales sequence.
            </p>
          </div>
          <BriefForm key={prefillKey} prefill={{ projectType: typeName, estimate, ref }} />
        </div>
      </section>

      <section
        id="estimate"
        aria-labelledby="estimate-title"
        className="container-page scroll-mt-24 border-t border-hairline py-(--section-y)"
      >
        <h2 id="estimate-title" className="font-display text-headline uppercase">
          What would it take?
        </h2>
        <p className="mt-4 max-w-[55ch] text-muted">
          A quick indicative range for budgeting. Prices in INR for India and USD for everywhere else.
        </p>
        <div className="mt-10">
          <QuoteCalculator key={typeId || "default"} initialType={typeId || undefined} />
        </div>
      </section>
    </main>
  );
}
