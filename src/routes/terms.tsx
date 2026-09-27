import { LegalPage } from "../components/layout/LegalPage";
import { contact } from "../data/contact";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({
    title: "Terms of use for the TechDesk website",
    description:
      "Terms for using the TechDesk website: indicative estimates, our content and acceptable use. Governed by Indian law.",
    path: "/terms",
  });

export default function Terms() {
  return (
    <LegalPage title="Terms of use" updated="24 September 2026">
      <h2>About this website</h2>
      <p>
        This website describes TechDesk's services and past work. Using it does not create a client relationship; that
        only starts with a written proposal or agreement signed by both sides.
      </p>

      <h2>Estimates are indicative</h2>
      <p>
        Ranges from the estimate tool or this site are indicative only and are not quotes or offers. A binding price is
        given only in a written proposal after we understand your scope.
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
