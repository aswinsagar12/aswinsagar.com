import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

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

export default function Hero() {
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
