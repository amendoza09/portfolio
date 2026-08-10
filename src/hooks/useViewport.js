import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 640px)";

export default function useViewport() {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return { isMobile };
}
