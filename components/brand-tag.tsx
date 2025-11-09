import { cn } from "@/lib/utils";

interface BrandTagProps {
  className?: string;
  children: React.ReactNode;
}

export function BrandTag({ className, children }: BrandTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-brand-light/20 text-brand-text border border-brand-light/30 rounded-md text-lg font-medium px-4 py-1",
        className
      )}
    >
      {children}
    </div>
  );
}
