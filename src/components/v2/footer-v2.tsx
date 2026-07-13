import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { pick, SITE } from "@/content/site";

export function FooterV2({ locale }: { locale: string }) {
  const _ = pick(locale);
  const year = new Date().getFullYear();

  const links = [
    { label: _("O nás", "About"), href: "/why-seraf" },
    { label: _("Kontakt", "Contact"), href: "/contact" },
    { label: _("Ochrana súkromia", "Privacy"), href: "/legal/privacy" },
    { label: _("Podmienky", "Terms"), href: "/legal/terms" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono-v2 flex flex-wrap gap-x-7 gap-y-3 text-sm text-muted-foreground">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 py-3 transition-colors hover:text-foreground">
                <ArrowRight className="size-3.5 text-primary" />
                {l.label}
              </Link>
            ))}
          </div>
          <p className="font-mono-v2 text-sm text-muted-foreground">
            © {year} {SITE.name}. {_("Všetky práva vyhradené.", "All rights reserved.")}
          </p>
        </div>
      </div>

      {/* Giant wordmark finale */}
      <div className="px-4 pb-4 sm:px-8 sm:pb-8">
        <div className="font-display-v2 select-none text-center font-medium leading-[0.8] tracking-tight text-foreground text-[clamp(4rem,20vw,17rem)]">
          SERAF
        </div>
      </div>
    </footer>
  );
}
