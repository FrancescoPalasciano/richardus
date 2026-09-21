"use client";

import { localizeTree } from "@/lib/localize";
import { useLocale } from "@/components/LocaleProvider";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { animate, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappForLocale } from "@/lib/restaurant";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/disclosure";
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
  const defaultCategory = sections[0]?.id ?? "tutto";
  const selected =
    hash === "tutto"
      ? "tutto"
      : sections.some((section) => section.id === hash)
        ? hash
        : defaultCategory;
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const subscribeCategories = useCallback((update: () => void) => {
    const list = tabs.current;
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
      const list = tabs.current;
      return list
        ? `${list.scrollLeft > 2 ? 1 : 0}${list.scrollLeft + list.clientWidth < list.scrollWidth - 2 ? 1 : 0}`
        : "00";
    },
    () => "00",
  );
  const scrollCategories = (direction: number) =>
    tabs.current?.scrollBy({
      left: direction * tabs.current.clientWidth * 0.7,
      behavior: reduce ? "instant" : "smooth",
    });
  useEffect(() => {
    if (!panel.current || selected === "tutto" || hash !== selected) return;
    const frame = requestAnimationFrame(() =>
      document
        .getElementById(selected)
        ?.scrollIntoView({ block: "start", behavior: "instant" }),
    );
    if (!reduce) {
      const animation = animate(
        panel.current,
        { opacity: [0.85, 1], y: [4, 0] },
        { duration: 0.2 },
      );
      return () => {
        cancelAnimationFrame(frame);
        animation.complete();
      };
    }
    return () => cancelAnimationFrame(frame);
  }, [hash, selected, reduce]);
  return localizeTree(
    <Tabs
      value={selected}
      onValueChange={(value) => {
        window.history.pushState(
          null,
          "",
          value === defaultCategory ? window.location.pathname : `#${value}`,
        );
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }}
      className={styles.browser}
      id="menu"
    >
      <div className={styles.categoryBar}>
        <div className={`container ${styles.categoryControls}`}>
          <TabsList ref={tabs} aria-label="Categorie del menu" loop>
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.label}
              </TabsTrigger>
            ))}
            <TabsTrigger value="tutto">Tutto</TabsTrigger>
          </TabsList>
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
        <p role="status" className="sr-only">
          {selected === "tutto"
            ? "Tutte le categorie"
            : sections.find((section) => section.id === selected)?.label}
        </p>
        <TabsContent value={selected} ref={panel} className={styles.panel}>
          {sections.map((section) => (
            <div
              key={section.id}
              hidden={selected !== "tutto" && selected !== section.id}
            >
              {section.content}
            </div>
          ))}
        </TabsContent>
      </div>
    </Tabs>,
    locale,
    t,
  );
}
