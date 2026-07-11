import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialSlotProps {
  quote: string;
  author: string;
  role: string;
  /** When true, renders a visible "placeholder" affordance — no fabricated proof. */
  placeholder?: boolean;
  placeholderLabel?: string;
}

export function TestimonialSlot({
  quote,
  author,
  role,
  placeholder,
  placeholderLabel = "Placeholder",
}: TestimonialSlotProps) {
  return (
    <figure
      className={cn(
        "relative flex flex-col gap-6 rounded-2xl border bg-card p-8",
        placeholder ? "border-dashed border-border" : "border-border shadow-soft"
      )}
    >
      {placeholder && (
        <span className="absolute right-4 top-4 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {placeholderLabel}
        </span>
      )}
      <Quote className="size-8 text-primary/40" aria-hidden />
      <blockquote className="text-lg leading-relaxed text-foreground">“{quote}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <span
          className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary"
          aria-hidden
        >
          {author.slice(0, 1)}
        </span>
        <span className="text-sm">
          <span className="block font-medium text-foreground">{author}</span>
          <span className="block text-muted-foreground">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
