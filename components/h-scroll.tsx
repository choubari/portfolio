import { cn } from "@/lib/utils";

/**
 * Horizontal rail.
 *
 * Content stays inside the page container — it does NOT bleed past the
 * left edge, so the first card lines up with the section heading above it.
 * Overflow is clipped at the container's right edge, which is what shows
 * there is more to scroll to.
 *
 * `rows={2}` lays the items out in two rows that scroll sideways together.
 */
export function HScroll({
  children,
  itemClassName,
  rows = 1,
  className,
}: {
  children: React.ReactNode;
  /** Width of each item, e.g. "w-[23rem]" or "w-[calc(50%-0.625rem)]". */
  itemClassName?: string;
  rows?: 1 | 2;
  className?: string;
}) {
  const items = Array.isArray(children) ? children.flat() : [children];

  if (rows === 2) {
    return (
      <div className={cn("hscroll overflow-x-auto pb-3", className)}>
        <div className="grid auto-cols-[minmax(0,22rem)] grid-flow-col grid-rows-2 gap-5">
          {items.map((child, i) => (
            <div key={i} className="min-w-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "hscroll flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3",
        className
      )}
    >
      {items.map((child, i) => (
        <div
          key={i}
          className={cn("shrink-0 snap-start", itemClassName ?? "w-[21rem]")}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
