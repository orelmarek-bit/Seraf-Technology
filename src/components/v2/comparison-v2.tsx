import { Check, X, Minus } from "lucide-react";

import { pick } from "@/content/site";
import { cn } from "@/lib/utils";
import { SectionIntro } from "./section-intro";

type Cell = { kind: "yes" | "no" | "part" } | { kind: "text"; text: string };

interface Row {
  label: string;
  guards: Cell;
  cctv: Cell;
  tower: Cell;
}

/** Guards vs fixed CCTV vs Seraf tower — arms the buyer's internal business case. */
export function ComparisonV2({ locale }: { locale: string }) {
  const _ = pick(locale);

  const rows: Row[] = [
    {
      label: _("Nepretržitý dohľad 24/7", "Continuous 24/7 watch"),
      guards: { kind: "part" },
      cctv: { kind: "yes" },
      tower: { kind: "yes" },
    },
    {
      label: _("Bez elektriny a káblovania", "No mains power or cabling"),
      guards: { kind: "yes" },
      cctv: { kind: "no" },
      tower: { kind: "yes" },
    },
    {
      label: _("Rýchlosť nasadenia", "Time to deploy"),
      guards: { kind: "text", text: _("dni", "days") },
      cctv: { kind: "text", text: _("týždne", "weeks") },
      tower: { kind: "text", text: "48 h" },
    },
    {
      label: _("360° bez slepých miest", "360° — no blind spots"),
      guards: { kind: "no" },
      cctv: { kind: "part" },
      tower: { kind: "yes" },
    },
    {
      label: _("AI filtrovanie planých poplachov", "AI false-alarm filtering"),
      guards: { kind: "no" },
      cctv: { kind: "no" },
      tower: { kind: "yes" },
    },
    {
      label: _("Presun podľa postupu prác", "Relocates as your site changes"),
      guards: { kind: "yes" },
      cctv: { kind: "no" },
      tower: { kind: "yes" },
    },
    {
      label: _("Mesačné náklady", "Monthly cost"),
      guards: { kind: "text", text: "€€€" },
      cctv: { kind: "text", text: "€€" },
      tower: { kind: "text", text: "€" },
    },
  ];

  const cols = [
    { key: "guards" as const, title: _("Strážna služba", "Security guards"), highlight: false },
    { key: "cctv" as const, title: _("Pevné CCTV", "Fixed CCTV"), highlight: false },
    { key: "tower" as const, title: _("Veža Seraf", "Seraf tower"), highlight: true },
  ];

  return (
    <section id="compare" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <SectionIntro
          eyebrow={_("Porovnanie", "Why a tower")}
          title={_("Múdrejší spôsob ochrany objektu", "The smarter way to guard a site")}
          subtitle={_(
            "Ako obstojí mobilná veža proti strážnej službe a pevnému kamerovému systému.",
            "How a mobile tower stacks up against guards and a fixed camera system."
          )}
        />

        {/* Wide table scrolls inside its own container on small screens */}
        <div className="mt-16 overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Header row */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr]">
              <span aria-hidden />
              {cols.map((c) => (
                <span
                  key={c.key}
                  className={cn(
                    "font-mono-v2 rounded-t-lg px-3 py-3 text-center text-xs uppercase tracking-[0.14em]",
                    c.highlight
                      ? "border-x border-t border-primary/50 bg-primary/[0.08] text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {c.title}
                </span>
              ))}
            </div>

            {/* Body rows */}
            <div className="divide-y divide-border border-y border-border">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center">
                  <span className="py-3.5 pr-4 text-sm text-foreground/90">{row.label}</span>
                  {cols.map((c) => (
                    <span
                      key={c.key}
                      className={cn(
                        "flex items-center justify-center self-stretch py-3.5",
                        c.highlight && "border-x border-primary/50 bg-primary/[0.08]"
                      )}
                    >
                      <CellMark cell={row[c.key]} strong={c.highlight} />
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer of the highlighted column */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr]">
              <span aria-hidden />
              <span aria-hidden />
              <span aria-hidden />
              <span className="rounded-b-lg border-x border-b border-primary/50 bg-primary/[0.08] py-2" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CellMark({ cell, strong }: { cell: Cell; strong: boolean }) {
  if (cell.kind === "text") {
    return (
      <span className={cn("font-mono-v2 text-sm", strong ? "font-semibold text-primary" : "text-foreground/80")}>
        {cell.text}
      </span>
    );
  }
  if (cell.kind === "yes") {
    return <Check className={cn("size-5", strong ? "text-primary" : "text-foreground/70")} aria-label="yes" />;
  }
  if (cell.kind === "part") {
    return <Minus className="size-5 text-muted-foreground" aria-label="partially" />;
  }
  return <X className="size-5 text-muted-foreground/60" aria-label="no" />;
}
