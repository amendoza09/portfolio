import { useState } from "react";
import { useSectionPager } from "../ScrollStage/SectionPagerContext";
import SectionLink from "../SectionLink/SectionLink";
import SocialIcons from "../SocialIcons/SocialIcons";
import "./Nav.css";

const NAV_ITEMS = [
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "personal", label: "personal" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeId } = useSectionPager();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner container">
        <SectionLink to="home" className="nav-logo" onClick={closeMenu}>
          [Toni Mendoza]
        </SectionLink>

        <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <SectionLink
              key={item.id}
              to={item.id}
              className={`nav-link ${activeId === item.id ? "nav-link-active" : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </SectionLink>
          ))}
        </nav>

        <div className="nav-right">
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "nav-toggle-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
