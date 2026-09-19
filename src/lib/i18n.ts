import translations from "@/data/translations.json";
import spanish from "@/data/translations.es.json";
import type { Locale } from "./locale";

import { createTranslator, type Messages } from "./translate";
const catalog: Record<string, string[]> = translations;
export function getMessages(locale: Locale): Messages {
  if (locale === "it") return {};
  if (locale === "es") return spanish;
  const index = { en: 0, fr: 1, de: 2 }[locale];
  return Object.fromEntries(
    Object.entries(catalog).map(([key, values]) => [key, values[index]]),
  );
}
export const getTranslator = (locale: Locale) =>
  createTranslator(getMessages(locale));
