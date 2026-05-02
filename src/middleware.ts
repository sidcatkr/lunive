import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except:
  //   - /api/*           (API routes)
  //   - /_next/*         (Next internals)
  //   - /_vercel/*       (Vercel internals)
  //   - /robots.txt, /sitemap.xml, /manifest.json
  //   - any file with an extension (favicon.ico, /images/*, etc.)
  matcher: ["/((?!api|_next|_vercel|robots.txt|sitemap.xml|manifest.json|.*\\..*).*)"],
};
