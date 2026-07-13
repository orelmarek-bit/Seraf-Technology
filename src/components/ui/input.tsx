import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        // text-base below md prevents iOS Safari's auto-zoom on focus (<16px inputs)
        "flex h-11 w-full rounded-md border border-input bg-background px-3.5 text-base transition-colors placeholder:text-muted-foreground/70 hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger md:text-sm",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
