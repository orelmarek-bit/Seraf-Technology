import { pick } from "@/content/site";
import { getSolutions } from "@/content/solutions";
import { SectionIntro } from "./section-intro";

/**
 * Where the towers are deployed. Each card flips on hover to reveal the full
 * summary (the same copy the solution detail page leads with) — the cards are
 * deliberately NOT links.
 *
 * The flip is gated to hover-capable pointers: on touch there is no hover, so
 * those devices get the summary inline instead and nothing is unreachable.
 * Under prefers-reduced-motion the global rule snaps the transition, so the
 * face swaps instantly rather than spinning.
 */
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
              <article
                key={s.slug}
                className="group relative min-h-[16.5rem] bg-background [perspective:1200px]"
              >
                <div className="absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d] [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 flex flex-col gap-3 p-7 [backface-visibility:hidden]">
                    <Icon className="size-6 text-primary" aria-hidden />
                    <h3 className="mt-1 text-lg font-medium text-foreground">{s.title}</h3>
                    {/* teaser on hover-capable devices … */}
                    <p className="text-sm leading-relaxed text-muted-foreground [@media(hover:none)]:hidden">
                      {s.short}
                    </p>
                    {/* … the full summary on touch, where there's no hover to flip */}
                    <p className="hidden text-sm leading-relaxed text-muted-foreground [@media(hover:none)]:block">
                      {s.summary}
                    </p>
                  </div>

                  {/* Back — hover-capable devices only */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center gap-3 bg-primary/[0.06] p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] [@media(hover:none)]:hidden"
                    aria-hidden
                  >
                    <h3 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/90">{s.summary}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
