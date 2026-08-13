import { useMemo } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./AmbientSquares.css";

const SQUARE_COUNT = 6;

const PASTEL_COLORS = [
  "#f7c6d9", // blush pink
  "#c9e4de", // mint
  "#c6d8f0", // powder blue
  "#f0e0c6", // butter
  "#dcd0f0", // lavender
  "#f5cdb0", // peach
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function AmbientSquares() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const squares = useMemo(() => {
    if (prefersReducedMotion) return [];

    return Array.from({ length: SQUARE_COUNT }, () => {
      const duration = randomBetween(6, 14);
      return {
        top: randomBetween(0, 100),
        left: randomBetween(0, 100),
        size: randomBetween(16, 60),
        duration,
        // Negative delay starts each square mid-cycle so they don't all
        // begin invisible-and-in-sync on first paint.
        delay: randomBetween(-duration, 0),
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      };
    });
  }, [prefersReducedMotion]);

  if (squares.length === 0) return null;

  return (
    <div className="ambient-squares" aria-hidden="true">
      {squares.map((square, i) => (
        <span
          key={i}
          className="ambient-square"
          style={{
            top: `${square.top}%`,
            left: `${square.left}%`,
            width: `${square.size}px`,
            height: `${square.size}px`,
            background: square.color,
            animationDuration: `${square.duration}s`,
            animationDelay: `${square.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
