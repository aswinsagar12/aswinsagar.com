import React from "react";
import { capabilities } from "../../data/portfolio";
import ScrollWords from "../ScrollWords/ScrollWords";
import "./Capabilities.css";

export default function Capabilities() {
  return (
    <section className="capabilities section" id="capabilities" aria-labelledby="capabilities-title">
      <div className="capabilities__intro js-reveal">
        <div className="section-label">Four practices, one point of view</div>
        <h2 className="section-heading" id="capabilities-title"><ScrollWords lines={["What I bring to the frame."]} /></h2>
        <p>Systems thinking connects every discipline: observe clearly, remove noise, and make each decision count.</p>
      </div>
      <div className="capabilities__list">
        {capabilities.map((item, index) => (
          <article className="capability js-reveal" key={item.title} tabIndex="0">
            <div className="capability__index">0{index + 1}</div>
            <div>
              <p className="capability__label">{item.label}</p>
              <h3>{item.title}</h3>
              <p className="capability__description">{item.description}</p>
              <p className="capability__tools">{item.tools}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
