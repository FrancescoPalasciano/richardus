import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import styles from "@/components/PageHero.module.css";

export const metadata: Metadata = {
  description:
    "Richardus: pasta, brace e pizza nel cuore della Puglia. Prenota il tuo tavolo per telefono o su WhatsApp.",
};

const telefono = "+393290090918";
const messaggio =
  "Salve vorrei prenotare un tavolo per le x per x persone a nome di x";
const whatsapp = `https://wa.me/${telefono.replace("+", "")}?text=${encodeURIComponent(messaggio)}`;

export default function Home() {
  return (
    <main>
      <PageHero
        title="Richardus"
        eyebrow="Pasta · Brace · Pizza"
        description="Nel cuore della Puglia, il piacere di ritrovarsi a tavola."
        fullHeight
      >
        <div className={styles.actions}>
          <a
            className={styles.cta}
            href={`tel:${telefono}`}
            aria-label="Chiama ora: 329 009 0918"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.7a2 2 0 0 1-.5 2.1L9 10.8a16 16 0 0 0 4.2 4.2l1.3-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.7.7a2 2 0 0 1 1.7 2z" />
            </svg>
            Chiama ora
          </a>
          <a
            className={styles.cta}
            data-secondary="true"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrivici su WhatsApp per prenotare un tavolo"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
            </svg>
            Scrivici
          </a>
        </div>
      </PageHero>
    </main>
  );
}
