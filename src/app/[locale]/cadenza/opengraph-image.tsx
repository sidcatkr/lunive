import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/routing";

/**
 * Per-route OG image for /cadenza. Locale-aware so an EN sharer gets
 * "Discord music with a real interface" while a KO sharer gets the
 * Korean variant — matters for Slack / X previews where the
 * surrounding context is in the user's language.
 *
 * Edge runtime keeps cold start fast; image is cached at the Vercel CDN
 * once generated.
 */
export const runtime = "edge";
export const alt = "Cadenza — Discord music with a real interface";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CadenzaOgImage({
  params,
}: {
  params: { locale: Locale };
}) {
  const isKo = params.locale === "ko";
  const headline = isKo
    ? "디스코드 음악, 진짜 인터페이스로."
    : "Discord music with a real interface.";
  const sub = isKo
    ? "슬래시 명령어로 시작, 비공개 대시보드에서 듣습니다."
    : "Start with a slash command. Listen inside a private dashboard.";
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
          // Discord's brand-adjacent indigo, deliberately darker than the
          // home OG so /cadenza shares look distinct in a feed.
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #0f0e1f 55%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "26px",
            fontWeight: 600,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 9,
              background: "linear-gradient(135deg, #fde047 0%, #facc15 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            L
          </div>
          Lunive · Cadenza
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: isKo ? "76px" : "82px",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              maxWidth: "1000px",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: "26px",
              opacity: 0.78,
              maxWidth: "880px",
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
            opacity: 0.55,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#fde047",
            }}
          />
          lunive.app/cadenza
        </div>
      </div>
    ),
    { ...size },
  );
}
