import Link from "next/link";
import { getAllPostsMetadata } from "@/lib/getAllPostsMetadata";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import { SectionTitle } from "@/components/section-title";
import { LinkedInFeed } from "@/components/linkedin-posts";

export default async function BlogIndexPage() {
  const posts = await getAllPostsMetadata();
  const publishedPosts = posts.filter((post) => post.published !== false);

  return (
    <>
      <PageTitle
        lede="Unfrequent thoughts, ideas, and experiences."
      >
        Blog
      </PageTitle>

      <div className="mt-12">
        {publishedPosts.length > 0 ? (
          <ul className="list-sep">
            {publishedPosts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={Math.min(i, 6) * 50}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="row group grid grid-cols-1 gap-x-8 gap-y-1 py-5 sm:grid-cols-[9rem_1fr]"
                >
                  <span className="mono pt-1">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <div>
                    <h2 className="font-semibold transition-colors group-hover:text-[var(--action)]">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="mt-1 leading-relaxed text-[var(--muted)]">
                        {post.description}
                      </p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="text-[var(--muted)]">No posts published yet.</p>
        )}
      </div>

      <section className="mt-20">
        <Reveal>
          <SectionTitle
            action={{
              label: "LinkedIn",
              href: "https://linkedin.com/in/choubari",
            }}
          >
            see my other writings
          </SectionTitle>
        </Reveal>
        <div className="mt-8">
          <LinkedInFeed />
        </div>
      </section>
    </>
  );
}
