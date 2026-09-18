"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Reveal offscreen content once; keep initial content and no-JS pages visible. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      preference.matches ||
      !window.IntersectionObserver ||
      !Element.prototype.animate
    )
      return;

    const pending = new Set<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    function show(element: HTMLElement) {
      element.removeAttribute("data-reveal-state");
      pending.delete(element);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          if (preference.matches || element.contains(document.activeElement)) {
            show(element);
            continue;
          }
          const animation = element.animate(
            [
              { opacity: 0, transform: "translateY(28px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 850, easing: "ease", fill: "backwards" },
          );
          show(element);
          animations.set(element, animation);
          animation.onfinish = () => animations.delete(element);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );

    const frame = requestAnimationFrame(() => {
      if (preference.matches) return;
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          if (
            element.getBoundingClientRect().top < window.innerHeight ||
            element.contains(document.activeElement)
          )
            return;
          element.setAttribute("data-reveal-state", "pending");
          pending.add(element);
          observer.observe(element);
        });
    });

    function showAll() {
      pending.forEach(show);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }
    function handlePreferenceChange() {
      if (preference.matches) {
        observer.disconnect();
        showAll();
      }
    }
    function handleFocus(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      for (const element of pending) {
        if (element.contains(event.target)) {
          observer.unobserve(element);
          show(element);
        }
      }
      for (const [element, animation] of animations) {
        if (element.contains(event.target)) {
          animation.cancel();
          animations.delete(element);
        }
      }
    }
    preference.addEventListener("change", handlePreferenceChange);
    document.addEventListener("focusin", handleFocus);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      showAll();
      preference.removeEventListener("change", handlePreferenceChange);
      document.removeEventListener("focusin", handleFocus);
    };
  }, [pathname]);

  return null;
}
