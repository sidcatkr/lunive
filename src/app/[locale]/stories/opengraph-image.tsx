import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";

/**
 * Per-route OG image for /stories (the index, not the per-article page —
 * those have their own /stories/[slug]/opengraph-image.tsx).
 * Editorial-on-cream like /about, but headline is the index masthead so
 * a Slack share of the writing hub reads as "writing hub", not as a
 * generic Lunive card.
 */
export const runtime = "edge";
export const alt = "Lunive Stories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function StoriesIndexOgImage({
  params,
}: {
  params: { locale: Locale };
}) {
  const isKo = params.locale === "ko";
  const headlineParts = isKo
    ? { a: "만드는 방식을 ", b: "바꾸는", c: " 글쓰기." }
    : { a: "Writing ", b: "that shapes", c: " how we build." };
  const sub = isKo
    ? "긴 글, 제품 노트, 관찰 기록 — 루나이브 팀."
    : "Long-form essays, product notes, observations.";
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
          Lunive · Stories
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: isKo ? "82px" : "88px",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
              maxWidth: "1040px",
              fontFamily: "Georgia, serif",
            }}
          >
            {headlineParts.a}
            <span
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, #fde047 60%, #fde047 90%, transparent 90%)",
                padding: "0 4px",
                fontStyle: "italic",
              }}
            >
              {headlineParts.b}
            </span>
            {headlineParts.c}
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
          lunive.app/stories
        </div>
      </div>
    ),
    { ...size },
  );
}
