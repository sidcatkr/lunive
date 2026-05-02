import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lunive — User-experience first software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #18181b 60%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "28px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            opacity: 0.85,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(135deg, #fde047 0%, #facc15 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            L
          </div>
          Lunive
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            User-experience first
            <br />
            software.
          </div>
          <div
            style={{
              fontSize: "30px",
              opacity: 0.7,
              fontWeight: 400,
            }}
          >
            Lunive — lunive.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
