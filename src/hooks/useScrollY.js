import { useEffect, useState } from "react";

const listeners = new Set();
let ticking = false;
let currentY = typeof window !== "undefined" ? window.scrollY : 0;

function handleScroll() {
  currentY = window.scrollY;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      listeners.forEach((fn) => fn(currentY));
      ticking = false;
    });
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("scroll", handleScroll, { passive: true });
}

export default function useScrollY() {
  const [y, setY] = useState(currentY);

  useEffect(() => {
    listeners.add(setY);
    return () => listeners.delete(setY);
  }, []);

  return y;
}
