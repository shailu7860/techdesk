import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary" | "ghost" | "onBrand" | "onBrandOutline";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  /** Trailing glyph, e.g. "→" or "↓". Decorative; hidden from assistive tech. */
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
};

type AsLink = Common & { href: string; external?: boolean; onClick?: () => void };
type AsButton = Common & { href?: never; loading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold " +
  "transition-[background-color,border-color,color] duration-(--duration-base) ease-(--ease-out-quart) " +
  "disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-void hover:bg-signal-hi",
  secondary: "border border-hairline bg-panel/60 text-ink backdrop-blur-sm hover:border-signal hover:text-signal",
  ghost: "text-ink underline-offset-[6px] hover:text-signal hover:underline",
  // For use on the solid green band.
  onBrand: "bg-panel text-signal hover:bg-panel-hi",
  onBrandOutline: "border border-white/50 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-small",
  lg: "min-h-13 px-7 text-body",
};

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", trailing, children, className = "" } = props;
  const cls = `${base} ${variants[variant]} ${variant === "ghost" ? "min-h-11 px-1" : sizes[size]} ${className}`;
  const glyph = trailing ? (
    <span
      aria-hidden="true"
      className="transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover:translate-x-0.5"
    >
      {trailing}
    </span>
  ) : null;

  if (props.href !== undefined) {
    const { href, external, onClick } = props;
    const isInternal = href.startsWith("/") && !external;
    return isInternal ? (
      <Link to={href} className={cls} onClick={onClick} viewTransition>
        {children}
        {glyph}
      </Link>
    ) : (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {glyph}
      </a>
    );
  }

  const {
    loading = false,
    variant: _v,
    size: _s,
    trailing: _t,
    className: _c,
    children: _ch,
    disabled,
    type = "button",
    ...rest
  } = props;
  return (
    <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && (
        <span
          aria-hidden="true"
          className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
      {!loading && glyph}
    </button>
  );
}
