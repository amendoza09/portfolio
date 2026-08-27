import { FaEnvelope } from "react-icons/fa";
import "./SocialIcons.css";

export default function SocialIcons() {
  return (
    <div className="social-icons">
      <a
        href="https://linkedin.com/in/antonio-mendoza01"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
        aria-label="LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" />
        </svg>
      </a>
      <a
        href="https://github.com/amendoza09"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
        aria-label="GitHub"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.34 9.34 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" />
        </svg>
      </a>
      <a href="mailto:mendoza.a01@outlook.com" className="social-icon" aria-label="Email">
        <FaEnvelope aria-hidden="true" />
      </a>
    </div>
  );
}
