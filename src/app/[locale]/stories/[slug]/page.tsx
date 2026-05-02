import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  getAdjacentStories,
  getAllSlugs,
  getStoryBySlug,
  storyExistsInLocale,
} from "@/lib/stories";
import {
  SITE_URL,
  SOCIAL,
  absoluteUrl,
  authorRef,
  breadcrumbJsonLd,
  publisherRef,
  safeJsonLd,
} from "@/lib/seo";
import StoryContent from "@/components/stories/StoryContent";

// ─── Static generation ──────────────────────────────────────────────────────

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs
      .filter((slug) => storyExistsInLocale(slug, locale))
      .map((slug) => ({ locale, slug })),
  );
}

// ─── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = getStoryBySlug(slug, locale);
  if (!story) return {};

  const path = `/stories/${slug}`;
  const canonical = absoluteUrl(path, locale);

  // Build hreflang alternates only for locales where this slug exists.
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    if (storyExistsInLocale(slug, l)) {
      languages[l] = absoluteUrl(path, l);
    }
  }
  languages["x-default"] = languages["en"] ?? canonical;

  // Don't set `images` explicitly here — Next.js auto-uses the route-local
  // `/[locale]/stories/[slug]/opengraph-image.tsx`, which renders a styled
  // 1200×630 card with the hero image as a blurred background + the title
  // and description overlaid. That's a richer preview than handing the raw
  // hero URL to scrapers.

  return {
    title: story.title,
    description: story.description,
    authors: [{ name: "Lunive", url: SITE_URL }],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: story.title,
      description: story.description,
      url: canonical,
      siteName: "Lunive",
      type: "article",
      publishedTime: story.date,
      authors: ["Lunive"],
      tags: story.tags,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL.twitterHandle,
      creator: SOCIAL.twitterHandle,
      title: story.title,
      description: story.description,
    },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const story = getStoryBySlug(slug, locale);
  if (!story) notFound();

  const { previous, next } = getAdjacentStories(slug, locale);

  const canonical = absoluteUrl(`/stories/${slug}`, locale);
  // Absolute URL for hero image — Google's BlogPosting `image` field needs an
  // absolute URL, and OG-image scrapers won't follow relative paths either.
  const heroAbsolute = story.heroMedia?.src
    ? story.heroMedia.src.startsWith("http")
      ? story.heroMedia.src
      : `${SITE_URL}${story.heroMedia.src.startsWith("/") ? "" : "/"}${story.heroMedia.src}`
    : undefined;

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.description,
    image: heroAbsolute ? [heroAbsolute] : undefined,
    datePublished: story.date,
    dateModified: story.date,
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    // Named human author (Sid) with sameAs profile links signals E-E-A-T
    // expertise to Google, where Organization-only authorship doesn't.
    author: authorRef(),
    publisher: publisherRef(),
    keywords: story.tags?.join(", "),
    // SpeakableSpecification opts the article into Google Assistant /
    // Discover voice surfacing — assistants will read the headline and
    // description aloud when a relevant voice query matches the page.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };

  const breadcrumbsLd = breadcrumbJsonLd(
    [
      { name: t("nav.home"), path: "/" },
      { name: t("stories.indexTitle"), path: "/stories" },
      { name: story.title, path: `/stories/${slug}` },
    ],
    locale,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(blogPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbsLd) }}
      />
      <StoryContent
        story={story}
        previous={previous}
        next={next}
        navLabels={{
          previous: t("stories.previous"),
          next: t("stories.next"),
        }}
        backLink={{ href: "/stories", label: t("stories.indexTitle") }}
      />
    </>
  );
}
