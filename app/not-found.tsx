import Link from "next/link";
import { BrandButton } from "@/components/brand-button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-1 flex-col justify-center py-16">
      <span className="label-mono rise">Error 404</span>
      <h1
        className="display rise mt-6"
        style={{ "--rise-delay": "70ms" } as React.CSSProperties}
      >
        Page Not Found<span className="tick">.</span>
      </h1>
      <p
        className="rise mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
        style={{ "--rise-delay": "150ms" } as React.CSSProperties}
      >
        This page doesn&apos;t exist or was a sacrifice of shipping fast.
        We&apos;re working on it and it might be available soon.
      </p>
      <div
        className="rise mt-10"
        style={{ "--rise-delay": "230ms" } as React.CSSProperties}
      >
        <Link href="/">
          <BrandButton>Back to Home</BrandButton>
        </Link>
      </div>
    </div>
  );
}
