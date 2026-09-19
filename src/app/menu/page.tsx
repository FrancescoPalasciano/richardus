import type { Metadata } from "next";
import Image from "next/image";
import { Info } from "lucide-react";
import winePhoto from "@/app/images/vino.webp";
import menu from "@/data/menu.json";
import Reservation from "@/components/Reservation";
import DishCard from "@/components/DishCard";
import MenuBrowser from "@/components/MenuBrowser";
import MenuInfo from "@/components/MenuInfo";
import {
  categories,
  categoryLabel,
  dishes,
  euro,
  menuSchema,
} from "@/lib/menu";
import styles from "./Menu.module.css";

export const metadata: Metadata = {
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Il menu di Richardus",
    description:
      "Piatti, ingredienti e prezzi. Cucina pugliese e brace nella nostra trattoria a Francavilla Fontana.",
  },
  title: "Menu: piatti, ingredienti e prezzi",
  description:
    "Il menu di Richardus a Francavilla Fontana: antipasti, pasta e piatti alla brace. Consulta ingredienti e prezzi e prenota il tuo tavolo.",
  alternates: { canonical: "/menu" },
  openGraph: {
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Richardus, trattoria storica a Francavilla Fontana",
      },
    ],
    siteName: "Richardus",
    locale: "it_IT",
    type: "website",
    title: "Il menu di Richardus",
    description:
      "Piatti, ingredienti e prezzi. Cucina pugliese e brace nella nostra trattoria a Francavilla Fontana.",
    url: "/menu",
  },
};

export default function MenuPage() {
  const sections = categories.map(([id, category]) => {
    const products = dishes.filter(([, dish]) => dish.categoria === id);
    return {
      id,
      label: categoryLabel(id, category.nome),
      count: products.length,
      content: (
        <section
          id={id}
          aria-labelledby={`${id}-title`}
          className={styles.menuCategory}
          data-reveal
        >
          <div className={styles.categoryHeading}>
            <h2 id={`${id}-title`}>{category.nome}</h2>
          </div>
          {category.descrizione && (
            <p className={styles.categoryDescription}>{category.descrizione}</p>
          )}
          <ul className={styles.dishGrid}>
            {products.map(([key, dish]) => (
              <li key={key}>
                <DishCard
                  dish={dish}
                  category={categoryLabel(id, category.nome)}
                />
              </li>
            ))}
          </ul>
        </section>
      ),
    };
  });
  return (
    <main id="contenuto">
      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.menuHero}>
          <Image
            src={winePhoto}
            alt="Due calici di vino rosato per un brindisi da Richardus"
            fill
            preload
            sizes="(min-width: 1520px) 1400px, calc(100vw - 32px)"
          />
          <div className={styles.coverCopy}>
            <p className="eyebrow">Il menu Richardus</p>
            <h1>
              Cosa portiamo
              <br />a tavola.
            </h1>
            <p>
              La cucina pugliese, i primi di casa e il gusto della brace. Scegli
              da dove cominciare.
            </p>
          </div>
        </div>
        <div className={styles.menuNotice}>
          <Info size={15} aria-hidden="true" />
          <span>
            Allergie o intolleranze? Parlane con il personale prima di ordinare.{" "}
            {menu.costiAggiuntivi.coperto.visibile &&
              `Coperto ${euro.format(menu.costiAggiuntivi.coperto.prezzo)}.`}
          </span>
        </div>
      </header>
      <MenuBrowser sections={sections} />
      <MenuInfo />
      <Reservation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(menuSchema()).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
