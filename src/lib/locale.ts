export const locales = ["it", "en", "fr", "de", "es"] as const;
export type Locale = (typeof locales)[number];
export type LocaleProps = { locale?: Locale };
export type RouteProps = { params: Promise<{ locale?: string }> };
export const localeNames = {
  it: "Italiano",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
};
export function resolveLocale(value?: string): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : "it";
}
export function unlocalizedPath(path: string) {
  return path.replace(/^\/(en|fr|de|es)(?=\/|$)/, "") || "/";
}
export function localizeHref(path: string, locale: Locale) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const plain = unlocalizedPath(path);
  return locale === "it" ? plain : `/${locale}${plain === "/" ? "" : plain}`;
}
export function languageAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      `https://richardus.it${localizeHref(path, locale)}`,
    ]),
  );
}
