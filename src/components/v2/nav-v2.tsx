"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { pick } from "@/content/site";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { cn } from "@/lib/utils";

export function NavV2({ locale, introAware = true }: { locale: string; introAware?: boolean }) {
  const _ = pick(locale);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!introAware) return; // pages without the intro overlay show the nav immediately
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const willPlay = desktop && !reduce && !sessionStorage.getItem("seraf-intro-seen");
    if (!willPlay) return; // return visit / mobile → nav stays visible

    setVisible(false); // hide during the intro, fade in as the doors part
    const onOpen = () => setVisible(true);
    window.addEventListener("seraf-intro-open", onOpen, { once: true });
    const fallback = setTimeout(() => setVisible(true), 2600);
    return () => {
      window.removeEventListener("seraf-intro-open", onOpen);
      clearTimeout(fallback);
    };
  }, [introAware]);

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-50 transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
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
          <span className="font-mono-v2 hidden text-sm font-medium uppercase tracking-[0.32em] text-foreground md:inline">
            SERAF&nbsp;TECHNOLOGY
          </span>
        </span>

        <span className="flex items-center justify-end gap-3">
          <LocaleSwitcher />
          <Link
            href="/v2/quote"
            className="hidden items-center rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90 sm:inline-flex"
          >
            {_("Nezáväzná ponuka", "Request a quote")}
          </Link>
        </span>
      </nav>
    </header>
  );
}
