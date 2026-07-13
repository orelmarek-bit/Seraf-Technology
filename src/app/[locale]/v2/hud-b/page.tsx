import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { pick } from "@/content/site";
import { routing } from "@/i18n/routing";
import { NavV2 } from "@/components/v2/nav-v2";
import { FooterV2 } from "@/components/v2/footer-v2";
import { SectionIntro } from "@/components/v2/section-intro";
import { ScrollyScene } from "@/components/v2/scrolly-scene";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "HUD variant B — scene · Seraf Technology",
    robots: { index: false, follow: false },
  };
}

/** Layout-decision preview: variant B. Compare with /v2/hud-a. */
export default async function HudBPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  return (
    <div className="theme-v2 min-h-screen">
      <NavV2 locale={locale} introAware={false} />
      <section className="px-6 pt-36 sm:px-10">
        <SectionIntro
          eyebrow={_("Variant B — scéna", "Variant B — scene")}
          title={_("Ako to funguje", "How it works")}
          subtitle={_(
            "Veža stojí na pozemku a akty sa odohrávajú okolo nej: lúč zameria narušiteľa, siréna ho odoženie, poplach letí na PCO.",
            "The tower stands on the site and the acts play out around it: the beam locks on the intruder, the siren drives him off, the alarm flies to the PCO."
          )}
        />
      </section>
      <ScrollyScene />
      <FooterV2 locale={locale} />
    </div>
  );
}
