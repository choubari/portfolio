import { cn } from "@/lib/utils";

interface PageTitleProps {
  children: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
}

export function PageTitle({
  children,
  lede,
  className,
}: PageTitleProps) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
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
    </header>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  action?: { label: string; href: string };
  /** Optional count shown next to the heading, e.g. 25 */
  count?: number | string;
  /** Anchor id. Defaults to a slug of the heading text. */
  id?: string;
  className?: string;
}

/** "selected work" -> "selected-work" */
function slugify(node: React.ReactNode): string {
  return String(node)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Section heading. One rule underneath and nothing else — the previous
 * version paired its own border with a bordered list and produced doubles.
 */
export function SectionTitle({
  children,
  action,
  count,
  id,
  className,
}: SectionTitleProps) {
  const anchor = id ?? slugify(children);
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
        className
      )}
    >
      <h2 id={anchor} className="section-head scroll-mt-24">
        {/* The whole heading is the anchor link. */}
        <a
          href={`#${anchor}`}
          className="transition-colors hover:text-[var(--accent)]"
        >
          {children}
        </a>
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
