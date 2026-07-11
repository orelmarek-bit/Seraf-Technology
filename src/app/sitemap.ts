import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { routing } from "@/i18n/routing";
import { PRODUCT_SLUGS } from "@/content/products";
import { SOLUTION_SLUGS } from "@/content/solutions";
import { POST_SLUGS } from "@/content/blog";
import { LEGAL_DOCS } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/products",
    "/products/compare",
    "/solutions",
    "/how-it-works",
    "/why-seraf",
    "/references",
    "/blog",
    "/quote",
    "/contact",
    ...PRODUCT_SLUGS.map((s) => `/products/${s}`),
    ...SOLUTION_SLUGS.map((s) => `/solutions/${s}`),
    ...POST_SLUGS.map((s) => `/blog/${s}`),
    ...LEGAL_DOCS.map((d) => `/legal/${d}`),
  ];

  return paths.map((path) => {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) languages[l] = `${SITE.url}/${l}${path}`;
    return {
      url: `${SITE.url}/${routing.defaultLocale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: { languages },
    };
  });
}
