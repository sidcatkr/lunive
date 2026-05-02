import { ImageResponse } from "next/og";
import { getStoryBySlug } from "@/lib/stories";
import type { Locale } from "@/i18n/routing";

export const runtime = "nodejs"; // need filesystem access for stories
export const alt = "Lunive Story";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function StoryOgImage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const story = getStoryBySlug(params.slug, params.locale);
  const title = story?.title ?? "Lunive";
  const description = story?.description ?? "";
  const heroSrc = story?.heroMedia?.src;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {heroSrc && (
          <img
            src={heroSrc}
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(12px) brightness(0.4)",
            }}
            alt=""
          />
        )}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px",
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
                width: 38,
                height: 38,
                borderRadius: 8,
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
            Lunive · Stories
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "72px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                maxWidth: "1000px",
              }}
            >
              {title}
            </div>
            {description && (
              <div
                style={{
                  fontSize: "26px",
                  opacity: 0.8,
                  maxWidth: "900px",
                  lineHeight: 1.4,
                }}
              >
                {description}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
