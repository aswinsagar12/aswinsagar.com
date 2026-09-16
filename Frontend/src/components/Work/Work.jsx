import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { gallery } from "../../data/portfolio";
import ScrollWords from "../ScrollWords/ScrollWords";
import "./Work.css";

export default function Work() {
  const [state, setState] = useState({ status: "loading", projects: [] });

  useEffect(() => {
    let active = true;
    const query = '*[_type == "works"] | order(_createdAt desc){_id, title, description, tags, projectLink, codeLink, imgUrl}';

    client.fetch(query)
      .then((projects) => {
        if (active) setState({ status: "ready", projects: projects || [] });
      })
      .catch(() => {
        if (active) setState({ status: "error", projects: [] });
      });

    return () => { active = false; };
  }, []);

  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="work__scan" aria-hidden="true" />
      <div className="work__header js-reveal">
        <div>
          <div className="section-label">Selected engineering work</div>
          <h2 className="section-heading" id="work-title"><ScrollWords lines={["Work built to hold up."]} /></h2>
        </div>
        <p>Infrastructure, automation, and product work backed by operating experience.</p>
      </div>

      {state.status === "loading" && <p className="work__state" role="status">Loading selected work…</p>}
      {state.status === "error" && <p className="work__state">Selected work is temporarily unavailable.</p>}
      {state.status === "ready" && state.projects.length === 0 && (
        <p className="work__state">Detailed case studies are being prepared.</p>
      )}

      <div className="work__grid">
        {state.projects.slice(0, 2).map((project, index) => {
          const href = project.projectLink || project.codeLink;
          const image = project.imgUrl ? urlFor(project.imgUrl).width(1200).quality(82).url() : gallery[index % gallery.length].src;
          const Element = href ? "a" : "article";
          return (
            <Element
              className="project js-reveal"
              key={project._id || project.title}
              href={href}
              target={href ? "_blank" : undefined}
              rel={href ? "noreferrer" : undefined}
            >
              <div className="project__media">
                <img src={image} alt="" width="1200" height="900" loading="lazy" />
                <span className="project__arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project__meta">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description || "Engineering project"}</p>
                </div>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              {project.tags?.length > 0 && (
                <div className="project__tags">{project.tags.slice(0, 4).join(" · ")}</div>
              )}
            </Element>
          );
        })}
      </div>
    </section>
  );
}
