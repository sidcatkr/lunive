import { routing } from "@/i18n/routing";
import { absoluteUrl, BRAND, SITE_URL } from "@/lib/seo";
import { getAllStories } from "@/lib/stories";

// Statically generated at build time, then served from the edge cache —
// no per-request work for crawlers.
export const dynamic = "force-static";

/**
 * RSS 2.0 feed at /feed.xml.
 *
 * Why RSS for a marketing site? Two reasons:
 *
 * 1. Google + Naver both treat sitemap.xml + rss/atom as complementary
 *    discovery signals. Naver in particular still gives weight to RSS for
 *    indexing fresh content, and feeding a separate "what's new" stream
 *    lets crawlers prioritize crawl budget toward Stories.
 * 2. Readers can subscribe via Feedly / NetNewsWire / RSS-aware tools
 *    without us hosting a Substack.
 *
 * Behaviour:
 *  - Lists every story across both locales (EN + KO), sorted by `date` DESC.
 *  - Uses each story's locale-aware canonical URL.
 *  - `lastBuildDate` reflects the newest story, not request time, so
 *    crawlers get a stable signal between deploys (less churn = better).
 *  - Cache-Control: 1 hour browser / 1 day CDN — long enough that Vercel
 *    edge caches it, short enough that new posts surface within a day.
 */
export async function GET() {
  // Pull every story from every locale and merge so the feed has both EN/KO.
  const allStories = routing.locales.flatMap((locale) => getAllStories(locale));

  // Sort newest first by publication date.
  const sorted = [...allStories].sort((a, b) => {
    const ad = a.date ? new Date(a.date).getTime() : 0;
    const bd = b.date ? new Date(b.date).getTime() : 0;
    return bd - ad;
  });

  const newestDate = sorted.length > 0 && sorted[0].date
    ? new Date(sorted[0].date)
    : new Date();

  const channelTitle = `${BRAND.name} — Stories`;
  const channelDescription =
    "Long-form essays, product notes, and observations from Lunive — a one-person software brand. 루나이브의 긴 글, 제품 노트, 관찰 기록.";

  const items = sorted
    .map((s) => {
      const link = absoluteUrl(`/stories/${s.slug}`, s.locale);
      const pubDate = s.date
        ? new Date(s.date).toUTCString()
        : new Date().toUTCString();
      const tagsXml = (s.tags ?? [])
        .map((t) => `<category>${escapeXml(t)}</category>`)
        .join("");
      return [
        "<item>",
        `<title>${escapeXml(s.title)}</title>`,
        `<link>${link}</link>`,
        `<guid isPermaLink="true">${link}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        s.description
          ? `<description>${escapeXml(s.description)}</description>`
          : "",
        `<dc:creator>${escapeXml(BRAND.founder)}</dc:creator>`,
        `<language>${s.locale}</language>`,
        tagsXml,
        "</item>",
      ]
        .filter(Boolean)
        .join("");
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channelDescription)}</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} ${BRAND.name}</copyright>
    <managingEditor>noreply@lunive.app (${BRAND.founder})</managingEditor>
    <webMaster>noreply@lunive.app (${BRAND.founder})</webMaster>
    <lastBuildDate>${newestDate.toUTCString()}</lastBuildDate>
    <generator>Next.js / Lunive</generator>
    <image>
      <url>${SITE_URL}/web-app-manifest-512x512.png</url>
      <title>${escapeXml(BRAND.name)}</title>
      <link>${SITE_URL}</link>
    </image>
    <category>Software</category>
    <category>Discord</category>
    <category>Music</category>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>1440</ttl>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      // 1h browser, 24h shared/CDN, allow stale 7d while revalidating.
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

/**
 * Minimal XML escape — covers the five characters that are unsafe inside
 * RSS text nodes. Story titles and descriptions can legitimately contain
 * `&`, `<`, `>`, `"`, `'` so we always run them through this.
 */
function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

