"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createTranslator, type Messages } from "@/lib/translate";
import type { Locale } from "@/lib/locale";
const LocaleContext = createContext({
  locale: "it" as Locale,
  t: (text: string) => text,
});
export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, t: createTranslator(messages) }),
    [locale, messages],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
export const useLocale = () => useContext(LocaleContext);
