import type { LucideIcon } from "lucide-react";

export interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      {/* Connector line (desktop) */}
      <div
        className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-border via-primary/40 to-border md:block"
        aria-hidden
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex flex-col gap-3">
          <div className="flex items-center gap-3 md:flex-col md:items-start">
            <span className="relative z-10 flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-card text-primary shadow-soft">
              <step.icon className="size-5" />
            </span>
            <span className="font-display text-sm font-semibold text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
