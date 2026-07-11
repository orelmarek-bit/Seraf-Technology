import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  name: string;
  tagline: string;
  features: string[];
  href: string;
  ctaLabel: string;
  icon?: LucideIcon;
  highlighted?: boolean;
  highlightLabel?: string;
}

export function ProductCard({
  name,
  tagline,
  features,
  href,
  ctaLabel,
  icon: Icon,
  highlighted,
  highlightLabel,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-card p-7 transition-all duration-300",
        highlighted
          ? "border-primary/40 shadow-glow"
          : "border-border hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
      )}
    >
      {highlighted && highlightLabel && (
        <Badge variant="primary" className="absolute -top-3 left-7">
          {highlightLabel}
        </Badge>
      )}

      <div className="mb-5 flex items-center gap-3">
        {Icon && (
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </span>
        )}
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{tagline}</p>
        </div>
      </div>

      <ul className="mb-7 space-y-3 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-foreground/90">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button asChild variant={highlighted ? "primary" : "outline"} className="mt-auto w-full">
        <Link href={href}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
