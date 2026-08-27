import { useEffect, useState } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import SectionPagerContext from "./SectionPagerContext";

export default function SectionPagerProvider({ sections, children }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goToId = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  // Land on the section named in the URL hash, if any.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (sections.some((section) => section.id === hash)) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Highlight whichever section is currently in view as the user scrolls.
  useEffect(() => {
    const elements = sections.map((section) => document.getElementById(section.id)).filter(Boolean);
    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveId(topMost.target.id);
        window.history.replaceState(null, "", `#${topMost.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <SectionPagerContext.Provider value={{ sections, activeId, goToId }}>{children}</SectionPagerContext.Provider>
  );
}
