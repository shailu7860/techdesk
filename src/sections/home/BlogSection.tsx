import { PostCard } from "../../components/content/PostCard";
import { Button } from "../../components/ui/Button";
import { latestInsights } from "../../data/insights";

/** Latest three blog posts: fresh internal links from the home page. */
export function BlogSection() {
  return (
    <section aria-labelledby="blog-title" className="border-t border-hairline py-(--section-y)">
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 id="blog-title" className="font-display text-headline" data-reveal>
          From the blog
        </h2>
        <p className="max-w-[40ch] text-muted" data-reveal>
          Straight answers on cost, timelines and building with AI.
        </p>
      </div>
      <ul className="container-page mt-12 grid gap-6 md:grid-cols-3">
        {latestInsights.slice(0, 3).map((p) => (
          <li key={p.slug} data-reveal>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
      <div className="container-page mt-10">
        <Button href="/blog" variant="secondary" trailing="→">
          All articles
        </Button>
      </div>
    </section>
  );
}
