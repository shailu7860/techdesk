import { useHomeMotion } from "../animations/home";
import { site } from "../data/company";
import { organizationLd, seo } from "../lib/seo";
import { AgentTrace } from "../sections/home/AgentTrace";
import { CommitmentsBand } from "../sections/home/CommitmentsBand";
import { EstimateSection } from "../sections/home/EstimateSection";
import { FinalCTA } from "../sections/home/FinalCTA";
import { Hero } from "../sections/home/Hero";
import { IndustriesSection } from "../sections/home/IndustriesSection";
import { ProcessSection } from "../sections/home/ProcessSection";
import { ServicesSection } from "../sections/home/ServicesSection";
import { WorkSection } from "../sections/home/WorkSection";

export const meta = () =>
  seo({
    title: "TechDesk | AI agents, software platforms and automation",
    description: site.description,
    path: "/",
    jsonLd: organizationLd,
  });

export default function Home() {
  const scope = useHomeMotion();
  return (
    <main id="main" ref={scope}>
      <Hero />
      <ServicesSection />
      <AgentTrace />
      <WorkSection />
      <ProcessSection />
      <IndustriesSection />
      <CommitmentsBand />
      <EstimateSection />
      <FinalCTA />
    </main>
  );
}
