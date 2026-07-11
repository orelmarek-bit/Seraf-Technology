import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { pick } from "@/content/site";

export function NavV2({ locale }: { locale: string }) {
  const _ = pick(locale);
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 py-6 sm:px-10">
        <Link
          href="/why-seraf"
          className="font-mono-v2 inline-flex w-fit items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
        >
          <ArrowRight className="size-3.5 text-primary" />
          {_("O nás", "About")}
        </Link>

        <span className="flex select-none items-center justify-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Seraf Technology" width={254} height={166} className="h-6 w-auto" />
          <span className="font-mono-v2 text-sm font-medium uppercase tracking-[0.32em] text-foreground">
            SERAF&nbsp;TECHNOLOGY
          </span>
        </span>

        {/* right cell intentionally empty — keeps the wordmark centered */}
        <span aria-hidden />
      </nav>
    </header>
  );
}
