import { BrandButton } from "@/components/brand-button";
import { BrandTag } from "@/components/brand-tag";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] w-full flex-col justify-center py-16">
      {/* TODO(copy): confirm availability wording + status before launch. */}
      <p
        className="label-mono rise mb-8 inline-flex items-center gap-2.5"
        style={{ "--rise-delay": "0ms" } as React.CSSProperties}
      >
        <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
        Paris, France — available for React Native work
      </p>

      <h1
        className="display rise max-w-4xl text-balance"
        style={{ "--rise-delay": "90ms" } as React.CSSProperties}
      >
        Coding &amp; Storytelling<span className="tick">:</span>
        <br />
        <span className="text-[var(--muted)]">That&apos;s what I do</span>
        <span className="tick">!</span>
      </h1>

      <p
        className="rise mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl"
        style={{ "--rise-delay": "170ms" } as React.CSSProperties}
      >
        I bring ambitious ideas to life with software engineering, and share my
        expertise across conferences and social media.
      </p>

      <div
        className="rise mt-10 flex flex-wrap gap-3"
        style={{ "--rise-delay": "250ms" } as React.CSSProperties}
      >
        <BrandTag>Engineering</BrandTag>
        <BrandTag>Educating</BrandTag>
        <BrandTag>Entertaining</BrandTag>
      </div>

      <div
        className="rise mt-12 flex flex-wrap items-center gap-4"
        style={{ "--rise-delay": "330ms" } as React.CSSProperties}
      >
        <Link href="/contact">
          <BrandButton>
            Let&apos;s CHAT!
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-ease group-hover:translate-x-1" />
          </BrandButton>
        </Link>
        <Link href="/oss">
          <BrandButton tone="ghost">See the work</BrandButton>
        </Link>
      </div>

      <div
        className="sweep mt-20 h-px w-full bg-[var(--rule)]"
        style={{ "--rise-delay": "420ms" } as React.CSSProperties}
      />
    </section>
  );
}
