/** Primary navigation. `key` maps to messages under "nav". */
export const mainNav = [
  { key: "products", href: "/products" },
  { key: "solutions", href: "/solutions" },
  { key: "howItWorks", href: "/how-it-works" },
  { key: "why", href: "/why-seraf" },
  { key: "references", href: "/references" },
  { key: "blog", href: "/blog" },
] as const;

export const footerNav = {
  company: [
    { key: "why", href: "/why-seraf" },
    { key: "references", href: "/references" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ],
  product: [
    { key: "products", href: "/products" },
    { key: "solutions", href: "/solutions" },
    { key: "howItWorks", href: "/how-it-works" },
  ],
} as const;

export type NavKey = (typeof mainNav)[number]["key"];
