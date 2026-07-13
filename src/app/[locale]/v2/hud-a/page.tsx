import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { pick } from "@/content/site";
import { routing } from "@/i18n/routing";
import { NavV2 } from "@/components/v2/nav-v2";
import { FooterV2 } from "@/components/v2/footer-v2";
import { SectionIntro } from "@/components/v2/section-intro";
import { ScrollyFlow } from "@/components/v2/scrolly-flow";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "HUD variant A — horizontal flow · Seraf Technology",
    robots: { index: false, follow: false },
  };
}

/** Layout-decision preview: variant A. Compare with /v2/hud-b. */
export default async function HudAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  return (
    <div className="theme-v2 min-h-screen">
      <NavV2 locale={locale} introAware={false} />
      <section className="px-6 pt-36 sm:px-10">
        <SectionIntro
          eyebrow={_("Variant A — horizontálny tok", "Variant A — horizontal flow")}
          title={_("Ako to funguje", "How it works")}
          subtitle={_(
            "Veža hore dohliada, pod ňou beží cyklus zľava doprava: detekcia → odstrašenie → reakcia.",
            "The tower oversees from the top; beneath it the cycle runs left to right: detect → deter → respond."
          )}
        />
      </section>
      <ScrollyFlow />
      <FooterV2 locale={locale} />
    </div>
  );
}
