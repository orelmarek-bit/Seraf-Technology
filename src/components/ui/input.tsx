import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-background px-3.5 text-sm transition-colors placeholder:text-muted-foreground/70 hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
