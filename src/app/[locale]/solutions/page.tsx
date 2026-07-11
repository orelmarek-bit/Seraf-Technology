import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LayoutGrid } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick } from "@/content/site";
import { getSolutions } from "@/content/solutions";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { UseCaseCard } from "@/components/blocks/use-case-card";
import { CtaSection } from "@/components/blocks/cta-section";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/solutions",
    title: _("Využitie", "Solutions"),
    description: _(
      "Ochrana stavieb, solárnych parkov, podujatí, parkovísk, nehnuteľností a priemyselných areálov.",
      "Protection for construction sites, solar farms, events, parking, real estate and industrial areas."
    ),
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const solutions = getSolutions(locale);

  return (
    <>
      <PageHero
        kicker={_("Využitie", "Solutions")}
        kickerIcon={LayoutGrid}
        title={_("Ochrana pre každé prostredie", "Protection for every environment")}
        subtitle={_(
          "Od staveniskám cez solárne parky až po podujatia — vežu prispôsobíme vášmu objektu.",
          "From construction sites to solar farms to events — we tailor the tower to your site."
        )}
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <UseCaseCard
              key={s.slug}
              icon={s.icon}
              title={s.title}
              description={s.short}
              href={`/solutions/${s.slug}`}
            />
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <CtaSection
          title={_("Máte iný typ objektu?", "A different kind of site?")}
          subtitle={_("Ozvite sa nám a nájdeme riešenie na mieru.", "Get in touch and we'll find a tailored solution.")}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
