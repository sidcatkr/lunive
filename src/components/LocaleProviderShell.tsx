"use client";

import { usePathname as useRawPathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/i18n/routing";

type Messages = Record<string, unknown>;

interface Props {
  initialLocale: Locale;
  allMessages: Record<Locale, Messages>;
  children: React.ReactNode;
}

/**
 * Bridges the gap between Next.js root layout (which doesn't re-render on
 * client-side navigation) and next-intl's NextIntlClientProvider (which
 * needs an updated `locale` prop to give the right translations).
 *
 * Reads the *raw* pathname (including locale prefix) on the client, derives
 * the active locale, and feeds it + the right messages bundle to the
 * provider. This way, components above the [locale] segment — like the
 * Navbar in the root layout — get up-to-date translations without ever
 * unmounting on a locale change. That's what lets the locale-pill spring
 * animation actually run smoothly on toggle.
 */
export default function LocaleProviderShell({
  initialLocale,
  allMessages,
  children,
}: Props) {
  const rawPathname = useRawPathname();
  const detectedLocale: Locale = rawPathname.startsWith("/ko") ? "ko" : "en";
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    if (locale !== detectedLocale) {
      setLocale(detectedLocale);
      // Sync the `lang` attribute so accessibility tools / search engines
      // see the right language after a client-side locale toggle.
      document.documentElement.lang = detectedLocale;
    }
  }, [detectedLocale, locale]);

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={allMessages[locale]}
      // Match the server-side `request.ts` timeZone so SSR markup and the
      // client's first render use the same TZ — avoids hydration mismatches
      // on any formatted date.
      timeZone="Asia/Seoul"
    >
      {children}
    </NextIntlClientProvider>
  );
}
