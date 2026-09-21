import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { displayName, euro, type Dish } from "@/lib/menu";
import styles from "@/app/menu/Menu.module.css";

export default function DishCard({
  locale = "it",
  dish,
}: {
  locale?: Locale;
  dish: Dish;
}) {
  const t = getTranslator(locale);
  return localizeTree(
    <article className={styles.dishCard}>
      <div className={styles.dishTop}>
        <h3>{displayName(dish.nome)}</h3>
        <p className={styles.price}>
          {dish.prezzoSuRichiesta ? (
            "Su richiesta"
          ) : (
            <>
              {euro.format(dish.prezzo)}
              {dish.prezzoMassimo !== null && (
                <span>– {euro.format(dish.prezzoMassimo)}</span>
              )}
              {dish.prezzoAPersona && <small>a persona</small>}
            </>
          )}
        </p>
      </div>
      {dish.descrizione && (
        <p className={styles.description}>{dish.descrizione}</p>
      )}
    </article>,
    locale,
    t,
  );
}
