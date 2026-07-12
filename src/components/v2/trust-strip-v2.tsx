import { ArrowUpRight } from "lucide-react";

import { pick } from "@/content/site";

const LICENCE_URL = "https://seraftechnology.com/wp-content/uploads/2024/07/Seraf-licencia.pdf";

/** Slim verifiable-facts bar directly under the hero — instant legitimacy for security buyers. */
export function TrustStripV2({ locale }: { locale: string }) {
  const _ = pick(locale);

  const items: { label: string; href?: string }[] = [
    { label: _("Licencovaná technická služba", "Licensed technical security service"), href: LICENCE_URL },
    { label: _("15+ rokov skúseností", "15+ years of experience") },
    { label: _("Napojenie na PCO", "Connected to PCO monitoring") },
    { label: _("Nasadenie do 48 hodín", "Deployed within 48 hours") },
  ];

  return (
    <section aria-label={_("Dôveryhodnosť", "Trust")} className="border-y border-border">
      <div className="font-mono-v2 mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 text-xs uppercase tracking-[0.12em] text-muted-foreground sm:px-10">
        {items.map((item, i) => (
          <span key={item.label} className="inline-flex items-center gap-x-4">
            {i > 0 && (
              <span aria-hidden className="text-primary/60">
                ·
              </span>
            )}
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline decoration-primary/40 underline-offset-4 transition-colors hover:text-foreground"
              >
                {item.label}
                <ArrowUpRight className="size-3 text-primary" aria-hidden />
              </a>
            ) : (
              item.label
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
