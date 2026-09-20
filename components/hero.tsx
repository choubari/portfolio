import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { AsciiRocket } from "@/components/ascii-rocket";

const STACK = ["React", "React Native", "TypeScript", "Next.js", "Node.js"];

export function Hero() {
  return (
    <section className="py-14 sm:py-20">
      <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p
            className="comment rise"
            style={{ "--rise-delay": "0ms" } as React.CSSProperties}
          >
            full stack engineer · react &amp; react native · paris
          </p>

          {/* TODO(copy): your line from the banner — edit freely. */}
          <h1
            className="display rise mt-4 text-balance"
            style={{ "--rise-delay": "60ms" } as React.CSSProperties}
          >
            Engineer building systems from zero at startup speed
            <span className="cursor ml-1.5" aria-hidden="true" />
          </h1>

          <p
            className="rise mt-5 max-w-xl leading-relaxed text-[var(--muted)]"
            style={{ "--rise-delay": "120ms" } as React.CSSProperties}
          >
            I ship product end to end — web, backend and mobile — and I speak
            about it on stage. Currently full stack engineer at Alobees in
            Paris.
          </p>

          <ul
            className="rise mt-6 flex flex-wrap gap-1.5"
            style={{ "--rise-delay": "180ms" } as React.CSSProperties}
          >
            {STACK.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={{ "--rise-delay": "240ms" } as React.CSSProperties}
          >
            <Link href="/contact">
              <BrandButton>Let&apos;s work together</BrandButton>
            </Link>
            <a href="mailto:contact@choubari.com?subject=Speaking%20invitation">
              <BrandButton tone="ghost">Invite me to speak</BrandButton>
            </a>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-5 sm:flex-col sm:items-end">
          <Image
            src="/kawtar.png"
            alt="Kawtar Choubari"
            width={112}
            height={112}
            priority
            className="h-20 w-20 rounded-full sm:h-28 sm:w-28"
          />
          <AsciiRocket className="hidden sm:block" />
        </div>
      </div>
    </section>
  );
}
