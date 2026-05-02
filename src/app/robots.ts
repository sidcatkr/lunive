import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api/ — no public API yet, but reserved.
        // /(en|ko)/prototype/ — staging route for design experiments.
        disallow: ["/api/", "/en/prototype/", "/ko/prototype/"],
      },
      // GPTBot / CCBot / Anthropic-AI scrapers: explicitly allowed (we want
      // Lunive content surfaced inside Claude/ChatGPT for brand recognition).
      // Rule of thumb: if a bot identifies itself, treat it like Google.
    ],
    // Multi-sitemap declaration — Google and Naver both fetch every URL
    // listed here. RSS isn't an official robots-spec field, but several
    // crawlers (Yeti, IndexNow) do read it.
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/feed.xml`],
    host: SITE_URL,
  };
}
