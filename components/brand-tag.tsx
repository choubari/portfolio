import { cn } from "@/lib/utils";

/** Static metadata chip. Filled, so it never reads as clickable. */
export function BrandTag({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <span className={cn("chip", className)}>{children}</span>;
}
