import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { securityHeaders } from "../../scripts/security-headers.mjs";
import { industries } from "../../src/data/industries";
import { projectTypes } from "../../src/data/pricing";
import { getProject, projects } from "../../src/data/projects";
import { services } from "../../src/data/services";
import { testimonials } from "../../src/data/testimonials";
import { waLink } from "../../src/lib/whatsapp";

describe("content integrity", () => {
  it("has unique project and service slugs", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
  });
  it("references only existing projects and services", () => {
    const slugs = new Set(services.map((s) => s.slug));
    for (const i of industries) {
      expect(getProject(i.project), i.key).toBeDefined();
      for (const s of i.services) expect(slugs.has(s), `${i.key}:${s}`).toBe(true);
    }
    for (const p of projects) for (const s of p.services) expect(slugs.has(s), `${p.slug}:${s}`).toBe(true);
  });
  it("points every service at a real calculator type", () => {
    for (const s of services)
      expect(
        projectTypes.some((t) => t.id === s.estimateType),
        s.slug,
      ).toBe(true);
  });
  it("has sane price bands (min < max, INR and USD)", () => {
    for (const t of projectTypes)
      for (const band of Object.values(t.bands))
        for (const b of Object.values(band)) if (b.max !== null) expect(b.min).toBeLessThan(b.max);
  });
  it("contains no template filler or unverified claims", () => {
    const text = JSON.stringify({ projects, services, industries }).toLowerCase();
    for (const bad of ["lorem", "sarah chen", "hipaa", "50+ projects", "99.9%", "captcha"])
      expect(text).not.toContain(bad);
  });
});

describe("testimonials", () => {
  it("have unique names and never name a client brand", () => {
    expect(new Set(testimonials.map((t) => t.name)).size).toBe(testimonials.length);
    const text = JSON.stringify(testimonials).toLowerCase();
    for (const bad of ["lorem", "sarah chen", "bidmaster", "http"]) expect(text).not.toContain(bad);
  });
});

describe("links and headers", () => {
  it("builds an encoded wa.me link", () => {
    expect(waLink("Hi & bye?")).toBe("https://wa.me/919203387375?text=Hi%20%26%20bye%3F");
  });
  it("keeps customHttp.yml in sync with scripts/security-headers.mjs", () => {
    const yml = readFileSync("customHttp.yml", "utf8");
    for (const [k, v] of Object.entries(securityHeaders)) {
      expect(yml).toContain(`'${k}'`);
      expect(yml).toContain(`'${v}'`);
    }
  });
});
