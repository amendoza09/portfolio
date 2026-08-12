import { useEffect, useRef } from "react";
import StaggerText from "../StaggerText/StaggerText";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./RippleTitle.css";

export default function RippleTitle({
  id,
  as = "h2",
  className = "",
  text,
  baseDelay = 0,
  idleScale = 20,
  loadScale = 65,
  loadDelay = 700,
}) {
  const displacementRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const filterId = `ripple-${id}`;

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const displacement = displacementRef.current;
    if (!displacement) return undefined;

    let currentScale = 0;
    let targetScale = idleScale;
    let frame;

    const tick = () => {
      currentScale += (targetScale - currentScale) * 0.05;
      targetScale = Math.max(targetScale * 0.9, idleScale);
      displacement.setAttribute("scale", currentScale.toFixed(2));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const loadRipple = setTimeout(() => {
      targetScale = loadScale;
    }, loadDelay);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(loadRipple);
    };
  }, [prefersReducedMotion, idleScale, loadScale, loadDelay]);

  return (
    <>
      <svg className="ripple-title-defs" aria-hidden="true">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="2" seed="7" result="turbulence">
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.01 0.04;0.015 0.03;0.01 0.04"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="turbulence"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <StaggerText as={as} className={className} text={text} baseDelay={baseDelay} style={{ filter: `url(#${filterId})` }} />
    </>
  );
}
