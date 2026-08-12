import "./Footer.css";
import { IoIosArrowRoundUp } from "react-icons/io";
import SectionLink from "../SectionLink/SectionLink";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {YEAR} Antonio Mendoza. All rights reserved.</p>
        <SectionLink to="home" className="footer-top">
          Back to top
          <IoIosArrowRoundUp className="footer-arrow-up" />
        </SectionLink>
      </div>
    </footer>
  );
}
