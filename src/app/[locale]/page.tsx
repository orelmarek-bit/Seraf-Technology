import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Radar, ShieldAlert, Boxes, Sparkles, LayoutGrid } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";
import { pick } from "@/content/site";
import { getStats, getSteps, getPillars, getFaqs } from "@/content/home";
import { getProducts } from "@/content/products";
import { getSolutions } from "@/content/solutions";

import { HomeHero } from "@/components/blocks/home-hero";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/blocks/section-heading";
import { StatCounter } from "@/components/blocks/stat-counter";
import { StepTimeline } from "@/components/blocks/step-timeline";
import { ProductCard } from "@/components/blocks/product-card";
import { UseCaseCard } from "@/components/blocks/use-case-card";
import { TestimonialSlot } from "@/components/blocks/testimonial-slot";
import { Faq } from "@/components/blocks/faq";
import { CtaSection } from "@/components/blocks/cta-section";
import { Reveal } from "@/components/blocks/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    fullTitle: _(
      "Seraf Technology — Autonómne mobilné strážne veže",
      "Seraf Technology — Autonomous mobile surveillance towers"
    ),
    title: "",
    description: _(
      "Mobilné strážne veže s AI kamerou a solárnym napájaním. Zastavte krádeže a vandalizmus na nestrážených objektoch — nasadenie do 48 hodín.",
      "Mobile surveillance towers with an AI camera and solar power. Stop theft and vandalism on unmanned sites — deployed within 48 hours."
    ),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  const stats = getStats(locale);
  const steps = getSteps(locale);
  const products = getProducts(locale);
  const pillars = getPillars(locale);
  const solutions = getSolutions(locale);
  const faqs = getFaqs(locale);

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <HomeHero locale={locale} />

      {/* Trust / stats strip */}
      <div className="border-b border-border bg-card/40">
        <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>

      {/* Problem */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            kicker={_("Problém", "The problem")}
            kickerIcon={ShieldAlert}
            title={_("Nestrážené objekty sú ľahký terč", "Unmanned sites are an easy target")}
            subtitle={_(
              "Krádeže materiálu, strojov a vandalizmus spôsobujú firmám straty a meškania. Fyzická ochranka je drahá a klasické kamery bez reakcie nestačia.",
              "Theft of materials and machinery and vandalism cause businesses losses and delays. Physical guards are expensive, and passive cameras without a response aren't enough."
            )}
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              _("Krádeže mimo pracovných hodín", "Theft outside working hours"),
              _("Vysoké náklady na strážnu službu", "High cost of guarding services"),
              _("Plané poplachy od klasických kamier", "False alarms from ordinary cameras"),
              _("Chýbajúca reakcia na incident", "No real response to incidents"),
            ].map((item) => (
              <li key={item} className="rounded-xl border border-border bg-card p-5 text-sm text-foreground/90">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* How it works */}
      <Section className="border-y border-border bg-card/40">
        <SectionHeading
          align="center"
          className="mx-auto mb-14 items-center text-center"
          kicker={_("Ako to funguje", "How it works")}
          kickerIcon={Radar}
          title={_("Od nasadenia po reakciu", "From deployment to response")}
          subtitle={_(
            "Štyri kroky k plne funkčnej ochrane vášho objektu.",
            "Four steps to fully operational protection of your site."
          )}
        />
        <StepTimeline steps={steps} />
      </Section>

      {/* Products */}
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={_("Produkty", "Products")}
            kickerIcon={Boxes}
            title={_("Strážne veže na mieru vášho objektu", "Towers matched to your site")}
          />
          <Button asChild variant="outline">
            <Link href="/products/compare">{_("Porovnať veže", "Compare towers")}</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard
                icon={p.icon}
                name={p.name}
                tagline={p.tagline}
                features={p.features.slice(0, 4)}
                href={`/products/${p.slug}`}
                ctaLabel={_("Zobraziť produkt", "View product")}
                highlighted={p.highlighted}
                highlightLabel={_("Odporúčané", "Recommended")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why Seraf */}
      <Section className="border-y border-border bg-card/40">
        <SectionHeading
          className="mb-12"
          kicker={_("Prečo Seraf", "Why Seraf")}
          kickerIcon={Sparkles}
          title={_("Ochrana, ktorá skutočne reaguje", "Protection that actually responds")}
          subtitle={_(
            "Kombinácia autonómnej technológie, umelej inteligencie a licencovanej služby.",
            "A combination of autonomous technology, artificial intelligence and a licensed service."
          )}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-background p-6">
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

      {/* Solutions */}
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={_("Využitie", "Solutions")}
            kickerIcon={LayoutGrid}
            title={_("Riešenie pre každý typ objektu", "A solution for every kind of site")}
          />
          <Button asChild variant="outline">
            <Link href="/solutions">{_("Všetky riešenia", "All solutions")}</Link>
          </Button>
        </div>
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

      {/* References / testimonials (honest placeholders) */}
      <Section className="border-y border-border bg-card/40">
        <SectionHeading
          className="mb-12"
          title={_("Dôvera postavená na výsledkoch", "Trust built on results")}
          subtitle={_(
            "Referencie od klientov doplníme po ich súhlase — žiadne vymyslené recenzie.",
            "Client references will be added with their consent — no fabricated reviews."
          )}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialSlot
            placeholder
            placeholderLabel={_("Referencia", "Reference")}
            quote={_("Sem doplníme skutočnú referenciu klienta.", "A real client reference will go here.")}
            author={_("Meno klienta", "Client name")}
            role={_("Stavbyvedúci", "Site manager")}
          />
          <TestimonialSlot
            placeholder
            placeholderLabel={_("Referencia", "Reference")}
            quote={_("Priestor pre overený citát klienta.", "Space for a verified client quote.")}
            author={_("Prevádzkovateľ", "Operator")}
            role={_("Solárny park", "Solar farm")}
          />
          <TestimonialSlot
            placeholder
            placeholderLabel={_("Referencia", "Reference")}
            quote={_("Miesto pre ďalšiu reálnu referenciu.", "Room for another real reference.")}
            author={_("Facility manažér", "Facility manager")}
            role={_("Logistický areál", "Logistics site")}
          />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title={_("Časté otázky", "Frequently asked questions")}
            subtitle={_(
              "Nenašli ste odpoveď? Ozvite sa nám.",
              "Didn't find your answer? Get in touch."
            )}
          />
          <Faq items={faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="pt-0">
        <CtaSection
          title={_("Chráňte svoj objekt už dnes", "Protect your site today")}
          subtitle={_(
            "Získajte nezáväznú cenovú ponuku na mieru do 24 hodín.",
            "Get a tailored, no-obligation quote within 24 hours."
          )}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
