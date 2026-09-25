import { site } from "../data/company";

export function loader() {
  return Response.json(
    {
      name: site.name,
      short_name: site.name,
      description: site.description,
      start_url: "/",
      display: "browser",
      background_color: "#0b1a14",
      theme_color: "#0b1a14",
      icons: [
        { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}
