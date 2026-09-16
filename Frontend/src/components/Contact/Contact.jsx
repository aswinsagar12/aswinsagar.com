import React from "react";
import { socialLinks } from "../../data/portfolio";
import ScrollWords from "../ScrollWords/ScrollWords";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="section-label js-reveal">Have a challenge in mind?</div>
      <h2 className="contact__title js-reveal" id="contact-title"><ScrollWords lines={["Don’t be shy.", "Say hi."]} /></h2>
      <a className="contact__email" href="mailto:aswinsagar12@gmail.com">
        <span className="contact__email-address">aswinsagar12@gmail.com</span>
        <span className="contact__email-arrow" aria-hidden="true">↗</span>
      </a>
      <div className="contact__footer">
        <p>Bengaluru, India · {new Date().getFullYear()}</p>
        <div className="contact__socials">
          {socialLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              <Icon aria-hidden="true" /> {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
