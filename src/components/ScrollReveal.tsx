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
    const animations = new Map<Element, ReturnType<typeof animate>>();
    const targets = Array.from(document.querySelectorAll("[data-reveal]"))
      .flatMap((element) =>
        element.tagName === "SECTION"
          ? Array.from(element.children)
          : [element],
      )
      .flatMap((element) =>
        element.hasAttribute("data-reveal-group")
          ? Array.from(element.children)
          : [element],
      );

    // Only prepare content below the fold; initial content and restored scroll
    // positions remain readable immediately. HTML is visible without JavaScript.
    targets.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight)
        element.setAttribute("data-scroll-reveal", "pending");
    });

    const show = (element: Element) => {
      element.removeAttribute("data-scroll-reveal");
      animations.get(element)?.complete();
    };
    const stop = inView(
      targets,
      (element) => {
        if (!element.hasAttribute("data-scroll-reveal")) return;
        show(element);
        if (media.matches || element.getBoundingClientRect().top < 0) return;
        const animation = animate(
          element,
          { opacity: [0, 1] },
          { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        );
        animations.set(element, animation);
        animation.then(() => {
          animations.delete(element);
        });
      },
      { margin: "0px 0px -32px 0px" },
    );
    const showAll = () => targets.forEach(show);
    const reduce = () => {
      if (media.matches) showAll();
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target;
      targets.forEach((element) => {
        if (element.contains(target)) show(element);
      });
    };
    media.addEventListener("change", reduce);
    document.addEventListener("focusin", focus);
    window.addEventListener("beforeprint", showAll);
    return () => {
      stop();
      showAll();
      media.removeEventListener("change", reduce);
      document.removeEventListener("focusin", focus);
      window.removeEventListener("beforeprint", showAll);
    };
  }, [pathname]);
  return null;
}
