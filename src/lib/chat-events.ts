// Decouples "open the chat" buttons from the lazily-loaded chat panel.
export const CHAT_EVENT = "techdesk:open-chat";
export const openChat = (source: string) => window.dispatchEvent(new CustomEvent(CHAT_EVENT, { detail: { source } }));
