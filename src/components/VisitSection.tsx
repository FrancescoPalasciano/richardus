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
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Ti aspettiamo a Francavilla Fontana</p>
        <h2 id="visit-title" className={styles.title}>
          Il tuo posto a tavola.
        </h2>
      </div>
      <div className={styles.content}>
        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>
              <span className={styles.number} aria-hidden="true">
                01
              </span>
              Dove siamo
            </dt>
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
            <dt>
              <span className={styles.number} aria-hidden="true">
                02
              </span>
              Orari di apertura
            </dt>
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
            <dt>
              <span className={styles.number} aria-hidden="true">
                03
              </span>
              Chiamaci per prenotare
            </dt>
            <dd>
              <a href={`tel:${telefono}`} className={styles.phone}>
                329 009 0918
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="m7 17 10-10M7 7h10v10" />
                </svg>
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <figure className={styles.picture}>
        <div className={styles.imageFrame}>
          <Image
            src={winePhoto}
            alt="Un brindisi con due calici di vino rosato da Richardus"
            fill
            sizes="(min-width: 1280px) 560px, (min-width: 900px) 46vw, 100vw"
            className={styles.photo}
          />
        </div>
        <figcaption className={styles.caption}>
          <span>Richardus</span>
          <span>Francavilla Fontana</span>
        </figcaption>
      </figure>
    </section>
  );
}
