import { LegalPage } from "../components/layout/LegalPage";
import { contact } from "../data/contact";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Privacy policy | TechDesk",
    description: "What TechDesk collects through this website, why, who processes it, and how to have it deleted.",
    path: "/privacy",
  });

export default function Privacy() {
  return (
    <LegalPage label="Legal" title="Privacy policy" updated="24 September 2026">
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong className="text-ink">Project brief:</strong> the name, company, email, phone number and project
          details you type into the contact form.
        </li>
        <li>
          <strong className="text-ink">Chat assistant:</strong> the messages you send to the assistant on this site.
        </li>
        <li>
          <strong className="text-ink">Technical logs:</strong> our hosting provider keeps standard request logs (IP
          address, browser, time) to operate and protect the site.
        </li>
      </ul>
      <p>We do not use advertising trackers, and we do not sell or share your data for marketing.</p>

      <h2>Why we use it</h2>
      <p>
        Only to reply to you, prepare an estimate or proposal, and keep the site secure. We keep project enquiries for
        as long as we are discussing or delivering work with you, and delete them on request.
      </p>

      <h2>Who processes it</h2>
      <ul>
        <li>Amazon Web Services (AWS Amplify and Lambda): hosting and the chat assistant's server.</li>
        <li>Web3Forms: delivers the project brief to our email inbox.</li>
        <li>
          Groq and Anthropic: generate the chat assistant's replies. Your chat messages are sent to them for that
          purpose only. Please do not share sensitive personal data in chat.
        </li>
        <li>WhatsApp (Meta) and your phone carrier: if you choose to message or call us.</li>
      </ul>

      <h2 id="cookies">Cookies</h2>
      <p>
        This site sets no cookies. It stores one preference in your browser (your chosen currency for estimates), which
        never leaves your device. If we add analytics, it will be a cookieless, privacy-friendly tool, and this page
        will say so.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us what we hold about you, to correct it, or to delete it. Email{" "}
        <a href={`mailto:${contact.email}`} className="text-signal underline underline-offset-4">
          {contact.email}
        </a>{" "}
        and we will respond within 30 days.
      </p>

      <h2>Contact</h2>
      <p>
        TechDesk, {contact.city}. Email {contact.email} or call {contact.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
