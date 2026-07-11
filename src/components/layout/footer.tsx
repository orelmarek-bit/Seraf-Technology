import { useTranslations } from "next-intl";
import { Mail, Phone, Linkedin, ShieldCheck } from "lucide-react";

import { Link } from "@/i18n/routing";
import { footerNav } from "@/config/nav";
import { Logo } from "@/components/brand/logo";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("brand.tagline")}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" />
            {t("footer.license")}
          </div>
        </div>

        <nav aria-label={t("footer.product")}>
          <h3 className="text-sm font-semibold text-foreground">{t("footer.product")}</h3>
          <ul className="mt-4 space-y-2.5">
            {footerNav.product.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.company")}>
          <h3 className="text-sm font-semibold text-foreground">{t("footer.company")}</h3>
          <ul className="mt-4 space-y-2.5">
            {footerNav.company.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold text-foreground">{t("nav.contact")}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="tel:+421944433658" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Phone className="size-4" /> +421 944 433 658
              </a>
            </li>
            <li>
              <a href="mailto:info@seraftechnology.com" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Mail className="size-4" /> info@seraftechnology.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/seraf-technology"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Seraf Technology. {t("footer.rights")}</p>
          <div className="flex items-center gap-5">
            <Link href="/legal/privacy" className="hover:text-foreground">{t("footer.privacy")}</Link>
            <Link href="/legal/cookies" className="hover:text-foreground">{t("footer.cookies")}</Link>
            <Link href="/legal/terms" className="hover:text-foreground">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
