import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import ScrollWords from "../ScrollWords/ScrollWords";
import "./Testimonials.css";

export default function Testimonials() {
  const [state, setState] = useState({ status: "loading", testimonials: [] });

  useEffect(() => {
    let active = true;
    const query = '*[_type == "testimonials"] | order(_createdAt desc){_id, name, company, feedback, imgurl}';

    client.fetch(query)
      .then((testimonials) => {
        if (active) setState({ status: "ready", testimonials: testimonials || [] });
      })
      .catch(() => {
        if (active) setState({ status: "error", testimonials: [] });
      });

    return () => { active = false; };
  }, []);

  const testimonials = state.testimonials.length > 0 ? state.testimonials : [null];

  return (
    <section className="testimonials section" aria-labelledby="testimonials-title">
      <div className="section-label js-reveal">Testimonials</div>
      <div className="testimonials__content js-reveal">
        <h2 className="section-heading" id="testimonials-title"><ScrollWords lines={["Built with people in mind."]} /></h2>
        <div className="testimonials__grid">
          {testimonials.map((testimonial) => {
            const isPreview = !testimonial;
            return (
              <article className={`testimonial-card${isPreview ? " testimonial-card--preview" : ""}`} key={testimonial?._id || "preview"} tabIndex="0">
                <p className="testimonial-card__label">{isPreview ? "Testimonial preview" : "From a collaborator"}</p>
                <blockquote>
                  {testimonial?.feedback || "An approved collaborator quote will appear here—clear, candid, and earned through the work."}
                </blockquote>
                <footer>
                  {testimonial?.imgurl && <img src={urlFor(testimonial.imgurl).width(120).height(120).fit("crop").url()} alt="" />}
                  <p>
                    <strong>{testimonial?.name || "Your collaborator"}</strong>
                    <span>{testimonial?.company || (state.status === "loading" ? "Checking Sanity Studio…" : "Name and company")}</span>
                  </p>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
