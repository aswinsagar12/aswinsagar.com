import React from "react";
import { socialLinks } from "../../data/portfolio";
import "./SocialRail.css";

export default function SocialRail() {
  const railLinks = socialLinks.filter(({ label }) => ["GitHub", "LinkedIn", "X"].includes(label));
  return (
    <aside className="social-rail" aria-label="Social links">
      {railLinks.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
          <Icon aria-hidden="true" />
        </a>
      ))}
    </aside>
  );
}
