import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { Locale, LocaleProps } from "@/lib/locale";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { restaurant } from "@/lib/restaurant";
import tablePhoto from "@/app/images/interno.jpg";
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
      className={styles.section}
      aria-labelledby="booking-title"
      data-booking-visibility
    >
      <Image
        src={tablePhoto}
        alt="La sala in pietra di Richardus pronta ad accogliere gli ospiti"
        fill
        sizes="100vw"
      />
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <h2 id="booking-title">
          Ci vediamo
          <span>a tavola?</span>
        </h2>
        <p>Tu scegli la compagnia. Noi mettiamo il resto.</p>
        <Button asChild variant="light">
          <a
            href={restaurant.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Prenota un tavolo su WhatsApp"
          >
            Prenota su WhatsApp
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Button>
      </div>
    </section>,
    locale,
    t,
  );
}
