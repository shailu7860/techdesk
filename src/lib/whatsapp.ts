import { contact } from "../data/contact";

export const DEFAULT_WA_TEXT = "Hi TechDesk, I'd like to discuss a project.";

/** wa.me deep link. Text is context only (page / project / estimate), never personal data. */
export const waLink = (text: string = DEFAULT_WA_TEXT) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const telLink = () => `tel:${contact.phoneE164}`;
