import { cn } from "@/lib/utils";

interface PageTitleProps {
  children: React.ReactNode;
  /** The accent glyph that closes the title — "." by default, sometimes "?" or "!". */
  tick?: string;
  /** Mono eyebrow above the title, e.g. "01 / Selected work". */
  eyebrow?: string;
  /** Supporting line below the title. */
  lede?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

/**
 * The page-level heading used across every route: a mono eyebrow, a large
 * tight display line closed by a gold glyph, and an optional lede.
 */
export function PageTitle({
  children,
  tick = ".",
  eyebrow,
  lede,
  className,
  align = "left",
}: PageTitleProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <span className="label-mono rise">{eyebrow}</span>}
      <h1
        className="display rise text-balance"
        style={{ "--rise-delay": "70ms" } as React.CSSProperties}
      >
        {children}
        <span className="tick">{tick}</span>
      </h1>
      {lede && (
        <p
          className="rise max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
          style={{ "--rise-delay": "140ms" } as React.CSSProperties}
        >
          {lede}
        </p>
      )}
    </header>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  tick?: string;
  /** Two-digit section index, e.g. "02". */
  index?: string;
  kicker?: string;
  className?: string;
}

/** Section-level heading: a numbered mono rail plus a medium display line. */
export function SectionTitle({
  children,
  tick = ".",
  index,
  kicker,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {(index || kicker) && (
        <span className="label-mono">
          {index && <span className="text-[var(--gold)]">{index}</span>}
          {index && kicker && " / "}
          {kicker}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-display sm:text-4xl">
        {children}
        <span className="tick">{tick}</span>
      </h2>
    </div>
  );
}
