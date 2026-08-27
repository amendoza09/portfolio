import { useEffect, useRef } from "react";
import { releaseParticle } from "../FloatingParticles/particlePool";

const STEP = 6;
const ALPHA_THRESHOLD = 120;

// Renders `text` onto an offscreen canvas to sample which pixels the glyphs
// actually cover, then turns those into a field of small circles that this
// component draws drifting upward and fading out as `progress` (0..1) rises.
// `containerRef` must point to a position:relative element whose only
// in-flow content is the live heading text — its rendered box is what gets
// sampled and is what this canvas is absolutely positioned to cover.
export default function DissolveText({ text, containerRef, progress, className }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const build = () => {
      const target = container.querySelector("h1") || container;
      const rect = target.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const sample = document.createElement("canvas");
      sample.width = width;
      sample.height = height;
      const sctx = sample.getContext("2d");

      const style = getComputedStyle(target);
      sctx.fillStyle = "#000";
      sctx.textBaseline = "alphabetic";
      sctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      if ("letterSpacing" in sctx) sctx.letterSpacing = style.letterSpacing;

      // Measure actual glyph ink (not just the font's nominal line metrics)
      // and center it in the sampled box — this is what the browser does
      // when laying out the real heading, so it keeps the two in sync
      // regardless of this particular font's ascent/descent ratios.
      const metrics = sctx.measureText(text);
      const inkAscent = metrics.actualBoundingBoxAscent ?? height * 0.7;
      const inkDescent = metrics.actualBoundingBoxDescent ?? height * 0.1;
      const inkHeight = inkAscent + inkDescent;
      const baseline = (height - inkHeight) / 2 + inkAscent;
      sctx.fillText(text, 0, baseline);
      sctx.lineWidth = 6;
      sctx.strokeStyle = "#000";
      sctx.strokeText(text, 0, baseline);

      const { data } = sctx.getImageData(0, 0, width, height);
      const particles = [];
      for (let y = 0; y < height; y += STEP) {
        for (let x = 0; x < width; x += STEP) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > ALPHA_THRESHOLD) {
            particles.push({
              x,
              y,
              r: 1.2 + Math.random() * 1.6,
              driftX: (Math.random() - 0.5) * 90,
              driftY: -(70 + Math.random() * 160),
              delay: Math.random() * 0.4,
            });
          }
        }
      }
      particlesRef.current = particles;
    };

    build();
    document.fonts?.ready.then(build);
    window.addEventListener("resize", build);
    return () => window.removeEventListener("resize", build);
  }, [text, containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    if (progress <= 0) return;

    const color = getComputedStyle(document.documentElement).getPropertyValue("--color-text").trim() || "#000";

    // Page-absolute origin of this word right now, so particles handed off
    // to the global floating layer keep their position across further
    // scrolling (that layer tracks page coordinates, not local ones).
    const target = container.querySelector("h1") || container;
    const rect = target.getBoundingClientRect();
    const pageOriginX = rect.left;
    const pageOriginY = rect.top + window.scrollY;

    particlesRef.current.forEach((p) => {
      // Before its delay is reached, a particle sits fully opaque at its
      // original position — it only starts drifting/fading afterward — so
      // there's no gap between the solid text fading and circles taking over.
      const local = Math.min(Math.max((progress - p.delay) / (1 - p.delay), 0), 1);
      const eased = 1 - Math.pow(1 - local, 2);
      const alpha = 1 - eased;

      // Hand a particle off to the page-wide floating layer once it's mostly
      // peeled away, rather than waiting for `local` to hit 1 — every
      // particle's `local` reaches 1 at the same final `progress` regardless
      // of delay, so gating on that would release the whole field in one
      // simultaneous burst instead of staggering it across the scroll range.
      if (eased >= 0.6 && !p.released) {
        p.released = true;
        releaseParticle({
          pageX: pageOriginX + p.x + p.driftX * eased,
          pageY: pageOriginY + p.y + p.driftY * eased,
          r: p.r,
          color,
        });
      }

      if (alpha <= 0.02) return;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.arc(p.x + p.driftX * eased, p.y + p.driftY * eased, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }, [progress, containerRef]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
