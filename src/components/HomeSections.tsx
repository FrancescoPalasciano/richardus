import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import homePhoto from "@/app/images/home.webp";
import winePhoto from "@/app/images/vino.webp";
import menu from "@/data/menu.json";
import { restaurant } from "@/lib/restaurant";
import { Badge, SectionHeading } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { TodayHours } from "./OpeningHoursCard";
import DishCarousel from "./DishCarousel";
import styles from "@/app/Home.module.css";

import { euro, displayName } from "@/lib/menu";

export function Hero() {
  return (
    <section
      className={`container ${styles.hero}`}
      aria-labelledby="home-title"
    >
      <div className={styles.heroCopy}>
        <Badge className={styles.locationBadge}>
          Francavilla Fontana · Puglia
        </Badge>
        <h1 id="home-title">
          Richardus<span className={styles.heroDot}>.</span>
        </h1>
        <p className={styles.heroClaim}>
          Pasta, brace, pizza.
          <br />
          <span>Fatto bene.</span>
        </p>
        <p className={styles.heroDescription}>
          La cucina italiana, gli impasti e il gusto della brace. Un tavolo nel
          cuore di Francavilla Fontana.
        </p>
        <div className={styles.heroActions} data-booking-visibility>
          <Button asChild>
            <a
              href={restaurant.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prenota un tavolo su WhatsApp"
            >
              Prenota un tavolo <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Button>
          <Link href="/menu" className="text-link">
            Scopri il menu <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.heroHours}>
          <div>
            <span>Mar–sab</span>
            <strong>19:30–00:00</strong>
          </div>
          <div>
            <span>Domenica</span>
            <strong>12:30–15:00 · 19:30–00:00</strong>
          </div>
        </div>
      </div>
      <figure className={styles.heroImage}>
        <Image
          src={homePhoto}
          alt="Pizza con burrata, capocollo e zucchine servita da Richardus"
          fill
          preload
          sizes="(min-width: 1520px) 680px, (min-width: 768px) 48vw, calc(100vw - 32px)"
        />
        <Badge className={styles.photoBadge}>Pasta · Brace · Pizza</Badge>
        <figcaption className={styles.heroCaption}>
          <span>Gli impasti. Il gusto di casa.</span>
          <Link href="/menu#pizze" aria-label="Scopri le pizze del menu">
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}

export function InfoStrip() {
  return (
    <section
      className={`container ${styles.infoStrip}`}
      aria-label="Informazioni utili"
    >
      <div className={styles.infoItem}>
        <Clock size={18} aria-hidden="true" />
        <TodayHours />
      </div>
      <a
        className={styles.infoItem}
        href={restaurant.maps}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MapPin size={18} aria-hidden="true" />
        <div>
          <span>Vieni a trovarci</span>
          <strong>Via S. Giovanni 15</strong>
          <span>Francavilla Fontana · BR</span>
        </div>
      </a>
      <a className={styles.infoItem} href={`tel:${restaurant.phone}`}>
        <Phone size={18} aria-hidden="true" />
        <div>
          <span>Parliamone</span>
          <strong>{restaurant.phoneLabel}</strong>
        </div>
      </a>
      <a
        className={styles.directions}
        href={restaurant.maps}
        target="_blank"
        rel="noopener noreferrer"
      >
        Indicazioni <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}

export function MenuPreview() {
  const choices = [
    "orecchiette-cime-rapa",
    "arrosto-misto",
    "la-richardus",
  ] as const;
  return (
    <section
      className={`container section ${styles.menuPreview}`}
      aria-labelledby="preview-title"
    >
      <SectionHeading
        id="preview-title"
        eyebrow="Il menu"
        title={
          <>
            Cosa portiamo
            <br />a tavola.
          </>
        }
        description="Dalle orecchiette alla pizza, passando per la brace. Parti da quello che ti va."
      >
        <Button asChild variant="outline">
          <Link href="/menu">
            Esplora tutto il menu <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </Button>
      </SectionHeading>
      <div className={styles.previewGrid}>
        {choices
          .filter((id) => menu.prodotti[id].visibile)
          .map((id) => {
            const dish = menu.prodotti[id];
            return (
              <Link
                href={`/menu#${dish.categoria}`}
                className={styles.previewDish}
                key={id}
              >
                <span className={styles.dishCategory}>
                  {
                    menu.categorie[
                      dish.categoria as keyof typeof menu.categorie
                    ].nome
                  }
                </span>
                <div>
                  <h3>{displayName(dish.nome)}</h3>
                  <strong>{euro.format(dish.prezzo)}</strong>
                </div>
                {dish.descrizione && <p>{dish.descrizione}</p>}
                <span className={styles.dishAction}>
                  Scopri la categoria{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
      </div>
    </section>
  );
}

export function SignatureDishes() {
  return (
    <section
      className={`container ${styles.signatureSection}`}
      aria-labelledby="signature-title"
    >
      <SectionHeading
        id="signature-title"
        eyebrow="Dalla nostra cucina"
        title="I piatti Richardus"
      >
        <Link href="/menu" className="text-link">
          Tutti i piatti <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </SectionHeading>
      <DishCarousel>
        <article className={styles.signatureCard}>
          <Link href="/menu#pizze">
            <div className={styles.signaturePhoto}>
              <Image
                src={homePhoto}
                alt="Un dettaglio della pizza con burrata e capocollo"
                fill
                sizes="(min-width: 1280px) 380px, (min-width: 768px) 40vw, 80vw"
              />
              <Badge>Gli impasti</Badge>
            </div>
            <div className={styles.signatureText}>
              <h3>Le pizze di casa</h3>
              <p>
                La Richardus, La mamma mea, Cori ti la nonna. Nomi e ingredienti
                da scoprire.
              </p>
              <ArrowUpRight size={19} aria-hidden="true" />
            </div>
          </Link>
        </article>
        <article className={styles.signatureCard}>
          <Link href="/menu#primi-piatti">
            <div className={`${styles.signatureType} ${styles.oliveCard}`}>
              <Badge>La cucina</Badge>
              <span>
                La Puglia,
                <br />
                nel piatto.
              </span>
              <p>
                Orecchiette.
                <br />
                Cime di rapa.
                <br />
                Il gusto di casa.
              </p>
              <strong>
                {euro.format(menu.prodotti["orecchiette-cime-rapa"].prezzo)}
              </strong>
            </div>
            <div className={styles.signatureText}>
              <h3>Orecchiette con cime di rapa</h3>
              <p>Un primo che parla la lingua del territorio.</p>
              <ArrowUpRight size={19} aria-hidden="true" />
            </div>
          </Link>
        </article>
        <article className={styles.signatureCard}>
          <Link href="/menu#bevande">
            <div className={`${styles.signaturePhoto} ${styles.wineCrop}`}>
              <Image
                src={winePhoto}
                alt="Due calici di rosato per un brindisi da Richardus"
                fill
                sizes="(min-width: 1280px) 380px, (min-width: 768px) 40vw, 80vw"
              />
              <Badge>Da bere</Badge>
            </div>
            <div className={styles.signatureText}>
              <h3>Un calice, in compagnia</h3>
              <p>Vino della casa e bevande. Il tempo per stare a tavola.</p>
              <ArrowUpRight size={19} aria-hidden="true" />
            </div>
          </Link>
        </article>
        <article className={styles.signatureCard}>
          <Link href="/menu#secondi-piatti">
            <div className={`${styles.signatureType} ${styles.clayCard}`}>
              <Badge>La brace</Badge>
              <span>
                Il fuoco.
                <br />
                Il sapore.
              </span>
              <p>
                Bombette, capocollo,
                <br />
                salsiccia e fegatini.
              </p>
              <strong>
                {euro.format(menu.prodotti["arrosto-misto"].prezzo)}
              </strong>
            </div>
            <div className={styles.signatureText}>
              <h3>Arrosto misto alla brace</h3>
              <p>La nostra selezione, tutta in un piatto.</p>
              <ArrowUpRight size={19} aria-hidden="true" />
            </div>
          </Link>
        </article>
      </DishCarousel>
    </section>
  );
}

export function BentoGrid({ about = false }: { about?: boolean }) {
  return (
    <section
      className={`container section ${styles.story}`}
      aria-labelledby="story-title"
    >
      <div className={styles.storyIntro}>
        <p className="eyebrow">Il nostro modo di stare a tavola</p>
        <h2 id="story-title">
          Una cucina semplice.
          <br />
          <span>Ma mai banale.</span>
        </h2>
        <div>
          <p>
            Pasta, brace e pizza. La Puglia si ritrova negli ingredienti, nei
            nomi dei piatti e nel piacere di condividere la tavola.
          </p>
          {!about && (
            <Link href="/chi-siamo" className="text-link">
              Piacere, Richardus <ArrowRight size={18} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
      <div className={styles.bentoGrid}>
        <figure className={styles.bentoPhoto}>
          <Image
            src={winePhoto}
            alt="Un brindisi con vino rosato, ai tavoli di Richardus"
            fill
            sizes="(min-width: 1520px) 690px, (min-width: 768px) 48vw, calc(100vw - 32px)"
          />
          <figcaption>
            Un tavolo. Qualcosa di buono.
            <br />
            Il resto può aspettare.
          </figcaption>
        </figure>
        <Link
          href="/menu#secondi-piatti"
          className={`${styles.bentoTile} ${styles.oliveCard}`}
        >
          <span>Brace</span>
          <h3>
            Il gusto,
            <br />
            senza giri di parole.
          </h3>
          <p>Bombette, capocollo, salsiccia e fegatini.</p>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
        <Link
          href="/menu#pizze"
          className={`${styles.bentoTile} ${styles.clayCard}`}
        >
          <span>Impasti</span>
          <h3>
            Nomi di casa.
            <br />
            Carattere nostro.
          </h3>
          <p>Dal cacio ricotta alla burrata.</p>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
        <Link
          href="/menu#primi-piatti"
          className={`${styles.bentoTile} ${styles.cuisineTile}`}
        >
          <span>Cucina</span>
          <h3>Il territorio si legge nel menu.</h3>
          <p>
            Orecchiette, cortecce al grano arso, fave e verdura di stagione.
          </p>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
