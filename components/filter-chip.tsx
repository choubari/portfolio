"use client";

import { cn } from "@/lib/utils";

/**
 * The one filter control, shared by /talks and /testimonials — they had
 * drifted into two different styles.
 */
export function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm px-3 py-1.5 font-mono text-sm font-medium transition-colors",
        active
          ? "bg-[var(--brown)] text-white"
          : "bg-[var(--brown)]/10 text-[var(--brown)] hover:bg-[var(--brown)]/20"
      )}
    >
      {label}
    </button>
  );
}
