import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { productSchema, breadcrumbSchema } from "@/lib/schema";
import { pick } from "@/content/site";
import { getProducts, getProduct, PRODUCT_SLUGS } from "@/content/products";
import { routing, Link } from "@/i18n/routing";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/blocks/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCT_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(locale, slug);
  if (!product) return {};
  return buildMetadata({
    locale,
    path: `/products/${slug}`,
    title: product.name,
    description: product.summary,
  });
}

export default async function ProductDetailPage({
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
  const Icon = product.icon;

  return (
    <>
      <JsonLd
        data={[
          productSchema({ locale, name: product.name, description: product.summary, slug }),
          breadcrumbSchema(locale, [
            { name: _("Domov", "Home"), path: "" },
            { name: _("Produkty", "Products"), path: "/products" },
            { name: product.name, path: `/products/${slug}` },
          ]),
        ]}
      />
      <PageHero
        kicker={product.highlighted ? _("Odporúčané", "Recommended") : _("Produkt", "Product")}
        kickerIcon={product.icon}
        title={product.name}
        subtitle={product.summary}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Features */}
          <div>
            <h2 className="text-h3 font-semibold text-foreground">{_("Kľúčové vlastnosti", "Key features")}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-4 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/quote">
                  {_("Získať cenovú ponuku", "Get a quote")} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products/compare">{_("Porovnať veže", "Compare towers")}</Link>
              </Button>
            </div>
          </div>

          {/* Spec panel + visual */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-card p-8">
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <div className="relative flex items-center justify-center py-6">
                <span className="flex size-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-glow">
                  <Icon className="size-12" />
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card">
              <h3 className="border-b border-border px-6 py-4 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {_("Technické parametre", "Specifications")}
              </h3>
              <dl className="divide-y divide-border">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between gap-4 px-6 py-3.5 text-sm">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="text-right font-medium text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* Other products */}
      <Section className="border-t border-border bg-card/40">
        <h2 className="mb-8 text-h3 font-semibold text-foreground">{_("Ďalšie veže", "Other towers")}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-foreground">{p.name}</h3>
                    {p.highlighted && <Badge variant="primary">{_("Odporúčané", "Recommended")}</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>
              </div>
              <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="ghost">
            <Link href="/products">
              <ArrowLeft className="size-4" /> {_("Späť na produkty", "Back to products")}
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
