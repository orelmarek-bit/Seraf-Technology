import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AlertTriangle, Check, ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";

import { pick } from "@/content/site";
import { getSolution, getSolutions, SOLUTION_SLUGS } from "@/content/solutions";
import { routing, Link } from "@/i18n/routing";
import { ShellV2, PageIntroV2 } from "@/components/v2/shell-v2";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => SOLUTION_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolution(locale, slug);
  if (!solution) return {};
  return {
    title: `${solution.title} · Seraf Technology`,
    description: solution.summary,
    robots: { index: false, follow: false },
  };
}

export default async function V2SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const solution = getSolution(locale, slug);
  if (!solution) notFound();

  const others = getSolutions(locale).filter((s) => s.slug !== slug);

  return (
    <ShellV2 locale={locale}>
      <PageIntroV2
        eyebrow={_("Využitie", "Use case")}
        title={solution.title}
        subtitle={solution.summary}
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {/* Challenges */}
        <div className="rounded-lg border border-border bg-card/40 p-7">
          <h2 className="font-mono-v2 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <AlertTriangle className="size-4" aria-hidden />
            {_("Výzvy", "Challenges")}
          </h2>
          <ul className="mt-5 space-y-3.5">
            {solution.challenges.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* How we solve it — highlighted */}
        <div className="rounded-lg border border-primary/50 bg-primary/[0.06] p-7">
          <h2 className="font-mono-v2 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-primary">
            <Check className="size-4" aria-hidden />
            {_("Ako to riešime", "How we solve it")}
          </h2>
          <ul className="mt-5 space-y-3.5">
            {solution.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/v2/quote"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
        >
          {_("Nezáväzná ponuka", "Request a quote")}
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/v2#applications"
          className="font-mono-v2 inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm text-foreground/80 transition-colors duration-200 hover:border-primary/50 hover:text-foreground"
        >
          <ArrowLeft className="size-4 text-primary" aria-hidden />
          {_("Všetky využitia", "All use cases")}
        </Link>
      </div>

      {/* Other use cases */}
      <div className="mt-24 border-t border-border pt-14">
        <h2 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
          {_("Ďalšie využitia", "Other use cases")}
        </h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {others.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/v2/solutions/${s.slug}`}
                className="group relative flex flex-col gap-2 bg-background p-6 transition-colors duration-200 hover:bg-card/60"
              >
                <ArrowUpRight
                  className="absolute right-5 top-5 size-4 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                />
                <Icon className="size-5 text-primary" aria-hidden />
                <span className="mt-1 text-sm font-medium text-foreground">{s.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </ShellV2>
  );
}
