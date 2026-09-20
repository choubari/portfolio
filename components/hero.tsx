import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { AsciiField } from "@/components/ascii-field";

export function Hero() {
  return (
    <section className="py-12 sm:py-16">
      <AsciiField className="mb-10 w-full" />

      <p
        className="comment rise"
        style={{ "--rise-delay": "0ms" } as React.CSSProperties}
      >
        full stack engineer · react &amp; react native · paris
      </p>

      {/* TODO(copy): your line. */}
      <h1
        className="display rise mt-3 max-w-3xl text-balance"
        style={{ "--rise-delay": "60ms" } as React.CSSProperties}
      >
        Engineer building systems from zero at startup speed
        <span className="cursor ml-1.5" aria-hidden="true" />
      </h1>

      <div
        className="rise mt-7 flex flex-wrap items-center gap-3"
        style={{ "--rise-delay": "140ms" } as React.CSSProperties}
      >
        <Link href="/contact">
          <BrandButton>Let&apos;s work together</BrandButton>
        </Link>
        <a href="mailto:contact@choubari.com?subject=Speaking%20invitation">
          <BrandButton tone="ghost">Invite me to speak</BrandButton>
        </a>
      </div>
    </section>
  );
}
