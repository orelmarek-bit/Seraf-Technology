import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick } from "@/content/site";
import { getLegalDoc, LEGAL_DOCS } from "@/content/legal";
import { routing } from "@/i18n/routing";
import { Section } from "@/components/layout/section";

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
  return buildMetadata({ locale, path: `/legal/${doc}`, title: content.title, description: content.title });
}

export default async function LegalPage({
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
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-h1 font-semibold text-gradient">{content.title}</h1>

        <div className="mt-6 flex gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-foreground/90">
          <Info className="mt-0.5 size-4 shrink-0 text-warning" />
          <p>{content.notice}</p>
        </div>

        <div className="mt-10 space-y-8">
          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-h3 font-semibold text-foreground">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
