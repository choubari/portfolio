import { cn } from "@/lib/utils";
import { AsciiMark } from "@/components/ascii-mark";

interface PageTitleProps {
  children: React.ReactNode;
  comment?: string;
  lede?: React.ReactNode;
  className?: string;
  /** Name of the ASCII glyph shown beside the title. */
  mark?: string;
}

export function PageTitle({
  children,
  comment,
  lede,
  className,
  mark,
}: PageTitleProps) {
  return (
    <header className={cn("flex items-start justify-between gap-8", className)}>
      <div className="flex min-w-0 flex-col gap-3">
        {comment && <span className="comment rise">{comment}</span>}
        <h1
          className="display rise text-balance"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          {children}
        </h1>
        {lede && (
          <p
            className="rise mt-1 max-w-2xl text-lg leading-relaxed text-[var(--muted)]"
            style={{ "--rise-delay": "120ms" } as React.CSSProperties}
          >
            {lede}
          </p>
        )}
      </div>
      {mark && <AsciiMark name={mark} className="rise hidden shrink-0 sm:block" />}
    </header>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  action?: { label: string; href: string };
  /** Optional count shown next to the heading, e.g. 25 */
  count?: number | string;
  className?: string;
}

/**
 * Section heading. One rule underneath and nothing else — the previous
 * version paired its own border with a bordered list and produced doubles.
 */
export function SectionTitle({
  children,
  action,
  count,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
        className
      )}
    >
      <h2 className="section-head">
        {children}
        {count !== undefined && (
          <span className="font-mono text-base font-medium text-[var(--brown-soft)]">
            ({count})
          </span>
        )}
      </h2>
      {action && (
        <a
          href={action.href}
          className="mono font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-deep)]"
        >
          {action.label} →
        </a>
      )}
    </div>
  );
}
