import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("work", "routes/work.tsx"),
  route("work/:slug", "routes/work.$slug.tsx"),
  route("services", "routes/services.tsx"),
  route("services/:slug", "routes/services.$slug.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("robots.txt", "routes/robots.ts"),
  route("system", "routes/system.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
