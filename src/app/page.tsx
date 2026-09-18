import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VisitSection from "@/components/VisitSection";
import ReviewsSection from "@/components/ReviewsSection";
import Reservation, { BookingActions } from "@/components/Reservation";
import homePhoto from "@/app/images/home.webp";
import menu from "@/data/menu.json";
import { restaurant } from "@/lib/restaurant";
import styles from "./Home.module.css";

export const metadata: Metadata = {
  description: "Pasta, brace e pizza da Richardus, in Via San Giovanni 15 a Francavilla Fontana. Scopri piatti e prezzi e prenota il tuo tavolo su WhatsApp o per telefono.",
};
const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: menu.valuta });
const selection = ["orecchiette-cime-rapa", "arrosto-misto", "la-richardus"] as const;

export default function Home() {
  return (
    <main id="contenuto">
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <h1 id="home-title">Pasta, brace<br />e pizza.</h1>
          <p className={styles.location}>Richardus · Francavilla Fontana</p>
          <p className={styles.intro}>Le orecchiette, le bombette, una pizza da scegliere.<br className={styles.desktopBreak} /> Il piacere di ritrovarsi a tavola.</p>
          <BookingActions showMenu />
          <a className={styles.phone} href={`tel:${restaurant.phone}`}>Preferisci chiamare? {restaurant.phoneLabel}</a>
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.heroPhoto}>
            <Image src={homePhoto} alt="Una pizza di Richardus con mozzarella, prosciutto e basilico" fill preload sizes="(min-width: 900px) 48vw, 100vw" />
          </div>
          <figcaption>Una pizza, un tavolo. Richardus.</figcaption>
        </figure>
      </section>
      <section className={styles.selection} aria-labelledby="selection-title">
        <div className={styles.selectionIntro}>
          <h2 id="selection-title">La Puglia,<br />nel piatto.</h2>
          <p>Tre proposte dal nostro menu, tra pasta, brace e pizza. Per cominciare a scegliere, ancora prima di sedersi.</p>
          <Link className={styles.textLink} href="/menu">Tutti i piatti e i prezzi</Link>
        </div>
        <ul className={styles.dishes}>
          {selection.filter(id => menu.prodotti[id].visibile).map(id => {
            const dish = menu.prodotti[id];
            return (
              <li key={id}>
                <div className={styles.dishTitle}>
                  <h3><Link href={`/menu#${dish.categoria}`}>{id === "la-richardus" ? "La Richardus" : dish.nome}</Link></h3>
                  <span>{euro.format(dish.prezzo)}</span>
                </div>
                {dish.descrizione && <p>{dish.descrizione}</p>}
              </li>
            );
          })}
        </ul>
      </section>
      <VisitSection />
      <ReviewsSection />
      <Reservation />
    </main>
  );
}
