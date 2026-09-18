import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.social} data-reveal>
          <div>
            <p className={styles.eyebrow}>Richardus, anche su Instagram</p>
            <h2>Seguici sui social!</h2>
          </div>
          <a
            className={styles.socialLink}
            href="https://www.instagram.com/richardus_mangia_e_bevi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="0.75"
                fill="currentColor"
                stroke="none"
              />
            </svg>
            <span>@richardus_mangia_e_bevi</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
        <div className={styles.columns} data-reveal>
          <div className={styles.brand}>
            <Link href="/" aria-label="Richardus, torna alla home">
              <Image
                src="/logo-richardus.webp"
                alt="Richardus"
                width={128}
                height={146}
              />
            </Link>
            <p>Pasta · Brace · Pizza</p>
            <p>La nostra gemma nel cuore di Francavilla.</p>
          </div>
          <nav aria-label="Navigazione del footer">
            <h3>Esplora</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/menu">Menu</Link>
              </li>
              <li>
                <Link href="/chi-siamo">Chi siamo</Link>
              </li>
            </ul>
          </nav>
          <div>
            <h3>Vieni a trovarci</h3>
            <address>
              <a
                href="https://maps.google.com/?q=Via+San+Giovanni+15,+Francavilla+Fontana,+BR"
                target="_blank"
                rel="noopener noreferrer"
              >
                Via S. Giovanni 15
                <br />
                Francavilla Fontana
              </a>
              <a href="tel:+393290090918">329 009 0918</a>
            </address>
          </div>
          <div>
            <h3>A tavola con noi</h3>
            <dl className={styles.hours}>
              <div>
                <dt>Martedì–sabato</dt>
                <dd>19:30–00:00</dd>
              </div>
              <div>
                <dt>Domenica</dt>
                <dd>
                  12:30–15:00
                  <br />
                  19:30–00:00
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Richardus</p>
          <nav aria-label="Informazioni legali">
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/cookie-policy">Cookie policy</Link>
          </nav>
          <div className={styles.agency}>
            <a
              className={styles.credit}
              href="https://www.instagram.com/senzafrenodigital/"
              target="_blank"
              rel="noopener noreferrer"
            >
              made by <span>Senza Freno Digital</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
