import Reveal from "../../components/Reveal/Reveal";
import StaggerText from "../../components/StaggerText/StaggerText";
import "./Experience.css";

const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Capgemini",
    period: "Aug 2026 — Present",
    summary: "",
  },
  {
    role: "Freelance Software Engineer",
    org: "Self-Employed · Remote",
    period: "Aug 2025 — Present",
    summary:
      "Own the full project lifecycle for client engagements — scoping, API design, and deployment — building distributed REST APIs in Python (FastAPI) and PostgreSQL. Cut time-to-launch ~40% across 3 production deployments.",
  },
  {
    role: "Research Assistant, Privacy-Preserving ML",
    org: "University of Georgia · Athens, GA",
    period: "Aug 2024 — Dec 2024",
    summary:
      "Developed and validated mitigation strategies against deep leakage attacks on federated learning, improving model robustness by 22% across distributed ResNet architectures (PyTorch, TensorFlow).",
  },
  {
    role: "Cybersecurity Intern",
    org: "Zivaro · Denver, CO",
    period: "May 2024 — Aug 2024",
    summary:
      "Correlated events across network, authentication, and endpoint telemetry using optimized Splunk SPL queries, surfacing 15+ indicators of compromise per sprint.",
  },
  {
    role: "Web Development Intern",
    org: "KnowAthens · Athens, GA",
    period: "Feb 2023 — May 2023",
    summary:
      "Redesigned the frontend in React from Figma wireframes and shipped 4 measurable UX improvements through an agile, code-reviewed workflow.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          [Experience]
        </Reveal>
        <StaggerText as="h2" className="section-heading" text="Where I've worked" />

        <ul className="experience-list">
          {EXPERIENCE.map((item, index) => (
            <Reveal as="li" className="experience-item" key={item.role + index} delay={index * 60}>
              <span className="experience-period">{item.period}</span>
              <div className="experience-item-main">
                <div className="experience-item-heading">
                  <h3>{item.role}</h3>
                  <span className="experience-org">{item.org}</span>
                </div>
                <p>{item.summary}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
