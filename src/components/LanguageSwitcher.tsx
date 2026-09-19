"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import {
  locales,
  localeNames,
  localizeHref,
  unlocalizedPath,
  type Locale,
} from "@/lib/locale";

export default function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const pathname = usePathname(),
    router = useRouter();
  return (
    <label className="language-switcher">
      <span className="sr-only">{t("Lingua")}</span>
      <select
        value={locale}
        onChange={(event) =>
          router.push(
            localizeHref(
              unlocalizedPath(pathname),
              event.target.value as Locale,
            ) + window.location.hash,
          )
        }
        aria-label={t("Lingua")}
      >
        {locales.map((value) => (
          <option
            value={value}
            key={value}
            lang={value}
            aria-label={localeNames[value]}
          >
            {value.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
