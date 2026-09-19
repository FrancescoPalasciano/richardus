import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import saladPhoto from "@/app/images/RICHARDUS 🍝🍷🍽️🍕…Scopri le nostre insalate, servite in coppa di pane artigianale….Vi aspettia.jpg";
import Reservation from "@/components/Reservation";
import styles from "@/app/Home.module.css";

const description =
  "Richardus, trattoria storica a Francavilla Fontana. Cucina pugliese, pasta e piatti alla brace in Via San Giovanni 15, in provincia di Brindisi.";
export const metadata: Metadata = {
  title: "La nostra trattoria a Francavilla Fontana",
  description,
  alternates: { canonical: "/chi-siamo" },
  openGraph: {
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Richardus, trattoria storica a Francavilla Fontana",
      },
    ],
    siteName: "Richardus",
    locale: "it_IT",
    type: "website",
    title: "Richardus, la nostra trattoria",
    description,
    url: "/chi-siamo",
  },
  twitter: {
    images: ["/opengraph-image"],
    card: "summary_large_image",
    title: "Richardus, la nostra trattoria",
    description,
  },
};

export default function AboutPage() {
  return (
    <main id="contenuto">
      <article className={`container ${styles.about}`}>
        <header className={styles.aboutHeader}>
          <p className="eyebrow">Richardus · Francavilla Fontana</p>
          <h1>
            La nostra trattoria.
            <br />
            <span>Il gusto di stare bene.</span>
          </h1>
          <p className={styles.aboutLead}>
            Una trattoria storica a Francavilla Fontana, in Via San Giovanni 15.
            La cucina pugliese, le pareti in pietra e il piacere di ritrovarsi a
            tavola.
          </p>
        </header>
        <div className={styles.aboutPhotoGrid} data-reveal>
          <figure>
            <Image
              src={saladPhoto}
              alt="Insalata con tonno e verdure in una coppa di pane casereccio da Richardus"
              fill
              preload
              sizes="(min-width: 1520px) 650px, (min-width: 768px) 48vw, calc(100vw - 32px)"
            />
          </figure>
          <div className={styles.aboutDetail}>
            <h2>Il territorio si legge nel menu.</h2>
            <p>
              Orecchiette con cime di rapa, cortecce al grano arso, fave e
              verdura di stagione. Alla brace, un arrosto misto con bombette,
              capocollo, salsiccia e fegatini.
            </p>
            <p>
              Dagli antipasti ai primi, dalla carne alle insalate in coppa di
              pane: una cucina da scegliere con calma, un piatto dopo l’altro.
            </p>
            <Link className="text-link" href="/menu">
              Scopri piatti, ingredienti e prezzi{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
      <Reservation />
    </main>
  );
}
