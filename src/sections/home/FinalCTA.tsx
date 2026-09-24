import { Button } from "../../components/ui/Button";
import { contact } from "../../data/contact";
import { telLink, waLink } from "../../lib/whatsapp";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-hairline">
      <div className="container-page flex min-h-[80svh] flex-col justify-center py-(--section-y)">
        <h2 id="cta-title" className="max-w-[12ch] font-display text-display uppercase" data-reveal>
          What will you build next?
        </h2>
        <p className="mt-8 max-w-[40ch] text-title leading-snug text-muted" data-reveal>
          Your next product, platform or intelligent system starts with a conversation.
        </p>
        <div className="mt-12 grid gap-3 sm:flex sm:flex-wrap sm:gap-4" data-reveal>
          <Button href={waLink()} external size="lg">
            WhatsApp {contact.phoneDisplay}
          </Button>
          <Button href={telLink()} variant="secondary" size="lg">
            Call us
          </Button>
          <Button href="/contact" variant="secondary" size="lg" trailing="→">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
