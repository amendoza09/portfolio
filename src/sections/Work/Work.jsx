import { useState } from "react";
import Reveal from "../../components/Reveal/Reveal";
import RippleTitle from "../../components/RippleTitle/RippleTitle";
import "./Work.css";

const PROJECTS = [
  {
    index: "01",
    name: "ShopNest",
    category: "Full-Stack · E-Commerce Platform",
    stat: "React + Node.js + Stripe",
    description:
      "A business dashboard where small-business owners manage products, orders, and customer emails from one workspace, with Stripe checkout built in. Built with React, Express, and Supabase.",
    link: "https://shopnest-ma8a.onrender.com/",
  },
  {
    index: "02",
    name: "Deep Leakage Attack",
    category: "Machine Learning Research · University of Georgia",
    stat: "Python + CNN's",
    description:
      "Federated learning research at UGA: designed mitigation strategies against deep leakage attacks and pushed model robustness up 22% across distributed ResNet setups.",
    link: "https://github.com/amendoza09/gradient_inversion_attack",
  },
  {
    index: "03",
    name: "Splanner",
    category: "Full-Stack · Shared Household Calendar",
    stat: "Real-time sync",
    description:
      "A shared household calendar that actually syncs in real time — React/Electron on the front end, FastAPI and Supabase Postgres behind it, Socket.IO tying it together, running as a wall-mounted kiosk on a Raspberry Pi.",
    link: "https://splanner.net/",
  },
  {
    index: "04",
    name: "World Cup Prediction Model",
    category: "Machine Learning · Python",
    stat: "XGBoost model",
    description:
      "Pulls historical match data straight from the Kaggle API, engineers its own features, and trains an XGBoost model to simulate World Cup outcomes before a ball is kicked.",
    link: "https://github.com/amendoza09/worldcup-predictor",
  },
  {
    index: "05",
    name: "Pomodoro Technique Timer",
    category: "Frontend · React",
    stat: "25/5 focus cycle",
    description:
      "A focus timer that splits work into 25-minute sessions with 5-minute breaks, following the Pomodoro Technique. Built with React and Tailwind CSS.",
    link: "https://www.thepomotechnique.com/",
  },
  {
    index: "06",
    name: "Floral Business Website",
    category: "Frontend · Freelance Client Site",
    stat: "React + Tailwind",
    description:
      "Freelance build for a floral business client — a React and Tailwind CSS site that puts their catalog and brand front and center.",
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
