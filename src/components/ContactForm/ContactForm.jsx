import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const IS_CONFIGURED = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const formRef = useRef(null);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    fields.name.trim().length > 0 &&
    EMAIL_PATTERN.test(fields.email.trim()) &&
    fields.message.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid || !IS_CONFIGURED) return;

    setStatus("sending");
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      .then(() => {
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("error"));
  };

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      
      <label className="contact-form-field">
        <span>Name</span>
        <input type="text" name="name" required value={fields.name} onChange={handleChange} autoComplete="name" />
      </label>
      <label className="contact-form-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          required
          value={fields.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </label>
      <label className="contact-form-field">
        <span>Message</span>
        <textarea name="message" required rows={4} value={fields.message} onChange={handleChange} />
      </label>
      <button type="submit" disabled={!isValid || !IS_CONFIGURED || status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="contact-form-status" role="status" aria-live="polite">
        {status === "success" && "Message sent — thank you!"}
        {status === "error" && "Something went wrong. Please try again."}
      </p>
    </form>
  );
}
