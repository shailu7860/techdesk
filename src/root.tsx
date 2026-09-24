import type { ReactNode } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/martian-mono/wght.css";
import "./styles/globals.css";
import { ContactDock } from "./components/contact/ContactDock";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { NotFound } from "./components/NotFound";

export const links: Route.LinksFunction = () => [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }];

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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
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
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <ContactDock />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  if (import.meta.env.DEV && !notFound) console.error(error);
  return (
    <>
      <SiteHeader />
      {notFound ? (
        <NotFound />
      ) : (
        <NotFound
          code="500"
          title="Something failed on our side."
          body="The page hit an unexpected error. Try again, or reach us directly while we fix it."
        />
      )}
      <SiteFooter />
      <ContactDock />
    </>
  );
}
