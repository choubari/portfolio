import { cn } from "@/lib/utils";

interface BrandTagProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Outlined capsule, matching the skill pills on the choubari.com banner:
 * gold hairline border, gold label, transparent fill.
 */
export function BrandTag({ className, children }: BrandTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[var(--gold)]/45 px-4 py-1.5",
        "text-sm font-medium text-[var(--gold)]",
        "transition-colors duration-500 ease-ease hover:border-[var(--gold)] hover:bg-[var(--gold)]/10",
        className
      )}
    >
      {children}
    </span>
  );
}
