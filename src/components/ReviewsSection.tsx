import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { LocaleProps } from "@/lib/locale";
import { ArrowUpRight } from "lucide-react";
import ReviewsCarousel from "./ReviewsCarousel";
import { restaurant } from "@/lib/restaurant";
import styles from "./ReviewsCarousel.module.css";

export default function ReviewsSection({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <section
      id="recensioni"
      data-reveal
      aria-labelledby="reviews-title"
      className={`container ${styles.section}`}
    >
      <div className={styles.heading}>
        <div>
          <h2 id="reviews-title">A tavola con voi.</h2>
          <p>Tre storie vere, scelte dalle vostre recensioni su Google.</p>
        </div>
        <a
          href={restaurant.reviews}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Leggi tutte le recensioni{" "}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      {locale !== "it" && (
        <p className="mb-6 text-sm text-muted-foreground">
          Recensioni in lingua originale italiana.
        </p>
      )}
      <ReviewsCarousel locale={locale} />
    </section>,
    locale,
    t,
  );
}
