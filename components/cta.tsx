import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * The closing call to action: a full-bleed brown block with the question as
 * the headline. Deliberately the loudest thing on the page — the previous
 * version was two buttons under a hairline.
 */
export function CallToAction() {
  return (
    <section className="bleed mt-8 bg-[var(--brown)] text-[var(--paper)]">
      <div className="mx-auto max-w-5xl px-[var(--edge)] py-20 sm:py-28">
        <p className="font-mono text-sm text-[var(--paper)]/70">
          // good things start with a conversation
        </p>

        {/* TODO(copy): yours to rewrite. */}
        <h2 className="mt-5 max-w-3xl text-[clamp(2.25rem,5.2vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
          What are you
          <br />
          building?
        </h2>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--paper)]/80">
          A product to ship fast, a React Native app, or a stage that needs a
          speaker. Tell me about it.
        </p>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-between gap-6 rounded-[6px] bg-[var(--paper)] px-7 py-4 text-base font-bold text-[var(--brown)] transition-colors hover:bg-white"
          >
            LET&apos;S WORK TOGETHER
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <a
            href="mailto:contact@choubari.com?subject=Speaking%20invitation"
            className="font-mono text-sm uppercase tracking-[0.12em] text-[var(--paper)] underline decoration-[var(--accent-soft)] decoration-2 underline-offset-[6px] transition-colors hover:decoration-[var(--paper)]"
          >
            or invite me to speak
          </a>
        </div>
      </div>
    </section>
  );
}
