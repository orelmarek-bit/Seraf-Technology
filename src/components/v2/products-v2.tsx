import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { pick } from "@/content/site";
import { getProducts } from "@/content/products";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./section-intro";

/** Lucien-style tower line-up: three model cards with mono spec tables. */
export function ProductsV2({ locale }: { locale: string }) {
  const _ = pick(locale);
  const products = getProducts(locale);

  return (
    <section id="products" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionIntro
          eyebrow={_("Modely veží", "Tower models")}
          title={_("Tri veže, jedna istota", "Three towers, one certainty")}
          subtitle={_(
            "Vyberte si podľa dostupnosti napájania a rozsahu objektu — každá veža chráni 24/7.",
            "Choose by available power and site size — every tower protects 24/7."
          )}
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.slug}
                className={cn(
                  "group relative flex flex-col rounded-lg border bg-card/40 p-7 transition-colors duration-200",
                  p.highlighted
                    ? "border-primary/50 bg-primary/[0.06]"
                    : "border-border hover:border-primary/40"
                )}
              >
                {p.highlighted && (
                  <span className="eyebrow-v2 absolute -top-3 left-7 bg-background">
                    {_("Odporúčané", "Recommended")}
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <Icon className="size-6 text-primary" aria-hidden />
                  <span className="font-mono-v2 text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display-v2 mt-6 text-3xl leading-none text-foreground">
                  {p.name}
                </h3>
                <p className="font-mono-v2 mt-2 text-xs uppercase tracking-[0.14em] text-primary/90">
                  {p.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>

                <dl className="mt-7 space-y-0 border-t border-border">
                  {p.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline justify-between gap-4 border-b border-border py-2.5"
                    >
                      <dt className="font-mono-v2 text-xs uppercase tracking-wide text-muted-foreground">
                        {s.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-foreground">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href={`/products/${p.slug}`}
                  className="font-mono-v2 mt-7 inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-primary"
                >
                  {_("Detail modelu", "View model")}
                  <ArrowUpRight className="size-4 text-primary" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
