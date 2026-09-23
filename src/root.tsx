import type { ReactNode } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/martian-mono/wght.css";
import "./styles/globals.css";
import { ContactDock } from "./components/contact/ContactDock";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0b0b" />
        <Meta />
        <Links />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
      <ContactDock />
    </>
  );
}

// ponytail: minimal boundary; the designed 404 / error screens land in Phase 3.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main id="main" className="container-page py-[var(--section-y)]">
      <p className="font-mono text-label uppercase text-muted">System error / {notFound ? "404" : "500"}</p>
      <h1 className="font-display text-headline mt-4">
        {notFound ? "The requested module does not exist." : "Something failed on our side."}
      </h1>
      <a href="/" className="mt-8 inline-block text-signal underline underline-offset-4">Return to base →</a>
    </main>
  );
}
