"use client";

import { localizeTree } from "@/lib/localize";
import { useLocale } from "@/components/LocaleProvider";

import { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/surfaces";
import styles from "@/app/Home.module.css";

const days = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];
const englishDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const readDay = () =>
  englishDays.indexOf(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Rome",
      weekday: "short",
    }).format(new Date()),
  );
const subscribe = (update: () => void) => {
  const timer = window.setInterval(update, 60000);
  window.addEventListener("visibilitychange", update);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("visibilitychange", update);
  };
};
const useToday = () => useSyncExternalStore(subscribe, readDay, () => null);

export function TodayHours() {
  const { locale, t } = useLocale();
  const day = useToday();
  return localizeTree(
    <div>
      <span>
        {day === null ? "Gli orari" : `${t("Oggi")}, ${t(days[day])}`}
      </span>
      <strong>
        {day === null
          ? "Mar–sab · 19:30–00:00"
          : day === 1
            ? "Giorno di chiusura"
            : day === 0
              ? "12:30–15:00 / 19:30–00:00"
              : "19:30–00:00"}
      </strong>
    </div>,
    locale,
    t,
  );
}

export default function OpeningHoursCard() {
  const { locale, t } = useLocale();
  const today = useToday();
  return localizeTree(
    <section className={styles.hoursCard} aria-labelledby="hours-title">
      <div className={styles.widgetTitle}>
        <h3 id="hours-title">I nostri orari</h3>
        <Clock size={18} aria-hidden="true" />
      </div>
      <dl>
        {[1, 2, 3, 4, 5, 6, 0].map((day) => (
          <div key={day} data-today={day === today}>
            <dt>
              {days[day]}
              {day === today && <Badge accent>Oggi</Badge>}
            </dt>
            <dd>
              {day === 1 ? (
                "Chiuso"
              ) : day === 0 ? (
                <>
                  <span>12:30–15:00</span>
                  <span>19:30–00:00</span>
                </>
              ) : (
                "19:30–00:00"
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p>La domenica, anche a pranzo.</p>
    </section>,
    locale,
    t,
  );
}
