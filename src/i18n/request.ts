import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (
    await import(`./dictionaries/${locale}.json`)
  ).default as Record<string, string>;

  return {
    locale,
    messages,
    // Pin the timeZone so SSR and the client render dates identically — without
    // this, next-intl falls back to the runtime's local TZ, which differs
    // between Vercel (UTC) and the user's browser, causing hydration warnings.
    // Lunive operates out of Seoul; locking to KST keeps formatted dates
    // consistent across both locales.
    timeZone: "Asia/Seoul",
  };
});
