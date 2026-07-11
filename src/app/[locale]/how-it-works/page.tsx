import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Radar } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { pick } from "@/content/site";
import { getSteps, getFaqs } from "@/content/home";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { StepTimeline } from "@/components/blocks/step-timeline";
import { SectionHeading } from "@/components/blocks/section-heading";
import { Faq } from "@/components/blocks/faq";
import { CtaSection } from "@/components/blocks/cta-section";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/how-it-works",
    title: _("Ako to funguje", "How it works"),
    description: _(
      "Nasadenie, AI detekcia, odstrašenie a reakcia napojená na PCO — ochrana objektu v štyroch krokoch.",
      "Deployment, AI detection, deterrence and a PCO-connected response — site protection in four steps."
    ),
  });
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const steps = getSteps(locale);
  const faqs = getFaqs(locale).slice(0, 4);

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        kicker={_("Ako to funguje", "How it works")}
        kickerIcon={Radar}
        title={_("Ochrana v štyroch krokoch", "Protection in four steps")}
        subtitle={_(
          "Od objednávky po nepretržitý dohľad — jednoducho a rýchlo, bez budovania infraštruktúry.",
          "From order to continuous monitoring — simple and fast, with no infrastructure to build."
        )}
      />

      <Section>
        <StepTimeline steps={steps} />
      </Section>

      <Section className="border-y border-border bg-card/40">
        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-border bg-background p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-5" />
                </span>
                <span className="font-display text-sm font-semibold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading title={_("Časté otázky", "Frequently asked questions")} />
          <Faq items={faqs} />
        </div>
      </Section>

      <Section className="pt-0">
        <CtaSection
          title={_("Pripravení začať?", "Ready to start?")}
          subtitle={_("Vežu nasadíme do 48 hodín.", "We'll deploy your tower within 48 hours.")}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
