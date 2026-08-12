import { useState } from "react";
import Reveal from "../../components/Reveal/Reveal";
import RippleTitle from "../../components/RippleTitle/RippleTitle";
import "./Work.css";

const PROJECTS = [
  {
    index: "01",
    name: "ShopNest",
    category: "Full-Stack · E-Commerce Platform",
    stat: "p95 < 200ms",
    description:
      "Multi-tenant e-commerce platform with role-scoped REST APIs, JWT auth, and Stripe checkout — serving 3 paying clients with p95 response times under 200ms.",
    link: "https://shopnest-ma8a.onrender.com/",
  },
  {
    index: "02",
    name: "Deep Leakage Attack",
    category: "Machine Learning Research · University of Georgia",
    stat: "+22% robustness",
    description:
      "Developed mitigation strategies against deep leakage attacks, improving federated model robustness by 22% across distributed ResNet architectures.",
    link: "https://github.com/amendoza09/gradient_inversion_attack",
  },
  {
    index: "03",
    name: "Splanner",
    category: "Full-Stack · Shared Household Calendar",
    stat: "Real-time sync",
    description:
      "Real-time shared calendar and chore tracker for households — React/Electron frontend, FastAPI backend, and Supabase Postgres with Socket.IO sync, built to run as a wall-mounted Raspberry Pi kiosk.",
    link: "https://splanner.net/",
  },
  {
    index: "04",
    name: "World Cup Prediction Model",
    category: "Machine Learning · Python",
    stat: "XGBoost model",
    description:
      "Python pipeline that pulls historical match data via the Kaggle API, engineers features, and trains an XGBoost model to simulate and predict World Cup match outcomes.",
    link: "https://github.com/amendoza09/worldcup-predictor",
  },
  {
    index: "05",
    name: "Pomodoro Technique Timer",
    category: "Frontend · React",
    stat: "25/5 focus cycle",
    description:
      "Single-page productivity timer built with React and Tailwind CSS, alternating 25-minute focus sessions with 5-minute breaks to structure deep work.",
    link: "https://www.thepomotechnique.com/",
  },
  {
    index: "06",
    name: "Floral Business Website",
    category: "Frontend · Freelance Client Site",
    stat: "React + Tailwind",
    description:
      "Custom website built for a floral business client — a React and Tailwind CSS frontend showcasing their catalog and brand.",
    link: "https://lauren-portfolio-7sqr.onrender.com/",
  },
];

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];

  return (
    <section id="work" className="section work">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          [Projects]
        </Reveal>
        <RippleTitle id="work" as="h2" className="section-heading" text="Things I've built" />

        <Reveal as="div" className="work-split">
          <ul className="work-list">
            {PROJECTS.map((project, i) => (
              <li
                key={project.index}
                className={`work-list-item ${i === activeIndex ? "work-list-item-active" : ""}`}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="work-list-link"
                  onClick={() => setActiveIndex(i)}
                >
                  <span className="work-list-index">[{project.index}]</span>
                  <span className="work-list-name">{project.name}</span>
                  <span className="work-list-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Preview panel — swap this text block for an <img> of the project once
              real screenshots/diagrams are ready. */}
          <div className="work-preview">
            <span className="work-preview-category">{activeProject.category}</span>
            <span className="work-preview-stat">{activeProject.stat}</span>
            <p className="work-preview-description">{activeProject.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
