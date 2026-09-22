import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * CTA button.
 *
 * The arrow lives in a fixed, overflow-hidden slot: on hover the visible
 * glyph slides out to the right while an identical one slides in from the
 * left, so the arrow reads as travelling without the button ever changing
 * size. Pure CSS — the previous version animated a character trail in JS
 * and it overflowed its slot as a stray rule.
 */
export function AsciiButton({
  href,
  children,
  tone = "solid",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "solid" | "ghost" | "invert" | "accent" | "accent-ghost";
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "group inline-flex h-12 items-center gap-2.5 rounded-sm border-2 px-5",
    "text-[0.9375rem] font-semibold transition-colors duration-200",
    tone === "solid" &&
      "border-[var(--brown)] bg-[var(--brown)] text-white hover:border-[var(--brown-deep)] hover:bg-[var(--brown-deep)]",
    tone === "ghost" &&
      "border-[var(--brown)] bg-transparent text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white",
    tone === "invert" &&
      "border-[var(--paper)] bg-[var(--paper)] text-[var(--brown)] hover:bg-white",
    tone === "accent" &&
      "border-[var(--accent)] bg-[var(--accent)] text-white hover:border-[var(--accent-deep)] hover:bg-[var(--accent-deep)]",
    tone === "accent-ghost" &&
      "border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
    className
  );

  const body = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="relative block h-[1em] w-[1.1em] overflow-hidden font-mono"
      >
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-ease group-hover:translate-x-[140%] motion-reduce:transition-none">
          →
        </span>
        <span className="absolute inset-0 flex -translate-x-[140%] items-center justify-center transition-transform duration-300 ease-ease group-hover:translate-x-0 motion-reduce:hidden">
          →
        </span>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {body}
    </Link>
  );
}
