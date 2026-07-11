import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Sparkles, ShieldCheck, Award, MapPin } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick } from "@/content/site";
import { getPillars, getStats } from "@/content/home";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { StatCounter } from "@/components/blocks/stat-counter";
import { CtaSection } from "@/components/blocks/cta-section";
import { Reveal } from "@/components/blocks/reveal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/why-seraf",
    title: _("Prečo Seraf", "Why Seraf"),
    description: _(
      "15+ rokov skúseností, oficiálna licencia a napojenie na PCO. Ochrana objektu v správnych rukách.",
      "15+ years of experience, an official licence and PCO connection. Site security in the right hands."
    ),
  });
}

export default async function WhySerafPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const pillars = getPillars(locale);
  const stats = getStats(locale);

  const credentials = [
    {
      icon: Award,
      title: _("15+ rokov skúseností", "15+ years of experience"),
      description: _(
        "Dlhoročná prax v monitoringu a ochrane objektov na Slovensku.",
        "Long-standing experience in monitoring and property protection in Slovakia."
      ),
    },
    {
      icon: ShieldCheck,
      title: _("Oficiálna licencia", "Official licence"),
      description: _(
        "Držíme licenciu na prevádzkovanie technickej služby ochrany.",
        "We hold a licence to operate a technical security service."
      ),
    },
    {
      icon: MapPin,
      title: _("Napojenie na PCO", "Connected to PCO"),
      description: _(
        "Poplachy smerujú na pult centrálnej ochrany s reálnou reakciou.",
        "Alarms route to a central protection desk with a real response."
      ),
    },
  ];

  return (
    <>
      <PageHero
        kicker={_("Prečo Seraf", "Why Seraf")}
        kickerIcon={Sparkles}
        title={_("Bezpečnosť objektu v správnych rukách", "Site security in the right hands")}
        subtitle={_(
          "Spájame overenú technológiu, umelú inteligenciu a licencovanú službu s dôrazom na skutočnú reakciu na hrozby.",
          "We combine proven technology, artificial intelligence and a licensed service with a focus on a real response to threats."
        )}
      />

      {/* Credentials */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {credentials.map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-7">
              <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="size-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <div className="border-y border-border bg-card/40">
        <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>

      {/* Pillars */}
      <Section>
        <h2 className="mb-10 text-h2 font-semibold text-gradient">
          {_("Čo nás odlišuje", "What sets us apart")}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <CtaSection
          title={_("Zverte ochranu odborníkom", "Trust your protection to specialists")}
          subtitle={_("Získajte nezáväznú ponuku na mieru.", "Get a tailored, no-obligation quote.")}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
