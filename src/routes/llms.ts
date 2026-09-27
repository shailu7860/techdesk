import { site } from "../data/company";
import { contact } from "../data/contact";
import { insights } from "../data/insights";
import { flagships } from "../data/projects";
import { services } from "../data/services";
import { solutions } from "../data/solutions";
import { SITE_URL } from "../lib/seo";

// llms.txt: a plain-text map of the site for AI search engines and assistants (llmstxt.org).
export function loader() {
  const link = (t: string, p: string, d: string) => `- [${t}](${SITE_URL}${p}): ${d}`;
  const body = `# ${site.name}

> ${site.description}

Contact: WhatsApp or call ${contact.phoneDisplay}, ${contact.email}. ${contact.hours}. ${contact.replyPromise}

## Services
${services.map((s) => link(s.name, `/services/${s.slug}`, s.outcome)).join("\n")}

## Solutions
${solutions.map((s) => link(s.title, `/solutions/${s.slug}`, s.description)).join("\n")}

## Case studies
${flagships.map((p) => link(p.title, `/work/${p.slug}`, p.summary)).join("\n")}

## Blog
${insights.map((i) => link(i.h1, `/blog/${i.slug}`, i.description)).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
