import { Link } from "react-router";
import { FaqList, faqLd } from "../components/content/FaqList";
import { NotFound } from "../components/NotFound";
import { Button } from "../components/ui/Button";
import { type Block, getInsight } from "../data/insights";
import { getSolution } from "../data/solutions";
import { ORG_ID, SITE_URL, seo } from "../lib/seo";
import type { Route } from "./+types/blog.$slug";

export const meta = ({ params }: Route.MetaArgs) => {
  const a = getInsight(params.slug);
  if (!a) return seo({ title: "Article not found | TechDesk", description: "", path: "/404", noindex: true });
  return seo({
    title: `${a.title} | TechDesk`,
    description: a.description,
    path: `/blog/${a.slug}`,
    type: "article",
    article: { published: a.published, section: a.category },
    image: `/og/insight-${a.slug}.png`,
    imageAlt: a.h1,
    breadcrumbs: [
      ["Blog", "/blog"],
      [a.title, `/blog/${a.slug}`],
    ],
    jsonLd: [
      {
        "@type": "BlogPosting",
        headline: a.h1,
        description: a.description,
        datePublished: a.published,
        dateModified: a.published,
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
        image: `${SITE_URL}/og/insight-${a.slug}.png`,
        articleSection: a.category,
        inLanguage: "en",
      },
      faqLd(a.faq),
    ],
  });
};

function Render({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return <h2 className="mt-14 font-display text-headline">{b.text}</h2>;
    case "p":
      return <p className="mt-5 text-body text-muted">{b.text}</p>;
    case "list":
      return (
        <ul className="mt-5 grid gap-3">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3 text-muted">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-8">
          <table className="glass w-full rounded-lg text-left text-[0.8125rem] md:text-small">
            <caption className="sr-only">{b.caption}</caption>
            <thead className="text-label font-semibold text-muted">
              <tr className="border-b border-hairline">
                {b.head.map((h) => (
                  <th key={h} scope="col" className="p-2.5 md:p-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]} className="border-b border-hairline last:border-0">
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th key={c} scope="row" className="p-2.5 font-medium md:p-4">
                        {c}
                      </th>
                    ) : (
                      <td key={c} className="p-2.5 md:p-4">
                        {c}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cta":
      return (
        <div className="glass mt-10 flex flex-col gap-4 rounded-lg p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-ink">{b.text}</p>
          <Button href={b.href} trailing="→">
            {b.label}
          </Button>
        </div>
      );
  }
}

export default function InsightPage({ params }: Route.ComponentProps) {
  const a = getInsight(params.slug);
  if (!a) return <NotFound title="Article not found." body="That article does not exist. See all blog posts." />;
  const date = new Date(a.published).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main id="main">
      <article className="container-page pt-16 pb-(--section-y) md:pt-24">
        <div className="max-w-[72ch]">
          <nav aria-label="Breadcrumb" className="text-small text-muted">
            <Link to="/blog" className="hover:text-ink">
              Blog
            </Link>{" "}
            / {a.title}
          </nav>
          <h1 className="mt-6 font-display text-headline md:text-display">{a.h1}</h1>
          <p className="mt-6 text-small text-muted">
            {a.category} · TechDesk · <time dateTime={a.published}>{date}</time> · {a.readMinutes} min read
          </p>
          <section aria-labelledby="short-answer" className="glass mt-10 rounded-lg p-6 md:p-8">
            <h2 id="short-answer" className="font-display text-title">
              The short answer
            </h2>
            <p className="mt-3 text-body text-ink/90">{a.summary}</p>
          </section>
          {a.body.map((b, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static article content
            <Render key={i} b={b} />
          ))}
          <h2 className="mt-14 font-display text-headline">Frequently asked questions</h2>
          <div className="mt-8">
            <FaqList items={a.faq} />
          </div>
          <h2 className="mt-14 font-display text-title">Related</h2>
          <ul className="mt-4 grid gap-2">
            {a.related.map((slug) => {
              const s = getSolution(slug);
              return s ? (
                <li key={slug}>
                  <Link to={`/solutions/${slug}`} className="text-signal underline underline-offset-4">
                    {s.title}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </article>
    </main>
  );
}
