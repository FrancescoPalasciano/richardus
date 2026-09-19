import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import GoogleMap from "./GoogleMap";
import OpeningHoursCard from "./OpeningHoursCard";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/surfaces";
import { restaurant } from "@/lib/restaurant";
import styles from "./VisitSection.module.css";
import Brand from "./Brand";

export default function VisitSection() {
  return (
    <section
      id="contatti"
      data-reveal
      aria-labelledby="visit-title"
      className={`container ${styles.section}`}
    >
      <SectionHeading
        id="visit-title"
        eyebrow="Dove siamo"
        title={
          <>
            Il tuo prossimo tavolo.
            <br />A Francavilla.
          </>
        }
        description="Via San Giovanni 15, Francavilla Fontana. Provincia di Brindisi, Puglia."
      />
      <div className={styles.visitGrid}>
        <div className={styles.locationCard}>
          <div className={styles.address}>
            <Brand />
            <h3>Ci trovi qui.</h3>
            <address>
              <p>
                Via San Giovanni 15
                <br />
                Francavilla Fontana
                <br />
                <span>Brindisi · Puglia</span>
              </p>
              <a href={`tel:${restaurant.phone}`}>
                <Phone size={17} aria-hidden="true" />
                {restaurant.phoneLabel}
              </a>
            </address>
            <Button asChild variant="secondary">
              <a
                href={restaurant.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                Indicazioni <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className={styles.mapPanel}>
            <MapPin size={30} aria-hidden="true" />
            <p>
              Francavilla
              <br />
              Fontana<span>Puglia, Italia</span>
            </p>
            <GoogleMap />
          </div>
        </div>
        <OpeningHoursCard />
      </div>
    </section>
  );
}
