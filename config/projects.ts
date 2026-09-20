/** Personal projects. Screenshots live in /public/projects. */

export type Project = {
  name: string;
  tagline: string;
  href: string;
  image: string;
  stack: string[];
  /** Shown as a small mono label on the card. */
  status?: string;
};

export const Projects: Project[] = [
  {
    name: "Closer",
    tagline:
      "Cold-call trainer. Three minutes against an AI prospect, scored on opener, discovery, objections and close.",
    href: "https://closer.choubari.com",
    image: "/projects/closer.jpg",
    stack: ["Next.js", "TypeScript", "AI", "Voice"],
    status: "live",
  },
  {
    name: "rip tv time",
    tagline:
      "Browse your exported TV Time watch history after the shutdown, enriched live from TMDB and TheTVDB.",
    href: "https://tvtrack.choubari.com",
    image: "/projects/rip-tv-time.jpg",
    stack: ["Next.js", "TypeScript", "TMDB API"],
    status: "live",
  },
  {
    name: "url-to-markdown",
    tagline:
      "Paste any URL, get clean Markdown. No account, no paywall — handy for feeding pages to an LLM.",
    href: "https://md.choubari.com",
    image: "/projects/url-to-markdown.jpg",
    stack: ["Next.js", "TypeScript"],
    status: "live",
  },
];
