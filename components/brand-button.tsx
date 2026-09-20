import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrandButtonProps extends ButtonProps {
  /** "solid" is the LinkedIn-blue primary; "ghost" is the outlined secondary. */
  tone?: "solid" | "ghost";
}

/** Flat pill CTA. No shadow, no gradient, no sheen. */
export function BrandButton({
  className,
  children,
  tone = "solid",
  ...props
}: BrandButtonProps) {
  return (
    <Button
      className={cn(
        "h-auto rounded-full px-5 py-2.5 text-sm font-semibold shadow-none transition-colors duration-200",
        tone === "solid"
          ? "bg-[var(--action)] text-white hover:bg-[var(--action-deep)]"
          : "border border-[var(--rule-strong)] bg-transparent text-[var(--ink)] hover:border-[var(--action)] hover:bg-transparent hover:text-[var(--action)]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
