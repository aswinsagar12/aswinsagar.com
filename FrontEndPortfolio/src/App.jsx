import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { client, urlFor } from "./client";
import profilePortrait from "./assets/portraits/aswin-profile.webp";
import classyPortrait from "./assets/portraits/aswin-classy.webp";
import bicepsPortrait from "./assets/portraits/aswin-biceps.webp";

const capabilities = [
  {
    title: "Site reliability",
    label: "Build for the hard days",
    description:
      "Reliable cloud platforms, useful observability, calm incident response, and guardrails that help teams ship with confidence.",
    tools: "AWS · GCP · Kubernetes · Terraform · Prometheus · Grafana",
  },
  {
    title: "Development",
    label: "Ideas into working systems",
    description:
      "Practical web experiences and automation shaped around performance, clear interfaces, and maintainable delivery.",
    tools: "React · Node.js · JavaScript · TypeScript · Python · REST APIs",
  },
  {
    title: "Video editing",
    label: "Rhythm with intent",
    description:
      "Story-led edits that use pace, sound, and transitions to hold attention without letting effects overpower the message.",
    tools: "Short form · Travel edits · Motion · Colour · Sound",
  },
  {
    title: "Photography",
    label: "Frames worth keeping",
    description:
      "People, movement, and outdoor stories captured with a direct, cinematic eye and a preference for honest moments.",
    tools: "Portrait · Lifestyle · Travel · Street · Outdoor",
  },
];

const experience = [
  {
    role: "Site Reliability Engineer",
    company: "Garden City Games",
    period: "2025 - Present",
    skills: ["Reliability", "Automation", "Observability", "Incident response"],
    summary:
      "Building resilient cloud platforms, automating operations, and improving the signals teams use to protect player experiences.",
  },
  {
    role: "DevOps Engineer",
    company: "HCLTech",
    period: "2022 - 2025",
    skills: ["AWS", "GCP", "Kubernetes", "Jenkins", "GitHub Actions"],
    summary:
      "Delivered infrastructure and release automation across AWS, GCP, Kubernetes, Jenkins, and GitHub Actions.",
  },
  {
    role: "Web Developer",
    company: "Lead4Earth",
    period: "2022",
    skills: ["React", "JavaScript", "Responsive UI", "Accessibility"],
    summary:
      "Created responsive web experiences and translated product ideas into accessible, working interfaces.",
  },
];

const gallery = [
  { src: classyPortrait, alt: "Close monochrome portrait of Aswin", tone: "red", caption: "Profile" },
  { src: bicepsPortrait, alt: "Aswin in a monochrome gym portrait", tone: "neutral", caption: "Rebuild" },
  { src: "/media/full-version.webp", alt: "Aswin in an editorial portrait composition", tone: "red", caption: "Explore" },
  { src: "/media/bike.webp", alt: "Aswin with his motorcycle", tone: "neutral", caption: "Discover place" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/aswin.sagar/", Icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/aswinsagar12/", Icon: FaFacebookF },
  { label: "YouTube", href: "https://www.youtube.com/@aswinsagar12", Icon: FaYoutube },
  { label: "Pinterest", href: "https://in.pinterest.com/aswinsagar/", Icon: FaPinterestP },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aswinsagar12/", Icon: FaLinkedinIn },
  { label: "X", href: "https://twitter.com/Aswinsagar12", Icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com/aswinsagar12", Icon: FaGithub },
];

function Navbar() {
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

function useDraggableWidget(getInitialPosition) {
  const [position, setPosition] = useState(getInitialPosition);
  const widgetRef = useRef(null);
  const dragOffset = useRef(null);

  const move = (event) => {
    if (!dragOffset.current || !widgetRef.current) return;
    const widget = widgetRef.current;
    const width = widget.offsetWidth || 280;
    const height = widget.offsetHeight || 140;
    const x = Math.max(0, Math.min(window.innerWidth - width, event.clientX - dragOffset.current.x));
    const y = Math.max(0, Math.min(window.innerHeight - height, event.clientY - dragOffset.current.y));
    setPosition({ x, y });
  };

  const start = (event) => {
    if (event.target.closest("input, button, a")) return;
    const widget = widgetRef.current;
    if (!widget) return;
    dragOffset.current = { x: event.clientX - position.x, y: event.clientY - position.y };
    widget.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  const stop = () => { dragOffset.current = null; };

  return {
    widgetRef,
    position,
    dragHandlers: {
      onPointerDown: start,
      onPointerMove: move,
      onPointerUp: stop,
      onPointerCancel: stop,
    },
  };
}

function TerminalWidget() {
  const initialPosition = () => {
    const width = typeof window === "undefined" ? 1280 : window.innerWidth;
    const height = typeof window === "undefined" ? 900 : window.innerHeight;
    return { x: Math.max(16, Math.round(width * 0.0833)), y: Math.max(260, Math.round(height * 0.75)) };
  };
  const { widgetRef, position, dragHandlers } = useDraggableWidget(initialPosition);
  const [entries, setEntries] = useState([
    { type: "output", text: "Welcome to aswinsagar-shell v1.0.0" },
    { type: "output", text: "Try: help, city, echo, skills, or ls." },
  ]);
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const commandRef = useRef(command);
  const executeRef = useRef(null);

  useEffect(() => {
    commandRef.current = command;
  }, [command]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [entries]);

  const execute = (rawCommand) => {
    const [name = "", ...argumentsList] = rawCommand.trim().split(/\s+/);
    const commandName = name.toLowerCase();
    const argumentText = argumentsList.join(" ");
    if (!commandName) return;

    const sectionCommands = {
      home: "home", about: "about", skills: "capabilities", experience: "experience",
      creative: "moments", testimonials: "testimonials", test: "testimonials",
      moments: "moments", contact: "contact",
    };
    const externalCommands = {
      mail: "mailto:aswinsagar12@gmail.com",
      linkedin: "https://www.linkedin.com/in/aswinsagar12/",
      github: "https://github.com/aswinsagar12",
    };
    const responses = {
      whoami: "aswin - sre @ aswinsagar.com",
      date: new Date().toString(),
      uptime: `up ${Math.floor(999 * Math.random())} days, running strong`,
      echo: argumentText,
      help: "commands: whoami, date, uptime, echo [text], city, location, clear, skills, about, experience, creative, testimonials, test, moments, contact, home, mail, linkedin, github, hello, pwd, ls",
      skills: "aws\ndocker\nkubernetes\nterraform\ngcp\nlinux\npython\nnodejs\ngrafana\nprometheus\nci/cd",
      city: "Bengaluru, India · IST",
      location: "Bengaluru, India · IST",
      hello: "Hello, world!",
      pwd: "/srv/aswinsagar.com",
      ls: "about/\nskills/\nexperience/\ncreative/\ntestimonials/\ncontact/\nlinks/",
    };

    if (commandName === "clear") {
      setEntries([]);
    } else if (sectionCommands[commandName]) {
      const section = sectionCommands[commandName];
      setEntries((current) => [...current, { type: "input", text: rawCommand }, { type: "output", text: `navigating to #${section}` }]);
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }), 20);
    } else if (externalCommands[commandName]) {
      const href = externalCommands[commandName];
      setEntries((current) => [...current, { type: "input", text: rawCommand }, { type: "output", text: `opening ${href}` }]);
      window.setTimeout(() => {
        if (commandName === "mail") window.location.href = href;
        else window.open(href, "_blank", "noopener,noreferrer");
      }, 20);
    } else {
      const response = responses[commandName] ?? `command not found: ${commandName}. try 'help'`;
      setEntries((current) => [...current, { type: "input", text: rawCommand }, { type: "output", text: response }]);
    }

    setCommandHistory((current) => [rawCommand, ...current]);
    setHistoryIndex(-1);
    setCommand("");
  };

  useEffect(() => {
    executeRef.current = execute;
  });

  useEffect(() => {
    inputRef.current?.focus();

    const sendToTerminal = (event) => {
      const target = event.target;
      if (
        event.metaKey || event.ctrlKey || event.altKey ||
        target instanceof HTMLElement && target.closest("input, textarea, [contenteditable='true']")
      ) return;

      if (event.key === "Enter") {
        const pendingCommand = commandRef.current.trim();
        if (pendingCommand) executeRef.current?.(pendingCommand);
        inputRef.current?.focus();
        event.preventDefault();
        return;
      }
      if (event.key === "Backspace") {
        setCommand((current) => current.slice(0, -1));
        inputRef.current?.focus();
        event.preventDefault();
        return;
      }
      if (event.key === "Escape") {
        setCommand("");
        inputRef.current?.focus();
        event.preventDefault();
        return;
      }
      if (event.key.length === 1) {
        setCommand((current) => current + event.key);
        inputRef.current?.focus();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", sendToTerminal);
    return () => window.removeEventListener("keydown", sendToTerminal);
  }, []);

  const keyDown = (event) => {
    if (event.key === "ArrowUp") {
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setCommand(commandHistory[nextIndex] || "");
      event.preventDefault();
    }
    if (event.key === "ArrowDown") {
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setCommand(nextIndex === -1 ? "" : commandHistory[nextIndex]);
      event.preventDefault();
    }
  };

  return (
    <section
      ref={widgetRef}
      className="terminal-widget draggable-widget"
      style={{ left: position.x, top: position.y }}
      {...dragHandlers}
      aria-label="Draggable terminal"
    >
      <div className="terminal-widget__bar" aria-hidden="true">
        <i /><i /><i />
        <span>root@aswinsagar.com ~ $</span>
      </div>
      <div className="terminal-widget__body" ref={bodyRef}>
        {entries.map((entry, index) => (
          <p className={`terminal-widget__entry terminal-widget__entry--${entry.type}`} key={`${entry.type}-${index}`}>
            {entry.type === "input" && <span>$ </span>}{entry.text}
          </p>
        ))}
      </div>
      <form className="terminal-widget__input" onSubmit={(event) => { event.preventDefault(); execute(command); }}>
        <span aria-hidden="true">$</span>
        <i className="terminal-widget__cursor" aria-hidden="true" />
        <input
          ref={inputRef}
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={keyDown}
          placeholder="type a command..."
          aria-label="Terminal command"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </section>
  );
}

function LocationWidget() {
  const initialPosition = () => {
    const width = typeof window === "undefined" ? 1280 : window.innerWidth;
    const height = typeof window === "undefined" ? 900 : window.innerHeight;
    return {
      x: Math.max(width - 138 - Math.round(width * 0.0816), 8),
      y: Math.max(Math.round(height * 0.865), 8),
    };
  };
  const { widgetRef, position, dragHandlers } = useDraggableWidget(initialPosition);
  const [indiaTime, setIndiaTime] = useState("");

  useEffect(() => {
    const update = () => setIndiaTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={widgetRef}
      className="location-widget draggable-widget"
      style={{ left: position.x, top: position.y }}
      {...dragHandlers}
      aria-label="Draggable location and time"
    >
      <p><span>@</span> Bengaluru, India</p>
      <time>{indiaTime} IST</time>
    </section>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-desktop">Site Reliability Engineer and Visual Creator</span>
          <span className="hero__eyebrow-mobile">Site Reliability Engineer</span>
        </p>
        <h1 className="hero__title" id="hero-title">
          <span>Aswin</span>
          <span>Sagar</span>
        </h1>
      </div>
      <img
        className="hero__portrait-layer hero-reveal"
        src="/media/aswin-hero-cutout.webp"
        alt="Portrait of Aswin Sagar"
        fetchpriority="high"
        decoding="async"
      />
      <TerminalWidget />
      <LocationWidget />
    </section>
  );
}

function SocialRail() {
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

function About() {
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

function ScrollWords({ lines }) {
  return (
    <span className="scroll-letters" aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={`${line}-${lineIndex}`}>
          <span className="scroll-letter-line" aria-hidden="true">
            {line.split(" ").map((word, wordIndex) => (
              <React.Fragment key={`${word}-${wordIndex}`}>
                <span className="scroll-letter-word">
                  {Array.from(word).map((character, characterIndex) => (
                    <span className="scroll-letter" key={`${character}-${characterIndex}`}>{character}</span>
                  ))}
                </span>
                {wordIndex < line.split(" ").length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </span>
          {lineIndex < lines.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}

function Capabilities() {
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

function Projects() {
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

function Testimonials() {
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

function Experience() {
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

function Moments() {
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

function PixelCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return undefined;

    let frame;
    let lastTrail = 0;
    const pointer = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const updatePosition = () => {
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(updatePosition);
    };
    const onMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      const now = performance.now();
      if (now - lastTrail >= 42) {
        lastTrail = now;
        const trail = document.createElement("i");
        trail.className = "pixel-cursor__trail";
        trail.style.left = `${pointer.x}px`;
        trail.style.top = `${pointer.y}px`;
        document.body.appendChild(trail);
        trail.addEventListener("animationend", () => trail.remove(), { once: true });
      }
    };
    const onOver = (event) => {
      const interactive = event.target.closest(
        "a, button, input, .capability, .experience-card, .testimonial-card, .project, .moment",
      );
      ringRef.current?.toggleAttribute("data-interactive", Boolean(interactive));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    frame = window.requestAnimationFrame(updatePosition);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      if (frame) window.cancelAnimationFrame(frame);
      document.querySelectorAll(".pixel-cursor__trail").forEach((trail) => trail.remove());
    };
  }, []);

  return (
    <>
      <i className="pixel-cursor__dot" ref={dotRef} aria-hidden="true" />
      <i className="pixel-cursor__ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

function Contact() {
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title">
      <div className="section-label js-reveal">Have a challenge in mind?</div>
      <h2 className="contact__title js-reveal" id="contact-title"><ScrollWords lines={["Don’t be shy.", "Say hi."]} /></h2>
      <a className="contact__email js-reveal" href="mailto:aswinsagar12@gmail.com">
        <span className="contact__email-address">aswinsagar12@gmail.com</span>
        <span className="contact__email-arrow" aria-hidden="true">↗</span>
      </a>
      <div className="contact__footer js-reveal">
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

export default function App() {
  const root = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        media.add("(min-width: 481px)", () => {
          gsap.from(".hero-reveal", {
            y: 44,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
          });
        });

        const sectionRevealSelector = [
          ".about__content",
          ".capabilities__intro",
          ".capability",
          ".work__header",
          ".project",
          ".testimonials > .section-label",
          ".testimonial-card",
          ".moment",
          ".contact > .section-label",
          ".contact__email",
          ".contact__footer",
        ].join(", ");

        gsap.utils.toArray(sectionRevealSelector).forEach((element) => {
          gsap.fromTo(element,
            { y: 24, opacity: 0.38 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top 94%",
                end: "top 68%",
                scrub: 0.55,
              },
            },
          );
        });

        gsap.utils.toArray(".about .display-copy, .work .section-heading, .testimonials .section-heading, .moments__header, .contact__title").forEach((element) => {
          gsap.to(element, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          });
        });

        gsap.utils.toArray(".scroll-letters").forEach((group) => {
          const letters = group.querySelectorAll(".scroll-letter");
          gsap.fromTo(letters,
            { color: "#77736d" },
            {
              color: "#ffffff",
              duration: 0.045,
              stagger: 0.035,
              ease: "none",
              scrollTrigger: {
                trigger: group,
                start: "top 86%",
                end: group.closest(".contact") ? "top 48%" : "bottom 42%",
                scrub: 0.55,
              },
            },
          );
        });

        media.add("(min-width: 721px)", () => {
          const heroStory = gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.45,
              refreshPriority: 1,
            },
          });

          heroStory
            .to(".hero__eyebrow", { yPercent: -60, opacity: 0.35, ease: "none" }, 0)
            .to(".hero__title", { yPercent: -12, scale: 0.94, opacity: 0.62, ease: "none" }, 0)
            .to(".hero__portrait-layer", { yPercent: 3, scale: 1.025, ease: "none" }, 0);

          const experienceSection = document.querySelector(".experience");
          const experienceViewport = experienceSection?.querySelector(".experience__viewport");
          const experienceTrack = experienceSection?.querySelector(".experience__track");
          if (experienceSection && experienceViewport && experienceTrack) {
            const finalCard = experienceTrack.querySelector(".experience-card:last-of-type");
            const travel = () => Math.max(
              0,
              experienceTrack.offsetLeft
                + (finalCard?.offsetLeft || 0)
                + (finalCard?.offsetWidth || 0) / 2
                - experienceViewport.clientWidth / 2,
            );
            const scrollDistance = () => Math.max(travel() * 1.5, window.innerHeight * 1.8);
            const experienceStory = gsap.timeline({
              scrollTrigger: {
                trigger: experienceSection,
                start: "top top",
                end: () => `+=${scrollDistance()}`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true,
                refreshPriority: 1,
              },
            });

            experienceStory
              .fromTo(
                experienceTrack,
                { x: 0 },
                { x: () => -travel(), duration: 1, ease: "none", force3D: true },
              );
          }

          gsap.utils.toArray("main > .section").forEach((section) => {
            gsap.timeline({
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
              },
            })
              .fromTo(
                section,
                { scale: 1.14, opacity: 0.42 },
                { scale: 1, opacity: 1, duration: 0.3, ease: "none" },
              )
              .to(section, { scale: 0.975, duration: 0.7, ease: "none" });
          });
        });

        media.add("(max-width: 720px)", () => {
          gsap.utils.toArray("main > .section").forEach((section) => {
            gsap.fromTo(
              section,
              { scale: 1.035, opacity: 0.68 },
              {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top 96%",
                  end: "top 74%",
                  scrub: 0.5,
                },
              },
            );
          });
        });

        media.add("(max-width: 480px)", () => {
          gsap.timeline({
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.65,
            },
          })
            .to(".hero__eyebrow", { yPercent: -55, opacity: 0.3, ease: "none" }, 0)
            .to(".hero__title", { yPercent: -12, scale: 0.96, opacity: 0.66, ease: "none" }, 0)
            .to(".hero__portrait-layer", { yPercent: 7, scale: 1.035, ease: "none" }, 0)
            .to(".location-widget", { yPercent: -22, opacity: 0.45, ease: "none" }, 0);
        });

        gsap.to(".work__scan", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".work",
            start: "top 84%",
            end: "top 24%",
            scrub: 0.65,
          },
        });

      });
    }, root);

    let lenis;
    let frame;
    const desktopMotion = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (desktopMotion.matches) {
      lenis = new Lenis({ smoothWheel: true, syncTouch: false, lerp: 0.09 });
      frame = (time) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(frame);
      gsap.ticker.lagSmoothing(0);
    }

    let active = true;
    const refresh = () => active && ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      active = false;
      window.removeEventListener("load", refresh);
      if (lenis) {
        gsap.ticker.remove(frame);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      }
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div className="site" ref={root}>
      <a className="skip-link" href="#main">Skip to content</a>
      <PixelCursor />
      <Navbar />
      <SocialRail />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <Testimonials />
        <Experience />
        <Moments />
        <Contact />
      </main>
    </div>
  );
}
