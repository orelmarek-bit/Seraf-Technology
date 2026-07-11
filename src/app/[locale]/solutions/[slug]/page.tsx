import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { pick } from "@/content/site";
import { getSolution, SOLUTION_SLUGS } from "@/content/solutions";
import { routing, Link } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { CtaSection } from "@/components/blocks/cta-section";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SOLUTION_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolution(locale, slug);
  if (!solution) return {};
  return buildMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: solution.title,
    description: solution.summary,
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const solution = getSolution(locale, slug);
  if (!solution) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: _("Domov", "Home"), path: "" },
          { name: _("Využitie", "Solutions"), path: "/solutions" },
          { name: solution.title, path: `/solutions/${slug}` },
        ])}
      />
      <PageHero
        kicker={_("Využitie", "Solution")}
        kickerIcon={solution.icon}
        title={solution.title}
        subtitle={solution.summary}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="flex items-center gap-2 text-h3 font-semibold text-foreground">
              <AlertTriangle className="size-5 text-warning" />
              {_("Výzvy", "Challenges")}
            </h2>
            <ul className="mt-5 space-y-3">
              {solution.challenges.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/25 bg-card p-8">
            <h2 className="flex items-center gap-2 text-h3 font-semibold text-foreground">
              <CheckCircle2 className="size-5 text-primary" />
              {_("Ako to riešime", "How we solve it")}
            </h2>
            <ul className="mt-5 space-y-3">
              {solution.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/quote">
              {_("Získať cenovú ponuku", "Get a quote")} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/solutions">
              <ArrowLeft className="size-4" /> {_("Všetky riešenia", "All solutions")}
            </Link>
          </Button>
        </div>
      </Section>

      <Section className="pt-0">
        <CtaSection
          title={_("Ochráňte svoj objekt", "Protect your site")}
          subtitle={_("Nasadenie do 48 hodín po potvrdení.", "Deployed within 48 hours of confirmation.")}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
