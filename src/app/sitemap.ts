import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { getAllSlugs, getStoryBySlug, storyExistsInLocale } from "@/lib/stories";

type SitemapEntry = MetadataRoute.Sitemap[number];

const STATIC_PATHS: {
  path: string;
  priority: number;
  changeFrequency: SitemapEntry["changeFrequency"];
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/cadenza", priority: 0.95, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/stories", priority: 0.85, changeFrequency: "weekly" },
  // /legal is intentionally omitted — its `metadata.robots.index = false`
  // already keeps it out of search, and listing it here would just waste a
  // crawl slot on a page Google won't display.
];

function buildLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(path, l);
  }
  languages["x-default"] = absoluteUrl(path, "en");
  return languages;
}

/**
 * Build-time timestamp pinned at module evaluation. Sitemap.xml is generated
 * once per build (Next caches the output as a static file), so using a
 * single `BUILD_TIME` instead of `new Date()` per request keeps `lastmod`
 * stable across crawls and avoids signaling a fake "recent change" every
 * time a search engine refetches.
 */
const BUILD_TIME = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages — one entry per locale, with cross-locale alternates.
  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    const languages = buildLanguageAlternates(path);
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified: BUILD_TIME,
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  }

  // Dynamic story pages — one entry per (slug, locale) pair that exists,
  // with alternates only for locales where the slug exists. Newer stories
  // get a slightly higher priority to bias crawl budget toward fresh
  // content.
  const slugs = getAllSlugs();
  for (const slug of slugs) {
    const path = `/stories/${slug}`;
    const presentLocales = routing.locales.filter((l) =>
      storyExistsInLocale(slug, l),
    );
    const languages: Record<string, string> = {};
    for (const l of presentLocales) {
      languages[l] = absoluteUrl(path, l);
    }
    languages["x-default"] = languages["en"] ?? Object.values(languages)[0];

    for (const locale of presentLocales) {
      const story = getStoryBySlug(slug, locale);
      const dateStr = story?.date;
      const lastModified = dateStr ? new Date(dateStr) : BUILD_TIME;
      // Stories published in the last 30 days get a small priority bump.
      const ageMs = Date.now() - lastModified.getTime();
      const isFresh = ageMs >= 0 && ageMs < 30 * 24 * 60 * 60 * 1000;
      entries.push({
        url: absoluteUrl(path, locale),
        lastModified,
        changeFrequency: "monthly",
        priority: isFresh ? 0.75 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
