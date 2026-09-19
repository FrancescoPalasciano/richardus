import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import roomPhoto from "@/app/images/interno2.jpg";
import tablePhoto from "@/app/images/interno.jpg";
import beansPhoto from "@/app/images/🍽️🍷Fave e verdura- il gusto autentico della tradizione pugliese. Da Richardus non poteva certo.jpg";
import pastaPhoto from "@/app/images/Orecchiette grano arso funghi di stagione e salsiccia 🍄_🟫🍝...Via San Giovanni,15 Francavilla .jpg";
import meatPhoto from "@/app/images/RICHARDUS🍝🍷🍺🍕🥩Entrecôte In salsa dello chef!🫶...“Il cibo è amore che si può mangiare.”❤️Vi.jpg";
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
        <h1 id="home-title">
          <span className="sr-only">Richardus, </span>Trattoria storica
          <br />
          <span>a Francavilla Fontana.</span>
        </h1>
        <p className={styles.heroDescription}>
          La cucina pugliese, il piacere di stare a tavola.
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
            Il menu <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <figure className={styles.heroImage}>
        <Image
          src={roomPhoto}
          alt="La sala di Richardus a Francavilla Fontana, con volte in pietra e tavoli apparecchiati"
          fill
          preload
          sizes="(min-width: 1520px) 700px, (min-width: 768px) 52vw, calc(100vw - 32px)"
        />
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
    "fave-verdura",
  ] as const;
  return (
    <section
      className={`container section ${styles.menuPreview}`}
      aria-labelledby="preview-title"
      data-reveal
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
        description="Antipasti della tradizione, pasta e carne alla brace. I sapori di casa, a Francavilla."
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
  const selections = [
    {
      image: pastaPhoto,
      alt: "Orecchiette al grano arso con funghi e salsiccia, dalla cucina di Richardus",
      title: "La pasta di casa",
      label: "I primi",
      description: "Il grano arso, la pasta e i sapori del territorio.",
      href: "/menu#primi-piatti",
    },
    {
      image: beansPhoto,
      alt: "Purè di fave con verdura e crostini servito da Richardus",
      title: "Fave e verdura",
      label: "La tradizione",
      description: "Un piatto che racconta la cucina pugliese.",
      href: "/menu#antipasti",
    },
    {
      image: meatPhoto,
      alt: "Entrecôte di manzo con salsa dello chef e patate",
      title: "Entrecôte in salsa dello chef",
      label: "I secondi",
      description: "La carne, una salsa ricca, il piacere della tavola.",
      href: "/menu#secondi-piatti",
    },
  ];
  return (
    <section
      className={`container ${styles.signatureSection}`}
      aria-labelledby="signature-title"
      data-reveal
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
        {selections.map((dish) => (
          <article className={styles.signatureCard} key={dish.href}>
            <Link href={dish.href}>
              <div className={styles.signaturePhoto}>
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 40vw, 80vw"
                />
                <Badge>{dish.label}</Badge>
              </div>
              <div className={styles.signatureText}>
                <h3>{dish.title}</h3>
                <p>{dish.description}</p>
                <ArrowUpRight size={19} aria-hidden="true" />
              </div>
            </Link>
          </article>
        ))}
      </DishCarousel>
    </section>
  );
}

export function BentoGrid() {
  return (
    <section
      className={`container section ${styles.story}`}
      aria-labelledby="story-title"
      data-reveal
    >
      <div className={styles.storyIntro}>
        <p className="eyebrow">La nostra trattoria</p>
        <h2>
          La Puglia, a tavola.
          <br />
          <span>Da sentirsi a casa.</span>
        </h2>
        <div>
          <p>
            Richardus è una trattoria storica di Francavilla Fontana. Tra le
            pareti in pietra di Via San Giovanni 15, ci ritroviamo attorno ai
            sapori della cucina pugliese.
          </p>
          <Link href="/chi-siamo" className="text-link">
            La nostra storia <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className={styles.bentoGrid}>
        <figure className={styles.bentoPhoto}>
          <Image
            src={tablePhoto}
            alt="I tavoli della trattoria Richardus, tra pareti in pietra e decorazioni di bottiglie"
            fill
            sizes="(min-width: 1520px) 690px, (min-width: 768px) 48vw, calc(100vw - 32px)"
          />
          <figcaption>
            Un posto per stare bene.
            <br />
            Una tavola da condividere.
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
          href="/menu#antipasti"
          className={`${styles.bentoTile} ${styles.clayCard}`}
        >
          <span>Tradizione</span>
          <h3>
            Da qui.
            <br />
            Da condividere.
          </h3>
          <p>Fave, verdure e formaggi del territorio.</p>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
        <Link
          href="/menu#primi-piatti"
          className={`${styles.bentoTile} ${styles.cuisineTile}`}
        >
          <span>Cucina</span>
          <h3>Il territorio si legge nel menu.</h3>
          <p>Orecchiette, cortecce al grano arso, sapori di stagione.</p>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
