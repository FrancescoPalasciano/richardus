import Image from "next/image";
import GoogleMap from "./GoogleMap";
import winePhoto from "@/app/images/vino.webp";
import styles from "./VisitSection.module.css";

const mapsUrl =
  "https://maps.google.com/?q=Via+San+Giovanni+15,+Francavilla+Fontana,+BR";

export default function VisitSection() {
  return (
    <section
      id="contatti"
      aria-labelledby="visit-title"
      className={styles.section}
    >
      <div className={styles.intro} data-reveal>
        <h2 id="visit-title" className={styles.title}>
          Ti aspettiamo a Francavilla.
        </h2>
      </div>
      <div className={styles.content}>
        <dl className={styles.details}>
          <div className={styles.detail} data-reveal>
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
          <div className={styles.detail} data-reveal>
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
        </dl>
        <GoogleMap />
      </div>
      <figure className={styles.picture} data-reveal>
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
