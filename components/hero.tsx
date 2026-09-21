import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { AsciiField } from "@/components/ascii-field";

export function Hero() {
  return (
    <section className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
      {/* Text — left */}
      <div className="order-2 lg:order-1">
        <p
          className="comment rise"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          full stack engineer · react &amp; react native · paris
        </p>

        {/* TODO(copy): your line. */}
        <h1
          className="rise mt-4 text-balance text-[clamp(2.5rem,6.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          Engineer building systems from zero at startup speed
          <span className="cursor ml-2" aria-hidden="true" />
        </h1>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3"
          style={{ "--rise-delay": "140ms" } as React.CSSProperties}
        >
          <Link href="/contact">
            <BrandButton>Let&apos;s work together</BrandButton>
          </Link>
          <a href="mailto:contact@choubari.com?subject=Speaking%20invitation">
            <BrandButton tone="ghost">Invite me to speak</BrandButton>
          </a>
        </div>
      </div>

      {/* Art — right */}
      <AsciiField className="order-1 h-[280px] w-full sm:h-[380px] lg:order-2 lg:h-[460px]" />
    </section>
  );
}
