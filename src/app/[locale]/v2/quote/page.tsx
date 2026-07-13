import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Clock, ShieldCheck, FileText, Phone, Mail, type LucideIcon } from "lucide-react";

import { pick, SITE } from "@/content/site";
import { routing } from "@/i18n/routing";
import { ShellV2, PageIntroV2 } from "@/components/v2/shell-v2";
import { QuoteForm } from "@/components/blocks/quote-form";

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
    title: _("Cenová ponuka · Seraf Technology", "Get a quote · Seraf Technology"),
    description: _(
      "Získajte nezáväznú cenovú ponuku na mieru. Ozveme sa vám do 24 hodín.",
      "Get a tailored, no-obligation quote. We'll reply within 24 hours."
    ),
    robots: { index: false, follow: false },
  };
}

export default async function V2QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);

  const reassurance: { icon: LucideIcon; title: string; description: string }[] = [
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
    <ShellV2 locale={locale}>
      <PageIntroV2
        eyebrow={_("Cenová ponuka", "Get a quote")}
        title={_("Získajte ponuku na mieru", "Get a tailored quote")}
        subtitle={_(
          "Vyplňte formulár — navrhneme najvhodnejšie riešenie ochrany vášho objektu a ozveme sa do 24 hodín.",
          "Fill in the form — we'll propose the best protection for your site and reply within 24 hours."
        )}
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
          {/* Reassurance + direct contact — after the form on mobile, left column on desktop */}
          <aside className="order-2 flex flex-col gap-5 lg:order-1">
            {reassurance.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-lg border border-border bg-card/40 p-6"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div>
                    <h2 className="text-base font-medium text-foreground">{item.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}

            <div className="mt-2 flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-6">
              <span className="eyebrow-v2 w-fit">{_("Radšej priamo?", "Prefer to talk?")}</span>
              <a
                href={`tel:${SITE.phone}`}
                className="font-mono-v2 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-4 text-primary" />
                {SITE.phoneLabel}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="font-mono-v2 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                {SITE.email}
              </a>
            </div>
          </aside>

          {/* The form is token-driven, so it renders in the v2 palette automatically */}
          <div className="order-1 lg:order-2">
            <QuoteForm />
          </div>
      </div>
    </ShellV2>
  );
}
