import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Boxes } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick } from "@/content/site";
import { getProducts } from "@/content/products";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { ProductCard } from "@/components/blocks/product-card";
import { CtaSection } from "@/components/blocks/cta-section";
import { Reveal } from "@/components/blocks/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/products",
    title: _("Produkty", "Products"),
    description: _(
      "Mobilné strážne veže BASIC, BASIC SOLAR a PRO Lights — AI detekcia, solárne napájanie a 360° pokrytie.",
      "BASIC, BASIC SOLAR and PRO Lights mobile surveillance towers — AI detection, solar power and 360° coverage."
    ),
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const products = getProducts(locale);

  return (
    <>
      <PageHero
        kicker={_("Produkty", "Products")}
        kickerIcon={Boxes}
        title={_("Mobilné strážne veže", "Mobile surveillance towers")}
        subtitle={_(
          "Tri konfigurácie navrhnuté pre rôzne prostredia — od plne solárnej autonómie po maximálny dosah so zoomom.",
          "Three configurations designed for different environments — from full solar autonomy to maximum range with zoom."
        )}
      />

      <Section>
        <div className="mb-10 flex justify-end">
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
                features={p.features}
                href={`/products/${p.slug}`}
                ctaLabel={_("Zobraziť detail", "View details")}
                highlighted={p.highlighted}
                highlightLabel={_("Odporúčané", "Recommended")}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <CtaSection
          title={_("Neviete, ktorá veža je pre vás?", "Not sure which tower fits?")}
          subtitle={_(
            "Poradíme vám s výberom podľa typu a veľkosti objektu.",
            "We'll help you choose based on your site's type and size."
          )}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
