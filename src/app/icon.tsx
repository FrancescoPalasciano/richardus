import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Icon() {
  const logo = await sharp(
    await readFile(join(process.cwd(), "src/app/images/logointero.webp")),
  )
    .resize(256, 256, { fit: "contain", background: "#24251f" })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(logo), {
    headers: { "Content-Type": contentType },
  });
}
