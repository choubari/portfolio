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
    title: "Full Stack Engineer (Full-time)",
    period: "Oct 2023 — now",
    start: "2023-10-02",
    location: "Paris",
    summary:
    "Construction-management SaaS. Early team member; shipped 20+ features across web, backend and mobile.",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "React Native"],
    logo: "/logos/alobees.png",
    href: "https://alobees.com",
    current: true,
    // note: "Acquired — merged with Traxxeo to form Eternia Group",
  },
  {
    company: "Astrova",
    title: "Full Stack Developer (Part-time)",
    period: "Jan 2026 — now",
    start: "2026-01-01",
    location: "Paris",
    summary:
      "Maintain and extend client apps with new features serving 1000+ users.",
    stack: ["Supabase", "PostgreSQL", "Angular", "Spring Boot", "Digital Ocean"],
    logo: "/logos/astrova.png",
    href: "https://astrova.fr",
    current: true,
  },
  {
    company: "O'Reilly Media",
    title: "Live Course Instructor",
    period: "Aug 2024",
    start: "2024-08-01",
    location: "Remote",
    summary:
      "Taught a 3-hour live course on React Server Components, App Router, streaming SSR and rendering strategies.",
    stack: ["React", "Next.js", "Server Components"],
    logo: "/logos/oreilly.png",
    href: "https://www.oreilly.com",
  },
  {
    company: "Zenpark",
    title: "R&D Software Engineer",
    period: "Feb — Aug 2022",
    start: "2022-02-15",
    location: "Paris",
    summary:
      "Maintained urban parking apps for 430,000+ users, two-person mobile squad.",
    stack: ["React Native", "TypeScript", "CI/CD"],
    logo: "/logos/zenpark.png",
    href: "https://www.zenpark.com",
  },
];
