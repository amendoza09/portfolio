// Plain-JS shared store (deliberately outside React state) so particles can
// be pushed from anywhere (e.g. Hero's dissolve effect) and animated by
// FloatingParticles' own requestAnimationFrame loop without triggering a
// React re-render on every frame.
const MAX_POOL = 600;

export const pool = [];

export function releaseParticle({ pageX, pageY, r, color }) {
  if (pool.length >= MAX_POOL) pool.shift();

  pool.push({
    pageX,
    pageY,
    r,
    color,
    vx: (Math.random() - 0.5) * 0.012,
    vy: -(0.02 + Math.random() * 0.035),
    bornAt: performance.now(),
    life: 9000 + Math.random() * 6000,
  });
}
