import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getAllStories, getFeaturedStory } from "@/lib/stories";
import {
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  localeAwareAlternates,
  safeJsonLd,
} from "@/lib/seo";
import FeaturedStory from "@/components/stories/FeaturedStory";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("stories.indexTitle"),
    description: t("stories.indexDescription"),
    alternates: localeAwareAlternates("/stories", locale),
    openGraph: {
      url: absoluteUrl("/stories", locale),
      title: t("stories.indexTitle"),
      description: t("stories.indexDescription"),
      type: "website",
    },
    twitter: {
      title: t("stories.indexTitle"),
      description: t("stories.indexDescription"),
      card: "summary_large_image",
    },
  };
}

export default async function StoriesIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const stories = getAllStories(locale);
  const featured = getFeaturedStory(locale);
  const rest = featured
    ? stories.filter((s) => s.slug !== featured.slug)
    : stories;

  const dateFormatter = new Intl.DateTimeFormat(
    locale === "ko" ? "ko-KR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("stories.indexTitle"),
    description: t("stories.indexDescription"),
    inLanguage: locale,
    url: absoluteUrl("/stories", locale),
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: "Lunive",
    },
    // Both `hasPart` (BlogPosting children) and `mainEntity` (ItemList) —
    // hasPart helps Google understand the page is a hub of articles, while
    // ItemList gives sitelink-style snippets in search results with the
    // article order preserved from how they're listed on the page.
    hasPart: stories.map((s) => ({
      "@type": "BlogPosting",
      headline: s.title,
      description: s.description,
      url: absoluteUrl(`/stories/${s.slug}`, locale),
      datePublished: s.date,
      inLanguage: locale,
    })),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: stories.length,
      itemListElement: stories.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/stories/${s.slug}`, locale),
        name: s.title,
      })),
    },
  };

  const breadcrumbsLd = breadcrumbJsonLd(
    [
      { name: t("nav.home"), path: "/" },
      { name: t("nav.stories"), path: "/stories" },
    ],
    locale,
  );

  return (
    <main className="stories-index">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbsLd) }}
      />

      {/* ─── Masthead ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-end">
          <h1 className="font-[family-name:var(--font-newsreader)] font-medium tracking-tight leading-[1.02] text-[clamp(2.75rem,6vw,5.5rem)] text-[var(--essay-text)]">
            {locale === "ko" ? (
              <>
                만드는 방식을 <span className="anthropic-underline">바꾸는</span>{" "}
                글쓰기.
              </>
            ) : (
              <>
                Writing <span className="anthropic-underline">that</span> shapes
                how we <span className="anthropic-underline">build</span>.
              </>
            )}
          </h1>
          <p className="text-[var(--essay-muted)] text-base md:text-[17px] leading-[1.6] max-w-md md:pb-3">
            {locale === "ko"
              ? "Lunive 팀이 무엇을 어떻게 만들고 있는지에 관한 긴 글, 제품 노트, 관찰 기록."
              : "Long-form essays, product notes, and observations from the team at Lunive."}
          </p>
        </div>
      </section>

      {/* ─── Featured story ─────────────────────────────────────────────── */}
      {featured && (
        <FeaturedStory story={featured} cta={t("stories.readMore")} />
      )}

      {/* ─── Rest of the stories ────────────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-32 pt-8 md:pt-16">
        {rest.length > 0 && (
          <>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.12em] text-[var(--essay-muted)]">
                {locale === "ko" ? "전체 스토리" : "All stories"}
              </h2>
            </div>
            <ul className="divide-y divide-[var(--essay-rule,var(--essay-border))]">
              {rest.map((story) => {
                const formatted = story.date
                  ? dateFormatter.format(new Date(story.date))
                  : null;
                return (
                  <li key={story.slug}>
                    <Link
                      href={`/stories/${story.slug}`}
                      locale={locale}
                      className="group grid md:grid-cols-[1fr_auto] gap-2 md:gap-10 py-8 md:py-10 items-baseline transition-opacity duration-200 hover:opacity-90"
                    >
                      <div>
                        <h3 className="font-[family-name:var(--font-newsreader)] text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.15] text-[var(--essay-text)] group-hover:[text-decoration:underline] [text-decoration-thickness:2px] [text-underline-offset:6px] mb-2">
                          {story.title}
                        </h3>
                        {story.description && (
                          <p className="text-[var(--essay-muted)] text-[15px] leading-[1.55] max-w-2xl">
                            {story.description}
                          </p>
                        )}
                        {story.tags && story.tags.length > 0 && (
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {story.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] px-2 py-0.5 rounded-full border border-[var(--essay-border)] text-[var(--essay-muted)] uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {formatted && (
                        <time
                          dateTime={story.date}
                          className="text-sm text-[var(--essay-muted)] shrink-0 md:pt-2 font-[family-name:var(--font-inter)]"
                        >
                          {formatted}
                        </time>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {stories.length === 0 && (
          <p className="text-[var(--essay-muted)] py-16 text-center">
            {locale === "ko" ? "아직 스토리가 없습니다." : "No stories yet."}
          </p>
        )}
      </section>
    </main>
  );
}
