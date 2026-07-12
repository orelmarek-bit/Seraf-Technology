import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { pick } from "@/content/site";
import { routing } from "@/i18n/routing";
import { NavV2 } from "@/components/v2/nav-v2";
import { IntroDoors } from "@/components/v2/hero-doors";
import { HeroV2 } from "@/components/v2/hero-v2";
import { TrustStripV2 } from "@/components/v2/trust-strip-v2";
import { SectionIntro } from "@/components/v2/section-intro";
import { ScrollyCircle } from "@/components/v2/scrolly-circle";
import { ProductsV2 } from "@/components/v2/products-v2";
import { ApplicationsV2 } from "@/components/v2/applications-v2";
import { WhyV2 } from "@/components/v2/why-v2";
import { FaqV2 } from "@/components/v2/faq-v2";
import { ContactV2 } from "@/components/v2/contact-v2";
import { FooterV2 } from "@/components/v2/footer-v2";

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
    title: _("Seraf Technology — v2", "Seraf Technology — v2"),
    description: _(
      "Alternatívna verzia webu Seraf Technology.",
      "Alternative design concept for Seraf Technology."
    ),
    robots: { index: false, follow: false },
  };
}

export default async function V2Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _ = pick(locale);

  return (
    <div className="theme-v2 min-h-screen">
      <NavV2 locale={locale} />
      <IntroDoors />
      <HeroV2 locale={locale} />
      <TrustStripV2 locale={locale} />

      <section id="how" className="scroll-mt-16 px-6 pt-24 sm:px-10">
        <SectionIntro
          eyebrow={_("Ako to funguje", "How it works")}
          title={_("Od nasadenia po reakciu", "From deployment to response")}
          subtitle={_(
            "Skrolujte a sledujte, ako veža chráni váš objekt v štyroch krokoch.",
            "Scroll to watch the tower protect your site in four steps."
          )}
        />
      </section>

      <ScrollyCircle />

      <ProductsV2 locale={locale} />
      <ApplicationsV2 locale={locale} />
      <WhyV2 locale={locale} />
      <FaqV2 locale={locale} />
      <ContactV2 locale={locale} />

      <FooterV2 locale={locale} />
    </div>
  );
}
