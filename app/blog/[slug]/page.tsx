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
        className="label-mono inline-flex items-center gap-2 transition-colors duration-500 ease-ease hover:text-[var(--gold)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to all posts
      </Link>

      <header className="mt-10 border-b border-[var(--rule)] pb-10">
        <p className="label-mono">
          {new Date(metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-display sm:text-4xl">
          {metadata.title}
          <span className="tick">.</span>
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
          className="mt-10 w-full rounded-xl border border-[var(--rule)]"
        />
      )}

      <div className="prose prose-invert mt-10 max-w-none prose-headings:tracking-display prose-a:text-[var(--sky)] hover:prose-a:text-[var(--gold)] prose-code:text-[var(--gold)]">
        <PostContent />
      </div>
    </article>
  );
}

export const dynamicParams = false;
