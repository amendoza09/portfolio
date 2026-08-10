import { useState } from "react";
import useScrollSpy from "../../hooks/useScrollSpy";
import SocialIcons from "../SocialIcons/SocialIcons";
import "./Nav.css";

const NAV_ITEMS = [
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "personal", label: "personal" },
  { id: "contact", label: "contact" },
];

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(NAV_IDS);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner container">
        <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeId === item.id ? "nav-link-active" : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <div className="nav-socials">
            <SocialIcons />
          </div>

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
