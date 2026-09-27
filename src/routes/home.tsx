import { useHomeMotion } from "../animations/home";
import { faqLd } from "../components/content/FaqList";
import { site } from "../data/company";
import { faqs } from "../data/faq";
import { seo } from "../lib/seo";
import { AgentTrace } from "../sections/home/AgentTrace";
import { CommitmentsBand } from "../sections/home/CommitmentsBand";
import { EstimateSection } from "../sections/home/EstimateSection";
import { Explore } from "../sections/home/Explore";
import { FaqSection } from "../sections/home/FaqSection";
import { FinalCTA } from "../sections/home/FinalCTA";
import { Hero } from "../sections/home/Hero";
import { HowWeWork } from "../sections/home/HowWeWork";
import { IndustriesSection } from "../sections/home/IndustriesSection";
import { ProcessSection } from "../sections/home/ProcessSection";
import { ServicesSection } from "../sections/home/ServicesSection";
import { TechMarquee } from "../sections/home/TechMarquee";
import { WorkSection } from "../sections/home/WorkSection";

const homeFaqs = faqs.slice(0, 7);

export const meta = () =>
  seo({
    title: "AI Agent & Software Development Company | TechDesk",
    description: site.description,
    path: "/",
    jsonLd: faqLd(homeFaqs),
  });

export default function Home() {
  const scope = useHomeMotion();
  return (
    <main id="main" ref={scope}>
      <Hero />
      <TechMarquee />
      <ServicesSection />
      <AgentTrace />
      <WorkSection />
      <ProcessSection />
      <IndustriesSection />
      <CommitmentsBand />
      <HowWeWork />
      <EstimateSection />
      <Explore />
      <FaqSection items={homeFaqs} />
      <FinalCTA />
    </main>
  );
}
