import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import winePhoto from "@/app/images/vino.webp";
import Reservation from "@/components/Reservation";
import styles from "@/app/Home.module.css";

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "Richardus a Francavilla Fontana: orecchiette, piatti alla brace e pizze dai nomi di casa. Scopri la nostra proposta di cucina e vieni a trovarci in Via San Giovanni 15.",
};

export default function AboutPage() {
  return (
    <main id="contenuto">
      <article className={styles.about}>
        <h1>Richardus.<br />A tavola, a Francavilla.</h1>
        <p className={styles.aboutLead}>Ci trovi in Via San Giovanni 15, a Francavilla Fontana. Il nostro menu parte da tre parole: pasta, brace e pizza.</p>
        <div className={styles.aboutBody}>
          <figure className={styles.aboutPhoto}>
            <Image src={winePhoto} alt="Due calici di rosato si incontrano per un brindisi da Richardus" fill sizes="(min-width: 900px) 45vw, 100vw" />
          </figure>
          <div>
            <h2>Il territorio si legge nel menu.</h2>
            <p>Orecchiette con cime di rapa, cortecce al grano arso, fave e verdura di stagione. Alla brace, un arrosto misto con bombette, capocollo, salsiccia e fegatini.</p>
            <p>Anche le pizze parlano la lingua di casa: Chianci chianci, La mamma mea, Cori ti la nonna. Nomi da scoprire insieme agli ingredienti, dal cacio ricotta alle melanzane, dalle polpette alla burrata.</p>
            <Link className={styles.textLink} href="/menu">Scopri piatti, ingredienti e prezzi</Link>
          </div>
        </div>
      </article>
      <Reservation />
    </main>
  );
}
