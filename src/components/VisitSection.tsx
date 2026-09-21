import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { LocaleProps } from "@/lib/locale";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import OpeningHoursCard from "./OpeningHoursCard";
import { Button } from "@/components/ui/button";
import { restaurant } from "@/lib/restaurant";
import styles from "./VisitSection.module.css";

export default function VisitSection({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <section
      id="contatti"
      data-reveal
      aria-labelledby="visit-title"
      className={styles.section}
    >
      <div className={`container ${styles.heading}`}>
        <h2 id="visit-title">
          Nel cuore di
          <span>Francavilla.</span>
        </h2>
        <p>
          Richardus è in Via San Giovanni 15, tra le strade del centro di
          Francavilla Fontana. La tavola è a pochi passi dalla città.
        </p>
      </div>
      <div className={`container ${styles.visitGrid}`}>
        <div className={styles.locationCard}>
          <div className={styles.address}>
            <MapPin size={26} aria-hidden="true" />
            <h3>Via San Giovanni 15</h3>
            <address>
              Francavilla Fontana
              <br />
              Brindisi · Puglia
            </address>
            <a className={styles.phone} href={`tel:${restaurant.phone}`}>
              <Phone size={17} aria-hidden="true" />
              {restaurant.phoneLabel}
            </a>
            <Button asChild>
              <a
                href={restaurant.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portami da Richardus
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
        <OpeningHoursCard />
      </div>
    </section>,
    locale,
    t,
  );
}
