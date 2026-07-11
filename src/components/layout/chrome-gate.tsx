"use client";

import { usePathname } from "@/i18n/routing";

/**
 * Hides the global site chrome (Navbar / Footer) on the /v2 variant,
 * which renders its own Lucien-style nav and footer.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/v2" || pathname.startsWith("/v2/")) return null;
  return <>{children}</>;
}
