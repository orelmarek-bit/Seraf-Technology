import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { pick } from "@/content/site";
import { getSolutions } from "@/content/solutions";
import { SectionIntro } from "./section-intro";

/** Where the towers are deployed — compact use-case grid in the v2 palette. */
export function ApplicationsV2({ locale }: { locale: string }) {
  const _ = pick(locale);
  const solutions = getSolutions(locale);

  return (
    <section id="applications" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1400px]">
        <SectionIntro
          eyebrow={_("Využitie", "Where it works")}
          title={_("Ochrana pre každý objekt", "Protection for any site")}
          subtitle={_(
            "Od staveniska po solárny park — veže nasadíme tam, kde klasická ochranka nestačí.",
            "From construction sites to solar farms — deployed where conventional guarding falls short."
          )}
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group relative flex cursor-pointer flex-col gap-3 bg-background p-7 transition-colors duration-200 hover:bg-card/60"
              >
                <ArrowUpRight
                  className="absolute right-6 top-6 size-4 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  aria-hidden
                />
                <Icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-1 text-lg font-medium text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
