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
  "What you should know before vibe coding with React ",
  "Your First Job as a fresh Graduate",
];

/**
 * Testimonials featured on the homepage, by Strapi id.
 * Leave empty to fall back to the first two returned by the CMS.
 */
export const FeaturedTestimonialIds: number[] = [];

/** How many starred repos the /work and homepage previews show. */
export const TOP_REPOS = 5;
