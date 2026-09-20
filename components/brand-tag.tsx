import { cn } from "@/lib/utils";

interface BrandTagProps {
  className?: string;
  children: React.ReactNode;
}

/** Mono tech tag — a hairline box, no fill. */
export function BrandTag({ className, children }: BrandTagProps) {
  return <span className={cn("tag", className)}>{children}</span>;
}
