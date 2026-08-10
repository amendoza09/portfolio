import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";
import useScrollY from "./useScrollY";

export default function useParallax(speed = 0.15) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollY = useScrollY();

  useEffect(() => {
    if (prefersReducedMotion) {
      setOffset(0);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    setOffset((viewportCenter - elementCenter) * speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY, prefersReducedMotion, speed]);

  return { ref, offset };
}
