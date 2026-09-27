import { describe, expect, it } from "vitest";
import { insights } from "../../src/data/insights";
import { projectTypes } from "../../src/data/pricing";
import { getProject, projects } from "../../src/data/projects";
import { services } from "../../src/data/services";
import { solutions } from "../../src/data/solutions";

const serviceSlugs = new Set(services.map((s) => s.slug));

describe("solution landing pages", () => {
  it("each targets a different primary keyword (no cannibalisation)", () => {
    const keys = solutions.map((s) => s.keyword.toLowerCase());
    expect(new Set(keys).size).toBe(keys.length);
    const slugs = solutions.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it.each(solutions)("$slug references only real projects, services, prices and guides", (s) => {
    for (const p of s.proof) expect(getProject(p), p).toBeDefined();
    for (const x of s.services) expect(serviceSlugs.has(x), x).toBe(true);
    expect(projectTypes.some((t) => t.id === s.estimateType)).toBe(true);
    if (s.guide) expect(insights.some((i) => i.slug === s.guide)).toBe(true);
  });
  it.each(solutions)("$slug has search-friendly title/description and the keyword on the page", (s) => {
    expect(`${s.title} | TechDesk`.length).toBeLessThanOrEqual(60);
    expect(s.description.length).toBeGreaterThanOrEqual(70);
    expect(s.description.length).toBeLessThanOrEqual(160);
    const words = s.keyword
      .toLowerCase()
      .split(" ")
      .filter((w) => w.length > 3);
    const text = `${s.h1} ${s.intro.join(" ")} ${s.title}`.toLowerCase();
    for (const w of words) expect(text, `${s.slug} missing "${w}"`).toContain(w.replace(/s$/, ""));
  });
});

describe("guides", () => {
  it.each(insights)("$slug is well formed", (a) => {
    expect(`${a.title} | TechDesk`.length).toBeLessThanOrEqual(60);
    expect(a.description.length).toBeLessThanOrEqual(160);
    expect(a.body.filter((b) => b.type === "h2").length).toBeGreaterThanOrEqual(3);
    for (const r of a.related)
      expect(
        solutions.some((s) => s.slug === r),
        r,
      ).toBe(true);
  });
});

describe("case studies and services", () => {
  it("every case study has a meta description within 160 chars", () => {
    for (const p of projects.filter((x) => x.caseStudy)) {
      expect(p.metaDescription, p.slug).toBeDefined();
      expect(p.metaDescription?.length ?? 0).toBeLessThanOrEqual(160);
    }
  });
  it("every service has an SEO title and description", () => {
    for (const s of services) {
      expect(`${s.seo.title} | TechDesk`.length).toBeLessThanOrEqual(60);
      expect(s.seo.description.length).toBeLessThanOrEqual(160);
    }
  });
});
