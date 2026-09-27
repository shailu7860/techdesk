import { type AddOnId, addOns, type Band, type Currency, projectTypes, type SizeId, sizes } from "../data/pricing";

export type Estimate = { band: Band; currency: Currency; perMonth: boolean };

/** Indicative range: size band × product of selected add-on factors, rounded to a readable step. */
export function estimate(typeId: string, size: SizeId, selected: AddOnId[], currency: Currency): Estimate | null {
  const type = projectTypes.find((t) => t.id === typeId);
  if (!type) return null;
  const factor = addOns.filter((a) => selected.includes(a.id)).reduce((f, a) => f * a.factor, 1);
  const base = type.bands[size][currency];
  const step = currency === "INR" ? 5_000 : 100;
  const round = (n: number) => Math.round((n * factor) / step) * step;
  return {
    band: { min: round(base.min), max: base.max === null ? null : round(base.max) },
    currency,
    perMonth: Boolean(type.perMonth),
  };
}

/** ₹1.5L / ₹12L style for INR (how Indian clients read budgets), $8k for USD. */
export function formatMoney(n: number, currency: Currency): string {
  if (currency === "INR") {
    if (n >= 100_000) return `₹${trim(n / 100_000)}L`;
    if (n >= 1_000) return `₹${trim(n / 1_000)}k`;
    return `₹${n}`;
  }
  if (n >= 1_000) return `$${trim(n / 1_000)}k`;
  return `$${n}`;
}

const trim = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, ""));

export function formatBand(e: Estimate): string {
  const { band, currency, perMonth } = e;
  const text =
    band.max === null
      ? `From ${formatMoney(band.min, currency)}`
      : `${formatMoney(band.min, currency)} – ${formatMoney(band.max, currency)}`;
  return perMonth ? `${text} / month` : text;
}

/** INR for visitors whose device clock is set to India, USD otherwise. */
export function defaultCurrency(): Currency {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Kolkata" ? "INR" : "USD";
  } catch {
    return "USD";
  }
}

/** Human summary of a selection, e.g. "Web app / SaaS platform, Focused: $3k – $8k (indicative)". */
export function summarize(typeId: string, size: SizeId, selected: AddOnId[], currency: Currency): string {
  const e = estimate(typeId, size, selected, currency);
  if (!e) return "";
  const type = projectTypes.find((t) => t.id === typeId)?.name;
  const sizeName = sizes.find((s) => s.id === size)?.name;
  const extras = addOns.filter((a) => selected.includes(a.id)).map((a) => a.name);
  return `${type}, ${sizeName}${extras.length ? `, with ${extras.join(", ")}` : ""}: ${formatBand(e)} (indicative)`;
}

/**
 * Rebuild a summary from untrusted URL params. Only whitelisted ids are accepted, so a crafted link
 * can never make the page display arbitrary text (content-injection guard).
 */
export function summaryFromParams(p: URLSearchParams): string {
  const type = p.get("type") ?? "";
  const size = p.get("size") as SizeId | null;
  const cur = p.get("cur");
  if (!size || !sizes.some((s) => s.id === size) || (cur !== "INR" && cur !== "USD")) return "";
  const picked = (p.get("addons") ?? "").split(",").filter((a): a is AddOnId => addOns.some((x) => x.id === a));
  return summarize(type, size, picked, cur);
}
