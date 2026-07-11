import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, metadata routes (icon), and files with an extension.
  matcher: ["/((?!api|_next|_vercel|icon|opengraph-image|sitemap|robots|manifest|.*\\..*).*)"],
};
