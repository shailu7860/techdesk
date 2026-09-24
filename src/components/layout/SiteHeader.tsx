import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { contact } from "../../data/contact";
import { primaryNav } from "../../data/navigation";
import { telLink, waLink } from "../../lib/whatsapp";
import { Wordmark } from "../brand/Wordmark";
import { Button } from "../ui/Button";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `py-2 text-small transition-colors duration-(--duration-base) hover:text-ink ${
    isActive ? "text-ink underline decoration-signal decoration-2 underline-offset-8" : "text-muted"
  }`;

/**
 * Top bar: hides on scroll-down, returns on scroll-up or keyboard focus (FR-03).
 * Mobile: full-screen <dialog> menu (native focus containment, Esc to close).
 */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation (pathname or in-page hash).
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on route change by design
  useEffect(() => {
    menuRef.current?.close();
  }, [pathname, hash]);

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-(--z-sticky) border-b border-hairline/60 bg-void/90 backdrop-blur-md transition-transform duration-(--duration-slow) ease-(--ease-out-expo) ${
        hidden ? "-translate-y-full" : ""
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Link to="/" aria-label="TechDesk home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  // In-page anchors (/#process) are never "the current page".
                  className={(a) => linkCls({ isActive: a.isActive && !item.href.includes("#") })}
                  viewTransition
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" trailing="→">
            Start a project
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 px-2 text-small md:hidden"
          aria-haspopup="dialog"
          onClick={() => menuRef.current?.showModal()}
        >
          Menu
          <span aria-hidden="true" className="flex flex-col gap-1">
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </span>
        </button>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-void p-0 text-ink backdrop:bg-void"
      >
        <div className="container-page flex h-full flex-col pb-10">
          <div className="flex h-18 items-center justify-between">
            <Wordmark />
            <button
              type="button"
              className="-mr-2 flex min-h-11 min-w-11 cursor-pointer items-center justify-center px-2 text-small"
              onClick={() => menuRef.current?.close()}
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex-1">
            <ul className="flex flex-col gap-2">
              {[{ label: "Home", href: "/" }, ...primaryNav, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => menuRef.current?.close()}
                    className="block py-2 font-display text-headline uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3">
            <Button href="/contact" size="lg" trailing="→" onClick={() => menuRef.current?.close()}>
              Start a project
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button href={waLink()} external variant="secondary" size="lg">
                WhatsApp
              </Button>
              <Button href={telLink()} variant="secondary" size="lg">
                Call
              </Button>
            </div>
            <p className="mt-2 font-mono text-label text-muted">{contact.phoneDisplay}</p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
