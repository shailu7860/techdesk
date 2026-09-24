import { type FormEvent, useEffect, useRef, useState } from "react";
import { contact } from "../../data/contact";
import { industries } from "../../data/industries";
import { projectTypes } from "../../data/pricing";
import { type Errors, emptyLead, type Lead, LIMITS, type SubmitResult, submitLead, validate } from "../../lib/leads";
import { waLink } from "../../lib/whatsapp";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { Label } from "../ui/Label";

const STEPS = [
  "Who are you?",
  "What are you building?",
  "What do you need?",
  "How can we reach you?",
  "Transmit request",
];
const SCOPE = [
  "Product & UX design",
  "Web app / platform",
  "AI agent or chatbot",
  "Integrations & APIs",
  "SEO & marketing",
  "Ongoing support",
];
const TIMELINES = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Flexible / exploring"];
const BUDGETS = ["Under ₹1L / $2k", "₹1L–5L / $2k–8k", "₹5L–15L / $8k–25k", "₹15L+ / $25k+", "Not sure yet"];

const chip =
  "flex min-h-11 cursor-pointer items-center gap-3 rounded-sm border border-hairline px-4 py-2 text-small transition-colors " +
  "has-[:checked]:border-signal has-[:checked]:bg-signal-lo hover:border-ink/60 " +
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal";

type Status = "editing" | "sending" | "sent" | (SubmitResult & { ok: false });

/** Five-step project brief (spec §26, LG-02) with per-step validation and every submit state. */
export function BriefForm({ prefill }: { prefill: Partial<Lead> }) {
  const [step, setStep] = useState(1);
  const [lead, setLead] = useState<Lead>({ ...emptyLead, ...prefill });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("editing");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
  // biome-ignore lint/correctness/useExhaustiveDependencies: focus follows step changes only
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, status]);

  const set = <K extends keyof Lead>(k: K, v: Lead[K]) => {
    setLead((l) => ({ ...l, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    const e = validate(step, lead);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(5, s + 1));
    else headingRef.current?.focus();
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (step < 5) return next();
    const e = validate(5, lead);
    setErrors(e);
    if (Object.keys(e).length) {
      // Jump back to the first step with a problem.
      setStep(e.name ? 1 : e.projectType || e.description ? 2 : 4);
      return;
    }
    setStatus("sending");
    const r = await submitLead(lead);
    setStatus(r.ok ? "sent" : r);
  };

  if (status === "sent") {
    return (
      <div className="rounded-md border border-hairline bg-panel p-8 shadow-(--shadow-card) md:p-12" role="status">
        <Label tone="signal" live>
          Transmission / received
        </Label>
        <h3 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-headline focus:outline-none">
          Thank you, {lead.name.split(" ")[0]}.
        </h3>
        <p className="mt-4 max-w-[50ch] text-muted">
          {contact.replyPromise} If it's urgent, message us on WhatsApp and mention your brief.
        </p>
        <div className="mt-8">
          <Button
            href={waLink(`Hi TechDesk, I just sent a project brief (${lead.projectType}).`)}
            external
            variant="secondary"
          >
            WhatsApp {contact.phoneDisplay}
          </Button>
        </div>
      </div>
    );
  }

  const failed = typeof status === "object" ? status : null;
  const errorCopy: Record<string, string> = {
    config: "Our online form isn't connected yet. Your answers are still here; send them on WhatsApp or email instead.",
    network: "We couldn't reach the server. Check your connection and try again. Nothing you typed was lost.",
    rejected: "The form service didn't accept the request. Try again, or reach us directly below.",
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="overflow-hidden rounded-md border border-hairline bg-panel shadow-(--shadow-card)"
    >
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-6 py-4 md:px-8">
        <Label>Step {step} of 5</Label>
        <div aria-hidden="true" className="flex gap-1">
          {STEPS.map((s, i) => (
            <span key={s} className={`h-1 w-6 rounded-full ${i < step ? "bg-signal" : "bg-hairline"}`} />
          ))}
        </div>
      </div>

      <div className="grid gap-8 p-6 md:p-8">
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-title focus:outline-none">
          <span className="text-label font-medium text-muted">{String(step).padStart(2, "0")} / </span>
          {STEPS[step - 1]}
        </h3>

        {Object.values(errors).some(Boolean) && (
          <p role="alert" className="text-small text-danger">
            <span aria-hidden="true" className="">
              !{" "}
            </span>
            Please fix the highlighted {Object.values(errors).filter(Boolean).length > 1 ? "fields" : "field"}.
          </p>
        )}

        {/* Honeypot: off-screen, not focusable, ignored by humans. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Leave empty
            <input
              tabIndex={-1}
              autoComplete="off"
              value={lead.botcheck}
              onChange={(e) => set("botcheck", e.target.value)}
            />
          </label>
        </div>

        {step === 1 && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Your name"
              name="name"
              autoComplete="name"
              required
              maxLength={LIMITS.name}
              value={lead.name}
              error={errors.name}
              onChange={(e) => set("name", e.target.value)}
            />
            <Field
              label="Company"
              name="company"
              autoComplete="organization"
              hint="Optional"
              maxLength={LIMITS.company}
              value={lead.company}
              onChange={(e) => set("company", e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                as="select"
                label="Project type"
                name="projectType"
                required
                value={lead.projectType}
                error={errors.projectType}
                onChange={(e) => set("projectType", e.target.value)}
              >
                <option value="">Choose one</option>
                {projectTypes.map((t) => (
                  <option key={t.id}>{t.name}</option>
                ))}
                <option>Something else</option>
              </Field>
              <Field
                as="select"
                label="Industry"
                name="industry"
                hint="Optional"
                value={lead.industry}
                onChange={(e) => set("industry", e.target.value)}
              >
                <option value="">Choose one</option>
                {industries.map((i) => (
                  <option key={i.key}>{i.name}</option>
                ))}
                <option>Other</option>
              </Field>
            </div>
            <Field
              as="textarea"
              label="What are you building?"
              name="description"
              required
              maxLength={LIMITS.description}
              placeholder="The problem, who uses it, anything that already exists. A few sentences is plenty."
              value={lead.description}
              error={errors.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-8">
            <fieldset>
              <legend className="text-small font-medium">What do you need? (optional)</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {SCOPE.map((s) => (
                  <label key={s} className={chip}>
                    <input
                      type="checkbox"
                      className="accent-(--color-signal)"
                      checked={lead.scope.includes(s)}
                      onChange={() =>
                        set("scope", lead.scope.includes(s) ? lead.scope.filter((x) => x !== s) : [...lead.scope, s])
                      }
                    />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                as="select"
                label="Timeline"
                name="timeline"
                hint="Optional"
                value={lead.timeline}
                onChange={(e) => set("timeline", e.target.value)}
              >
                <option value="">Choose one</option>
                {TIMELINES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Field>
              <Field
                as="select"
                label="Budget range"
                name="budget"
                hint="Optional"
                value={lead.budget}
                onChange={(e) => set("budget", e.target.value)}
              >
                <option value="">Choose one</option>
                {BUDGETS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Field>
            </div>
            {lead.estimate && (
              <p className="rounded-sm border border-hairline bg-panel-hi p-4 text-small">
                <span className="text-label font-medium text-muted">Your estimate · </span>
                {lead.estimate}
              </p>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={LIMITS.email}
                value={lead.email}
                error={errors.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <Field
                label="Phone / WhatsApp"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                hint="Optional, with country code"
                maxLength={LIMITS.phone}
                value={lead.phone}
                error={errors.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <fieldset>
              <legend className="text-small font-medium">Best way to reach you</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {(
                  [
                    ["email", "Email"],
                    ["whatsapp", "WhatsApp"],
                    ["call", "Phone call"],
                  ] as const
                ).map(([v, t]) => (
                  <label key={v} className={chip}>
                    <input
                      type="radio"
                      name="channel"
                      className="accent-(--color-signal)"
                      checked={lead.channel === v}
                      onChange={() => set("channel", v)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 5 && (
          <dl className="grid gap-4 text-small sm:grid-cols-2">
            {(
              [
                ["Name", [lead.name, lead.company].filter(Boolean).join(", ")],
                ["Project", [lead.projectType, lead.industry].filter(Boolean).join(" · ")],
                ["Needs", lead.scope.join(", ") || "Not specified"],
                ["Timeline / budget", [lead.timeline, lead.budget].filter(Boolean).join(" · ") || "Not specified"],
                ["Reach", [lead.email, lead.phone].filter(Boolean).join(" · ")],
                ["Estimate", lead.estimate || "None"],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="border-t border-hairline pt-3">
                <dt className="text-label font-medium text-muted">{k}</dt>
                <dd className="mt-1 break-words">{v}</dd>
              </div>
            ))}
            <div className="border-t border-hairline pt-3 sm:col-span-2">
              <dt className="text-label font-medium text-muted">Message</dt>
              <dd className="mt-1 whitespace-pre-line break-words">{lead.description}</dd>
            </div>
          </dl>
        )}

        {failed && (
          <div role="alert" className="border border-danger/60 p-4 text-small">
            <p className="text-danger">
              <span aria-hidden="true" className="">
                !{" "}
              </span>
              {errorCopy[failed.reason] ?? errorCopy.rejected}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                href={waLink(
                  `Hi TechDesk, ${lead.name} here. Project: ${lead.projectType}. ${lead.description}`.slice(0, 900),
                )}
                external
                variant="secondary"
              >
                Send on WhatsApp
              </Button>
              <Button
                href={`mailto:${contact.email}?subject=${encodeURIComponent(`Project brief: ${lead.projectType}`)}`}
                variant="ghost"
              >
                Email instead
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={status === "sending"}>
              ← Back
            </Button>
          ) : (
            <span />
          )}
          {step < 5 ? (
            <Button type="submit" trailing="→">
              Continue
            </Button>
          ) : (
            <Button type="submit" loading={status === "sending"} trailing="→">
              {status === "sending" ? "Transmitting" : failed ? "Try again" : "Transmit request"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
