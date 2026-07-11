import { ArrowRight, Phone } from "lucide-react";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export interface CtaSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref?: string;
  phone?: string;
  phoneLabel?: string;
}

export function CtaSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/quote",
  phone = "+421944433658",
  phoneLabel = "+421 944 433 658",
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card px-6 py-14 sm:px-12 sm:py-16">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="text-h1 font-semibold text-gradient">{title}</h2>
        {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={ctaHref}>
              {ctaLabel} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={`tel:${phone}`}>
              <Phone className="size-4" /> {phoneLabel}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
