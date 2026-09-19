import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import winePhoto from "@/app/images/vino.webp";
import homePhoto from "@/app/images/home.webp";
import Reservation from "@/components/Reservation";
import { BentoGrid } from "@/components/HomeSections";
import styles from "@/app/Home.module.css";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Richardus a Francavilla Fontana: orecchiette, piatti alla brace e pizze dai nomi di casa. Scopri la nostra proposta di cucina e vieni a trovarci in Via San Giovanni 15.",
};

export default function AboutPage() {
  return (
    <main id="contenuto">
      <article className={`container ${styles.about}`}>
        <header className={styles.aboutHeader}>
          <p className="eyebrow">Richardus · Francavilla Fontana</p>
          <h1>
            A tavola, a Francavilla.
            <br />
            <span>Il gusto di stare bene.</span>
          </h1>
          <p className={styles.aboutLead}>
            Ci trovi in Via San Giovanni 15, a Francavilla Fontana. Il nostro
            menu parte da tre parole: pasta, brace e pizza.
          </p>
        </header>
        <div className={styles.aboutPhotoGrid}>
          <figure>
            <Image
              src={homePhoto}
              alt="La pizza con burrata e capocollo, servita da Richardus"
              fill
              preload
              sizes="(min-width: 1520px) 800px, (min-width: 768px) 55vw, 53vw"
            />
          </figure>
          <figure>
            <Image
              src={winePhoto}
              alt="Due calici di rosato si incontrano per un brindisi da Richardus"
              fill
              sizes="(min-width: 1520px) 560px, (min-width: 768px) 40vw, 43vw"
            />
          </figure>
        </div>
        <div className={styles.aboutDetail}>
          <h2>Il territorio si legge nel menu.</h2>
          <div>
            <p>
              Orecchiette con cime di rapa, cortecce al grano arso, fave e
              verdura di stagione. Alla brace, un arrosto misto con bombette,
              capocollo, salsiccia e fegatini.
            </p>
            <p>
              Anche le pizze parlano la lingua di casa: Chianci chianci, La
              mamma mea, Cori ti la nonna. Nomi da scoprire insieme agli
              ingredienti, dal cacio ricotta alle melanzane, dalle polpette alla
              burrata.
            </p>
            <Link className="text-link" href="/menu">
              Scopri piatti, ingredienti e prezzi{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
      <BentoGrid about />
      <Reservation />
    </main>
  );
}
