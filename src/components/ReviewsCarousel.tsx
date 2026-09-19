"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/data/reviews";
import styles from "./ReviewsCarousel.module.css";

export default function ReviewsCarousel() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const positions = useRef([0]);
  const pointerPaused = useRef(false);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(8);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);

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
    const measure = () => {
      const element = track.current;
      if (!element) return;
      const perView = Number(getComputedStyle(element).getPropertyValue("--per-view")) || 1;
      const cards = Array.from(element.children) as HTMLElement[];
      positions.current = cards.filter((_, index) => index % perView === 0)
        .map((card) => Math.min(card.offsetLeft - cards[0].offsetLeft, element.scrollWidth - element.clientWidth));
      setPages(positions.current.length);
      setActive(0);
      element.scrollTo({ left: 0, behavior: "instant" });
    };
    const resize = new ResizeObserver(measure);
    if (track.current) resize.observe(track.current);
    return () => {
      observer.disconnect();
      resize.disconnect();
      media.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (paused || hovered || !visible || reduced) return;
    const timer = window.setTimeout(() => {
      track.current?.scrollTo({ left: positions.current[(active + 1) % pages], behavior: "smooth" });
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [active, pages, paused, hovered, visible, reduced]);

  function move(page: number) {
    setPaused(true);
    track.current?.scrollTo({ left: positions.current[(page + pages) % pages], behavior: reduced ? "instant" : "smooth" });
  }

  return (
    <div ref={root} className={styles.carousel} role="region" aria-roledescription="carosello" aria-label="Recensioni degli ospiti"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(true); }}>
      <div ref={track} className={styles.track} id="review-slides" tabIndex={0} aria-label="Scorri le recensioni, oppure usa le frecce della tastiera"
        onPointerDown={() => setPaused(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScroll={() => {
          const left = track.current?.scrollLeft ?? 0;
          setActive(positions.current.reduce((closest, position, index, all) => Math.abs(position - left) < Math.abs(all[closest] - left) ? index : closest, 0));
        }}>
        {reviews.map((review, index) => (
          <figure key={review.author} className={styles.card} role="group" aria-roledescription="slide" aria-label={(index + 1) + " di " + reviews.length}>
            <div className={styles.stars} role="img" aria-label="5 stelle su 5">
              {Array.from({ length: 5 }, (_, star) => <svg key={star} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01Z" /></svg>)}
            </div>
            <blockquote lang={"lang" in review ? review.lang : "it"} className={styles.quote}>“{review.quote}”</blockquote>
            <figcaption className={styles.caption}>
              <span className={styles.avatar} aria-hidden="true">{review.author.split(" ").filter(Boolean).slice(0, 2).map(word => word.match(/\p{L}/u)?.[0] ?? "").join("").toUpperCase()}</span>
              <span><span className={styles.author}>{review.author}</span><span className={styles.source}>Estratto da Google</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.controls}>
        <div className={styles.dots} aria-label="Gruppi di recensioni">
          {Array.from({ length: pages }, (_, page) => <button key={page} type="button" aria-label={"Mostra gruppo " + (page + 1) + " di " + pages} aria-current={page === active ? "true" : undefined} onClick={() => move(page)}><span /></button>)}
        </div>
        {!reduced && <button type="button" className={styles.play}
          onPointerDown={() => { pointerPaused.current = paused; }}
          onClick={(event) => setPaused(event.detail > 0 ? !pointerPaused.current : !paused)}
          aria-label={paused ? "Avvia lo scorrimento automatico" : "Metti in pausa lo scorrimento automatico"}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{paused ? <path d="m7 4 14 8-14 8Z" /> : <path d="M6 4h4v16H6zm8 0h4v16h-4z" />}</svg>
        </button>}
      </div>
    </div>
  );
}
