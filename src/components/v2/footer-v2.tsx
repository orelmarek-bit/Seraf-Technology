import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { pick, SITE } from "@/content/site";

/** Self-hosted copy (public/docs/) so the link survives the old site's retirement. */
const LICENCE_URL = "/docs/seraf-licencia.pdf";

export function FooterV2({ locale }: { locale: string }) {
  const _ = pick(locale);
  const year = new Date().getFullYear();

  const links = [
    { label: _("O nás", "About"), href: "/v2/why-seraf" },
    { label: _("Kontakt", "Contact"), href: "/v2/contact" },
    { label: _("Ochrana súkromia", "Privacy"), href: "/v2/legal/privacy" },
    { label: _("Podmienky", "Terms"), href: "/v2/legal/terms" },
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
            {/* Licence — the verifiable credential, kept alongside the legal links */}
            <a
              href={LICENCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="size-3.5 text-primary" />
              {_("Licencia", "Licence")}
            </a>
          </div>
          <p className="font-mono-v2 text-sm text-muted-foreground">
            © {year} {SITE.name}. {_("Všetky práva vyhradené.", "All rights reserved.")}
          </p>
        </div>
      </div>

      {/* Wordmark finale — SERAF with TECHNOLOGY locked up beneath it */}
      <div className="select-none px-4 pb-6 sm:px-8 sm:pb-10">
        <div className="font-display-v2 text-center font-medium leading-[0.8] tracking-tight text-foreground text-[clamp(3rem,15vw,12.5rem)]">
          SERAF
        </div>
        {/* textIndent offsets the trailing letter-space so the tracked word
            sits OPTICALLY centred under SERAF, not maths-centred. */}
        <div
          className="font-mono-v2 mt-3 text-center uppercase text-muted-foreground text-[clamp(0.55rem,2.1vw,1.7rem)]"
          style={{ letterSpacing: "0.42em", textIndent: "0.42em" }}
        >
          Technology
        </div>
      </div>
    </footer>
  );
}
