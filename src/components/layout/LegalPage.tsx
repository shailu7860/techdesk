import type { ReactNode } from "react";
import { PageIntro } from "./PageIntro";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main id="main">
      <PageIntro
        title={title}
        lead={`Last updated ${updated}. Written in plain language; if anything is unclear, ask us.`}
      />
      <div className="container-page pb-(--section-y)">
        <div className="max-w-[70ch] border-t border-hairline pt-12 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-title [&_li]:mt-2 [&_p]:mt-4 [&_p]:text-muted [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted">
          {children}
        </div>
      </div>
    </main>
  );
}
