import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Link } from "@/i18n/routing";

export interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export function UseCaseCard({ icon: Icon, title, description, href }: UseCaseCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}
