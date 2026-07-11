import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { routing } from "@/i18n/routing";

interface BuildMetaArgs {
  locale: string;
  /** Path after the locale segment, e.g. "/products". Empty for home. */
  path?: string;
  /** Page title without the brand suffix (the layout template adds it). */
  title: string;
  /** Use for pages (like home) that need a full, un-suffixed title. */
  fullTitle?: string;
  description: string;
}

/**
 * Builds per-page, per-locale metadata with canonical + hreflang alternates
 * and Open Graph / Twitter cards.
 */
export function buildMetadata({ locale, path = "", title, fullTitle, description }: BuildMetaArgs): Metadata {
  const url = `${SITE.url}/${locale}${path}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `${SITE.url}/${l}${path}`;
  languages["x-default"] = `${SITE.url}/${routing.defaultLocale}${path}`;

  const ogTitle = fullTitle ?? `${title} · ${SITE.name}`;

  return {
    title: fullTitle ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      url,
      title: ogTitle,
      description,
      siteName: SITE.name,
      locale: locale === "sk" ? "sk_SK" : "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
