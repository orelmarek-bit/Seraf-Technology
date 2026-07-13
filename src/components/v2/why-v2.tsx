import { pick } from "@/content/site";
import { getPillars, getStats } from "@/content/home";
import { SectionIntro } from "./section-intro";
import { StatCounterV2 } from "./stat-counter-v2";

/** Credibility band (stats) + benefit pillars, styled for the v2 palette. */
export function WhyV2({ locale }: { locale: string }) {
  const _ = pick(locale);
  const stats = getStats(locale);
  const pillars = getPillars(locale);

  return (
    <section id="why" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionIntro
          eyebrow={_("Prečo Seraf", "Why Seraf")}
          title={_("Licencovaná ochrana, ktorá myslí", "Licensed protection that thinks")}
          subtitle={_(
            "Viac než 15 rokov skúseností, AI detekcia a napojenie na pult centrálnej ochrany.",
            "Over 15 years of experience, AI detection and a link to the central protection desk."
          )}
        />

        {/* Stats band */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounterV2 key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>

        {/* Benefit pillars */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-7 transition-colors duration-200 hover:border-primary/40"
              >
                <Icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-1 text-lg font-medium text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
