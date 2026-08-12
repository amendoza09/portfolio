import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./StaggerText.css";

export default function StaggerText({
  as: Tag = "span",
  text,
  className = "",
  staggerMs = 120,
  baseDelay = 0,
  ...rest
}) {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [visible, setVisible] = useState(false);
  const [lineByWord, setLineByWord] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const words = text.split(" ");

  // Group words by rendered line (wrapping depends on runtime layout), so
  // words sharing a line get the same reveal delay and read as one bar.
  useEffect(() => {
    const measure = () => {
      const tops = [];
      const grouped = wordRefs.current.map((node) => {
        if (!node) return 0;
        const top = node.getBoundingClientRect().top;
        let lineIndex = tops.findIndex((t) => Math.abs(t - top) < 2);
        if (lineIndex === -1) {
          tops.push(top);
          lineIndex = tops.length - 1;
        }
        return lineIndex;
      });
      setLineByWord(grouped);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text]);

  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const node = containerRef.current;
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

  return (
    <Tag ref={containerRef} className={`stagger-text ${className}`.trim()} {...rest}>
      {words.map((word, i) => {
        const lineIndex = lineByWord ? lineByWord[i] : 0;

        return (
          <span className="stagger-text-mask" key={`${word}-${i}`}>
            <span
              className="stagger-text-word"
              ref={(node) => {
                wordRefs.current[i] = node;
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
            <span
              className={`stagger-text-bar ${visible ? "stagger-text-bar-open" : ""}`}
              style={{ transitionDelay: visible ? `${baseDelay + lineIndex * staggerMs}ms` : "0ms" }}
              aria-hidden="true"
            />
          </span>
        );
      })}
    </Tag>
  );
}
