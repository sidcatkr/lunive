import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

export const SITE_URL = "https://lunive.app";

export const BRAND = {
  name: "Lunive",
  altName: "루나이브",
  founder: "Sid",
  githubOrg: "lunivehq",
  trademarkApplicationNumber: "40-2026-0034321",
  trademarkOffice: "Korean Intellectual Property Office (KIPO)",
  foundingDate: "2025-01-01",
} as const;

export const SOCIAL = {
  github: "https://github.com/lunivehq",
  instagram: "https://www.instagram.com/lunivehq/",
  twitter: "https://x.com/lunivehq",
  twitterHandle: "@lunivehq",
} as const;

/**
 * Localized title and description defaults for the root layout. Page-level
 * metadata can override the title via the `title.template` set on the layout.
 */
export const LOCALIZED_DEFAULTS: Record<
  Locale,
  {
    title: string;
    template: string;
    description: string;
    ogLocale: string;
    keywords: string[];
  }
> = {
  en: {
    title: "Lunive — User-experience first software",
    template: "%s · Lunive",
    description:
      "Lunive is a one-person software brand building tools designed around the people who use them. Our first product is Cadenza, a Discord music bot with a real, polished web interface.",
    ogLocale: "en_US",
    keywords: [
      "Lunive",
      "lunive.app",
      "Lunive software",
      "Lunive brand",
      "Cadenza",
      "Cadenza Discord bot",
      "Discord music bot",
      "Discord music dashboard",
      "user experience",
    ],
  },
  ko: {
    // Brand displays as "Lunive" in Korean copy too — the brand's official
    // name is the Latin spelling, and Korean web convention keeps brand
    // names in English (Apple, Discord, etc). The Hangul reading "루나이브"
    // is preserved in `BRAND.altName` (schema.org `alternateName`) and the
    // `keywords` array below so Naver / Google still match users typing
    // the Korean spelling — but the visible brand string is always Lunive.
    title: "Lunive — 사용자 경험을 우선하는 소프트웨어 브랜드",
    template: "%s · Lunive",
    description:
      "Lunive는 사용자를 존중하는 도구를 만드는 1인 소프트웨어 브랜드입니다. 첫 번째 제품 Cadenza는 진짜 인터페이스를 갖춘 디스코드 음악 봇입니다.",
    ogLocale: "ko_KR",
    keywords: [
      "Lunive",
      "루나이브",
      "lunive.app",
      "Cadenza",
      "Cadenza 디스코드 봇",
      "디스코드 음악 봇",
      "디스코드 봇 대시보드",
      "1인 소프트웨어 브랜드",
      "사용자 경험",
    ],
  },
};

/** Build the absolute URL for a path under a given locale. Always starts with `/`. */
export function localePathFor(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}`;
  return `/${locale}${clean}`;
}

/** Build the absolute URL (including domain) for a locale path. */
export function absoluteUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localePathFor(path, locale)}`;
}

/**
 * Returns hreflang alternates for a locale-agnostic path (e.g. "/about").
 * Includes both `en`, `ko`, and `x-default` (defaults to English).
 */
export function hreflangAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(path, "en"),
    languages: {
      en: absoluteUrl(path, "en"),
      ko: absoluteUrl(path, "ko"),
      "x-default": absoluteUrl(path, "en"),
    },
  };
}

/**
 * Returns hreflang alternates with the canonical pointing to the current
 * locale. Use this on locale-specific pages.
 */
export function localeAwareAlternates(
  path: string,
  currentLocale: Locale,
): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(path, currentLocale),
    languages: {
      en: absoluteUrl(path, "en"),
      ko: absoluteUrl(path, "ko"),
      "x-default": absoluteUrl(path, "en"),
    },
  };
}

/**
 * Sanitize a JSON-LD payload for embedding inside a `<script>` tag.
 * Replaces `<` so a malicious value cannot break out of the tag.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Stable, content-addressable IDs for the entities Google de-duplicates
 * across the entity graph. Using a fragment-based `@id` (e.g.
 * `https://lunive.app/#organization`) lets every page reference the SAME
 * Organization/Person/WebSite node instead of emitting fresh ones — Google
 * then merges them into a single Knowledge-Panel-eligible entity.
 */
export const ENTITY_ID = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  founder: `${SITE_URL}/#sid`,
  cadenza: `${SITE_URL}/#cadenza`,
} as const;

/** Organization JSON-LD shared across all pages. */
export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ENTITY_ID.organization,
    name: BRAND.name,
    alternateName: BRAND.altName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/web-app-manifest-512x512.png`,
      width: 512,
      height: 512,
    },
    inLanguage: locale,
    sameAs: [SOCIAL.github, SOCIAL.instagram, SOCIAL.twitter],
    founder: { "@id": ENTITY_ID.founder },
    foundingDate: BRAND.foundingDate,
  };
}

/** Founder Person JSON-LD — separate node so multiple schemas can `@id` ref it. */
export function founderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ENTITY_ID.founder,
    name: BRAND.founder,
    url: `${SITE_URL}/en/about`,
    worksFor: { "@id": ENTITY_ID.organization },
    sameAs: [SOCIAL.github, SOCIAL.instagram, SOCIAL.twitter],
  };
}

/** WebSite JSON-LD with sitelinks SearchBox potential action. */
export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ENTITY_ID.website,
    name: BRAND.name,
    alternateName: BRAND.altName,
    url: SITE_URL,
    inLanguage: locale,
    publisher: { "@id": ENTITY_ID.organization },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/stories?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Breadcrumb crumb shape — `name` + locale-relative `path`. */
export type BreadcrumbCrumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD for a chain of crumbs ending at the current page.
 * Pass crumbs ordered root→leaf; the last crumb intentionally omits `item`
 * because it represents the current page (per Google's BreadcrumbList spec).
 */
export function breadcrumbJsonLd(crumbs: BreadcrumbCrumb[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => {
      const isLast = i === crumbs.length - 1;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        ...(isLast ? {} : { item: absoluteUrl(c.path, locale) }),
      };
    }),
  };
}

/**
 * Reference to the Organization entity by `@id`. Use this inside Article-style
 * schemas (BlogPosting.publisher, SoftwareApplication.creator, etc.) so
 * Google merges all references into a single node instead of treating each
 * as a separate Organization.
 */
export function publisherRef() {
  return { "@id": ENTITY_ID.organization };
}

/**
 * Reference to the Founder (Sid) Person entity by `@id`. Use as
 * BlogPosting.author for E-E-A-T — Google rewards content with a clearly
 * identified human author who has external profile links (sameAs).
 */
export function authorRef() {
  return { "@id": ENTITY_ID.founder };
}
