import { cn } from "@/lib/utils";

interface PageTitleProps {
  children: React.ReactNode;
  /** The `// comment` line above the title. */
  comment?: string;
  lede?: React.ReactNode;
  className?: string;
}

/** Page heading: a `// comment` line, a tight display line, an optional lede. */
export function PageTitle({
  children,
  comment,
  lede,
  className,
}: PageTitleProps) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
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
