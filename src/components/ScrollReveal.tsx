"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content stays visible without JavaScript or motion. */
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

    const animations = new Map<HTMLElement, Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          if (preference.matches || element.contains(document.activeElement))
            continue;

          const animation = element.animate(
            [
              { opacity: 0, transform: "translateY(14px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
          animations.set(element, animation);
          animation.onfinish = () => animations.delete(element);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );

    document
      .querySelectorAll<HTMLElement>("[data-reveal]")
      .forEach((element) => {
        // Keep initial content and direct anchor destinations immediately readable.
        if (element.getBoundingClientRect().top >= window.innerHeight)
          observer.observe(element);
      });

    function stopAnimations() {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }
    function handlePreferenceChange() {
      if (preference.matches) {
        observer.disconnect();
        stopAnimations();
      }
    }
    function handleFocus(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
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
      observer.disconnect();
      stopAnimations();
      preference.removeEventListener("change", handlePreferenceChange);
      document.removeEventListener("focusin", handleFocus);
    };
  }, [pathname]);

  return null;
}
