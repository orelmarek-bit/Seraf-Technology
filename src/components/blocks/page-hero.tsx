import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  kicker,
  kickerIcon: Icon,
  title,
  subtitle,
}: {
  kicker?: string;
  kickerIcon?: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(90%,720px)] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/15 blur-[110px]"
        aria-hidden
      />
      <div className="container relative py-16 sm:py-20">
        {kicker && (
          <Badge variant="primary" className="mb-5">
            {Icon && <Icon className="size-3.5" />}
            {kicker}
          </Badge>
        )}
        <h1 className="max-w-3xl text-display font-semibold text-gradient">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}
