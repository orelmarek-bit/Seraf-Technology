import { NavV2 } from "./nav-v2";
import { FooterV2 } from "./footer-v2";

/** Shared shell for v2 inner pages: theme scope + own nav/footer (no intro overlay). */
export function ShellV2({ locale, children }: { locale: string; children: React.ReactNode }) {
  return (
    <div className="theme-v2 min-h-screen">
      <NavV2 locale={locale} introAware={false} />
      <main className="mx-auto max-w-[1400px] px-6 pb-28 pt-36 sm:px-10">{children}</main>
      <FooterV2 locale={locale} />
    </div>
  );
}

/** Lucien-style page intro: mono eyebrow in a box → connector line → big light h1. */
export function PageIntroV2({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="eyebrow-v2">{eyebrow}</span>
      <span className="my-6 h-14 w-px bg-gradient-to-b from-primary/70 to-transparent" aria-hidden />
      <h1 className="font-display-v2 max-w-[18ch] text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04]">
        {title}
      </h1>
      {subtitle && <p className="mt-5 max-w-xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
