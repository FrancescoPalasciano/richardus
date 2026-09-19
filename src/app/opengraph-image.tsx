import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const alt = "Richardus, trattoria storica a Francavilla Fontana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function SocialImage() {
  const logo = await sharp(
    await readFile(join(process.cwd(), "src/app/images/logointero.webp")),
  )
    .png()
    .toBuffer();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: 64,
        background: "#f3f0ea",
        color: "#24251f",
        gap: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 320,
          height: 390,
          borderRadius: 28,
          background: "#24251f",
        }}
      >
        {/* ImageResponse needs an embedded raster; next/image cannot render here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={270}
          height={316}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            marginBottom: 28,
            color: "#68675f",
          }}
        >
          CUCINA PUGLIESE · FRANCAVILLA FONTANA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 70,
            lineHeight: 1.08,
            letterSpacing: -3,
          }}
        >
          Trattoria storica.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            lineHeight: 1.2,
            marginTop: 24,
          }}
        >
          Il piacere di stare a tavola.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            marginTop: 50,
            color: "#a94c2a",
          }}
        >
          richardus.it
        </div>
      </div>
    </div>,
    size,
  );
}
