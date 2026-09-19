"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate, inView } from "motion";

/** Progressive enhancement: content stays visible before JS and without motion. */
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const animations: ReturnType<typeof animate>[] = [];
    const seen = new WeakSet<Element>();
    const stop = inView("[data-reveal]", (element) => {
      if (
        media.matches ||
        seen.has(element) ||
        element.getBoundingClientRect().top < 0
      )
        return;
      seen.add(element);
      animations.push(
        animate(
          element,
          {
            opacity: [0.35, 1],
            transform: ["translateY(8px)", "translateY(0)"],
          },
          { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        ),
      );
    });
    const reduce = () => {
      if (media.matches)
        animations.forEach((animation) => animation.complete());
    };
    media.addEventListener("change", reduce);
    return () => {
      stop();
      animations.forEach((animation) => animation.complete());
      media.removeEventListener("change", reduce);
    };
  }, [pathname]);
  return null;
}
