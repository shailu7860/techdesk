import { PostCard } from "../components/content/PostCard";
import { PageIntro } from "../components/layout/PageIntro";
import { latestInsights } from "../data/insights";
import { ORG_ID, SITE_URL, seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Blog: software, AI and cost guides | TechDesk",
    description:
      "Practical articles on the real cost and timeline of AI agents, SaaS, websites and Chrome extensions, plus how to hire and build well, from the TechDesk team.",
    path: "/blog",
    breadcrumbs: [["Blog", "/blog"]],
    jsonLd: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      name: "TechDesk blog",
      url: `${SITE_URL}/blog`,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
      blogPost: latestInsights.map((a) => ({
        "@type": "BlogPosting",
        headline: a.h1,
        url: `${SITE_URL}/blog/${a.slug}`,
        datePublished: a.published,
        articleSection: a.category,
      })),
    },
  });

export default function Blog() {
  const [featured, ...rest] = latestInsights;
  return (
    <main id="main">
      <PageIntro
        title="Straight answers before you build."
        lead="What things really cost, how long they take and how to spend less, from the team that builds them."
      />
      <section aria-label="Articles" className="container-page pb-(--section-y)">
        {featured && <PostCard post={featured} featured as="h2" />}
        <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rest.map((a) => (
            <li key={a.slug}>
              <PostCard post={a} as="h2" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
