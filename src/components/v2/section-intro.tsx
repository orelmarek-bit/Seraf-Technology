import { cn } from "@/lib/utils";

/** Lucien-style section intro: mono eyebrow in a bordered box → connector line → big light headline. */
export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <span className="eyebrow-v2">{eyebrow}</span>
      <span className="my-6 h-14 w-px bg-gradient-to-b from-primary/70 to-transparent" aria-hidden />
      <h2 className="font-display-v2 max-w-[20ch] text-[clamp(2rem,5vw,3.75rem)] leading-[1.04]">
        {title}
      </h2>
      {subtitle && <p className="mt-5 max-w-xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
