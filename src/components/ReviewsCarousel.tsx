"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/data/reviews";
import styles from "./ReviewsCarousel.module.css";

const INTERVAL = 8000;

export default function ReviewsCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const pointerPaused = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    motion();
    media.addEventListener("change", motion);
    let intersecting = false;
    const visibility = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      visibility();
    }, { threshold: 0.25 });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (paused || hovered || !visible || reduced) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % reviews.length), INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, hovered, visible, reduced]);

  function move(direction: number) {
    const next = (active + direction + reviews.length) % reviews.length;
    setPaused(true);
    setActive(next);
    setAnnouncement(`Recensione ${next + 1} di ${reviews.length}. ${reviews[next].author}: ${reviews[next].quote}`);
  }

  return (
    <div ref={root} className={styles.carousel} role="region" aria-roledescription="carosello" aria-label="Recensioni degli ospiti"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(true); }}
    >
      <div className={styles.slides} id="review-slides" aria-live="off">
        {reviews.map((review, index) => (
          <figure key={review.author} className={styles.slide} data-active={index === active} aria-hidden={index !== active}
            role="group" aria-roledescription="slide" aria-label={`${index + 1} di ${reviews.length}`}>
            <div className={styles.stars} role="img" aria-label="5 stelle su 5">
              {Array.from({ length: 5 }, (_, star) => <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" /></svg>)}
            </div>
            <blockquote lang={"lang" in review ? review.lang : "it"} className={styles.quote}>“{review.quote}”</blockquote>
            <figcaption className={styles.caption}><span>{review.author}</span><span className={styles.source}>Estratto da Google</span></figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.controls}>
        <span className={styles.count} aria-hidden="true">{String(active + 1).padStart(2, "0")}<span> / {String(reviews.length).padStart(2, "0")}</span></span>
        <div className={styles.actions}>
          {!reduced && <button type="button" className={styles.play}
            onPointerDown={() => { pointerPaused.current = paused; }}
            onClick={(event) => setPaused(event.detail > 0 ? !pointerPaused.current : !paused)}
            aria-label={paused ? "Avvia lo scorrimento automatico" : "Metti in pausa lo scorrimento automatico"}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paused ? <path d="m7 4 14 8-14 8Z" /> : <path d="M6 4h4v16H6zm8 0h4v16h-4z" />}</svg>
            {paused ? "Riprendi" : "Pausa"}
          </button>}
          <button type="button" className={styles.arrow} onClick={() => move(-1)} aria-label="Recensione precedente" aria-controls="review-slides"><Arrow back /></button>
          <button type="button" className={styles.arrow} onClick={() => move(1)} aria-label="Recensione successiva" aria-controls="review-slides"><Arrow /></button>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    </div>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" style={{ transform: back ? "rotate(180deg)" : undefined }}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}
