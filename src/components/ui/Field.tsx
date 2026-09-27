import {
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  useId,
} from "react";

type Base = { label: string; hint?: string; error?: string; className?: string };
type InputProps = Base & { as?: "input" } & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = Base & { as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = Base & { as: "select"; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>;

const control =
  "w-full rounded-sm border bg-panel px-4 text-body text-ink placeholder:text-subtle " +
  "transition-[border-color,background-color] duration-(--duration-base) ease-(--ease-out-quart) " +
  "hover:bg-panel-hi focus-visible:border-signal focus-visible:outline-none " +
  "aria-[invalid=true]:border-danger disabled:cursor-not-allowed disabled:opacity-50";

/** Labelled form control with hint + error wiring (aria-describedby / aria-invalid). */
export function Field(props: InputProps | TextareaProps | SelectProps) {
  const { label, hint, error, className = "", id: idProp, required } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const a11y = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [hintId, errorId].filter(Boolean).join(" ") || undefined,
  };
  const border = error ? "border-danger" : "border-hairline";

  let el: ReactNode;
  if (props.as === "textarea") {
    const { as: _a, label: _l, hint: _h, error: _e, className: _c, ...rest } = props;
    el = <textarea {...rest} {...a11y} className={`${control} ${border} min-h-32 py-3`} />;
  } else if (props.as === "select") {
    const { as: _a, label: _l, hint: _h, error: _e, className: _c, children, ...rest } = props;
    el = (
      <select {...rest} {...a11y} className={`${control} ${border} min-h-12 cursor-pointer`}>
        {children}
      </select>
    );
  } else {
    const { as: _a, label: _l, hint: _h, error: _e, className: _c, ...rest } = props;
    el = <input {...rest} {...a11y} className={`${control} ${border} min-h-12`} />;
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
        {required && <span className="text-muted"> (required)</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-small text-muted">
          {hint}
        </p>
      )}
      {el}
      {error && (
        <p id={errorId} className="flex items-start gap-2 text-small text-danger">
          <span aria-hidden="true" className="">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}
