import type { Metadata } from "next";
import Header from "@/components/Header";
import menu from "@/data/menu.json";
import "./globals.css";

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
    <html lang="it" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header categorie={categorie} />
        {children}
      </body>
    </html>
  );
}
