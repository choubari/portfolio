/**
 * What the homepage shows. Everything here is an explicit choice, not
 * "the most recent N" — so the homepage stays curated.
 */

/**
 * Talks featured on the homepage, by exact title from content/talks.ts.
 * Reorder or swap freely; unknown titles are ignored.
 */
export const FeaturedTalkTitles: string[] = [
  "Lightning Talk: React Anti-Patterns In AI-Generated Code",
  "What you should know before vibe coding with React",
  "How I capture testimonials before they disappear",
  "React Server Components Deep Dive",
  "Modern Web Development with Next.js 13",
];

/**
 * Projects shown on the homepage, by name, in this order. Anything listed
 * here that is marked `homeOnly` in config/projects.ts appears on the
 * homepage but not on /work.
 */
export const FeaturedProjectNames: string[] = [
  "Parlons",
  "url-to-markdown",
  "Closer",
  "tv tracker",
  "Awesome-Muslims",
];

/**
 * Testimonials featured on the homepage, by Strapi id, in this order.
 * Names are noted so the list stays readable — the id is what matters.
 * Leave empty to fall back to the first six the CMS returns.
 */
export const FeaturedTestimonialIds: number[] = [
  22, // Aditya Sharan — Software Engineer, Google
  30, // Lahoucine Karroum — Frontend developer, CODPARTNER
  1, // Kevin Z. — Developer, PayFit
  23, // Pierre Burgy — Co-founder & CEO, Strapi.io
  10, // Soufiane Ezzaim — Regional Operations Manager, ExpertEye
  12, // Amine Kili — Co-Founder & CTO
  18, // Aymane Helfa — UX/UI Designer, Orange
];

/** How many starred repos the /work and homepage previews show. */
export const TOP_REPOS = 3;
