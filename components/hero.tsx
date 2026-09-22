import { AsciiButton } from "@/components/ascii-button";
import { AsciiField } from "@/components/ascii-field";

export function Hero() {
  return (
    <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
      <div className="order-2 lg:order-1">
        <p
          className="comment rise"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          AI Full Stack Engineer · Paris
        </p>

        <h1
          className="rise mt-4 text-[clamp(2.5rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.03em]"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          Hi, I'm Kawtar Choubari
        </h1>

        <p
          className="rise mt-5 max-w-lg text-[1.35rem] leading-[1.45] text-[var(--muted)]"
          style={{ "--rise-delay": "120ms" } as React.CSSProperties}
        >
          I build 
          <span className="font-semibold text-[var(--ink)]">
            {" "}
            new products {" "}
          </span>
          and 
          <span className="font-semibold text-[var(--ink)]">
            {" "}
            fix legacy code
          </span>
        {" "} at startup speed with AI 🚀
        </p>

        <div
          className="rise mt-9 flex flex-wrap items-center gap-3"
          style={{ "--rise-delay": "180ms" } as React.CSSProperties}
        >
          <AsciiButton href="/contact">Let&apos;s work together</AsciiButton>
          <AsciiButton
            href="mailto:contact@choubari.com?subject=Speaking%20invitation"
            tone="ghost"
            external
          >
            Invite me to speak
          </AsciiButton>
        </div>
      </div>

      <AsciiField className="order-1 h-[260px] w-full sm:h-[360px] lg:order-2 lg:h-[440px]" />
    </section>
  );
}
