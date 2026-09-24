import { LegalPage } from "../components/layout/LegalPage";
import { contact } from "../data/contact";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Terms of use | TechDesk",
    description: "Terms for using the TechDesk website, estimates and chat assistant.",
    path: "/terms",
  });

export default function Terms() {
  return (
    <LegalPage label="Legal / terms" title="Terms of use" updated="24 September 2026">
      <h2>About this website</h2>
      <p>
        This website describes TechDesk's services and past work. Using it does not create a client relationship; that
        only starts with a written proposal or agreement signed by both sides.
      </p>

      <h2>Estimates are indicative</h2>
      <p>
        Ranges from the estimate tool, the chat assistant or this site are indicative only and are not quotes or offers.
        A binding price is given only in a written proposal after we understand your scope.
      </p>

      <h2>Chat assistant</h2>
      <p>
        The assistant is automated and can be wrong. It answers from the information on this site; for anything that
        matters, confirm with us directly. Do not share passwords, payment details or sensitive personal data in chat.
      </p>

      <h2>Our content</h2>
      <p>
        Text, design and code on this site belong to TechDesk unless stated otherwise. Project names and trademarks
        belong to their owners and are shown with permission as examples of our work.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not attempt to disrupt the site, abuse the contact form or assistant, or access systems you are not
        authorised to use.
      </p>

      <h2>Liability</h2>
      <p>
        The site is provided as is. To the extent the law allows, TechDesk is not liable for losses arising from use of
        this website or reliance on indicative estimates.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, with courts in Indore, Madhya Pradesh having jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Questions: {contact.email} · {contact.phoneDisplay}
      </p>
    </LegalPage>
  );
}
