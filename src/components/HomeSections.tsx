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
import placeSettingPhoto from "@/app/images/foto3.webp";
import menu from "@/data/menu.json";
import { restaurant } from "@/lib/restaurant";
import { Button } from "@/components/ui/button";
import { TodayHours } from "./OpeningHoursCard";
import styles from "@/app/Home.module.css";

import { euro, displayName } from "@/lib/menu";

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
        preload
        className={styles.heroPhoto}
        sizes="100vw"
      />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={`container ${styles.heroCopy}`}>
        <h1 id="home-title">
          <span>Richardus,</span>
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
              href={restaurant.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prenota un tavolo su WhatsApp"
            >
              Prenota un tavolo <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Button>
          <Link href="/menu" className={styles.heroMenuLink}>
            Scopri il menu <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
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

type FeaturedDish = {
  id: "cortecce-grano-arso" | "arrosto-misto" | "fave-verdura";
  image: StaticImageData;
  alt: string;
  shortName: string;
};

export function MenuPreview({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  const choices: FeaturedDish[] = [
    {
      id: "cortecce-grano-arso",
      image: pastaPhoto,
      alt: "Pasta di grano arso con funghi e salsiccia servita da Richardus",
      shortName: "Grano arso, salsiccia e porcini",
    },
    {
      id: "arrosto-misto",
      image: meatPhoto,
      alt: "Carne servita da Richardus con salsa e patate",
      shortName: "La carne e la brace",
    },
    {
      id: "fave-verdura",
      image: beansPhoto,
      alt: "Fave e verdura con crostini servite da Richardus",
      shortName: "Fave e verdura",
    },
  ];
  return localizeTree(
    <section
      className={`container ${styles.menuPreview}`}
      aria-labelledby="preview-title"
      data-reveal
    >
      <div className={styles.sectionIntro}>
        <h2 id="preview-title">Dalla cucina, senza distanza.</h2>
        <div>
          <p>
            Ricette pugliesi, pasta, verdure e carne alla brace. Pochi giri di
            parole: qui il menu arriva a tavola.
          </p>
          <Link href="/menu" className="text-link">
            Esplora tutto il menu <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={styles.dishGrid} data-reveal-group>
        {choices.map(({ id, image, alt, shortName }, index) => {
          const dish = menu.prodotti[id];
          const category =
            menu.categorie[dish.categoria as keyof typeof menu.categorie];
          return (
            <Link
              href={`/menu#${dish.categoria}`}
              className={styles.dishCard}
              data-size={index === 0 ? "wide" : "standard"}
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
                <span>{category.nome}</span>
                <h3>{shortName}</h3>
                <p>{displayName(dish.nome)}</p>
                <strong>{euro.format(dish.prezzo)}</strong>
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
      <div className={styles.tablePhotoWide}>
        <Image
          src={tablePhoto}
          alt="Una tavola apparecchiata nella sala in pietra di Richardus"
          fill
          sizes="(min-width: 900px) 62vw, 100vw"
        />
      </div>
      <div className={styles.tableCopy}>
        <h2 id="table-title">La tavola prima di tutto.</h2>
        <p>
          Una sala raccolta, la pietra chiara, i piatti al centro e il tempo
          necessario per stare bene insieme.
        </p>
      </div>
      <div className={styles.tablePhotoTall}>
        <Image
          src={placeSettingPhoto}
          alt="Un piatto Richardus sulla tavola apparecchiata"
          fill
          sizes="(min-width: 900px) 32vw, 78vw"
        />
      </div>
    </section>,
    locale,
    t,
  );
}

export function BentoGrid({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <section className={styles.story} aria-labelledby="story-title" data-reveal>
      <div className={`container ${styles.storyHeading}`}>
        <h2 id="story-title">
          La Puglia,
          <span>a tavola.</span>
        </h2>
        <p>
          Richardus è una trattoria di Francavilla Fontana. Tra le pareti in
          pietra di Via San Giovanni 15, la cucina pugliese si racconta con
          semplicità, brace accesa e piatti da condividere.
        </p>
      </div>
      <div className={`container ${styles.storyGrid}`} data-reveal-group>
        <article className={styles.storyStatement}>
          <h3>La pietra custodisce l’atmosfera.</h3>
          <p>Volte chiare, luci calde, una sala che invita a restare.</p>
        </article>
        <figure className={styles.storyPhoto}>
          <Image
            src={roomPhoto}
            alt="Le volte e le pareti in pietra della sala Richardus"
            fill
            sizes="(min-width: 900px) 52vw, 100vw"
          />
        </figure>
        <article className={styles.storyStatement}>
          <h3>La brace parla la lingua del territorio.</h3>
          <p>Bombette, capocollo, salsiccia e fegatini, senza formalismi.</p>
        </article>
        <article className={styles.storyLink}>
          <p>Una storia di cucina pugliese e accoglienza.</p>
          <Link href="/chi-siamo">
            Conosci Richardus <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </article>
      </div>
    </section>,
    locale,
    t,
  );
}
