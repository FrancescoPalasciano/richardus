"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { animate, useReducedMotion } from "motion/react";
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
  sections: { id: string; label: string; count: number; content: ReactNode }[];
}) {
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const selected = sections.some((section) => section.id === hash)
    ? hash
    : "tutto";
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!panel.current || selected === "tutto") return;
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
  }, [selected, reduce]);
  const count =
    selected === "tutto"
      ? sections.reduce((sum, section) => sum + section.count, 0)
      : sections.find((section) => section.id === selected)?.count;
  return (
    <Tabs
      value={selected}
      onValueChange={(value) => {
        window.history.pushState(
          null,
          "",
          value === "tutto" ? window.location.pathname : `#${value}`,
        );
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }}
      className={styles.browser}
      id="menu"
    >
      <div className={styles.categoryBar}>
        <div className="container">
          <TabsList aria-label="Categorie del menu" loop>
            <TabsTrigger value="tutto">
              Tutto{" "}
              <span>
                {sections.reduce((sum, section) => sum + section.count, 0)}
              </span>
            </TabsTrigger>
            {sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
      <div className={`container ${styles.menuContent}`}>
        <p role="status" className={styles.resultCount}>
          {count} proposte{" "}
          {selected === "tutto"
            ? "nel nostro menu"
            : `· ${sections.find((section) => section.id === selected)?.label}`}
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
    </Tabs>
  );
}
