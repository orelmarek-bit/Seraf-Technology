import { ArrowRight, ShieldCheck, Radar, Clock, ScanEye } from "lucide-react";

import { Link } from "@/i18n/routing";
import { pick } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HomeHero({ locale }: { locale: string }) {
  const _ = pick(locale);

  const trust = [
    { icon: ShieldCheck, label: _("Licencovaná služba", "Licensed service") },
    { icon: Clock, label: _("15+ rokov skúseností", "15+ years of experience") },
    { icon: Radar, label: _("Monitoring 24/7", "24/7 monitoring") },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden
      />

      <div className="container relative grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        {/* Copy */}
        <div>
          <Badge variant="primary" className="mb-6">
            <Radar className="size-3.5" />
            {_("Autonómne strážne veže", "Autonomous surveillance towers")}
          </Badge>

          <h1 className="text-display-lg font-semibold text-gradient">
            {_("Chráňte svoj objekt.", "Protect your site.")}{" "}
            <span className="text-primary">{_("Každý pohyb pod kontrolou.", "Every movement under control.")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {_(
              "Mobilné strážne veže s AI kamerou a solárnym napájaním zastavia krádeže a vandalizmus na nestrážených objektoch — nasadené do 48 hodín.",
              "Mobile surveillance towers with an AI camera and solar power stop theft and vandalism on unmanned sites — deployed within 48 hours."
            )}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/quote">
                {_("Získať cenovú ponuku", "Get a quote")} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/how-it-works">{_("Ako to funguje", "How it works")}</Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trust.map((t) => (
              <li key={t.label} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <t.icon className="size-4 text-primary" />
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: radar + detection card */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full border border-border" />
          <div className="absolute inset-[12%] rounded-full border border-border" />
          <div className="absolute inset-[28%] rounded-full border border-border" />
          <div className="absolute inset-[44%] rounded-full border border-primary/30" />
          {/* Sweep */}
          <div className="absolute inset-0 animate-radar-sweep rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--primary)/0.25)_55deg,transparent_60deg)]" />
          {/* Center */}
          <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
          {/* Pulse blips */}
          <span className="absolute left-[68%] top-[38%] size-2.5 rounded-full bg-primary">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/60" />
          </span>
          <span className="absolute left-[34%] top-[64%] size-2 rounded-full bg-primary/70" />

          {/* Floating detection card */}
          <div className="absolute -bottom-2 -left-2 w-56 rounded-xl border border-border bg-card/95 p-3.5 shadow-lift backdrop-blur sm:-left-6">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <ScanEye className="size-4" />
              </span>
              <div className="text-xs">
                <p className="font-medium text-foreground">{_("Detekcia pohybu", "Motion detected")}</p>
                <p className="text-muted-foreground">{_("Perimeter · Sektor B", "Perimeter · Sector B")}</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                <span className="size-1.5 rounded-full bg-success" />
                {_("Aktívne", "Live")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
