import { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { pool } from "./particlePool";
import "./FloatingParticles.css";

// Fixed, full-viewport, click-through canvas that renders whatever's
// currently in the shared particle pool — dust released by Hero's dissolve
// effect drifts upward on its own clock from here, visible over every
// section, independent of scroll position. This is the site's ambient
// background layer.
export default function FloatingParticles() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = pool.length - 1; i >= 0; i -= 1) {
        const p = pool[i];
        const elapsed = now - p.bornAt;
        const t = elapsed / p.life;
        const x = p.pageX + p.vx * elapsed;
        const y = p.pageY + p.vy * elapsed - scrollY;

        // Recycle rather than remove: once a particle finishes its life or
        // drifts off the top of the screen, respawn it rising from just
        // below the viewport. This is the site's only ambient background
        // now, so it needs to sustain itself indefinitely once released
        // instead of thinning out the longer the page stays open.
        if (t >= 1 || y < -40) {
          p.pageX = Math.random() * window.innerWidth;
          p.pageY = scrollY + window.innerHeight + 20 + Math.random() * 80;
          p.vx = (Math.random() - 0.5) * 0.012;
          p.vy = -(0.02 + Math.random() * 0.035);
          p.bornAt = now;
          p.life = 9000 + Math.random() * 6000;
          continue;
        }

        // Fade in quickly, hold, then fade out over the tail of its life.
        const opacity = t < 0.08 ? t / 0.08 : Math.max(0, 1 - (t - 0.4) / 0.6);
        if (opacity <= 0.01) continue;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(draw);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <canvas ref={canvasRef} className="floating-particles" aria-hidden="true" />;
}
