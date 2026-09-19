import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://richardus.it", changeFrequency: "monthly", priority: 1 },
    {
      url: "https://richardus.it/menu",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://richardus.it/chi-siamo",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
