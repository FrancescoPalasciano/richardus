import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import menu from "@/data/menu.json";
import "./globals.css";

const workSans = localFont({
  src: "./fonts/work-sans-latin.woff2",
  variable: "--font-work-sans",
  weight: "100 900",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Arial",
});

const ebGaramond = localFont({
  src: "./fonts/eb-garamond-latin.woff2",
  variable: "--font-eb-garamond",
  weight: "400 800",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: {
    default: "Richardus | Ristorante",
    template: "%s | Richardus",
  },
  description: "Il nuovo sito del ristorante Richardus sta prendendo forma.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const categorie = Object.entries(menu.categorie)
    .filter(([id]) =>
      Object.values(menu.prodotti).some(
        (prodotto) => prodotto.categoria === id && prodotto.visibile,
      ),
    )
    .sort(([, a], [, b]) => a.ordine - b.ordine)
    .map(([id, categoria]) => ({ id, nome: categoria.nome }));

  return (
    <html
      lang="it"
      className={`${workSans.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header categorie={categorie} />
        {children}
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
