import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Three-up feature card.
 *
 * Blue ground and blue edge, so these read as their own family rather than
 * yet another clay card. The icon is the anchor — large, unboxed, accent
 * coloured — and hover moves the card, not the icon's background.
 */
export function FeatureCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-md p-6 sm:p-7",
        "border-2 border-[var(--accent)]/35 bg-[var(--card-blue)]",
        "transition-all duration-300 ease-ease",
        "hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-[var(--card-blue-hover)]",
        className
      )}
    >
      <Icon
        className="h-9 w-9 text-[var(--accent)]"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <h3 className="mt-6 text-lg font-bold leading-snug">{title}</h3>

      {/* Rule draws out from the left on hover */}
      <span
        aria-hidden="true"
        className="mt-3 h-px w-8 origin-left bg-[var(--accent)] transition-transform duration-500 ease-ease group-hover:scale-x-[4]"
      />

      <p className="mt-3 leading-relaxed text-sm text-[var(--muted)]">{children}</p>
    </article>
  );
}
