import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./Cursor.css";

export default function Cursor() {
  const dotRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;

    const dot = dotRef.current;
    if (!dot) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let frame;

    const handleMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.classList.add("cursor-dot-visible");
    };

    const handleOver = (event) => {
      const interactive = event.target.closest("a, button, input, textarea");
      dot.classList.toggle("cursor-dot-active", Boolean(interactive));
    };

    const handleLeave = () => {
      dot.classList.remove("cursor-dot-visible");
    };

    const tick = () => {
      const ease = prefersReducedMotion ? 1 : 0.18;
      x += (mouseX - x) * ease;
      y += (mouseY - y) * ease;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return <div className="cursor-dot" ref={dotRef} aria-hidden="true" />;
}
