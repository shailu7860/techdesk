import { Link } from "react-router";
import { site } from "../../data/company";
import { contact } from "../../data/contact";
import { legalNav, primaryNav } from "../../data/navigation";
import { services } from "../../data/services";
import { telLink, waLink } from "../../lib/whatsapp";
import { Wordmark } from "../brand/Wordmark";

const col = "flex flex-col gap-3 text-small";
const heading = "mb-2 text-label font-medium text-muted";
const link = "text-ink/85 transition-colors hover:text-signal";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-panel">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <Link to="/" aria-label="TechDesk home" className="self-start">
            <Wordmark />
          </Link>
          <p className="max-w-[32ch] text-small text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Services" className={col}>
          <h2 className={heading}>Services</h2>
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className={link}>
              {s.name}
            </Link>
          ))}
        </nav>

        <nav aria-label="Company" className={col}>
          <h2 className={heading}>Company</h2>
          {primaryNav.map((item) => (
            <Link key={item.href} to={item.href} className={link}>
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className={link}>
            Contact
          </Link>
        </nav>

        <address className={`${col} not-italic`}>
          <h2 className={heading}>Contact</h2>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className={link}>
            WhatsApp {contact.phoneDisplay}
          </a>
          <a href={telLink()} className={link}>
            Call {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.email}`} className={`${link} break-all`}>
            {contact.email}
          </a>
          <p className="text-muted">
            {contact.city}. {contact.reach}.
          </p>
          <p className="text-muted">{contact.hours}</p>
        </address>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-hairline py-6 text-small text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <nav aria-label="Legal">
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
