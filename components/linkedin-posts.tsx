import { LinkedInPosts, embedSrc } from "@/config/linkedin";
import { Reveal } from "@/components/motion/reveal";

/**
 * LinkedIn post embeds. Renders nothing but a pointer until real post urns
 * are added to config/linkedin.ts, so an empty config can never ship broken
 * iframes.
 */
export function LinkedInFeed() {
  if (LinkedInPosts.length === 0) {
    return (
      <p className="mono py-6">
        No posts configured yet — add them in{" "}
        <code className="text-[var(--action)]">config/linkedin.ts</code>.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {LinkedInPosts.map((post, i) => (
        <Reveal key={post.urn} delay={(i % 2) * 80}>
          <figure className="flex h-full flex-col">
            <figcaption className="mono mb-2">{post.title}</figcaption>
            <iframe
              src={embedSrc(post.urn)}
              title={post.title}
              height={post.height ?? 560}
              width="100%"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              className="panel w-full"
            />
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
