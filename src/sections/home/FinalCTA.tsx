import { Button } from "../../components/ui/Button";
import { contact } from "../../data/contact";
import { telLink, waLink } from "../../lib/whatsapp";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-signal text-white">
      <div className="container-page flex flex-col items-center py-(--section-y) text-center">
        <h2 id="cta-title" className="max-w-[20ch] font-display text-display" data-reveal>
          What will you build next?
        </h2>
        <p className="mt-6 max-w-[48ch] text-title leading-snug text-white/90" data-reveal>
          Your next product, platform or intelligent system starts with a conversation.
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4" data-reveal>
          <Button href="/contact" variant="onBrand" size="lg" trailing="→">
            Start a project
          </Button>
          <Button href={waLink()} external variant="onBrandOutline" size="lg">
            WhatsApp {contact.phoneDisplay}
          </Button>
          <Button href={telLink()} variant="onBrandOutline" size="lg">
            Call us
          </Button>
        </div>
      </div>
    </section>
  );
}
