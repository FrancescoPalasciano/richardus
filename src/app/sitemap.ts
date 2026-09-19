import type { MetadataRoute } from "next";
import { locales, localizeHref, languageAlternates } from "@/lib/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    ["/", "/menu", "/chi-siamo"].map((path) => ({
      url: `https://richardus.it${localizeHref(path, locale)}`,
      changeFrequency:
        path === "/menu" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/menu" ? 0.9 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
