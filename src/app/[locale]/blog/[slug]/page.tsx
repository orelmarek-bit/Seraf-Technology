import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pick } from "@/content/site";
import { getPost, getPosts, POST_SLUGS, formatDate } from "@/content/blog";
import { routing, Link } from "@/i18n/routing";
import { Section } from "@/components/layout/section";
import { PageHero } from "@/components/blocks/page-hero";
import { MdxContent } from "@/components/blocks/mdx-content";
import { CtaSection } from "@/components/blocks/cta-section";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => POST_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const related = getPosts(locale).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            locale,
            title: post.title,
            description: post.excerpt,
            slug,
            datePublished: post.date,
          }),
          breadcrumbSchema(locale, [
            { name: _("Domov", "Home"), path: "" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <PageHero kicker={post.category} title={post.title} subtitle={post.excerpt} />

      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 border-b border-border pb-6 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            {formatDate(post.date, locale)}
          </div>
          <div className="mt-2">
            <MdxContent source={post.body} />
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="size-4" /> {_("Späť na blog", "Back to blog")}
            </Link>
          </div>
        </article>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-border bg-card/40">
          <h2 className="mb-8 text-h3 font-semibold text-foreground">{_("Súvisiace články", "Related articles")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:border-primary/30"
              >
                <Badge variant="primary">{p.category}</Badge>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section className="pt-0">
        <CtaSection
          title={_("Chráňte svoj objekt už dnes", "Protect your site today")}
          subtitle={_("Získajte nezáväznú cenovú ponuku do 24 hodín.", "Get a no-obligation quote within 24 hours.")}
          ctaLabel={_("Získať cenovú ponuku", "Get a quote")}
        />
      </Section>
    </>
  );
}
