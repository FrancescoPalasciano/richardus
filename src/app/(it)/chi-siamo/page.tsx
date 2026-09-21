import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import {
  resolveLocale,
  languageAlternates,
  type RouteProps,
} from "@/lib/locale";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import saladPhoto from "@/app/images/foto5.webp";
import Reservation from "@/components/Reservation";
import { Button } from "@/components/ui/button";
import { restaurant } from "@/lib/restaurant";
import styles from "./About.module.css";

const description =
  "Richardus, trattoria a Francavilla Fontana. Pasta, pizza e piatti alla brace in Via San Giovanni 15, in provincia di Brindisi.";

export const metadata: Metadata = {
  title: "La nostra trattoria a Francavilla Fontana",
  description,
  alternates: {
    canonical: "/chi-siamo",
    languages: languageAlternates("/chi-siamo"),
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Richardus, trattoria a Francavilla Fontana",
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

export default async function AboutPage({ params }: RouteProps) {
  const locale = resolveLocale((await params).locale);
  const t = getTranslator(locale);

  return localizeTree(
    <main id="contenuto" className={styles.page}>
      <article>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.heroCopyInner}>
              <h1>
                La nostra trattoria.
                <span>Il gusto di stare bene.</span>
              </h1>
              <p className={styles.heroLead}>
                Una trattoria a Francavilla Fontana, in Via San Giovanni 15. La
                cucina pugliese, le pareti in pietra e il piacere di ritrovarsi
                a tavola.
              </p>
              <div className={styles.heroActions}>
                <Button asChild>
                  <Link href="/menu">
                    Scopri il menu <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </Button>
                <a
                  className={styles.locationLink}
                  href={restaurant.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Via San Giovanni 15
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              <p className={styles.cuisineLine}>Pasta · Brace · Pizza</p>
            </div>
          </div>
          <figure className={styles.heroPhoto}>
            <Image
              src={saladPhoto}
              alt="Insalata con tonno e verdure in una coppa di pane casereccio da Richardus"
              fill
              preload
              sizes="(min-width: 900px) 50vw, 100vw"
            />
            <figcaption>Insalata in coppa di pane</figcaption>
          </figure>
        </header>

        <section className={styles.manifesto}>
          <div className={`container ${styles.manifestoGrid}`}>
            <h2>
              Un ristorante,
              <span>non un concetto.</span>
            </h2>
            <div className={styles.manifestoCopy}>
              <p className={styles.manifestoLead}>
                Richardus nasce dalla voglia di fare ristorazione semplice e
                onesta: materie prime italiane, cotture curate e porzioni da
                trattoria.
              </p>
              <p>
                Dagli antipasti ai primi, dalla carne alle insalate in coppa di
                pane: una cucina da scegliere con calma, un piatto dopo l’altro.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.cuisine} aria-labelledby="cuisine-title">
          <div className="container">
            <div className={styles.cuisineIntro}>
              <h2 id="cuisine-title">Il territorio si legge nel menu.</h2>
              <p>
                Orecchiette con cime di rapa, cortecce al grano arso, fave e
                verdura di stagione. Alla brace, un arrosto misto con bombette,
                capocollo, salsiccia e fegatini.
              </p>
            </div>
            <div className={styles.cuisineIndex}>
              <div>
                <h3>Pasta</h3>
                <p>Orecchiette, cortecce al grano arso, sapori di stagione.</p>
              </div>
              <div>
                <h3>Brace</h3>
                <p>
                  Bombette, capocollo, salsiccia e fegatini, senza formalismi.
                </p>
              </div>
              <div>
                <h3>Pizza</h3>
                <p>La mamma mea · La Richardus · Nu Scigghiu</p>
              </div>
            </div>
            <Link className={`text-link ${styles.menuLink}`} href="/menu">
              Scopri piatti, ingredienti e prezzi
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className={`container ${styles.visit}`}>
          <div className={styles.visitHeading}>
            <h2>Nel cuore di Francavilla.</h2>
            <p>
              Richardus è in Via San Giovanni 15, tra le strade del centro di
              Francavilla Fontana. La tavola è a pochi passi dalla città.
            </p>
          </div>
          <dl className={styles.visitFacts}>
            <div>
              <dt>
                <MapPin size={18} aria-hidden="true" /> Dove siamo
              </dt>
              <dd>Via San Giovanni 15 · Francavilla Fontana</dd>
            </div>
            <div>
              <dt>
                <Clock3 size={18} aria-hidden="true" /> Gli orari
              </dt>
              <dd className={styles.schedule}>
                <span>Mar–sab · 19:30–00:00</span>
                <span>
                  <strong>Domenica</strong> 12:30–15:00 / 19:30–00:00
                </span>
                <span>
                  <strong>Lunedì</strong> Chiuso
                </span>
              </dd>
            </div>
            <div>
              <dt>
                <Phone size={18} aria-hidden="true" /> Chiamaci
              </dt>
              <dd>
                <a href={`tel:${restaurant.phone}`}>{restaurant.phoneLabel}</a>
              </dd>
            </div>
          </dl>
          <Button asChild variant="outline" className={styles.directions}>
            <a href={restaurant.maps} target="_blank" rel="noopener noreferrer">
              Portami da Richardus
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Button>
        </section>
      </article>
      <Reservation locale={locale} />
    </main>,
    locale,
    t,
  );
}
