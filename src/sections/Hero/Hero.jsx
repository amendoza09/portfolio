import Reveal from "../../components/Reveal/Reveal";
import StaggerText from "../../components/StaggerText/StaggerText";
import useParallax from "../../hooks/useParallax";
import "./Hero.css";

export default function Hero() {
  const { ref: markRef, offset: markOffset } = useParallax(0.12);

  return (
    <section id="home" className="hero">
      <div
        className="hero-mark"
        ref={markRef}
        style={{ transform: `translateY(${markOffset}px)` }}
        aria-hidden="true"
      />
      <div className="container hero-inner">
        <Reveal as="p" className="eyebrow">
          [Software Engineer]
        </Reveal>
        <StaggerText as="h1" className="hero-name" text="Toni Mendoza" baseDelay={80} />

        <Reveal as="p" className="hero-intro" delay={200}>
          I build distributed backend systems and full-stack products — from
          scoping and API design through deployment. Recent work spans freelance
          client platforms, privacy-preserving ML research, and security tooling.
        </Reveal>
        <Reveal as="div" className="hero-actions" delay={260}>
          <a href="#work" className="button button-primary">
            View work
          </a>
          <a href="#contact" className="button button-ghost">
            Get in touch
          </a>
        </Reveal>
      </div>

      <a href="#work" className="hero-scroll" aria-label="Scroll to work section">
        <span>Scroll</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
