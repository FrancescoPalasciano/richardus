import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { LocaleProps } from "@/lib/locale";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import roomPhoto from "@/app/images/interno2.webp";
import tablePhoto from "@/app/images/interno.webp";
import beansPhoto from "@/app/images/foto2.webp";
import pastaPhoto from "@/app/images/foto6.webp";
import meatPhoto from "@/app/images/foto1.webp";
import menu from "@/data/menu.json";
import { restaurant, whatsappForLocale } from "@/lib/restaurant";
import { Button } from "@/components/ui/button";
import { TodayHours } from "./OpeningHoursCard";
import styles from "@/app/Home.module.css";

export function Hero({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <section
      className={styles.hero}
      aria-labelledby="home-title"
      data-home-hero
    >
      <Image
        src={roomPhoto}
        alt="La sala di Richardus a Francavilla Fontana, con volte in pietra e tavoli apparecchiati"
        fill
        loading="eager"
        fetchPriority="high"
        className={styles.heroPhoto}
        sizes="100vw"
      />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={`container ${styles.heroCopy}`}>
        <h1 id="home-title">
          <span className="sr-only">Richardus,</span>
          Trattoria a<br />
          Francavilla Fontana
        </h1>
        <p className={styles.heroDescription}>
          Cucina pugliese, brace e tavole da condividere tra le volte in pietra
          di Via San Giovanni.
        </p>
        <div className={styles.heroActions} data-booking-visibility>
          <Button asChild>
            <a
              href={whatsappForLocale(locale)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prenota un tavolo su WhatsApp"
            >
              Prenota su WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Button>
          <Link href="/menu" className={styles.heroMenuLink}>
            Scopri il menu <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.bookingNote}>
          Scrivici su WhatsApp. Ti confermiamo noi la disponibilità.
        </p>
      </div>
    </section>,
    locale,
    t,
  );
}

export function InfoStrip({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <section className={styles.infoStripWrap} aria-label="Informazioni utili">
      <div className={`container ${styles.infoStrip}`}>
        <div className={styles.infoItem}>
          <Clock size={19} aria-hidden="true" />
          <TodayHours />
        </div>
        <a
          className={styles.infoItem}
          href={restaurant.maps}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={19} aria-hidden="true" />
          <div>
            <span>Dove siamo</span>
            <strong>Via San Giovanni 15</strong>
          </div>
        </a>
        <a className={styles.infoItem} href={`tel:${restaurant.phone}`}>
          <Phone size={19} aria-hidden="true" />
          <div>
            <span>Chiamaci</span>
            <strong>{restaurant.phoneLabel}</strong>
          </div>
        </a>
        <a
          className={styles.directions}
          href={restaurant.maps}
          target="_blank"
          rel="noopener noreferrer"
        >
          Portami da Richardus <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>,
    locale,
    t,
  );
}

type FeaturedCategory = {
  id: "primi-piatti" | "secondi-piatti" | "antipasti";
  image: StaticImageData;
  alt: string;
};

export function MenuPreview({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  const choices: FeaturedCategory[] = [
    {
      id: "primi-piatti",
      image: pastaPhoto,
      alt: "Un piatto di pasta servito da Richardus",
    },
    {
      id: "secondi-piatti",
      image: meatPhoto,
      alt: "Carne servita da Richardus con salsa e patate",
    },
    {
      id: "antipasti",
      image: beansPhoto,
      alt: "Fave e verdura con crostini servite da Richardus",
    },
  ];
  return localizeTree(
    <section
      className={`container ${styles.menuPreview}`}
      aria-labelledby="preview-title"
      data-reveal
    >
      <div className={styles.sectionIntro} data-reveal-kind="copy">
        <h2 id="preview-title">La cucina pugliese.</h2>
        <div>
          <p>
            Antipasti della tradizione, pasta e carne alla brace. I sapori di
            casa, a Francavilla.
          </p>
          <Link href="/menu" className="text-link">
            Esplora tutto il menu <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={styles.dishGrid} data-reveal-group>
        {choices.map(({ id, image, alt }, index) => {
          const category = menu.categorie[id];
          return (
            <Link
              href={`/menu#${id}`}
              className={styles.dishCard}
              data-size={index === 0 ? "wide" : "standard"}
              data-reveal-kind="dish"
              key={id}
            >
              <Image
                src={image}
                alt={alt}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 900px) 56vw, 100vw"
                    : "(min-width: 900px) 27vw, 100vw"
                }
              />
              <span className={styles.dishShade} aria-hidden="true" />
              <div className={styles.dishContent}>
                <h3>{category.nome}</h3>
                <p>Scopri piatti, ingredienti e prezzi</p>
              </div>
              <ArrowUpRight
                className={styles.dishArrow}
                size={21}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>,
    locale,
    t,
  );
}

export function SignatureDishes({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <section
      className={styles.tableStory}
      aria-labelledby="table-title"
      data-reveal
    >
      <div className={styles.tablePhotoWide} data-reveal-kind="photo">
        <Image
          src={tablePhoto}
          alt="Una tavola apparecchiata nella sala in pietra di Richardus"
          fill
          sizes="(min-width: 720px) 55vw, 100vw"
        />
      </div>
      <div className={styles.tableCopy} data-reveal-kind="copy">
        <h2 id="table-title">La nostra trattoria.</h2>
        <p>
          Una sala raccolta, la pietra chiara, i piatti al centro e il tempo
          necessario per stare bene insieme.
        </p>
        <Link href="/chi-siamo" className="text-link">
          Conosci Richardus <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>,
    locale,
    t,
  );
}
