"use client";

import { localizeTree } from "@/lib/localize";
import { useLocale } from "@/components/LocaleProvider";

import {
  useCallback,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappForLocale } from "@/lib/restaurant";
import styles from "@/app/menu/Menu.module.css";

const subscribe = (update: () => void) => {
  window.addEventListener("hashchange", update);
  window.addEventListener("popstate", update);
  return () => {
    window.removeEventListener("hashchange", update);
    window.removeEventListener("popstate", update);
  };
};
const readHash = () => {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
};

export default function MenuBrowser({
  sections,
}: {
  sections: { id: string; label: string; content: ReactNode }[];
}) {
  const { locale, t } = useLocale();
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const selected = sections.some((section) => section.id === hash)
    ? hash
    : "tutto";
  const reduce = useReducedMotion();
  const categories = useRef<HTMLElement>(null);
  const subscribeCategories = useCallback((update: () => void) => {
    const list = categories.current;
    if (!list) return () => {};
    list.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => {
      list.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  const edges = useSyncExternalStore(
    subscribeCategories,
    () => {
      const list = categories.current;
      return list
        ? `${list.scrollLeft > 2 ? 1 : 0}${list.scrollLeft + list.clientWidth < list.scrollWidth - 2 ? 1 : 0}`
        : "00";
    },
    () => "00",
  );
  const scrollCategories = (direction: number) =>
    categories.current?.scrollBy({
      left: direction * categories.current.clientWidth * 0.7,
      behavior: reduce ? "instant" : "smooth",
    });
  return localizeTree(
    <section className={styles.browser} id="menu">
      <div className={styles.categoryBar}>
        <div className={`container ${styles.categoryControls}`}>
          <nav
            ref={categories}
            className="ui-tabs-list"
            aria-label="Categorie del menu"
          >
            <a
              className="ui-tab"
              href="#menu"
              aria-current={selected === "tutto" ? "location" : undefined}
              data-state={selected === "tutto" ? "active" : "inactive"}
            >
              Tutto
            </a>
            {sections.map((section) => (
              <a
                key={section.id}
                className="ui-tab"
                href={`#${section.id}`}
                aria-current={selected === section.id ? "location" : undefined}
                data-state={selected === section.id ? "active" : "inactive"}
              >
                {section.label}
              </a>
            ))}
          </nav>
          <div className={styles.categoryNavigation} hidden={edges === "00"}>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Categorie precedenti"
              disabled={edges[0] === "0"}
              onClick={() => scrollCategories(-1)}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              aria-label="Altre categorie, scorri a destra"
              disabled={edges[1] === "0"}
              onClick={() => scrollCategories(1)}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className={`container ${styles.menuBarMeta}`}>
          <p className={styles.scrollHint} hidden={edges === "00"}>
            Scorri per esplorare le categorie{" "}
            <ChevronRight size={14} aria-hidden="true" />
          </p>
          <Button asChild className={styles.menuBooking}>
            <a
              href={whatsappForLocale(locale)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prenota un tavolo su WhatsApp"
            >
              Prenota <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
      <div className={`container ${styles.menuContent}`}>
        {sections.map((section) => (
          <div key={section.id}>{section.content}</div>
        ))}
      </div>
    </section>,
    locale,
    t,
  );
}
