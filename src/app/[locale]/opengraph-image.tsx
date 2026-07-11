import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Seraf Technology";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await params;
  const sk = locale === "sk";
  const title = sk ? "Chráňte svoj objekt." : "Protect your site.";
  const accent = sk ? "Každý pohyb pod kontrolou." : "Every movement under control.";
  const tagline = sk
    ? "Autonómne mobilné strážne veže · Nasadenie do 48 hodín"
    : "Autonomous mobile surveillance towers · Deployed in 48 hours";

  const logo = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0f14",
          padding: "72px",
          color: "#e6edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={96} height={72} style={{ borderRadius: 14 }} alt="" />
          <div style={{ fontSize: 30, fontWeight: 600 }}>Seraf Technology</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, color: "#22d3ee" }}>{accent}</div>
        </div>

        <div style={{ fontSize: 26, color: "#8aa0b2" }}>{tagline}</div>
      </div>
    ),
    { ...size }
  );
}
