import Script from "next/script";

/**
 * Cookieless analytics (Plausible). Inert until NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set,
 * so no cookie banner is required. To use Vercel Analytics instead, install
 * @vercel/analytics and render <Analytics /> here.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
