import { Button } from "../components/ui/Button";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  { title: "TechDesk | AI agents, software platforms and automation" },
  {
    name: "description",
    content:
      "TechDesk engineers AI agents, software platforms, intelligent automation and high-performance digital experiences for ambitious businesses. Indore, India, serving clients worldwide.",
  },
];

// ponytail: static hero only. The full cinematic homepage is Phase 4 (docs/briefs/homepage.md).
export default function Home() {
  return (
    <>
      <main
        id="main"
        className="container-page flex min-h-[calc(100dvh-4.5rem)] flex-col justify-center pb-[var(--section-y)]"
      >
        <h1 className="font-display text-display max-w-[14ch] uppercase">
          We engineer digital systems for what's next.
        </h1>
        <p className="mt-8 max-w-[60ch] text-body text-muted">
          AI agents, software platforms, intelligent automation and high-performance digital experiences engineered for
          ambitious businesses.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contact" size="lg" trailing="→">
            Start a project
          </Button>
          <Button href="#work" variant="secondary" size="lg" trailing="↓">
            Explore our work
          </Button>
        </div>
      </main>
    </>
  );
}
