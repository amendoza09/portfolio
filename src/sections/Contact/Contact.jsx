import ContactForm from "../../components/ContactForm/ContactForm";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import Reveal from "../../components/Reveal/Reveal";
import StaggerText from "../../components/StaggerText/StaggerText";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <Reveal as="p" className="eyebrow">
            [Contact]
          </Reveal>
          <StaggerText as="h2" className="contact-heading" text="Let's work together" />
          <Reveal as="a" href="mailto:mendoza.a01@outlook.com" className="contact-email" delay={100}>
            [mendoza.a01@outlook.com]
          </Reveal>
          <Reveal delay={160}>
            <SocialIcons />
          </Reveal>
        </div>

        <Reveal className="contact-form-wrap" delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
