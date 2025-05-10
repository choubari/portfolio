import { Button } from "@/components/ui/button";
import { BrandButton } from "@/components/brand-button";
import { BrandTag } from "@/components/brand-tag";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-190px)]">
      <div className="flex flex-col space-y-12 w-full max-w-3xl">
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          <span style={{ color: "var(--color-accent)" }}>
            Coding & Storytelling:
          </span>{" "}
          <br />
          That&apos;s what I do!
        </h1>

        <div className="flex flex-wrap gap-4">
          <BrandTag>Engineering</BrandTag>
          <BrandTag>Educating</BrandTag>
          <BrandTag>Entertaining</BrandTag>
        </div>

        <p className="text-xl leading-relaxed max-w-2xl">
          I bring ambitious ideas to life with software engineering, and share
          my expertise across conferences and social media.
        </p>

        <div>
          <Link href="/contact">
            <BrandButton>Let&apos;s CHAT!</BrandButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
