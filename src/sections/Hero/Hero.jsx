import Reveal from "../../components/Reveal/Reveal";
import RippleTitle from "../../components/RippleTitle/RippleTitle";
import SectionLink from "../../components/SectionLink/SectionLink";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-title-row">
          <Reveal as="p" className="eyebrow">
            [Software Engineer]
          </Reveal>
          <RippleTitle id="hero-toni" as="h1" className="hero-name" text="Toni" baseDelay={80} />
        </div>

        <RippleTitle id="hero-mendoza" as="h1" className="hero-name" text="Mendoza" baseDelay={160} />

        <Reveal as="p" className="hero-slogan" delay={200}>
          Make it simple, but significant.
        </Reveal>
      </div>

      <SectionLink to="work" className="hero-scroll" aria-label="Scroll to work section">
        <span className="hero-scroll-line" aria-hidden="true" />
      </SectionLink>
    </section>
  );
}
