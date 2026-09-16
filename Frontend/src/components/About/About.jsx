import React from "react";
import ScrollWords from "../ScrollWords/ScrollWords";
import "./About.css";

export default function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="section-label js-reveal">About Aswin</div>
      <div className="about__content">
        <h2 className="display-copy js-reveal" id="about-title">
          <ScrollWords lines={["Engineering discipline.", "Creative instinct."]} />
        </h2>
        <div className="about__body js-reveal">
          <p>
            I build cloud systems like adventure routes: clear map, strong guardrails,
            and enough resilience to handle every unexpected turn.
          </p>
          <p>
            My goal is simple: fast releases, stable platforms, and fewer midnight
            alarms. Teams can focus on creating, not firefighting.
          </p>
        </div>
      </div>
    </section>
  );
}
