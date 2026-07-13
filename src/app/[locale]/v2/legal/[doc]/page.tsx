import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";

import { pick } from "@/content/site";
import { getLegalDoc, LEGAL_DOCS } from "@/content/legal";
import { routing } from "@/i18n/routing";
import { ShellV2, PageIntroV2 } from "@/components/v2/shell-v2";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => LEGAL_DOCS.map((doc) => ({ locale, doc })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  const content = getLegalDoc(locale, doc);
  if (!content) return {};
  return {
    title: `${content.title} · Seraf Technology`,
    robots: { index: false, follow: false },
  };
}

export default async function V2LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const content = getLegalDoc(locale, doc);
  if (!content) notFound();

  return (
    <ShellV2 locale={locale}>
      <PageIntroV2 eyebrow={_("Právne informácie", "Legal")} title={content.title} />

      <div className="mx-auto mt-14 max-w-2xl">
        <p className="flex items-start gap-3 rounded-lg border border-border bg-card/40 p-5 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
          {content.notice}
        </p>

        <div className="mt-10 space-y-10">
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-mono-v2 text-xs uppercase tracking-[0.14em] text-primary">
                {s.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </ShellV2>
  );
}
