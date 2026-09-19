import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { LocaleProps } from "@/lib/locale";
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import DishCarousel from "./DishCarousel";
import styles from "./ReviewsCarousel.module.css";

export default function ReviewsCarousel({ locale = "it" }: LocaleProps = {}) {
  const t = getTranslator(locale);
  return localizeTree(
    <DishCarousel
      label="Recensioni degli ospiti"
      hint="Le esperienze, raccontate da voi."
    >
      {reviews.map((review) => (
        <figure key={review.author} className={styles.card}>
          <div className={styles.stars} role="img" aria-label="5 stelle su 5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
            ))}
            <span>Google</span>
          </div>
          <blockquote lang={"lang" in review ? review.lang : "it"}>
            “{review.quote}”
          </blockquote>
          <figcaption>
            <span className={styles.avatar} aria-hidden="true">
              {review.author
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((word) => word.match(/\p{L}/u)?.[0] ?? "")
                .join("")
                .toUpperCase()}
            </span>
            <span>
              <strong>{review.author}</strong>
              <span>Estratto da Google</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </DishCarousel>,
    locale,
    t,
  );
}
