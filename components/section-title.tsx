import { cn } from "@/lib/utils";
import { AsciiMark } from "@/components/ascii-mark";

interface PageTitleProps {
  children: React.ReactNode;
  /** The `// comment` line above the title. */
  comment?: string;
  lede?: React.ReactNode;
  className?: string;
  /** Name of the ASCII glyph shown beside the title. */
  mark?: string;
}

/** Page heading: a `// comment` line, a tight display line, an optional lede. */
export function PageTitle({
  children,
  comment,
  lede,
  className,
  mark = "rocket",
}: PageTitleProps) {
  return (
    <header className={cn("flex items-start justify-between gap-6", className)}>
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
      <AsciiMark name={mark} className="rise mt-1 hidden sm:block" />
    </header>
  );
}

interface SectionTitleProps {
  children: React.ReactNode;
  /** Right-hand link, e.g. { label: "All talks", href: "/talks" } */
  action?: { label: string; href: string };
  className?: string;
}

/**
 * Section heading. A `// comment` label and an optional inline action on the
 * same baseline — no big display type competing with the page title.
 */
export function SectionTitle({
  children,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-[var(--rule)] pb-3",
        className
      )}
    >
      <h2 className="comment">{children}</h2>
      {action && (
        <a
          href={action.href}
          className="mono text-[var(--action)] transition-colors hover:text-[var(--action-deep)]"
        >
          {action.label} →
        </a>
      )}
    </div>
  );
}
