import "./Footer.css";
import { IoIosArrowRoundUp } from "react-icons/io";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {YEAR} Antonio Mendoza. All rights reserved.</p>
        <a href="#home" className="footer-top">
          Back to top
          <IoIosArrowRoundUp className="footer-arrow-up"/>
        </a>
      </div>
    </footer>
  );
}
