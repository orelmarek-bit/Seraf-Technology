import { Plus } from "lucide-react";

import { pick } from "@/content/site";
import { getFaqs } from "@/content/home";
import { SectionIntro } from "./section-intro";

/** Frequently asked questions — native <details> accordion in the v2 palette. */
export function FaqV2({ locale }: { locale: string }) {
  const _ = pick(locale);
  const faqs = getFaqs(locale);

  return (
    <section id="faq" className="px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <SectionIntro
          eyebrow={_("Časté otázky", "FAQ")}
          title={_("Čo sa klienti pýtajú", "What clients ask")}
        />

        <div className="mt-14 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="text-base font-medium text-foreground transition-colors group-hover:text-primary">
                  {f.question}
                </span>
                <Plus
                  className="size-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="pb-5 pr-11 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
