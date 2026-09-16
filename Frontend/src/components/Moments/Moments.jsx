import React from "react";
import { gallery } from "../../data/portfolio";
import ScrollWords from "../ScrollWords/ScrollWords";
import "./Moments.css";

export default function Moments() {
  return (
    <section className="moments section" id="moments" aria-labelledby="moments-title">
      <div className="moments__header js-reveal">
        <div className="section-label">Away from the terminal</div>
        <h2 className="section-heading" id="moments-title"><ScrollWords lines={["Motion, people, places."]} /></h2>
      </div>
      <div className="moments__grid">
        {gallery.map((image, index) => (
          <figure className={`moment moment--${image.tone} js-reveal`} key={image.src}>
            <img src={image.src} alt={image.alt} width="1100" height="1350" loading="lazy" />
            <figcaption>{String(index + 1).padStart(2, "0")} / {image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
