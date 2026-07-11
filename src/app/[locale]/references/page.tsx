import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Quote, Building2, SunMedium, Truck } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick } from "@/content/site";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { TestimonialSlot } from "@/components/blocks/testimonial-slot";
import { CtaSection } from "@/components/blocks/cta-section";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/references",
    title: _("Referencie", "References"),
    description: _(
      "Prípadové štúdie a referencie klientov Seraf Technology.",
      "Case studies and client references from Seraf Technology."
    ),
  });
}

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  const cases = [
    { icon: Building2, sector: _("Stavebníctvo", "Construction") },
    { icon: SunMedium, sector: _("Solárny park", "Solar farm") },
    { icon: Truck, sector: _("Logistika", "Logistics") },
  ];

  return (
    <>
      <PageHero
        kicker={_("Referencie", "References")}
        kickerIcon={Quote}
        title={_("Výsledky, nie sľuby", "Results, not promises")}
        subtitle={_(
          "Konkrétne referencie a prípadové štúdie doplníme po súhlase klientov. Zásadne nezverejňujeme vymyslené recenzie.",
          "Specific references and case studies will be added with client consent. We never publish fabricated reviews."
        )}
      />

      <Section>
        <h2 className="mb-8 text-h3 font-semibold text-foreground">{_("Prípadové štúdie", "Case studies")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-4 rounded-2xl border border-dashed border-border bg-card p-7"
            >
              <span className="absolute right-4 top-4 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {_("Pripravujeme", "Coming soon")}
              </span>
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="size-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">{c.sector}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {_(
                  "Priestor pre reálny príbeh nasadenia — rozsah objektu, výsledok a prínos pre klienta.",
                  "Space for a real deployment story — site scope, outcome and client benefit."
                )}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-card/40">
        <h2 className="mb-8 text-h3 font-semibold text-foreground">{_("Ohlasy klientov", "Client feedback")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TestimonialSlot
            placeholder
            placeholderLabel={_("Referencia", "Reference")}
            quote={_("Sem doplníme overený citát klienta.", "A verified client quote will go here.")}
            author={_("Meno klienta", "Client name")}
            role={_("Stavbyvedúci", "Site manager")}
          />
          <TestimonialSlot
            placeholder
            placeholderLabel={_("Referencia", "Reference")}
            quote={_("Priestor pre ďalšiu skutočnú referenciu.", "Room for another real reference.")}
            author={_("Prevádzkovateľ", "Operator")}
            role={_("Solárny park", "Solar farm")}
          />
        </div>
      </Section>

      <Section>
        <CtaSection
          title={_("Chcete byť našou ďalšou referenciou?", "Want to be our next reference?")}
          subtitle={_("Začnite nezáväznou cenovou ponukou.", "Start with a no-obligation quote.")}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
