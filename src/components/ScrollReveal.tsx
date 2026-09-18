"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = "[data-reveal]";

/** Reveal offscreen content once; keep initial content and no-JS pages visible. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tweens = new Map<HTMLElement, gsap.core.Tween>();

      function show(element: HTMLElement) {
        element.removeAttribute("data-reveal-state");
        const tween = tweens.get(element);
        if (tween) {
          tween.scrollTrigger?.kill();
          tween.progress(1).kill();
          tweens.delete(element);
        }
        gsap.set(element, { clearProps: "opacity,transform,visibility" });
      }

      const frame = requestAnimationFrame(() => {
        gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
          if (
            element.getBoundingClientRect().top < window.innerHeight ||
            element.contains(document.activeElement)
          )
            return;
          element.setAttribute("data-reveal-state", "pending");

          const tween = gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
              onStart: () => element.removeAttribute("data-reveal-state"),
              onComplete: () => {
                tweens.delete(element);
                gsap.set(element, {
                  clearProps: "opacity,transform,visibility",
                });
              },
              scrollTrigger: {
                trigger: element,
                start: "top bottom-=32px",
                once: true,
                onEnter: () => {
                  if (element.contains(document.activeElement)) show(element);
                },
              },
            },
          );

          tweens.set(element, tween);
        });

        ScrollTrigger.refresh();
      });

      function handleFocus(event: FocusEvent) {
        if (!(event.target instanceof Node)) return;
        for (const element of tweens.keys()) {
          if (element.contains(event.target)) show(element);
        }
      }

      document.addEventListener("focusin", handleFocus);

      return () => {
        cancelAnimationFrame(frame);
        document.removeEventListener("focusin", handleFocus);
        tweens.forEach((_, element) => show(element));
      };
    });

    return () => media.revert();
  }, [pathname]);

  return null;
}
