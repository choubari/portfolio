import { AsciiButton } from "@/components/ascii-button";
import { AsciiField } from "@/components/ascii-field";

/**
 * The closing call to action: a full-bleed brown block with the question as
 * the headline. Deliberately the loudest thing on the page — the previous
 * version was two buttons under a hairline.
 */
export function CallToAction() {
  return (
    <section className="bleed mt-8 bg-[var(--brown)] text-[var(--paper)]">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-[var(--edge)] py-20 sm:py-28 lg:grid-cols-[1fr_0.8fr]">
        <div>

        <h2 className="max-w-3xl text-[clamp(2.25rem,5.2vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
          Seen enough?
          <br />
          Let&apos;s talk.
        </h2>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--paper-80)]">
          If you're building a product or need help untangling a legacy one, that's the work I want to hear about
        </p>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <AsciiButton href="/contact" tone="invert">
            LET&apos;S WORK TOGETHER
          </AsciiButton>

          <a
            href="mailto:contact@choubari.com?subject=Speaking%20invitation"
            className="font-mono text-sm uppercase tracking-[0.12em] text-[var(--paper)] underline decoration-[var(--accent-soft)] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[var(--paper)]"
          >
            or invite me to speak
          </a>
        </div>
        </div>

        {/* Fills the dead space on the right. The field reads its colours
            from CSS variables, so re-pointing them here is enough to put
            it on the dark ground. */}
        <AsciiField
          className="hidden h-[340px] w-full lg:block"
          style={
            {
              "--accent": "var(--paper)",
              "--brown-soft": "rgba(245,242,237,0.45)",
            } as React.CSSProperties
          }
        />
      </div>
    </section>
  );
}
