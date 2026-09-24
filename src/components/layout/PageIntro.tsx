import type { ReactNode } from "react";
import { Label } from "../ui/Label";

/** Top of every inner page: one system label, one H1, one lead paragraph. */
export function PageIntro({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <div className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
      <Label tone="signal">{label}</Label>
      <h1 className="mt-6 max-w-[20ch] font-display text-headline uppercase md:text-display">{title}</h1>
      <p className="mt-6 max-w-[62ch] text-body text-muted md:text-title md:leading-snug">{lead}</p>
      {children}
    </div>
  );
}
