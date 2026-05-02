import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { cookies, headers } from "next/headers";
import "@/app/globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import LocaleProviderShell from "@/components/LocaleProviderShell";
import { getAllStories } from "@/lib/stories";
import type { Locale } from "@/i18n/routing";
import {
  SITE_URL,
  founderJsonLd,
  organizationJsonLd,
  safeJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

// Set metadataBase at the root so every page (including special routes like
// /opengraph-image and /sitemap.xml) can resolve relative URLs to absolute
// production URLs. Per-page generateMetadata still inherits this — Next.js
// merges metadata top-down from layouts to leaves.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  // Ad-tech and link-detection heuristics on iOS will auto-linkify the
  // trademark application number ("40-2026-0034321") on the legal page as
  // if it were a phone number — turning it into a tappable blue link in
  // Safari. Disable that across the site.
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  category: "technology",
  // Search-console verification slots. Drop the actual codes here once
  // ownership is being claimed — both Google and Naver accept either DNS
  // verification or this meta-tag method (Naver also supports an HTML
  // file in /public, which is sometimes easier when DNS is locked down).
  // Bing inherits Google's verification via Bing Webmaster's "Import from
  // Search Console" flow, so a separate `msvalidate.01` tag is optional.
  verification: {
    // google: "PASTE_GSC_HTML_TAG_CODE_HERE",
    other: {
      // "naver-site-verification": "PASTE_NAVER_CODE_HERE",
      // "msvalidate.01": "PASTE_BING_CODE_HERE",
    },
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

/**
 * Root layout — owns <html>, <body>, and the persistent UI shell (Navbar,
 * Footer). Crucially, root layout does NOT re-execute on client-side
 * navigation in Next.js App Router, so its children stay mounted across
 * page changes AND locale toggles. That's the property the locale-pill
 * needs: its <motion.span> persists through every navigation, so its
 * `animate.x` spring runs smoothly without any cross-mount state loss.
 *
 * `LocaleProviderShell` is the client bridge that feeds the right
 * translations to the persistent Navbar based on the URL.
 */
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const initialLocale: Locale = localeCookie === "ko" ? "ko" : "en";

  // Pre-load both locales' messages so client-side locale toggle is
  // instantaneous (no async fetch on switch). The dictionaries are tiny.
  const [enMessages, koMessages] = await Promise.all([
    import("@/i18n/dictionaries/en.json").then((m) => m.default),
    import("@/i18n/dictionaries/ko.json").then((m) => m.default),
  ]);
  const allMessages = { en: enMessages, ko: koMessages } as const;

  const storySearchItems = getAllStories(initialLocale).map((s) => ({
    title: s.title,
    description: s.description,
    href: `/stories/${s.slug}`,
    kind: "story" as const,
  }));

  const themeCookie = cookieStore.get("essay-theme")?.value;
  const theme: "light" | "dark" = themeCookie === "dark" ? "dark" : "light";
  const themeBg = theme === "dark" ? "#0b0b0a" : "#faf7f2";

  const userAgent = (await headers()).get("user-agent") ?? "";
  const isMac = /Mac|iPhone|iPad|iPod/i.test(userAgent);

  return (
    <html
      lang={initialLocale}
      data-essay-theme={theme}
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable}`}
      style={{ backgroundColor: themeBg }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var html=document.documentElement;
var hasCookie=document.cookie.indexOf('essay-theme=')!==-1;
if(hasCookie)return;
var t=localStorage.getItem('essay-theme');
var dark=t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches);
var v=dark?'dark':'light';
html.setAttribute('data-essay-theme',v);
document.cookie='essay-theme='+v+'; max-age=31536000; path=/; samesite=lax';
}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(organizationJsonLd(initialLocale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(websiteJsonLd(initialLocale)),
          }}
        />
        {/* Founder Person — separate node so BlogPosting.author can `@id`-ref
            it for E-E-A-T (Google rewards named human authors with external
            profile sameAs links). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(founderJsonLd()),
          }}
        />
        {/* RSS auto-discovery. Hand-rolled <link> instead of via the
            metadata `alternates.types` field because per-page generateMetadata
            replaces `alternates` wholesale (canonical + hreflang clobber it).
            This way the feed is discoverable on every page without each page
            needing to remember to re-declare the RSS link. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Lunive Stories"
          href={`${SITE_URL}/feed.xml`}
        />
      </head>
      <body style={{ backgroundColor: themeBg }}>
        <LocaleProviderShell
          initialLocale={initialLocale}
          allMessages={allMessages}
        >
          <Navbar storyItems={storySearchItems} isMac={isMac} />
          {children}
          <Footer />
        </LocaleProviderShell>
      </body>
    </html>
  );
}
