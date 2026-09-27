import { Button } from "../../components/ui/Button";
import { contact } from "../../data/contact";
import { telLink, waLink } from "../../lib/whatsapp";
import { Planet } from "./Planet";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="py-(--section-y)">
      <div className="container-page">
        <div className="glass relative isolate overflow-hidden rounded-lg px-6 py-20 text-center md:px-16 md:py-28">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Planet className="absolute -right-24 -bottom-40 w-96 opacity-40" />
          </div>
          <h2 id="cta-title" className="mx-auto max-w-[20ch] font-display text-display" data-reveal>
            What will you build <span className="text-signal">next?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[48ch] text-title leading-snug text-muted" data-reveal>
            Your next product, platform or intelligent system starts with a conversation.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4" data-reveal>
            <Button href="/contact" size="lg" trailing="→">
              Start a project
            </Button>
            <Button href={waLink()} external variant="secondary" size="lg">
              WhatsApp {contact.phoneDisplay}
            </Button>
            <Button href={telLink()} variant="secondary" size="lg">
              Call us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
