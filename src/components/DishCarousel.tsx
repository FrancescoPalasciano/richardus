"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "@/app/Home.module.css";

export default function DishCarousel({
  children,
  label = "I piatti Richardus",
}: {
  children: ReactNode;
  label?: string;
}) {
  const reduce = useReducedMotion();
  const [ref, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: reduce ? 0 : 25,
  });
  const [state, setState] = useState({
    previous: false,
    next: true,
    index: 0,
    count: 1,
  });
  const id = useId();
  const update = useCallback(() => {
    if (api)
      setState({
        previous: api.canScrollPrev(),
        next: api.canScrollNext(),
        index: api.selectedScrollSnap(),
        count: api.scrollSnapList().length,
      });
  }, [api]);
  useEffect(() => {
    if (!api) return;
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api, update]);
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
        <p>Da assaggiare. Da condividere.</p>
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
