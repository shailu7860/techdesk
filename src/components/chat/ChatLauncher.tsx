import { lazy, Suspense, useEffect, useState } from "react";
import { CHAT_EVENT } from "../../lib/chat-events";

// The panel (and its code) loads only when someone opens chat (PE-03).
const ChatPanel = lazy(() => import("./ChatPanel"));

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const onOpen = () => {
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener(CHAT_EVENT, onOpen);
    return () => window.removeEventListener(CHAT_EVENT, onOpen);
  }, []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <ChatPanel open={open} onClose={() => setOpen(false)} />
    </Suspense>
  );
}
