import { useEffect, useRef } from "react";
import { isMotionPaused, onMotionChange } from "../../lib/motion";

/**
 * Muted looping showcase video (sources in public/video, rendered from /video).
 * Plays only while on screen, and never under reduced motion or the site-wide Pause motion toggle:
 * then the poster frame stays. Decorative: the surrounding text carries the meaning.
 */
export function LoopVideo({
  name,
  width,
  height,
  eager = false,
  className = "",
}: {
  name: string;
  width: number;
  height: number;
  /** Above the fold: fetch metadata now. Below the fold: fetch nothing until it scrolls near. */
  eager?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !reduced.matches && !isMotionPaused()) {
        if (v.preload === "none") v.preload = "auto";
        v.play().catch(() => {
          /* autoplay refused (data saver, low power): the poster stays */
        });
      } else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    reduced.addEventListener("change", sync);
    const off = onMotionChange(sync);
    return () => {
      io.disconnect();
      reduced.removeEventListener("change", sync);
      off();
    };
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={eager ? "metadata" : "none"}
      poster={`/video/${name}.webp`}
      width={width}
      height={height}
      className={`block h-auto w-full ${className}`}
    >
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
