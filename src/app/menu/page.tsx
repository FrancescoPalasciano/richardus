import type { Metadata } from "next";
import Image from "next/image";
import { Info } from "lucide-react";
import homePhoto from "@/app/images/home.webp";
import menu from "@/data/menu.json";
import Reservation from "@/components/Reservation";
import DishCard from "@/components/DishCard";
import MenuBrowser from "@/components/MenuBrowser";
import MenuInfo from "@/components/MenuInfo";
import { Badge } from "@/components/ui/surfaces";
import {
  categories,
  categoryLabel,
  dishes,
  euro,
  menuSchema,
} from "@/lib/menu";
import styles from "./Menu.module.css";

export const metadata: Metadata = {
  title: "Menu: piatti, ingredienti e prezzi",
  description:
    "Il menu di Richardus a Francavilla Fontana: antipasti, pasta, piatti alla brace e pizze. Consulta ingredienti e prezzi e prenota il tuo tavolo.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Il menu di Richardus",
    description:
      "Piatti, ingredienti e prezzi. Pasta, brace e pizza a Francavilla Fontana.",
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
        >
          <div className={styles.categoryHeading}>
            <h2 id={`${id}-title`}>{category.nome}</h2>
            <span>{products.length} proposte</span>
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
          {id === "pizze" && (
            <p className={styles.categoryNote}>
              {menu.costiAggiuntivi.aggiuntePizze.descrizione}
            </p>
          )}
        </section>
      ),
    };
  });
  return (
    <main id="contenuto">
      <header className={`container ${styles.pageHeader}`}>
        <div>
          <p className="eyebrow">Il menu Richardus</p>
          <h1>
            Cosa portiamo
            <br />
            <span>a tavola.</span>
          </h1>
          <p>
            Pasta, brace e pizza. Scegli da dove cominciare, al resto pensiamo
            noi.
          </p>
          <div className={styles.menuNotice}>
            <Info size={15} aria-hidden="true" />
            <span>
              Allergie o intolleranze? Parlane con il personale prima di
              ordinare.{" "}
              {menu.costiAggiuntivi.coperto.visibile &&
                `Coperto ${euro.format(menu.costiAggiuntivi.coperto.prezzo)}.`}
            </span>
          </div>
        </div>
        <figure className={styles.menuCover}>
          <Image
            src={homePhoto}
            alt="Pizza di Richardus con burrata e capocollo"
            fill
            preload
            sizes="(min-width: 1520px) 560px, (min-width: 768px) 38vw, calc(100vw - 32px)"
          />
          <figcaption>
            <Badge>Ingredienti, carattere, gusto.</Badge>
          </figcaption>
        </figure>
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
