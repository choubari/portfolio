/**
 * LinkedIn posts to embed.
 *
 * HOW TO ADD ONE
 * 1. Open the post on LinkedIn → "..." menu → "Embed this post".
 * 2. Copy the `src` from the iframe it gives you. It looks like:
 *      https://www.linkedin.com/embed/feed/update/urn:li:share:7212345678901234567
 * 3. Paste just the `urn:li:share:...` part (or the whole URL) as `urn` below.
 *
 * Both `urn:li:share:...` and `urn:li:ugcPost:...` work.
 * Until real values are added, the section renders a placeholder instead of
 * broken iframes.
 */

export type LinkedInPost = {
  /** The urn, or the full embed URL. */
  urn: string;
  /** Short caption shown above the embed; also the iframe title. */
  title: string;
  /** Embed height in px. LinkedIn embeds do not auto-size. */
  height?: number;
};

export const LinkedInPosts: LinkedInPost[] = [
  // TODO(kawtar): replace with real posts — see instructions above.
  // { urn: "urn:li:share:0000000000000000000", title: "React Paris lightning talk", height: 560 },
];

/** Accepts a bare urn or a full embed URL and returns a usable iframe src. */
export function embedSrc(urn: string): string {
  if (urn.startsWith("http")) return urn;
  return `https://www.linkedin.com/embed/feed/update/${urn}`;
}
