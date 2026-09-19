import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "@/app/page";
import MenuPage from "@/app/menu/page";
import AboutPage from "@/app/chi-siamo/page";
import PrivacyPage from "@/app/privacy-policy/page";
import CookiePage from "@/app/cookie-policy/page";
import { getTranslator } from "@/lib/i18n";
import {
  locales,
  resolveLocale,
  localizeHref,
  languageAlternates,
} from "@/lib/locale";

type Props = { params: Promise<{ locale: string; slug?: string[] }> };
const pages = {
  "": Home,
  menu: MenuPage,
  "chi-siamo": AboutPage,
  "privacy-policy": PrivacyPage,
  "cookie-policy": CookiePage,
};
const titles = {
  "": "Richardus | Trattoria a Francavilla Fontana",
  menu: "Menu: piatti, ingredienti e prezzi",
  "chi-siamo": "La nostra trattoria a Francavilla Fontana",
  "privacy-policy": "Privacy policy",
  "cookie-policy": "Cookie policy",
};
const descriptions = {
  "": "Richardus, trattoria storica a Francavilla Fontana: cucina pugliese, pasta e carne alla brace in Via San Giovanni 15. Scopri il menu e prenota il tuo tavolo.",
  menu: "Il menu di Richardus a Francavilla Fontana: antipasti, pasta e piatti alla brace. Consulta ingredienti e prezzi e prenota il tuo tavolo.",
  "chi-siamo":
    "Trattoria storica a Francavilla Fontana, in provincia di Brindisi, Puglia. Cucina italiana e pugliese, pasta e piatti alla brace.",
  "privacy-policy": "Informazioni sul trattamento dei dati del sito Richardus.",
  "cookie-policy": "Cookie e contenuti esterni del sito Richardus.",
};
export const dynamicParams = false;
export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "it")
    .flatMap((locale) =>
      Object.keys(pages).map((slug) => ({ locale, slug: slug ? [slug] : [] })),
    );
}
function resolvePage(locale: string, slug: string[] = []) {
  const key = slug.join("/");
  if (!["en", "fr", "de"].includes(locale) || !Object.hasOwn(pages, key))
    notFound();
  return { locale: resolveLocale(locale), key: key as keyof typeof pages };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params;
  const { locale, key } = resolvePage(values.locale, values.slug);
  const t = getTranslator(locale),
    path = key ? `/${key}` : "/";
  const title = t(titles[key]),
    description = t(descriptions[key]);
  return {
    title: key ? title : { absolute: title },
    description,
    alternates: {
      canonical: localizeHref(path, locale),
      languages: languageAlternates(path),
    },
    robots: key.endsWith("policy")
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: localizeHref(path, locale),
      siteName: "Richardus",
      type: "website",
      locale: { en: "en_GB", fr: "fr_FR", de: "de_DE", it: "it_IT" }[locale],
      images: [
        { url: "/opengraph-image", width: 1200, height: 630, alt: "Richardus" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export default async function LocalizedPage({ params }: Props) {
  const values = await params;
  const { locale, key } = resolvePage(values.locale, values.slug);
  const Page = pages[key];
  return <Page params={Promise.resolve({ locale })} />;
}
