import Reveal from "../../components/Reveal/Reveal";
import StaggerText from "../../components/StaggerText/StaggerText";
import useParallax from "../../hooks/useParallax";
import "./Work.css";

const PROJECTS = [
  {
    index: "01",
    name: "ShopNest",
    category: "Full-Stack · E-Commerce Platform",
    description:
      "Multi-tenant e-commerce platform with role-scoped REST APIs, JWT auth, and Stripe checkout — serving 3 paying clients with p95 response times under 200ms.",
    link: "https://shopnest-ma8a.onrender.com/",
  },
  {
    index: "02",
    name: "Deep Leakage Attack",
    category: "Machine Learning Research · University of Georgia",
    description:
      "Developed mitigation strategies against deep leakage attacks, improving federated model robustness by 22% across distributed ResNet architectures.",
    link: "https://github.com/amendoza09/gradient_inversion_attack",
  },
  {
    index: "03",
    name: "Splanner",
    category: "Full-Stack · Shared Household Calendar",
    description:
      "Real-time shared calendar and chore tracker for households — React/Electron frontend, FastAPI backend, and Supabase Postgres with Socket.IO sync, built to run as a wall-mounted Raspberry Pi kiosk.",
    link: "https://splanner.net/",
  },
  {
    index: "04",
    name: "World Cup Prediction Model",
    category: "Machine Learning · Python",
    description:
      "Python pipeline that pulls historical match data via the Kaggle API, engineers features, and trains an XGBoost model to simulate and predict World Cup match outcomes.",
    link: "https://github.com/amendoza09/worldcup-predictor",
  },
];

function WorkCard({ project, delay }) {
  const { ref, offset } = useParallax(0.08);

  return (
    <Reveal as="a" href={project.link} className="work-card" delay={delay}>
      <div className="work-card-media" aria-hidden="true">
        <span className="work-card-index" ref={ref} style={{ transform: `translateY(${offset}px)` }}>
          {project.index}
        </span>
      </div>
      <div className="work-card-body">
        <div className="work-card-heading">
          <h3>{project.name}</h3>
          <span className="work-card-arrow" aria-hidden="true">
            →
          </span>
        </div>
        <p className="work-card-category">{project.category}</p>
        <p className="work-card-description">{project.description}</p>
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          [Projects]
        </Reveal>
        <StaggerText as="h2" className="section-heading" text="Things I've built" />

        <div className="work-grid">
          {PROJECTS.map((project, i) => (
            <WorkCard project={project} delay={i * 60} key={project.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
