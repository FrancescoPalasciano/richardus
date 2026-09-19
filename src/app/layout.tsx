import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { restaurant } from "@/lib/restaurant";
import "./globals.css";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "400 700",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Arial",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://richardus.it"),
  alternates: { canonical: "/" },
  title: {
    default: "Richardus | Trattoria a Francavilla Fontana",
    template: "%s | Richardus",
  },
  description:
    "Richardus, trattoria storica a Francavilla Fontana. Cucina pugliese, pasta e piatti alla brace. Consulta il menu e prenota un tavolo per telefono o su WhatsApp.",
  openGraph: {
    title: "Richardus | Trattoria a Francavilla Fontana",
    description:
      "Scopri il menu di Richardus e prenota il tuo tavolo in Via San Giovanni 15.",
    locale: "it_IT",
    type: "website",
    siteName: "Richardus",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richardus | Trattoria storica a Francavilla Fontana",
    description: "Il menu e i contatti di Richardus a Francavilla Fontana.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#contenuto">
          Vai al contenuto
        </a>
        <Header />
        {children}
        <Footer />
        <ScrollReveal />
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
                "Trattoria storica a Francavilla Fontana, in provincia di Brindisi, Puglia. Cucina italiana e pugliese, pasta e piatti alla brace.",
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
