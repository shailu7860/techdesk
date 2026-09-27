import { useEffect, useState } from "react";

// True once the app has hydrated. Prerendered HTML must match the first client render, so
// URL-dependent UI waits for hydration on the initial load only; client-side navigations
// (after the first hydration) can read the URL in their very first render: no remount, no flash.
let hydratedOnce = false;

export function useHydrated() {
  const [hydrated, setHydrated] = useState(hydratedOnce);
  useEffect(() => {
    hydratedOnce = true;
    setHydrated(true);
  }, []);
  return hydrated;
}
