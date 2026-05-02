import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { localeAwareAlternates } from "@/lib/seo";
import Main from "./components/main";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("legal.title"),
    description:
      locale === "ko"
        ? "Lunive™ 상표 및 공식 채널 안내."
        : "Lunive™ trademark and official channel notices.",
    alternates: localeAwareAlternates("/legal", locale),
    robots: { index: false, follow: true },
  };
}

export default async function Legal({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Main locale={locale} />;
}
