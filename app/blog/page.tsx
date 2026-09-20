import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPostsMetadata } from "@/lib/getAllPostsMetadata";
import { PageTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

export default async function BlogIndexPage() {
  const posts = await getAllPostsMetadata();
  const publishedPosts = posts.filter((post) => post.published !== false);

  return (
    <>
      <PageTitle
        eyebrow="00 / Writing"
        lede="Unfrequent thoughts, ideas, and experiences"
      >
        Blog Posts
      </PageTitle>

      <div className="mt-16">
        {publishedPosts.length > 0 ? (
          <ul>
            {publishedPosts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={(i % 4) * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 border-b border-[var(--rule)] py-7 transition-colors duration-500 ease-ease hover:border-[var(--rule-strong)]"
                >
                  <span className="label-mono">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <h2 className="flex items-start gap-2 text-xl font-semibold transition-colors duration-500 ease-ease group-hover:text-[var(--gold)]">
                    {post.title}
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-all duration-500 ease-ease group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </h2>
                  {post.description && (
                    <p className="max-w-2xl leading-relaxed text-[var(--muted)]">
                      {post.description}
                    </p>
                  )}
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="text-[var(--muted)]">No posts published yet.</p>
        )}
      </div>
    </>
  );
}
