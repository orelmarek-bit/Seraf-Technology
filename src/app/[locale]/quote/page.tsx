import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { FileText, Clock, Phone, ShieldCheck, Mail } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick, SITE } from "@/content/site";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { QuoteForm } from "@/components/blocks/quote-form";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/quote",
    title: _("Cenová ponuka", "Get a quote"),
    description: _(
      "Získajte nezáväznú cenovú ponuku na mieru. Ozveme sa vám do 24 hodín.",
      "Get a tailored, no-obligation quote. We'll reply within 24 hours."
    ),
  });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  const reassurance = [
    {
      icon: Clock,
      title: _("Odpoveď do 24 hodín", "Reply within 24 hours"),
      description: _("Ozveme sa vám s cenovou ponukou na mieru.", "We'll get back with a tailored quote."),
    },
    {
      icon: ShieldCheck,
      title: _("Nezáväzne", "No obligation"),
      description: _("Cenová ponuka je bezplatná a nezáväzná.", "The quote is free and non-binding."),
    },
    {
      icon: FileText,
      title: _("Riešenie na mieru", "Tailored solution"),
      description: _("Vežu vyberieme podľa typu a veľkosti objektu.", "We match the tower to your site."),
    },
  ];

  return (
    <>
      <PageHero
        kicker={_("Cenová ponuka", "Get a quote")}
        kickerIcon={FileText}
        title={_("Získajte cenovú ponuku na mieru", "Get a tailored quote")}
        subtitle={_(
          "Vyplňte formulár a my vám navrhneme najvhodnejšie riešenie ochrany vášho objektu.",
          "Fill in the form and we'll propose the best-fit protection for your site."
        )}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <ul className="space-y-5">
              {reassurance.map((r) => (
                <li key={r.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <r.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-foreground">{r.title}</h3>
                    <p className="text-sm text-muted-foreground">{r.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-medium text-foreground">{_("Radšej zavoláte?", "Prefer to call?")}</p>
              <a
                href={`tel:${SITE.phone}`}
                className="mt-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Phone className="size-4 text-primary" /> {SITE.phoneLabel}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="size-4 text-primary" /> {SITE.email}
              </a>
            </div>
          </div>

          <QuoteForm />
        </div>
      </Section>
    </>
  );
}
