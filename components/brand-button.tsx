import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrandButtonProps extends ButtonProps {
  /** "solid" = brown primary, "ghost" = outlined, "invert" = on dark grounds. */
  tone?: "solid" | "ghost" | "invert";
}

/**
 * One button shape across the whole site: a 6px radius, never a pill and
 * never a hard square. Primary is brown, not accent blue — the blue pill
 * read as a LinkedIn button.
 */
export function BrandButton({
  className,
  children,
  tone = "solid",
  ...props
}: BrandButtonProps) {
  return (
    <Button
      className={cn(
        // Fixed height + a border on every tone, so solid and ghost are
        // always the same box.
        "inline-flex h-12 items-center rounded-[6px] border-2 px-6 text-[0.9375rem] font-semibold shadow-none transition-colors duration-200",
        tone === "solid" &&
          "border-[var(--brown)] bg-[var(--brown)] text-white hover:border-[var(--brown-deep)] hover:bg-[var(--brown-deep)]",
        tone === "ghost" &&
          "border-[var(--brown)] bg-transparent text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white",
        tone === "invert" &&
          "border-[var(--paper)] bg-[var(--paper)] text-[var(--brown)] hover:bg-white",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
