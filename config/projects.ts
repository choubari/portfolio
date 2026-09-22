/** Personal projects. Screenshots live in /public/projects. */

export type Project = {
  name: string;
  tagline: string;
  href: string;
  image: string;
  stack: string[];
  /** Shown as a small mono label on the card. */
  status?: string;
  /** Homepage only — excluded from /work. */
  homeOnly?: boolean;
};

export const Projects: Project[] = [
  {
    name: "Awesome-Muslims",
    tagline:
      "A curated list of open source resources for muslim developers — 619 stars, 95 forks, and contributions from across the community.",
    href: "https://github.com/choubari/Awesome-Muslims",
    image: "/projects/awesome-muslims.jpg",
    stack: ["Open source", "Community"],
    status: "619 ★",
    homeOnly: true,
  },
  {
    name: "Closer",
    tagline:
      "Cold-call trainer. Three minutes against an AI prospect, realtime transcribed, scored on opener, discovery, objections and close.",
    href: "https://closer.choubari.com",
    image: "/projects/closer.png",
    stack: ["React", "Next.js", "TypeScript", "Google AI"],
  },
  {
    name: "tv tracker",
    tagline:
      "Browse your exported TV Time watch history after the shutdown, enriched live from TMDB and TheTVDB.",
    href: "https://github.com/choubari/rip-tv-time",
    image: "/projects/tv-tracker.png",
    stack: ["TypeScript", "Cloudflare Workers"],
  },
  {
    name: "url-to-markdown",
    tagline:
      "Paste any URL, get clean Markdown. Handy for saving tokens and feeding pages to an LLM.",
    href: "https://md.choubari.com",
    image: "/projects/url-to-markdown.png",
    stack: ["Next.js", "TypeScript"],
  },
];
