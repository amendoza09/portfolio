import { useCallback, useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import SectionPagerContext from "./SectionPagerContext";

const TRANSITION_MS = 850;
const WHEEL_NOISE_THRESHOLD = 4;
const TOUCH_THRESHOLD = 60;
const BOUNDARY_PX = 1;

export default function SectionPagerProvider({ sections, children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const slideRefs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const goTo = useCallback(
    (nextIndex) => {
      const clamped = Math.max(0, Math.min(sections.length - 1, nextIndex));
      if (clamped === activeIndexRef.current || isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
      window.history.replaceState(null, "", `#${sections[clamped].id}`);

      window.setTimeout(
        () => {
          isAnimatingRef.current = false;
        },
        prefersReducedMotion ? 50 : TRANSITION_MS + 80
      );
    },
    [sections, prefersReducedMotion]
  );

  const goToId = useCallback(
    (id) => {
      const index = sections.findIndex((section) => section.id === id);
      if (index !== -1) goTo(index);
    },
    [sections, goTo]
  );

  // Land on the section named in the URL hash, if any.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const index = sections.findIndex((section) => section.id === hash);
    if (index !== -1) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock native page scrolling — the stage drives everything.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("scroll-stage-active");
    return () => html.classList.remove("scroll-stage-active");
  }, []);

  // Wheel: page to the next/previous section once the active slide's own
  // internal scroll has hit the top/bottom edge in that direction.
  useEffect(() => {
    const handleWheel = (event) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) < WHEEL_NOISE_THRESHOLD) return;

      const activeSlide = slideRefs.current[activeIndexRef.current];
      if (!activeSlide) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const atTop = activeSlide.scrollTop <= BOUNDARY_PX;
      const atBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - BOUNDARY_PX;

      if (direction > 0 && !atBottom) return;
      if (direction < 0 && !atTop) return;

      event.preventDefault();
      goTo(activeIndexRef.current + direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goTo]);

  // Touch: same boundary logic, snapshotted at touchstart.
  useEffect(() => {
    let startY = null;
    let startedAtTop = false;
    let startedAtBottom = false;
    let fired = false;

    const handleTouchStart = (event) => {
      if (isAnimatingRef.current) return;
      startY = event.touches[0].clientY;
      fired = false;

      const activeSlide = slideRefs.current[activeIndexRef.current];
      if (activeSlide) {
        startedAtTop = activeSlide.scrollTop <= BOUNDARY_PX;
        startedAtBottom = activeSlide.scrollTop + activeSlide.clientHeight >= activeSlide.scrollHeight - BOUNDARY_PX;
      }
    };

    const handleTouchMove = (event) => {
      if (startY === null || fired || isAnimatingRef.current) return;

      const deltaY = startY - event.touches[0].clientY;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      const direction = deltaY > 0 ? 1 : -1;
      if (direction > 0 && !startedAtBottom) return;
      if (direction < 0 && !startedAtTop) return;

      fired = true;
      event.preventDefault();
      goTo(activeIndexRef.current + direction);
    };

    const handleTouchEnd = () => {
      startY = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goTo]);

  // Keyboard: explicit paging shortcuts, skipped while typing in a field.
  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (isAnimatingRef.current) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goTo(activeIndexRef.current + 1);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goTo(activeIndexRef.current - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo]);

  return (
    <SectionPagerContext.Provider
      value={{
        sections,
        activeIndex,
        activeId: sections[activeIndex]?.id ?? null,
        slideRefs,
        goToId,
      }}
    >
      {children}
    </SectionPagerContext.Provider>
  );
}
