import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let PostContent, metadata;

  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    PostContent = mod.default;
    metadata = mod.metadata;
  } catch (error) {
    notFound();
  }

  return (
    <article className="prose prose-invert mx-auto py-8">
      <Link href="/blog" className="font-thin hover:underline">
        &#8592; Back to all posts
      </Link>
      <h1
        className="text-accent text-2xl font-medium mt-10"
        style={{ color: "var(--color-accent)" }}
      >
        {metadata.title}
      </h1>
      <p className="text-sm text-gray-400 mb-2">
        {new Date(metadata.date).toLocaleDateString()}
      </p>
      {metadata.description && <p className="mb-6">{metadata.description}</p>}
      {metadata.image && (
        <Image
          src={metadata.image}
          alt={metadata.title}
          width={1000}
          height={1000}
        />
      )}
      <PostContent />
    </article>
  );
}

export const dynamicParams = false;
