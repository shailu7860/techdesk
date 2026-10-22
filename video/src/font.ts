import { continueRender, delayRender, staticFile } from "remotion";

// Archivo variable (same file the site self-hosts), loaded before the first frame renders.
const handle = delayRender("Loading Archivo");
const face = new FontFace("Archivo", `url(${staticFile("fonts/archivo.woff2")}) format("woff2")`, {
  weight: "100 900",
  stretch: "62% 125%",
});
face
  .load()
  .then((f) => {
    document.fonts.add(f);
    continueRender(handle);
  })
  .catch(() => continueRender(handle));
