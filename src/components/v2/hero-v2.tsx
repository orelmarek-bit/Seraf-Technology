import { ArrowRight, ArrowDown } from "lucide-react";

import { Link } from "@/i18n/routing";
import { pick } from "@/content/site";
import { SpecTicker } from "./spec-ticker";

export function HeroV2({ locale }: { locale: string }) {
  const _ = pick(locale);

  const specs = [
    _("24/7 autonómny monitoring", "24/7 autonomous monitoring"),
    _("360° pokrytie · bez slepých miest", "360° coverage · no blind spots"),
    _("Nasadenie do 48 hodín", "Deployed within 48 hours"),
    _("AI detekcia hrozieb", "AI threat detection"),
  ];

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Aurora glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/3" aria-hidden>
        <div className="aurora-v2 absolute inset-0" />
      </div>
      {/* Fine grid, masked toward the glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, #5c9cff 1px, transparent 1px), linear-gradient(to bottom, #5c9cff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 60% at 50% 60%, black, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 60%, black, transparent 100%)",
        }}
      />

      {/* Headline + CTA pair */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-9 px-6">
        <h1 className="font-display-v2 text-gradient-v2 max-w-[14ch] text-center leading-[0.98] text-[clamp(2.9rem,8.2vw,7rem)]">
          {_("Každý pohyb pod kontrolou", "Every movement under control")}
        </h1>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
          >
            {_("Nezáväzná ponuka", "Request a quote")}
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="#how"
            className="font-mono-v2 inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm text-foreground/80 transition-colors duration-200 hover:border-primary/50 hover:text-foreground"
          >
            {_("Ako to funguje", "See how it works")}
            <ArrowDown className="size-4 text-primary" />
          </a>
        </div>
      </div>

      {/* Bottom row: subline + spec ticker */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-6 pb-10 sm:flex-row sm:items-end sm:justify-between sm:px-10">
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {_(
            "Autonómne mobilné strážne veže s AI kamerou a solárnym napájaním — ochrana objektu nasadená do 48 hodín.",
            "Autonomous mobile surveillance towers with an AI camera and solar power — site protection deployed within 48 hours."
          )}
        </p>
        <SpecTicker items={specs} />
      </div>
    </section>
  );
}
