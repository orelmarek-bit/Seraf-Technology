import { pick } from "@/content/site";
import { getSolutions } from "@/content/solutions";
import { SectionIntro } from "./section-intro";

/**
 * Where the towers are deployed. Cards flip on hover to reveal the threats that
 * site type faces (the `challenges` list the solution detail page shows). The
 * cards are deliberately NOT links.
 *
 * Front carries the one-line teaser, back carries the 3 threats — split that way
 * so neither face gets crowded.
 *
 * The flip is gated to hover-capable pointers. On touch there is no hover, so
 * those devices lay the card out in normal flow with the threats inline and
 * nothing unreachable. Under prefers-reduced-motion the global rule snaps the
 * transition, so the face swaps instantly rather than spinning.
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

        {/* Spaced like the Why Seraf pillars: gap-5, each card its own bordered surface */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                className="group relative min-h-[17rem] [perspective:1200px] [@media(hover:none)]:min-h-0"
              >
                <div className="absolute inset-0 transition-transform duration-500 ease-out [transform-style:preserve-3d] [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] [@media(hover:none)]:relative">
                  {/* Front */}
                  <div className="absolute inset-0 flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-7 [backface-visibility:hidden] [@media(hover:none)]:relative">
                    <Icon className="size-6 text-primary" aria-hidden />
                    <h3 className="mt-1 text-lg font-medium text-foreground">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.short}</p>

                    {/* Touch has no hover to flip with — surface the threats inline instead */}
                    <div className="hidden [@media(hover:none)]:block">
                      <h4 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
                        {_("Výzvy", "Challenges")}
                      </h4>
                      <ThreatList items={s.challenges} className="mt-3" />
                    </div>
                  </div>

                  {/* Back — hover-capable devices only */}
                  <div
                    className="absolute inset-0 flex flex-col justify-center gap-4 rounded-lg border border-primary/40 bg-primary/[0.06] p-7 [backface-visibility:hidden] [transform:rotateY(180deg)] [@media(hover:none)]:hidden"
                    aria-hidden
                  >
                    <h3 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
                      {_("Výzvy", "Challenges")}
                    </h3>
                    <ThreatList items={s.challenges} />
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

function ThreatList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((c) => (
        <li
          key={c}
          className="flex items-start gap-2.5 py-1 text-sm leading-relaxed text-foreground/90"
        >
          <span className="mt-[9px] size-1 shrink-0 rounded-full bg-primary" aria-hidden />
          {c}
        </li>
      ))}
    </ul>
  );
}
