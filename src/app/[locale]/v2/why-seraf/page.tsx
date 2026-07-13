import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Award, ShieldCheck, BellRing, ArrowRight, ArrowUpRight } from "lucide-react";

import { pick } from "@/content/site";
import { getPillars, getStats } from "@/content/home";
import { routing, Link } from "@/i18n/routing";
import { ShellV2, PageIntroV2 } from "@/components/v2/shell-v2";
import { StatCounterV2 } from "@/components/v2/stat-counter-v2";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return {
    title: _("Prečo Seraf · Seraf Technology", "Why Seraf · Seraf Technology"),
    description: _(
      "15+ rokov skúseností, oficiálna licencia a napojenie na PCO. Ochrana objektu v správnych rukách.",
      "15+ years of experience, an official licence and PCO connection. Site security in the right hands."
    ),
    robots: { index: false, follow: false },
  };
}

export default async function V2WhySerafPage({ params }: { params: Promise<{ locale: string }> }) {
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
      href: "/docs/seraf-licencia.pdf",
      linkLabel: _("Zobraziť licenciu", "View the licence"),
    },
    {
      icon: BellRing,
      title: _("Napojenie na PCO", "Connected to PCO"),
      description: _(
        "Poplachy smerujú na pult centrálnej ochrany s reálnou reakciou.",
        "Alarms route to a central protection desk with a real response."
      ),
    },
  ];

  return (
    <ShellV2 locale={locale}>
      <PageIntroV2
        eyebrow={_("Prečo Seraf", "Why Seraf")}
        title={_("Bezpečnosť objektu v správnych rukách", "Site security in the right hands")}
        subtitle={_(
          "Spájame overenú technológiu, umelú inteligenciu a licencovanú službu s dôrazom na skutočnú reakciu na hrozby.",
          "We combine proven technology, artificial intelligence and a licensed service with a focus on a real response to threats."
        )}
      />

      {/* Credentials */}
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {credentials.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-7">
              <Icon className="size-6 text-primary" aria-hidden />
              <h2 className="mt-1 text-lg font-medium text-foreground">{c.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              {c.href && (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-v2 mt-auto inline-flex items-center gap-1.5 pt-2 text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
                >
                  {c.linkLabel}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats band */}
      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
        {stats.map((s) => (
          <StatCounterV2 key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </div>

      {/* Pillars */}
      <div className="mt-24">
        <h2 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
          {_("Čo nás odlišuje", "What sets us apart")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-7">
                <Icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-1 text-lg font-medium text-foreground">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-col items-center rounded-lg border border-border bg-card/40 px-6 py-14 text-center">
        <h2 className="font-display-v2 max-w-[20ch] text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05]">
          {_("Zverte ochranu odborníkom", "Trust your protection to specialists")}
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          {_("Získajte nezáväznú ponuku na mieru do 24 hodín.", "Get a tailored, no-obligation quote within 24 hours.")}
        </p>
        <Link
          href="/v2/quote"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
        >
          {_("Nezáväzná ponuka", "Request a quote")}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </ShellV2>
  );
}
