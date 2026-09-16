import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <a className="navbar__brand" href="#home" onClick={closeMenu} aria-label="Aswin Sagar, home">
        AS
      </a>
      <button
        className="navbar__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        className={`navbar__links${open ? " navbar__links--open" : ""}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <a className="navbar__link" href="#about" onClick={closeMenu} aria-label="to know more About me">
          <span className="navbar__link-side navbar__link-side--before" aria-hidden="true">to know more</span>
          <span className="navbar__link-main">About</span>
          <span className="navbar__link-side navbar__link-side--after" aria-hidden="true">me</span>
        </a>
        <a className="navbar__link" href="#contact" onClick={closeMenu} aria-label="dont be shy Say Hi">
          <span className="navbar__link-side navbar__link-side--before" aria-hidden="true">dont be shy</span>
          <span className="navbar__link-main">Say Hi</span>
        </a>
      </nav>
    </header>
  );
}
