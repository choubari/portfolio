import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrandButtonProps extends ButtonProps {
  /** "solid" is the gold primary CTA; "ghost" is the outlined secondary. */
  tone?: "solid" | "ghost";
}

/**
 * Primary call to action. Gold fill on ink, with a sheen that wipes across
 * on hover — the one loud element on an otherwise restrained page.
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
        "group relative h-auto overflow-hidden rounded-full px-7 py-3 text-base font-medium",
        "transition-all duration-500 ease-ease hover:-translate-y-0.5",
        tone === "solid"
          ? "bg-[var(--gold)] text-[var(--paper)] hover:bg-[var(--gold)] hover:shadow-[0_8px_30px_-8px_rgba(247,232,74,0.45)]"
          : "border border-[var(--rule-strong)] bg-transparent text-[var(--text)] hover:border-[var(--gold)] hover:bg-transparent hover:text-[var(--gold)]",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {tone === "solid" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-ease group-hover:translate-x-full motion-reduce:hidden"
        />
      )}
    </Button>
  );
}
