import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://richardus.it/sitemap.xml",
    host: "https://richardus.it",
  };
}
