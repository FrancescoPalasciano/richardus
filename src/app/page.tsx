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
        <Image
          src={homePhoto}
          alt=""
          fill
          preload
          sizes="100vw"
          className={styles.heroPhoto}
        />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 id="home-title">Mangia<br />e bevi.</h1>
            <p className={styles.intro}>
              Un tavolo, qualcosa di buono.<br />
              Il resto può aspettare.
            </p>
            <a className={styles.location} href={restaurant.maps} target="_blank" rel="noopener noreferrer">
              <strong>Francavilla Fontana</strong>
              <span>Via San Giovanni 15</span>
            </a>
            <BookingActions showMenu tone="inverse" />
            <a className={styles.phone} href={`tel:${restaurant.phone}`}>Chiama {restaurant.phoneLabel}</a>
          </div>
        </div>
      </section>
      <section className={styles.selection} aria-labelledby="selection-title">
        <div className={styles.selectionIntro}>
          <h2 id="selection-title">La Puglia,<br />nel piatto.</h2>
          <p>Pasta, brace e pizza. Il gusto di casa.</p>
          <Link className={styles.textLink} href="/menu">Scopri il menu</Link>
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
