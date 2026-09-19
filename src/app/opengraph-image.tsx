import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Richardus, pasta, brace e pizza a Francavilla Fontana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function SocialImage() {
  const photo = await readFile(join(process.cwd(), "src/app/images/home.webp"));
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 32,
        background: "#f3f0ea",
        color: "#24251f",
        gap: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          paddingLeft: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 16,
            marginBottom: 44,
            letterSpacing: 2,
          }}
        >
          FRANCAVILLA FONTANA · PUGLIA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            fontWeight: 600,
            letterSpacing: -4,
          }}
        >
          Richardus<span style={{ color: "#a94c2a" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 28 }}>
          Pasta, brace, pizza.
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#68675f" }}>
          Fatto bene.
        </div>
        <div style={{ display: "flex", marginTop: 54, fontSize: 18 }}>
          richardus.it
        </div>
      </div>
      {/* ImageResponse renders to PNG; next/image is not supported in this renderer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/webp;base64,${photo.toString("base64")}`}
        alt=""
        width={490}
        height={566}
        style={{
          borderRadius: 28,
          objectFit: "cover",
          objectPosition: "50% 65%",
        }}
      />
    </div>,
    size,
  );
}
