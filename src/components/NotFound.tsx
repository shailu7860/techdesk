import { contact } from "../data/contact";
import { waLink } from "../lib/whatsapp";
import { Button } from "./ui/Button";

/** Designed 404 / error screen (FR-04). Every exit is a real route or a human. */
export function NotFound({
  code = "404",
  title = "The requested module does not exist.",
  body = "The page may have moved, or the link is mistyped.",
}: {
  code?: string;
  title?: string;
  body?: string;
}) {
  return (
    <main id="main" className="container-page flex min-h-[70dvh] flex-col justify-center py-(--section-y)">
      <h1 className="max-w-[18ch] font-display text-headline">{title}</h1>
      <p className="mt-6 max-w-[55ch] text-muted">
        {body} (Error {code})
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/" trailing="→">
          Return to base
        </Button>
        <Button href="/work" variant="secondary">
          View our work
        </Button>
        <Button href={waLink(`Hi TechDesk, I hit a ${code} page on your site.`)} external variant="ghost" trailing="→">
          WhatsApp {contact.phoneDisplay}
        </Button>
      </div>
    </main>
  );
}
