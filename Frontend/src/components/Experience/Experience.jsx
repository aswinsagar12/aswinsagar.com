import React from "react";
import { experience } from "../../data/portfolio";
import ScrollWords from "../ScrollWords/ScrollWords";
import "./Experience.css";

export default function Experience() {
  const timeline = [...experience].reverse();

  return (
    <section className="experience" id="experience" aria-labelledby="experience-title">
      <div className="experience__viewport">
        <div className="experience__track">
          <div className="experience__header experience__panel js-reveal">
            <div className="section-label">Experience timeline</div>
            <h2 className="section-heading" id="experience-title"><ScrollWords lines={["Built in production."]} /></h2>
            <p>Scroll down to move through the work from first build to production reliability.</p>
          </div>
          {timeline.map((item, index) => (
            <article className="experience-card js-reveal" key={`${item.company}-${item.role}`} tabIndex="0">
              <div className="experience-card__marker" aria-hidden="true"><span /></div>
              <div className="experience-card__meta">
                <p>{item.period}</p>
                <span>0{index + 1}</span>
              </div>
              <div className="experience-card__body">
                <p className="experience-card__company">{item.company}</p>
                <h3>{item.role}</h3>
                <p className="experience-card__summary">{item.summary}</p>
                <ul className="experience-card__skills" aria-label={`${item.role} skills`}>
                  {item.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
