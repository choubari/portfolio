import { cn } from "@/lib/utils";

interface BrandTagProps {
  className?: string;
  children: React.ReactNode;
}

export function BrandTag({ className, children }: BrandTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-blue-400/20 text-blue-200 border border-blue-400/30 rounded-md text-lg font-medium px-4 py-1",
        className
      )}
    >
      {children}
    </div>
  );
}
