import Link from "next/link";
import { restaurant } from "@/lib/restaurant";
import styles from "./Reservation.module.css";

export function BookingActions({
  showMenu = false,
  tone = "default",
}: {
  showMenu?: boolean;
  tone?: "default" | "inverse";
}) {
  return (
    <div className={styles.actions} data-tone={tone}>
      <a className={styles.primary} href={restaurant.whatsapp} target="_blank" rel="noopener noreferrer">
        Prenota su WhatsApp
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
      </a>
      {showMenu ? (
        <Link className={styles.secondary} href="/menu">Guarda il menu</Link>
      ) : (
        <a className={styles.secondary} href={`tel:${restaurant.phone}`}>Chiama {restaurant.phoneLabel}</a>
      )}
    </div>
  );
}

export default function Reservation() {
  return (
    <section className={styles.section} aria-label="Prenota un tavolo">
      <div>
        <h2>Ci vediamo a tavola.</h2>
        <p>Scrivici giorno, orario e numero di persone.<br />Il tavolo è prenotato quando ricevi la nostra conferma.</p>
      </div>
      <BookingActions />
    </section>
  );
}
