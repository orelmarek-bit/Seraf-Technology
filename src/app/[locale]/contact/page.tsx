import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Phone, Mail, Linkedin, MapPin, ArrowRight } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick, SITE } from "@/content/site";
import { routing, Link } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/contact",
    title: _("Kontakt", "Contact"),
    description: _(
      "Kontaktujte Seraf Technology — telefón, e-mail a LinkedIn. Radi vám poradíme.",
      "Contact Seraf Technology — phone, email and LinkedIn. We're happy to help."
    ),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  const channels = [
    { icon: Phone, label: _("Telefón", "Phone"), value: SITE.phoneLabel, href: `tel:${SITE.phone}` },
    { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "Seraf Technology", href: SITE.linkedin },
  ];

  return (
    <>
      <PageHero
        kicker={_("Kontakt", "Contact")}
        kickerIcon={MapPin}
        title={_("Spojme sa", "Let's talk")}
        subtitle={_(
          "Máte otázku alebo potrebujete poradiť s výberom? Sme tu pre vás.",
          "Have a question or need help choosing? We're here for you."
        )}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/30"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="size-5" />
              </span>
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <span className="font-medium text-foreground group-hover:text-primary">{c.value}</span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-primary/25 bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {_("Potrebujete cenovú ponuku?", "Need a quote?")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {_("Vyplňte krátky formulár a ozveme sa do 24 hodín.", "Fill in a short form and we'll reply within 24 hours.")}
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/quote">
              {_("Získať cenovú ponuku", "Get a quote")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
