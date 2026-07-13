import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Phone, Mail, Linkedin, ArrowRight } from "lucide-react";

import { pick, SITE } from "@/content/site";
import { routing, Link } from "@/i18n/routing";
import { ShellV2, PageIntroV2 } from "@/components/v2/shell-v2";

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
    title: _("Kontakt · Seraf Technology", "Contact · Seraf Technology"),
    description: _(
      "Kontaktujte Seraf Technology — telefón, e-mail a LinkedIn. Radi vám poradíme.",
      "Contact Seraf Technology — phone, email and LinkedIn. We're happy to help."
    ),
    robots: { index: false, follow: false },
  };
}

export default async function V2ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  const channels = [
    { icon: Phone, label: _("Telefón", "Phone"), value: SITE.phoneLabel, href: `tel:${SITE.phone}` },
    { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Linkedin, label: "LinkedIn", value: "Seraf Technology", href: SITE.linkedin },
  ];

  return (
    <ShellV2 locale={locale}>
      <PageIntroV2
        eyebrow={_("Kontakt", "Contact")}
        title={_("Spojme sa", "Let's talk")}
        subtitle={_(
          "Máte otázku alebo potrebujete poradiť s výberom? Sme tu pre vás.",
          "Have a question or need help choosing? We're here for you."
        )}
      />

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {channels.map((c) => {
          const Icon = c.icon;
          const external = c.href.startsWith("http");
          return (
            <a
              key={c.label}
              href={c.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-7 transition-colors duration-200 hover:border-primary/40"
            >
              <Icon className="size-6 text-primary" aria-hidden />
              <span className="font-mono-v2 mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {c.label}
              </span>
              <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                {c.value}
              </span>
            </a>
          );
        })}
      </div>

      {/* Quote banner */}
      <div className="mt-10 flex flex-col items-start gap-5 rounded-lg border border-primary/50 bg-primary/[0.06] p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display-v2 text-2xl text-foreground">
            {_("Potrebujete cenovú ponuku?", "Need a quote?")}
          </h2>
          <p className="font-mono-v2 mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {_("Odpoveď do 24 hodín · bezplatné a nezáväzné", "Reply within 24 hours · free & no obligation")}
          </p>
        </div>
        <Link
          href="/v2/quote"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
        >
          {_("Nezáväzná ponuka", "Request a quote")}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </ShellV2>
  );
}
