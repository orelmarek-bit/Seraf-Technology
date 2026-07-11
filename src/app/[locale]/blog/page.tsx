import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Newspaper, ArrowRight, CalendarDays } from "lucide-react";

import { buildMetadata } from "@/lib/seo";
import { pick } from "@/content/site";
import { getPosts, formatDate } from "@/content/blog";
import { routing, Link } from "@/i18n/routing";
import { PageHero } from "@/components/blocks/page-hero";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const _ = pick(locale);
  return buildMetadata({
    locale,
    path: "/blog",
    title: "Blog",
    description: _(
      "Praktické rady o ochrane stavieb, objektov a rozľahlých plôch pred krádežami a vandalizmom.",
      "Practical advice on protecting builds, sites and large areas from theft and vandalism."
    ),
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const _ = pick(locale);
  const posts = getPosts(locale);

  return (
    <>
      <PageHero
        kicker={_("Blog", "Blog")}
        kickerIcon={Newspaper}
        title={_("Poznatky o bezpečnosti objektov", "Insights on site security")}
        subtitle={_(
          "Praktické rady o ochrane stavieb, objektov a rozľahlých plôch.",
          "Practical advice on protecting builds, sites and large areas."
        )}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
            >
              <div className="flex items-center gap-3">
                <Badge variant="primary">{post.category}</Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {formatDate(post.date, locale)}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-foreground group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {_("Čítať článok", "Read article")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
