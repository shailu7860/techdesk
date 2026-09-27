import { Link } from "react-router";
import type { Insight } from "../../data/insights";

export const postDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** One blog post teaser; the whole card is the link. `featured` spans wider with a larger heading. */
export function PostCard({ post, featured, as: H = "h3" }: { post: Insight; featured?: boolean; as?: "h2" | "h3" }) {
  return (
    <article
      className={`group glass relative flex h-full flex-col rounded-lg transition-[border-color,transform] duration-(--duration-base) hover:-translate-y-0.5 hover:border-signal/60 ${featured ? "p-8 md:p-12" : "p-8"}`}
    >
      <p className="text-small text-muted">
        <span className="font-medium text-signal">{post.category}</span> ·{" "}
        <time dateTime={post.published}>{postDate(post.published)}</time> · {post.readMinutes} min read
      </p>
      <H className={`mt-4 font-display ${featured ? "text-headline" : "text-title"}`}>
        <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {post.h1}
        </Link>
      </H>
      <p className={`mt-3 text-muted ${featured ? "max-w-[60ch]" : "text-small"}`}>
        {featured ? post.summary : post.description}
      </p>
      <span aria-hidden="true" className="mt-auto pt-6 font-medium text-signal">
        Read article <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </article>
  );
}
