import React, { useEffect, useRef } from "react";
import "./PixelCursor.css";

export default function PixelCursor() {
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
