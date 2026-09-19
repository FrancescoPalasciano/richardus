"use client";

import { usePathname, useRouter } from "next/navigation";
import { Select } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import {
  locales,
  localeNames,
  localizeHref,
  unlocalizedPath,
  type Locale,
} from "@/lib/locale";
import LanguageFlag from "./LanguageFlag";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Select.Root
      value={locale}
      onValueChange={(value) =>
        router.push(
          localizeHref(unlocalizedPath(pathname), value as Locale) +
            window.location.hash,
        )
      }
    >
      <Select.Trigger
        className={styles.trigger}
        aria-label={`${t("Lingua")}: ${localeNames[locale]}`}
      >
        <Select.Value>
          <span className={styles.selection}>
            <LanguageFlag locale={locale} />
            <span className={styles.fullName} lang={locale}>
              {localeNames[locale]}
            </span>
            <span className={styles.shortName}>{locale.toUpperCase()}</span>
          </span>
        </Select.Value>
        <Select.Icon asChild>
          <ChevronDown size={14} aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={styles.content}
          position="popper"
          align="end"
          sideOffset={10}
          collisionPadding={12}
        >
          <div className={styles.heading}>{t("Lingua")}</div>
          <Select.Viewport className={styles.viewport}>
            {locales.map((value) => (
              <Select.Item
                className={styles.item}
                value={value}
                key={value}
                textValue={localeNames[value]}
              >
                <LanguageFlag locale={value} />
                <Select.ItemText>
                  <span lang={value}>{localeNames[value]}</span>
                </Select.ItemText>
                <span className={styles.code} aria-hidden="true">
                  {value.toUpperCase()}
                </span>
                <Select.ItemIndicator className={styles.check}>
                  <Check size={16} aria-hidden="true" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
