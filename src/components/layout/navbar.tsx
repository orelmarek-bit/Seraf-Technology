"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Phone } from "lucide-react";

import { Link, usePathname } from "@/i18n/routing";
import { mainNav } from "@/config/nav";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background/0"
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link href="/" className="rounded-sm" aria-label="Seraf Technology — home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
            <Link href="/quote">{t("getQuote")}</Link>
          </Button>

          {/* Mobile menu trigger */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
            >
              {t("contact")}
            </Link>
            <div className="mt-3 flex items-center justify-between gap-3">
              <LocaleSwitcher />
              <Button asChild variant="primary" className="flex-1">
                <Link href="/quote">{t("getQuote")}</Link>
              </Button>
            </div>
            <a
              href="tel:+421944433658"
              className="mt-2 inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Phone className="size-4" /> +421 944 433 658
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
