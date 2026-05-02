import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  BRAND,
  LOCALIZED_DEFAULTS,
  SITE_URL,
  SOCIAL,
  hreflangAlternates,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const defaults = LOCALIZED_DEFAULTS[locale as Locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: defaults.title, template: defaults.template },
    description: defaults.description,
    keywords: defaults.keywords,
    applicationName: BRAND.name,
    authors: [{ name: BRAND.name, url: SITE_URL }],
    creator: BRAND.name,
    publisher: BRAND.name,
    alternates: hreflangAlternates("/"),
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: BRAND.name,
      title: defaults.title,
      description: defaults.description,
      locale: defaults.ogLocale,
      alternateLocale:
        locale === "en"
          ? [LOCALIZED_DEFAULTS.ko.ogLocale]
          : [LOCALIZED_DEFAULTS.en.ogLocale],
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL.twitterHandle,
      creator: SOCIAL.twitterHandle,
      title: defaults.title,
      description: defaults.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    appleWebApp: {
      title: BRAND.name,
      capable: true,
      statusBarStyle: "black-translucent",
    },
  };
}

/**
 * Slim pass-through. The persistent UI shell (<html>, <body>, Navbar,
 * Footer, NextIntlClientProvider) lives in the root app/layout.tsx so
 * that locale toggles and page navigations both keep the navbar mounted.
 * This file only sets the request locale (for static rendering of pages
 * within this segment) and provides the per-locale metadata above.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return children;
}
