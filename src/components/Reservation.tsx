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
          Prenota su WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
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
      className={styles.section}
      aria-labelledby="booking-title"
      data-booking-visibility
    >
      <div className={`container ${styles.content}`}>
        <div>
          <h2 id="booking-title">Prenota un tavolo</h2>
          <p>Scrivici su WhatsApp. Ti confermiamo noi la disponibilità.</p>
        </div>
        <BookingActions locale={locale} tone="inverse" />
      </div>
    </section>,
    locale,
    t,
  );
}
