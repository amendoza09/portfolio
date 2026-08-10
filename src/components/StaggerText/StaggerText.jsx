import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./StaggerText.css";

export default function StaggerText({
  as: Tag = "span",
  text,
  className = "",
  staggerMs = 45,
  baseDelay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`stagger-text ${className}`.trim()} {...rest}>
      {words.map((word, i) => (
        <span className="stagger-text-mask" key={`${word}-${i}`}>
          <span
            className={`stagger-text-word ${visible ? "stagger-text-word-visible" : ""}`}
            style={{ transitionDelay: visible ? `${baseDelay + i * staggerMs}ms` : "0ms" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
