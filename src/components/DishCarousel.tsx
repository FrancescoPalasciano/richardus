"use client";

import {
  useCallback,
  useId,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "@/app/Home.module.css";

export default function DishCarousel({
  children,
  label = "I piatti Richardus",
  hint = "Da assaggiare. Da condividere.",
}: {
  children: ReactNode;
  label?: string;
  hint?: string;
}) {
  const reduce = useReducedMotion();
  const [ref, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: reduce ? 0 : 25,
  });
  const id = useId();
  const subscribe = useCallback(
    (update: () => void) => {
      api?.on("select", update).on("reInit", update);
      return () => {
        api?.off("select", update).off("reInit", update);
      };
    },
    [api],
  );
  const snapshot = useSyncExternalStore(
    subscribe,
    () =>
      `${api?.selectedScrollSnap() ?? 0},${api?.scrollSnapList().length ?? 1},${api?.canScrollPrev() ? 1 : 0},${api?.canScrollNext() ? 1 : 0}`,
    () => "0,1,0,0",
  );
  const [index, count, previous, next] = snapshot.split(",").map(Number);
  const state = { index, count, previous: !!previous, next: !!next };
  return (
    <div
      role="region"
      aria-roledescription="carosello"
      aria-label={label}
      className={styles.carousel}
    >
      <div
        ref={ref}
        id={id}
        className={styles.carouselViewport}
        tabIndex={0}
        aria-label={`${label}: usa le frecce per scorrere`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            if (event.key === "ArrowLeft") api?.scrollPrev(!!reduce);
            else api?.scrollNext(!!reduce);
          }
        }}
      >
        <div className={styles.carouselTrack}>{children}</div>
      </div>
      <div className={`${styles.carouselControls} carousel-controls`}>
        <p>{hint}</p>
        <div>
          <span
            className={styles.carouselCount}
            aria-live="polite"
            aria-atomic="true"
          >
            {state.index + 1} / {state.count}
          </span>
          <Button
            size="icon"
            variant="outline"
            aria-label="Precedente"
            aria-controls={id}
            disabled={!state.previous}
            onClick={() => api?.scrollPrev(!!reduce)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            aria-label="Successivo"
            aria-controls={id}
            disabled={!state.next}
            onClick={() => api?.scrollNext(!!reduce)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
