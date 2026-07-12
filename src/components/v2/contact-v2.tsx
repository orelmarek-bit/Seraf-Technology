import { ArrowRight, Phone, Mail, Linkedin } from "lucide-react";

import { Link } from "@/i18n/routing";
import { pick, SITE } from "@/content/site";

/** Closing call-to-action with direct contact channels — v2 palette. */
export function ContactV2({ locale }: { locale: string }) {
  const _ = pick(locale);

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 sm:px-10">
      {/* Aurora glow echo of the hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-1/4" aria-hidden>
        <div className="aurora-v2 absolute inset-0 opacity-70" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col items-center text-center">
        <span className="eyebrow-v2">{_("Kontakt", "Get in touch")}</span>
        <h2 className="font-display-v2 text-gradient-v2 mt-8 max-w-[16ch] text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.02]">
          {_("Chráňte svoj objekt už dnes", "Protect your site today")}
        </h2>
        <p className="mt-6 max-w-xl text-muted-foreground">
          {_(
            "Napíšte nám alebo si vyžiadajte nezáväznú ponuku — ozveme sa s riešením na mieru vášho objektu.",
            "Message us or request a no-obligation quote — we'll come back with a solution tailored to your site."
          )}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
          >
            {_("Nezáväzná ponuka", "Request a quote")}
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={`tel:${SITE.phone}`}
            className="font-mono-v2 inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm text-foreground transition-colors duration-200 hover:border-primary/50"
          >
            <Phone className="size-4 text-primary" />
            {SITE.phoneLabel}
          </a>
        </div>

        <div className="font-mono-v2 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Mail className="size-4 text-primary" />
            {SITE.email}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Linkedin className="size-4 text-primary" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
