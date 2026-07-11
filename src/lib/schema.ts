import { SITE } from "@/content/site";

const withLocale = (locale: string, path = "") => `${SITE.url}/${locale}${path}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [SITE.linkedin],
    logo: `${SITE.url}/icon`,
  };
}

export function localBusinessSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    name: SITE.name,
    url: withLocale(locale),
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: "SK",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SK",
    },
    sameAs: [SITE.linkedin],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}

export function productSchema(args: {
  locale: string;
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    brand: { "@type": "Brand", name: SITE.name },
    url: withLocale(args.locale, `/products/${args.slug}`),
    category: "Surveillance tower",
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function articleSchema(args: {
  locale: string;
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    datePublished: args.datePublished,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    url: withLocale(args.locale, `/blog/${args.slug}`),
  };
}

export function breadcrumbSchema(locale: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: withLocale(locale, it.path),
    })),
  };
}
