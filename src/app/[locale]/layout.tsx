import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChromeGate } from "@/components/layout/chrome-gate";
import { JsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@/components/analytics";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { pick, SITE } from "@/content/site";
import { routing } from "@/i18n/routing";
import { inter, spaceGrotesk, plexSans, plexMono, hanken } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "../globals.css";

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
    metadataBase: new URL(SITE.url),
    title: {
      default: _(
        "Seraf Technology — Autonómne mobilné strážne veže",
        "Seraf Technology — Autonomous mobile surveillance towers"
      ),
      template: `%s · ${SITE.name}`,
    },
    description: _(
      "Autonómne mobilné strážne veže s AI kamerou, solárnym napájaním a nepretržitým monitoringom. Ochrana objektov nasadená do 48 hodín.",
      "Autonomous mobile surveillance towers with an AI camera, solar power and 24/7 monitoring. Site protection deployed within 48 hours."
    ),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "dark",
        inter.variable,
        spaceGrotesk.variable,
        plexSans.variable,
        plexMono.variable,
        hanken.variable
      )}
    >
      <body className="min-h-dvh font-sans">
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema(locale)]} />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <ChromeGate>
              <Navbar />
            </ChromeGate>
            <main id="main">{children}</main>
            <ChromeGate>
              <Footer />
            </ChromeGate>
            <Analytics />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
