import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { LocaleProps } from "@/lib/locale";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import styles from "./ReviewsCarousel.module.css";

export default function ReviewsCarousel({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <div className={styles.grid} aria-label="Tre recensioni degli ospiti">
      {reviews.slice(0, 3).map((review) => (
        <figure key={review.author} className={styles.card}>
          <div className={styles.topline}>
            <div className={styles.stars} role="img" aria-label="5 stelle su 5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <span className={styles.google}>Google</span>
          </div>
          <blockquote lang={"lang" in review ? review.lang : "it"}>
            “{review.quote}”
          </blockquote>
          <figcaption>{review.author}</figcaption>
        </figure>
      ))}
    </div>,
    locale,
    t,
  );
}
