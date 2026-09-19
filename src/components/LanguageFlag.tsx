import type { Locale } from "@/lib/locale";

/** Decorative markers: the adjacent language name always supplies the meaning. */
export default function LanguageFlag({ locale }: { locale: Locale }) {
  return (
    <svg
      viewBox="0 0 30 20"
      width="24"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      {locale === "it" && (
        <>
          <path fill="#009246" d="M0 0h10v20H0z" />
          <path fill="#fff" d="M10 0h10v20H10z" />
          <path fill="#ce2b37" d="M20 0h10v20H20z" />
        </>
      )}
      {locale === "fr" && (
        <>
          <path fill="#002654" d="M0 0h10v20H0z" />
          <path fill="#fff" d="M10 0h10v20H10z" />
          <path fill="#ed2939" d="M20 0h10v20H20z" />
        </>
      )}
      {locale === "de" && (
        <>
          <path fill="#000" d="M0 0h30v7H0z" />
          <path fill="#d00" d="M0 7h30v6H0z" />
          <path fill="#ffce00" d="M0 13h30v7H0z" />
        </>
      )}
      {locale === "es" && (
        <>
          <path fill="#aa151b" d="M0 0h30v20H0z" />
          <path fill="#f1bf00" d="M0 5h30v10H0z" />
          <path fill="#aa151b" d="M8 8h4v5H8z" />
          <path fill="#f1bf00" d="M9 9h2v3H9z" />
        </>
      )}
      {locale === "en" && (
        <>
          <path fill="#012169" d="M0 0h30v20H0z" />
          <path stroke="#fff" strokeWidth="5" d="m0 0 30 20M30 0 0 20" />
          <path stroke="#c8102e" strokeWidth="2" d="m0 0 30 20M30 0 0 20" />
          <path stroke="#fff" strokeWidth="7" d="M15 0v20M0 10h30" />
          <path stroke="#c8102e" strokeWidth="4" d="M15 0v20M0 10h30" />
        </>
      )}
    </svg>
  );
}
