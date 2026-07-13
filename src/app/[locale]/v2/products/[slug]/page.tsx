import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowUpRight, ArrowLeft } from "lucide-react";

import { pick } from "@/content/site";
import { getProducts, getProduct, PRODUCT_SLUGS } from "@/content/products";
import { routing, Link } from "@/i18n/routing";
import { ShellV2, PageIntroV2 } from "@/components/v2/shell-v2";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PRODUCT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(locale, slug);
  if (!product) return {};
  return {
    title: `${product.name} · Seraf Technology`,
    description: product.summary,
    robots: { index: false, follow: false },
  };
}

export default async function V2ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const product = getProduct(locale, slug);
  if (!product) notFound();

  const others = getProducts(locale).filter((p) => p.slug !== slug);

  return (
    <ShellV2 locale={locale}>
      <PageIntroV2
        eyebrow={_("Model veže", "Tower model")}
        title={product.name}
        subtitle={product.summary}
      />

      {/* Tower on aurora glow */}
      <div className="relative mx-auto mt-14 flex h-64 items-end justify-center sm:h-80">
        <div className="aurora-v2 absolute inset-x-0 bottom-0 h-2/3 opacity-60" aria-hidden />
        <div
          className="absolute bottom-0 left-1/2 h-4 w-36 -translate-x-1/2 translate-y-1/2 rounded-[100%] bg-[#04081a]/80 blur-[2px]"
          aria-hidden
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hud/tower.png"
          alt={product.name}
          className="relative z-10 h-full w-auto object-contain [filter:drop-shadow(0_0_40px_rgba(92,156,255,0.35))]"
        />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        {/* Features */}
        <div>
          <h2 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
            {_("Kľúčové vlastnosti", "Key features")}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-card/40 p-4 text-sm text-foreground/90"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/v2/quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
            >
              {_("Nezáväzná ponuka", "Request a quote")}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/v2#compare"
              className="font-mono-v2 inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm text-foreground/80 transition-colors duration-200 hover:border-primary/50 hover:text-foreground"
            >
              {_("Porovnanie riešení", "Compare options")}
            </Link>
          </div>
        </div>

        {/* Spec table */}
        <div>
          <h2 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
            {_("Technické parametre", "Specifications")}
          </h2>
          <dl className="mt-6 border-t border-border">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3"
              >
                <dt className="font-mono-v2 text-xs uppercase tracking-wide text-muted-foreground">
                  {spec.label}
                </dt>
                <dd className="text-right text-sm font-medium text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Other towers */}
      <div className="mt-24 border-t border-border pt-14">
        <h2 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
          {_("Ďalšie veže", "Other towers")}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {others.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.slug}
                href={`/v2/products/${p.slug}`}
                className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-card/40 p-6 transition-colors duration-200 hover:border-primary/40"
              >
                <span className="flex items-center gap-4">
                  <Icon className="size-6 text-primary" aria-hidden />
                  <span>
                    <span className="block font-medium text-foreground">{p.name}</span>
                    <span className="font-mono-v2 mt-0.5 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {p.tagline}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
              </Link>
            );
          })}
        </div>
        <Link
          href="/v2#products"
          className="font-mono-v2 mt-8 inline-flex items-center gap-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 text-primary" aria-hidden />
          {_("Späť na všetky modely", "Back to all models")}
        </Link>
      </div>
    </ShellV2>
  );
}
