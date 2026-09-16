import React, { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  About,
  Capabilities,
  Contact,
  Experience,
  Hero,
  Moments,
  Navbar,
  PixelCursor,
  SocialRail,
  Testimonials,
  Work,
} from "./components";

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
          if (group.closest(".contact")) return;
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
                end: "bottom 42%",
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
        <Work />
        <Testimonials />
        <Experience />
        <Moments />
        <Contact />
      </main>
    </div>
  );
}
