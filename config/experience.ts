/**
 * Work history. Facts are taken from the LinkedIn profile export; the
 * one-liners are deliberately short — the detail lives on LinkedIn.
 */

export type Role = {
  company: string;
  title: string;
  /** Short display range, e.g. "2023 — now" */
  period: string;
  /** Sort key: ISO start date */
  start: string;
  location: string;
  /** One line. Resist making it two. */
  summary: string;
  stack: string[];
  href?: string;
  current?: boolean;
};

export const Experience: Role[] = [
  {
    company: "Alobees",
    title: "Full Stack Engineer",
    period: "Oct 2023 — now",
    start: "2023-10-01",
    location: "Paris, France",
    summary:
      "Construction-management SaaS — joined the early team and shipped 20+ features end to end across web, backend and mobile.",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "React Native"],
    href: "https://www.linkedin.com/in/choubari",
    current: true,
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
    href: "https://www.linkedin.com/in/choubari",
  },
  {
    company: "Zenpark",
    title: "R&D Software Engineer",
    period: "Feb — Aug 2022",
    start: "2022-02-01",
    location: "Paris, France",
    summary:
      "Urban parking apps serving 430,000+ users; two-developer mobile squad shipping GDPR work, onboarding and an Apple CarPlay integration.",
    stack: ["React Native", "TypeScript", "CI/CD"],
    href: "https://www.linkedin.com/in/choubari",
  },
  {
    company: "RifTech",
    title: "Mobile Application Developer",
    period: "Aug — Oct 2021",
    start: "2021-08-01",
    location: "New Jersey, US (remote)",
    summary:
      "Built the Avicenne healthcare app from scratch — Figma prototypes through to a shipped React Native client on their existing APIs.",
    stack: ["React Native", "Figma", "REST"],
  },
  {
    company: "Orange Maroc",
    title: "Frontend Developer",
    period: "Jul — Aug 2021",
    start: "2021-07-01",
    location: "Rabat, Morocco",
    summary:
      "Accessibility platform translating between sign language and text/voice, wiring a React frontend to ML APIs and a Raspberry Pi camera rig.",
    stack: ["React", "JavaScript", "ML APIs", "Raspberry Pi"],
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

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export const EducationHistory: Education[] = [
  {
    school: "ENSIAS",
    degree: "Engineer's degree (MSc), Web & Mobile Engineering",
    period: "2019 — 2022",
  },
  {
    school: "CPGE — Lycée Mohammed VI, Kénitra",
    degree: "Mathematics, Physics & Computer Science",
    period: "2017 — 2019",
  },
];
