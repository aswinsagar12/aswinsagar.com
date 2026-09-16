import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import classyPortrait from "../assets/portraits/aswin-classy.webp";
import bicepsPortrait from "../assets/portraits/aswin-biceps.webp";

export const capabilities = [
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
    title: "Adventure",
    label: "Keep moving forward",
    description:
      "Motorcycling, fitness, sport, and travel keep me curious, disciplined, and ready to explore unfamiliar ground.",
    tools: "Motorcycling · Fitness · Sport · Travel · Outdoors",
  },
];

export const experience = [
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

export const gallery = [
  { src: classyPortrait, alt: "Close monochrome portrait of Aswin", tone: "red", caption: "Profile" },
  { src: bicepsPortrait, alt: "Aswin in a monochrome gym portrait", tone: "neutral", caption: "Rebuild" },
  { src: "/media/full-version.webp", alt: "Aswin in an editorial portrait composition", tone: "red", caption: "Explore" },
  { src: "/media/bike.webp", alt: "Aswin with his motorcycle", tone: "neutral", caption: "Discover place" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/aswin.sagar/", Icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/aswinsagar12/", Icon: FaFacebookF },
  { label: "YouTube", href: "https://www.youtube.com/@aswinsagar12", Icon: FaYoutube },
  { label: "Pinterest", href: "https://in.pinterest.com/aswinsagar/", Icon: FaPinterestP },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aswinsagar12/", Icon: FaLinkedinIn },
  { label: "X", href: "https://twitter.com/Aswinsagar12", Icon: FaXTwitter },
  { label: "GitHub", href: "https://github.com/aswinsagar12", Icon: FaGithub },
];
