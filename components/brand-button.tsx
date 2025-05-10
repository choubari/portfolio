import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BrandButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-blue-500 hover:bg-blue-400/30 text-white rounded-full text-lg px-6 py-3 h-auto",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
