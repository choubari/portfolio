import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BrandButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-brand-medium hover:bg-brand-light/30 text-white rounded-full text-base px-6 py-3 h-auto",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
