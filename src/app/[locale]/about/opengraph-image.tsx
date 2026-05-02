import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";

/**
 * Per-route OG image for /about. Locale-aware. Visually distinct from the
 * /cadenza preview (lighter, editorial feel) so brand pages and product
 * pages don't blur together when shared in the same feed.
 */
export const runtime = "edge";
export const alt = "About Lunive — software designed around the people who use it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function AboutOgImage({
  params,
}: {
  params: { locale: Locale };
}) {
  const isKo = params.locale === "ko";
  const headline = isKo
    ? "사용자를 중심에 두고 만드는 소프트웨어."
    : "Software designed around the people who use it.";
  const sub = isKo
    ? "1인 소프트웨어 브랜드 — Lunive"
    : "A one-person software brand";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          // Editorial cream-on-charcoal — matches the Stories palette so
          // /about shares feel of-a-piece with the writing.
          background: "#faf7f2",
          color: "#0a0a0a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "24px",
            fontWeight: 600,
            opacity: 0.7,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fde047",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            L
          </div>
          Lunive · About
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: isKo ? "78px" : "84px",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              maxWidth: "1040px",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: "26px",
              opacity: 0.55,
              lineHeight: 1.4,
            }}
          >
            {sub}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 20,
            opacity: 0.45,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#0a0a0a",
            }}
          />
          lunive.app/about
        </div>
      </div>
    ),
    { ...size },
  );
}
