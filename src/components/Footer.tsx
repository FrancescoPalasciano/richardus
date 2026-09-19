import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { restaurant } from "@/lib/restaurant";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`container ${styles.footer}`}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link
            href="/"
            className="wordmark"
            aria-label="Richardus, torna alla home"
          >
            richardus
          </Link>
          <p>
            Pasta · Brace · Pizza
            <br />
            Francavilla Fontana, BR · Puglia
          </p>
        </div>
        <nav aria-label="Navigazione del footer">
          <Link href="/menu">Menu</Link>
          <Link href="/chi-siamo">Chi siamo</Link>
          <Link href="/#contatti">Contatti</Link>
          <a
            href="https://www.instagram.com/richardus_mangia_e_bevi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Instagram <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
        <div className={styles.contact}>
          <a href={`tel:${restaurant.phone}`}>{restaurant.phoneLabel}</a>
          <a href={restaurant.maps} target="_blank" rel="noopener noreferrer">
            Via San Giovanni 15
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Richardus</p>
        <nav aria-label="Informazioni legali">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/cookie-policy">Cookie</Link>
        </nav>
        <a
          href="https://www.instagram.com/senzafrenodigital/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Senza Freno Digital{" "}
          <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
