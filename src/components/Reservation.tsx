import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { Locale, LocaleProps } from "@/lib/locale";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { restaurant } from "@/lib/restaurant";
import styles from "./Reservation.module.css";

export function BookingActions({
  locale = "it",
  showMenu = false,
  tone = "default",
}: {
  locale?: Locale;
  showMenu?: boolean;
  tone?: "default" | "inverse";
}) {
  const t = getTranslator(locale);
  return localizeTree(
    <div className={styles.actions} data-tone={tone}>
      <Button asChild variant={tone === "inverse" ? "light" : "default"}>
        <a
          href={restaurant.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Prenota un tavolo su WhatsApp"
        >
          Prenota un tavolo <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </Button>
      {showMenu ? (
        <Link href="/menu" className={styles.secondary}>
          Scopri il menu <ArrowRight size={18} aria-hidden="true" />
        </Link>
      ) : (
        <a className={styles.secondary} href={`tel:${restaurant.phone}`}>
          <Phone size={17} aria-hidden="true" /> Chiamaci
        </a>
      )}
    </div>,
    locale,
    t,
  );
}

export default function Reservation({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <section
      id="prenota"
      data-reveal
      className={`container ${styles.section}`}
      aria-labelledby="booking-title"
      data-booking-visibility
    >
      <div className={styles.copy}>
        <p className="eyebrow">Il piacere di ritrovarsi</p>
        <h2 id="booking-title">
          Ci vediamo
          <br />a tavola?
        </h2>
        <p>
          Tu scegli la compagnia.
          <br />
          Noi mettiamo il resto.
        </p>
      </div>
      <div className={styles.booking}>
        <BookingActions tone="inverse" locale={locale} />
        <p>
          Scrivici su WhatsApp giorno, orario e numero di persone. Il tavolo è
          prenotato quando ricevi la nostra conferma.
        </p>
        <a className={styles.phone} href={`tel:${restaurant.phone}`}>
          {restaurant.phoneLabel}
        </a>
      </div>
    </section>,
    locale,
    t,
  );
}
