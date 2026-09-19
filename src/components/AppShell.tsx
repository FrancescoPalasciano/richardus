import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { restaurant } from "@/lib/restaurant";
import { getMessages, getTranslator } from "@/lib/i18n";
import {
  resolveLocale,
  localizeHref,
  languageAlternates,
  type RouteProps,
} from "@/lib/locale";
import { LocaleProvider } from "@/components/LocaleProvider";
import "@/app/globals.css";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "400 700",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Arial",
});
const baseMetadata: Metadata = {
  icons: {
    icon: { url: "/icon", type: "image/png", sizes: "256x256" },
    apple: "/icon",
  },
  metadataBase: new URL("https://richardus.it"),
  alternates: { canonical: "/" },
  title: {
    default: "Richardus | Trattoria a Francavilla Fontana",
    template: "%s | Richardus",
  },
  description:
    "Richardus, trattoria a Francavilla Fontana. Cucina pugliese, pasta e piatti alla brace. Consulta il menu e prenota un tavolo per telefono o su WhatsApp.",
  openGraph: {
    images: [
      {
        url: "https://richardus.it/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Richardus",
      },
    ],
    title: "Richardus | Trattoria a Francavilla Fontana",
    description:
      "Scopri il menu di Richardus e prenota il tuo tavolo in Via San Giovanni 15.",
    locale: "it_IT",
    type: "website",
    siteName: "Richardus",
    url: "/",
  },
  twitter: {
    images: ["https://richardus.it/opengraph-image"],
    card: "summary_large_image",
    title: "Richardus | Trattoria a Francavilla Fontana",
    description: "Il menu e i contatti di Richardus a Francavilla Fontana.",
  },
};

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getTranslator(locale);
  return {
    ...baseMetadata,
    title: {
      default: t("Richardus | Trattoria a Francavilla Fontana"),
      template: "%s | Richardus",
    },
    description: t(baseMetadata.description!),
    alternates: {
      canonical: localizeHref("/", locale),
      languages: languageAlternates("/"),
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: t("Richardus | Trattoria a Francavilla Fontana"),
      description: t(
        "Scopri il menu di Richardus e prenota il tuo tavolo in Via San Giovanni 15.",
      ),
      locale: {
        it: "it_IT",
        en: "en_GB",
        fr: "fr_FR",
        de: "de_DE",
        es: "es_ES",
      }[locale],
      url: localizeHref("/", locale),
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("Richardus | Trattoria a Francavilla Fontana"),
      description: t(
        "Il menu e i contatti di Richardus a Francavilla Fontana.",
      ),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: RouteProps & { children: React.ReactNode }) {
  const locale = resolveLocale((await params).locale);
  const t = getTranslator(locale);
  return (
    <html lang={locale} className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#contenuto">
          {t("Vai al contenuto")}
        </a>
        <LocaleProvider locale={locale} messages={getMessages(locale)}>
          <Header />
          {children}
          <Footer locale={locale} />
          <ScrollReveal />
        </LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "@id": "https://richardus.it/#ristorante",
              name: "Richardus",
              url: "https://richardus.it",
              image: "https://richardus.it/opengraph-image",
              hasMenu: "https://richardus.it/menu",
              hasMap: restaurant.maps,
              sameAs: ["https://www.instagram.com/richardus_mangia_e_bevi/"],
              acceptsReservations: true,
              description:
                "Trattoria a Francavilla Fontana, in provincia di Brindisi, Puglia. Cucina italiana e pugliese, pasta e piatti alla brace.",
              telephone: restaurant.phone,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Via San Giovanni 15",
                addressLocality: "Francavilla Fontana",
                addressRegion: "Puglia",
                addressCountry: "IT",
              },
              servesCuisine: ["Italiana", "Pugliese"],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "19:30",
                  closes: "00:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "12:30",
                  closes: "15:00",
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
