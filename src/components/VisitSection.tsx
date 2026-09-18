import Image from "next/image";
import winePhoto from "@/app/images/vino.webp";
import styles from "./VisitSection.module.css";

const mapsUrl =
  "https://maps.google.com/?q=Via+San+Giovanni+15,+Francavilla+Fontana,+BR";

export default function VisitSection({ telefono }: { telefono: string }) {
  return (
    <section
      id="contatti"
      aria-labelledby="visit-title"
      className={styles.section}
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>Ti aspettiamo a Francavilla Fontana</p>
        <h2 id="visit-title" className={styles.title}>
          Il tuo posto a tavola.
        </h2>
        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>Dove siamo</dt>
            <dd>
              <address className={styles.address}>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.addressLink}
                >
                  <span>
                    Via S. Giovanni 15,
                    <br />
                    Francavilla Fontana
                  </span>
                  <span className={styles.mapLabel}>
                    Apri in Google Maps
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                </a>
              </address>
            </dd>
          </div>
          <div className={styles.detail}>
            <dt>Orari di apertura</dt>
            <dd>
              <dl className={styles.hours}>
                <div>
                  <dt>Martedì–sabato</dt>
                  <dd>
                    <span>
                      <time dateTime="19:30">19:30</time>–
                      <time dateTime="00:00">00:00</time>
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>Domenica</dt>
                  <dd>
                    <span>
                      <time dateTime="12:30">12:30</time>–
                      <time dateTime="15:00">15:00</time>
                    </span>
                    <span>
                      <time dateTime="19:30">19:30</time>–
                      <time dateTime="00:00">00:00</time>
                    </span>
                  </dd>
                </div>
              </dl>
            </dd>
          </div>
          <div className={styles.detail}>
            <dt>Chiamaci per prenotare</dt>
            <dd>
              <a href={`tel:${telefono}`} className={styles.phone}>
                329 009 0918
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <div className={styles.picture}>
        <Image
          src={winePhoto}
          alt="Un brindisi con due calici di vino rosato da Richardus"
          fill
          sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 100vw"
          className={styles.photo}
        />
      </div>
    </section>
  );
}
