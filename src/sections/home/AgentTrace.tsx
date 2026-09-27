import { Button } from "../../components/ui/Button";
import { openChat } from "../../lib/chat-events";

// A real, concrete workflow (brief §5 section 3). Each step names what actually happens.
export const trace = [
  { step: "User", text: "A lead messages on WhatsApp at 11pm: “Do you build booking systems for clinics?”" },
  {
    step: "Agent",
    text: "The agent receives the message with the business's services, pricing bands and calendar access.",
  },
  {
    step: "Reason",
    text: "It classifies intent (new project, healthcare, booking) and decides what it still needs to know.",
  },
  { step: "Tools", text: "It asks two qualifying questions, then checks the team calendar for open slots." },
  { step: "Data", text: "Answers and contact details are written to the CRM as a qualified lead." },
  { step: "Action", text: "It books a discovery call and sends a confirmation with the meeting link." },
  { step: "Result", text: "The team wakes up to a qualified lead and a booked call, with no one awake at 11pm." },
];

export function AgentTrace() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-title"
      className="border-t border-hairline bg-panel/35 backdrop-blur-[2px] py-(--section-y)"
      data-agent-section
    >
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="ai-title" className="font-display text-display">
            Intelligence that acts.
          </h2>
          <p className="mt-6 max-w-[46ch] text-muted">
            Not a chatbot that talks. An agent that observes, reasons, uses your tools and gets work done, with a human
            in the loop where it matters.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button onClick={() => openChat("agent-section")} size="lg" trailing="→">
              Ask our agent
            </Button>
            <Button href="/services/ai-automation" variant="secondary" size="lg">
              AI & automation
            </Button>
          </div>
        </div>

        <ol className="relative border-l border-agent/40" data-trace>
          {trace.map((t, i) => (
            <li key={t.step} className="relative pb-10 pl-8 last:pb-0" data-trace-step>
              <span
                aria-hidden="true"
                className="absolute top-1 -left-[7px] flex size-[13px] items-center justify-center rounded-full border border-agent bg-void"
              >
                <span className="size-[5px] rounded-full bg-agent" data-trace-dot />
              </span>
              <p className="text-label font-medium text-agent">
                {String(i + 1).padStart(2, "0")} · {t.step}
              </p>
              <p className="mt-2 max-w-[52ch] text-body">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
