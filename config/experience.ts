/**
 * Work history, from the LinkedIn profile export. One line each — the
 * detail lives on LinkedIn. Logos are local files in /public/logos;
 * companies without one fall back to a monogram.
 */

export type Role = {
  company: string;
  title: string;
  period: string;
  start: string;
  location: string;
  summary: string;
  stack: string[];
  logo?: string;
  href?: string;
  current?: boolean;
  /** Acquisition / corporate change worth surfacing. */
  note?: string;
};

export const Experience: Role[] = [
  {
    company: "Alobees",
    title: "Full Stack Engineer",
    period: "Oct 2023 — now",
    start: "2023-10-01",
    location: "Paris",
    summary:
      "Construction-management SaaS. Joined the early team; shipped 20+ features across web, backend and mobile, and cut TypeScript build time by 93%.",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "React Native"],
    logo: "/logos/alobees.png",
    href: "https://alobees.com",
    current: true,
    note: "Acquired — merged with Traxxeo to form Eternia Group",
  },
  {
    company: "O'Reilly Media",
    title: "Live Course Instructor",
    period: "Aug 2024",
    start: "2024-08-01",
    location: "Remote",
    summary:
      "Taught a 3-hour live course on React Server Components — App Router, streaming SSR and rendering strategies.",
    stack: ["React", "Next.js", "RSC"],
    logo: "/logos/oreilly.png",
    href: "https://www.oreilly.com",
  },
  {
    company: "Zenpark",
    title: "R&D Software Engineer",
    period: "Feb — Aug 2022",
    start: "2022-02-01",
    location: "Paris",
    summary:
      "Urban parking apps for 430,000+ users. Two-person mobile squad; shipped GDPR work, a new onboarding flow and an Apple CarPlay integration.",
    stack: ["React Native", "TypeScript", "CI/CD"],
    logo: "/logos/zenpark.png",
    href: "https://www.zenpark.com",
  },
  {
    company: "RifTech",
    title: "Mobile Application Developer",
    period: "Aug — Oct 2021",
    start: "2021-08-01",
    location: "New Jersey (remote)",
    summary:
      "Built Avicenne, a healthcare app, from Figma prototype to a shipped React Native client on their existing APIs.",
    stack: ["React Native", "Figma", "REST"],
  },
  {
    company: "Orange Maroc",
    title: "Frontend Developer",
    period: "Jul — Aug 2021",
    start: "2021-07-01",
    location: "Rabat",
    summary:
      "Accessibility platform translating between sign language and text/voice — React frontend wired to ML APIs and a Raspberry Pi camera rig.",
    stack: ["React", "JavaScript", "ML APIs", "Raspberry Pi"],
    logo: "/logos/orange.png",
    href: "https://www.orange.ma",
  },
  {
    company: "Daba'Go",
    title: "Mobile Application Developer",
    period: "Jul — Aug 2020",
    start: "2020-07-01",
    location: "Morocco",
    summary:
      "Multi-modal journey planner — built its design system, shared services layer and modular architecture.",
    stack: ["Flutter", "Dart"],
  },
];
