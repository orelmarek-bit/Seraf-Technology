import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm transition-colors placeholder:text-muted-foreground/70 hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
