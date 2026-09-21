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
        "h-auto rounded-[6px] px-6 py-3 text-[0.9375rem] font-semibold shadow-none transition-colors duration-200",
        tone === "solid" &&
          "bg-[var(--brown)] text-white hover:bg-[var(--brown-deep)]",
        tone === "ghost" &&
          "border-2 border-[var(--brown)] bg-transparent text-[var(--brown)] hover:bg-[var(--brown)] hover:text-white",
        tone === "invert" &&
          "bg-[var(--paper)] text-[var(--brown)] hover:bg-white",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
