import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const contentType = "image/png";
export const dynamic = "force-static";

export async function GET() {
  const logo = await sharp(
    await readFile(join(process.cwd(), "src/app/images/logo.webp")),
  )
    .resize(256, 256, { fit: "contain", background: "#000000" })
    .png()
    .toBuffer();
  return new Response(new Uint8Array(logo), {
    headers: { "Content-Type": contentType },
  });
}
