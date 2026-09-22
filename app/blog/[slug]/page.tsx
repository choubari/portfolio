import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    <article className="mx-auto max-w-2xl">
      <Link
        href="/blog"
        className="mono inline-flex items-center gap-2 transition-colors hover:text-[var(--action)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to all posts
      </Link>

      <header className="mt-10 border-b border-[var(--rule)] pb-10">
        <p className="mono">
          {new Date(metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="display mt-4">
          {metadata.title}
        </h1>
        {metadata.description && (
          <p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">
            {metadata.description}
          </p>
        )}
      </header>

      {metadata.image && (
        <Image
          src={metadata.image}
          alt={metadata.title}
          width={1000}
          height={1000}
          className="mt-10 w-full rounded-sm border border-[var(--rule)]"
        />
      )}

      <div className="prose mt-10 max-w-none prose-a:text-[var(--action)] prose-code:text-[var(--action)]">
        <PostContent />
      </div>
    </article>
  );
}

export const dynamicParams = false;
