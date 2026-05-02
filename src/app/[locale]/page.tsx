import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  LOCALIZED_DEFAULTS,
  absoluteUrl,
  localeAwareAlternates,
} from "@/lib/seo";
import Hero from "@/components/hero";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const defaults = LOCALIZED_DEFAULTS[locale];
  return {
    title: { absolute: defaults.title },
    description: defaults.description,
    alternates: localeAwareAlternates("/", locale),
    openGraph: {
      type: "website",
      url: absoluteUrl("/", locale),
      siteName: "Lunive",
      title: defaults.title,
      description: defaults.description,
      locale: defaults.ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: defaults.title,
      description: defaults.description,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="flex flex-col items-center">
      <Hero />

      {/* SSR brand statement — gives Google crawlable copy on the homepage. */}
      <section
        className="w-full border-t border-[var(--essay-border)]"
        style={{ backgroundColor: "var(--essay-bg)", color: "var(--essay-text)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 text-[var(--essay-text)]">
            {t("home.aboutHeading")}
          </h2>
          <p className="text-base md:text-lg text-[var(--essay-muted)] leading-relaxed mb-10">
            {t("home.aboutBody")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/cadenza"
              locale={locale}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--essay-text)] text-[var(--essay-bg)] text-sm font-medium hover:opacity-90 transition"
            >
              {t("home.ctaCadenza")} →
            </Link>
            <Link
              href="/stories"
              locale={locale}
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-text)] text-sm font-medium hover:bg-[var(--essay-overlay)] transition"
            >
              {t("home.ctaStories")}
            </Link>
            <Link
              href="/about"
              locale={locale}
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-text)] text-sm font-medium hover:bg-[var(--essay-overlay)] transition"
            >
              {t("home.ctaAbout")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
