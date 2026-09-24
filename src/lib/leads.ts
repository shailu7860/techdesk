// The single lead-submission boundary (LG-03). Swap the body for a Node API later; callers don't change.
// Web3Forms access keys are public by design: they only allow sending to the owner's inbox.

export type Lead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  channel: "email" | "whatsapp" | "call";
  projectType: string;
  industry: string;
  description: string;
  scope: string[];
  timeline: string;
  budget: string;
  /** Context carried from the calculator or a case study. */
  estimate: string;
  ref: string;
  /** Honeypot: humans never see or fill it (LG-04). */
  botcheck: string;
};

export const emptyLead: Lead = {
  name: "",
  company: "",
  email: "",
  phone: "",
  channel: "email",
  projectType: "",
  industry: "",
  description: "",
  scope: [],
  timeline: "",
  budget: "",
  estimate: "",
  ref: "",
  botcheck: "",
};

export const LIMITS = { name: 80, company: 120, email: 160, phone: 20, description: 2000, short: 120 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;
// biome-ignore lint/suspicious/noControlCharactersInRegex: stripping control characters is the point
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Trim, drop control characters and hard-cap length. Applied to every field before sending. */
export const clean = (v: string, max: number) => v.replace(CONTROL, "").trim().slice(0, max);

/** Single-line fields (name, email, subject parts): also collapse line breaks so nothing can split a header. */
export const line = (v: string, max: number) => clean(v.replace(/[\r\n\u2028\u2029]+/g, " "), max);

export type Errors = Partial<Record<keyof Lead, string>>;

/** Validation per brief step (1-based). Step 5 validates everything. */
export function validate(step: number, l: Lead): Errors {
  const e: Errors = {};
  const all = step >= 5;
  if (step === 1 || all) {
    if (clean(l.name, LIMITS.name).length < 2) e.name = "Tell us your name (at least 2 characters).";
  }
  if (step === 2 || all) {
    if (!l.projectType) e.projectType = "Choose the closest project type.";
    const d = clean(l.description, LIMITS.description);
    if (d.length < 10) e.description = "A sentence or two is enough, at least 10 characters.";
  }
  if (step === 4 || all) {
    if (!EMAIL.test(clean(l.email, LIMITS.email))) e.email = "Enter an email like name@company.com.";
    const p = clean(l.phone, LIMITS.phone);
    if (p && !PHONE.test(p)) e.phone = "Use digits, spaces and an optional +, e.g. +91 98765 43210.";
    if (l.channel !== "email" && !p) e.phone = "Add a number so we can reach you on your preferred channel.";
  }
  return e;
}

export type SubmitResult = { ok: true } | { ok: false; reason: "config" | "network" | "rejected" | "spam" };

const ENDPOINT = "https://api.web3forms.com/submit";

export async function submitLead(l: Lead, fetcher: typeof fetch = fetch): Promise<SubmitResult> {
  if (l.botcheck) return { ok: true }; // silently accept and drop bot submissions
  const key = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!key) return { ok: false, reason: "config" };

  const payload = {
    access_key: key,
    subject: `New project brief: ${line(l.projectType, LIMITS.short)} from ${line(l.name, LIMITS.name)}`,
    from_name: "TechDesk website",
    name: line(l.name, LIMITS.name),
    company: line(l.company, LIMITS.company),
    email: line(l.email, LIMITS.email),
    phone: line(l.phone, LIMITS.phone),
    preferred_channel: l.channel,
    project_type: line(l.projectType, LIMITS.short),
    industry: line(l.industry, LIMITS.short),
    scope: l.scope.map((s) => line(s, LIMITS.short)).join(", "),
    timeline: line(l.timeline, LIMITS.short),
    budget: line(l.budget, LIMITS.short),
    estimate: line(l.estimate, LIMITS.short),
    reference: line(l.ref, LIMITS.short),
    message: clean(l.description, LIMITS.description),
    botcheck: "",
  };

  try {
    const res = await fetcher(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && data.success ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
