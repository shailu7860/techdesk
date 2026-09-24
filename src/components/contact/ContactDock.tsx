import { contact } from "../../data/contact";
import { openChat } from "../../lib/chat-events";
import { telLink, waLink } from "../../lib/whatsapp";

// Official WhatsApp glyph, Simple Icons v16.32.0 (CC0).
const WA_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true" focusable="false">
    <path d={WA_PATH} />
  </svg>
);
const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
      strokeLinejoin="round"
    />
  </svg>
);

const actions = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    detail: "Chat on WhatsApp",
    href: waLink(),
    icon: <WhatsAppIcon />,
    external: true,
  },
  {
    key: "call",
    label: "Call",
    detail: `Call ${contact.phoneDisplay}`,
    href: telLink(),
    icon: <PhoneIcon />,
    external: false,
  },
] as const;
const ChatIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M4 5h16v11H9l-5 4z" strokeLinejoin="round" />
    <path d="M8 10h8M8 13h5" />
  </svg>
);

/**
 * Persistent quick-contact dock. Desktop: bottom-right cluster with text tooltips.
 * Mobile: labelled bottom bar in the thumb zone. Plain anchors, so it works without JS.
 */
export function ContactDock() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed z-(--z-dock) inset-x-0 bottom-0 md:inset-x-auto md:right-6 md:bottom-6"
    >
      <ul className="grid grid-cols-3 border-t border-hairline bg-void/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:flex md:flex-col md:gap-2 md:border-0 md:bg-transparent md:pb-0 md:backdrop-blur-none">
        {actions.map((a) => (
          <li key={a.key} className="md:relative">
            <a
              href={a.href}
              aria-label={a.detail}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="peer flex h-(--dock-h) items-center justify-center gap-2.5 text-small font-medium text-ink transition-colors duration-(--duration-base) ease-(--ease-out-quart) hover:text-signal md:size-12 md:h-12 md:rounded-sm md:border md:border-hairline md:bg-panel md:hover:border-signal"
            >
              {a.icon}
              <span className="md:sr-only">{a.label}</span>
            </a>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-panel px-3 py-1.5 font-mono text-label text-ink opacity-0 transition-opacity duration-(--duration-fast) peer-hover:opacity-100 peer-focus-visible:opacity-100 md:block"
            >
              {a.detail}
            </span>
          </li>
        ))}
        <li className="md:relative">
          <button
            type="button"
            onClick={() => openChat("dock")}
            aria-label="Ask our AI assistant"
            className="peer flex h-(--dock-h) w-full cursor-pointer items-center justify-center gap-2.5 text-small font-medium text-ink transition-colors duration-(--duration-base) ease-(--ease-out-quart) hover:text-agent md:size-12 md:h-12 md:rounded-sm md:border md:border-agent/50 md:bg-panel md:hover:border-agent"
          >
            <ChatIcon />
            <span className="md:sr-only">Chat</span>
          </button>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-panel px-3 py-1.5 font-mono text-label text-ink opacity-0 transition-opacity duration-(--duration-fast) peer-hover:opacity-100 peer-focus-visible:opacity-100 md:block"
          >
            Ask our AI assistant
          </span>
        </li>
      </ul>
    </nav>
  );
}
