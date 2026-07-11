import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GitCompareArrows } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick } from "@/content/site";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { CompareTable } from "@/components/blocks/compare-table";
import { CtaSection } from "@/components/blocks/cta-section";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/products/compare",
    title: _("Porovnanie veží", "Compare towers"),
    description: _(
      "Porovnajte modely BASIC, BASIC SOLAR a PRO Lights podľa napájania, batérie, zoomu a ďalších funkcií.",
      "Compare BASIC, BASIC SOLAR and PRO Lights by power, battery, zoom and other features."
    ),
  });
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  const rows = [
    { feature: _("Solárne napájanie", "Solar power"), values: [false, true, false] },
    { feature: _("AI detekcia", "AI detection"), values: [true, true, true] },
    { feature: _("360° kamera", "360° camera"), values: [true, true, true] },
    { feature: _("Optický zoom", "Optical zoom"), values: ["—", "—", "31×"] },
    { feature: _("Záloha batérie", "Battery backup"), values: [_("5 dní", "5 days"), _("10 dní", "10 days"), _("32 hodín", "32 hours")] },
    { feature: _("Reflektory", "Floodlights"), values: [false, false, "520 Nm"] },
    { feature: _("Siréna", "Siren"), values: [_("Maják", "Strobe"), "121 dB", "121 dB"] },
    { feature: _("Konektivita LTE 4G", "LTE 4G connectivity"), values: [true, true, true] },
    { feature: _("Mobilná aplikácia", "Mobile app"), values: [true, true, true] },
  ];

  return (
    <>
      <PageHero
        kicker={_("Porovnanie", "Comparison")}
        kickerIcon={GitCompareArrows}
        title={_("Porovnajte strážne veže", "Compare the towers")}
        subtitle={_(
          "Rýchly prehľad rozdielov medzi modelmi BASIC, BASIC SOLAR a PRO Lights.",
          "A quick overview of the differences between BASIC, BASIC SOLAR and PRO Lights."
        )}
      />
      <Section>
        <CompareTable
          featureLabel={_("Funkcia", "Feature")}
          products={["BASIC", "BASIC SOLAR", "PRO Lights"]}
          highlightIndex={1}
          rows={rows}
        />
      </Section>
      <Section className="pt-0">
        <CtaSection
          title={_("Pomôžeme vám vybrať", "We'll help you choose")}
          subtitle={_(
            "Napíšte nám parametre objektu a odporučíme najvhodnejšiu vežu.",
            "Send us your site details and we'll recommend the best-fit tower."
          )}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
