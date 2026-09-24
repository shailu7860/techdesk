import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import { type AddOnId, addOns, type Currency, projectTypes, type SizeId, sizes } from "../../data/pricing";
import { defaultCurrency, estimate, formatBand } from "../../lib/estimate";
import { waLink } from "../../lib/whatsapp";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";

const CURRENCY_KEY = "techdesk.currency";

function readCurrency(): Currency {
  try {
    const v = localStorage.getItem(CURRENCY_KEY);
    if (v === "INR" || v === "USD") return v;
  } catch {
    /* storage blocked: fall back to timezone */
  }
  return defaultCurrency();
}

const choice =
  "flex min-h-11 w-full cursor-pointer items-start gap-3 rounded-sm border px-4 py-3 text-left transition-colors " +
  "has-[:checked]:border-signal has-[:checked]:bg-signal-lo border-hairline hover:border-ink/60 " +
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal";

/**
 * Indicative estimate: type → size → add-ons → range (LG-05). Hands off to the brief or WhatsApp (LG-06).
 * Native radios/checkboxes: keyboard and screen-reader behaviour for free.
 */
export function QuoteCalculator({
  initialType = "web-app",
  compact = false,
}: {
  initialType?: string;
  compact?: boolean;
}) {
  const id = useId();
  const navigate = useNavigate();
  const [type, setType] = useState(projectTypes.some((t) => t.id === initialType) ? initialType : "web-app");
  const [size, setSize] = useState<SizeId>("small");
  const [selected, setSelected] = useState<AddOnId[]>([]);
  // Prerendered HTML uses USD; the visitor's preference applies after hydration.
  const [currency, setCurrency] = useState<Currency>("USD");
  useEffect(() => setCurrency(readCurrency()), []);

  const chooseCurrency = (c: Currency) => {
    setCurrency(c);
    try {
      localStorage.setItem(CURRENCY_KEY, c);
    } catch {
      /* non-essential preference */
    }
  };

  const result = estimate(type, size, selected, currency);
  const range = result ? formatBand(result) : "";
  const typeName = projectTypes.find((t) => t.id === type)?.name ?? "";
  const sizeName = sizes.find((s) => s.id === size)?.name ?? "";
  const extras = addOns.filter((a) => selected.includes(a.id)).map((a) => a.name);
  const summary = `${typeName}, ${sizeName}${extras.length ? `, with ${extras.join(", ")}` : ""}: ${range} (indicative)`;

  const toggle = (a: AddOnId) => setSelected((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));

  return (
    <div className="grid gap-px border border-hairline bg-hairline lg:grid-cols-[1.6fr_1fr]">
      <div className="grid gap-10 bg-void p-6 md:p-8">
        <fieldset>
          <legend className="font-mono text-label uppercase text-muted">01 · What are you building?</legend>
          <div className={`mt-4 grid gap-2 ${compact ? "" : "sm:grid-cols-2"}`}>
            {projectTypes.map((t) => (
              <label key={t.id} className={choice}>
                <input
                  type="radio"
                  name={`${id}-type`}
                  value={t.id}
                  checked={type === t.id}
                  onChange={() => setType(t.id)}
                  className="mt-1 accent-(--color-signal)"
                />
                <span className="text-small">{t.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-label uppercase text-muted">02 · How big?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {sizes.map((s) => (
              <label key={s.id} className={choice}>
                <input
                  type="radio"
                  name={`${id}-size`}
                  value={s.id}
                  checked={size === s.id}
                  onChange={() => setSize(s.id)}
                  className="mt-1 accent-(--color-signal)"
                />
                <span>
                  <span className="block text-small font-medium">{s.name}</span>
                  <span className="mt-1 block text-small text-muted">{s.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-label uppercase text-muted">03 · Anything extra?</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {addOns.map((a) => (
              <label key={a.id} className={choice}>
                <input
                  type="checkbox"
                  checked={selected.includes(a.id)}
                  onChange={() => toggle(a.id)}
                  className="mt-1 accent-(--color-signal)"
                />
                <span className="text-small">{a.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col bg-panel p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <Label tone="signal">Estimate</Label>
          <fieldset className="flex rounded-sm border border-hairline p-0.5">
            <legend className="sr-only">Currency</legend>
            {(["INR", "USD"] as const).map((c) => (
              <label
                key={c}
                className="cursor-pointer rounded-[1px] px-3 py-1.5 font-mono text-label has-[:checked]:bg-ink has-[:checked]:text-void has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal"
              >
                <input
                  type="radio"
                  name={`${id}-cur`}
                  className="sr-only"
                  checked={currency === c}
                  onChange={() => chooseCurrency(c)}
                />
                {c}
              </label>
            ))}
          </fieldset>
        </div>
        <output
          aria-live="polite"
          className="mt-10 block font-mono text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-tight"
        >
          {range}
        </output>
        <p className="mt-3 text-small text-muted">
          Indicative range, not a quote. Your written proposal comes after a short scoping call.
        </p>
        <div className="mt-auto grid gap-3 pt-10">
          <Button
            trailing="→"
            onClick={() =>
              navigate(`/contact?type=${encodeURIComponent(type)}&estimate=${encodeURIComponent(summary)}#brief`)
            }
          >
            Send this to us
          </Button>
          <Button href={waLink(`Hi TechDesk, my estimate: ${summary}. Can we discuss?`)} external variant="secondary">
            Discuss on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
