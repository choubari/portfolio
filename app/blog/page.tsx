import Link from "next/link";
import { getAllPostsMetadata } from "@/lib/getAllPostsMetadata";

export default async function BlogIndexPage() {
  const posts = await getAllPostsMetadata();
  const publishedPosts = posts.filter((post) => post.published !== false);

  return (
    <>
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Blog Posts
          <span
            className="text-4xl leading-3"
            style={{ color: "var(--color-accent)" }}
          >
            .
          </span>
        </h1>
        <p className="mb-3">Unfrequent thoughts, ideas, and experiences</p>
      </div>
      <div className="max-w-2xl mx-auto">
        {publishedPosts.length > 0 ? (
          publishedPosts.map((post) => (
            <div
              key={post.slug}
              className="mb-4 p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2
                  className="text-xl font-semibold mb-1 text-accent hover:underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-400 mb-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
              {post.description && (
                <p className="text-gray-300">{post.description}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts published yet.</p>
        )}
      </div>
    </>
  );
}
