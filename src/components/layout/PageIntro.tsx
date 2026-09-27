import type { ReactNode } from "react";

/** Top of every inner page: one H1 and one lead paragraph (no eyebrow tags, by rule). */
export function PageIntro({ title, lead, children }: { title: string; lead: string; children?: ReactNode }) {
  return (
    <div className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
      <h1 className="max-w-[20ch] font-display text-headline md:text-display">{title}</h1>
      <p className="mt-6 max-w-[62ch] text-body text-muted md:text-title md:leading-snug">{lead}</p>
      {children}
    </div>
  );
}
