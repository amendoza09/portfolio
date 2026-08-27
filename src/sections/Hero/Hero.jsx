import { useEffect, useRef, useState } from "react";
import DissolveText from "../../components/DissolveText/DissolveText";
import Reveal from "../../components/Reveal/Reveal";
import RippleTitle from "../../components/RippleTitle/RippleTitle";
import SectionLink from "../../components/SectionLink/SectionLink";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const toniRef = useRef(null);
  const mendozaRef = useRef(null);
  const [dissolve, setDissolve] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const rect = hero.getBoundingClientRect();
      // 0 while the hero is fully in view, ramping to 1 as it scrolls a full
      // viewport height out of frame — ties the dissolve directly to scroll
      // distance rather than playing as a fixed-duration animation.
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      setDissolve(progress);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const solidStyle = { opacity: Math.max(0, 1 - dissolve / 0.5) };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="container hero-inner">
        <div className="hero-title-row">
          <Reveal as="p" className="eyebrow">
            [Software Engineer]
          </Reveal>
          <div className="hero-name-dissolve" ref={toniRef}>
            <div className="hero-name-solid" style={solidStyle}>
              <RippleTitle id="hero-toni" as="h1" className="hero-name" text="Toni" baseDelay={80} />
            </div>
            <DissolveText text="Toni" containerRef={toniRef} progress={dissolve} className="hero-name-particles" />
          </div>
        </div>

        <div className="hero-name-dissolve" ref={mendozaRef}>
          <div className="hero-name-solid" style={solidStyle}>
            <RippleTitle id="hero-mendoza" as="h1" className="hero-name" text="Mendoza" baseDelay={160} />
          </div>
          <DissolveText text="Mendoza" containerRef={mendozaRef} progress={dissolve} className="hero-name-particles" />
        </div>

        <Reveal as="p" className="hero-slogan" delay={200}>
          Make it simple, but significant.
        </Reveal>
      </div>

      <SectionLink to="work" className="hero-scroll" aria-label="Scroll to work section">
        <span>Scroll</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </SectionLink>
    </section>
  );
}
