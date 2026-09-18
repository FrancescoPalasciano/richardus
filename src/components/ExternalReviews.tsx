"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { setReviewsConsent, useReviewsConsent } from "@/lib/reviews-consent";

type WidgetState = "loading" | "ready" | "slow" | "error";

function ReviewsWidget() {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<WidgetState>("loading");

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let ready = false;
    const frames = new Set<HTMLIFrameElement>();
    const markReady = () => { ready = true; setStatus("ready"); };
    const inspect = () => {
      // Elfsight may render in the host or in an iframe. Keep the external link
      // available in both cases, including when a blocker stops the widget.
      if ((element.textContent?.trim().length ?? 0) > 80 && element.getBoundingClientRect().height > 0) markReady();
      element.querySelectorAll("iframe").forEach(frame => {
        if (!frames.has(frame)) { frames.add(frame); frame.addEventListener("load", markReady); }
      });
    };
    const observer = new MutationObserver(inspect);
    observer.observe(element, { childList: true, subtree: true, characterData: true });
    inspect();
    const timeout = window.setTimeout(() => {
      if (!ready) setStatus(current => current === "error" ? current : "slow");
    }, 12000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      frames.forEach(frame => frame.removeEventListener("load", markReady));
    };
  }, []);

  return (
    <div className="mt-6">
      <p role="status" className="mb-4 min-h-6 text-sm leading-6">
        {status === "loading" && "Caricamento delle recensioni…"}
        {status === "slow" && "Le recensioni stanno impiegando più tempo del previsto. Puoi leggerle direttamente su Google dal link qui sopra."}
        {status === "error" && "Non riusciamo a caricare le recensioni. Puoi leggerle direttamente su Google dal link qui sopra."}
        {status === "ready" && "Recensioni fornite da Google tramite Elfsight."}
      </p>
      <div ref={container} className="elfsight-app-59145d03-21a7-4841-a274-768fa2319eeb min-h-64" data-elfsight-app-lazy="" />
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" onError={() => setStatus("error")} />
      <Link href="/cookie-policy#preferenze" className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Gestisci il consenso alle recensioni</Link>
    </div>
  );
}

export default function ExternalReviews() {
  const allowed = useReviewsConsent();
  if (allowed) return <ReviewsWidget />;
  return (
    <details className="mt-3 text-sm">
      <summary className="w-fit cursor-pointer py-3 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Preferisci leggerle qui?</summary>
      <div className="max-w-2xl pb-2 pt-1">
        <p className="leading-6">Per mostrare le recensioni qui usiamo Elfsight, che riceve dati di navigazione e può utilizzare cookie. Il caricamento avviene solo con il tuo consenso. Puoi modificare la scelta nella <Link href="/cookie-policy#preferenze" className="underline underline-offset-4">cookie policy</Link>.</p>
        <button type="button" onClick={() => setReviewsConsent(true)} className="mt-4 min-h-11 cursor-pointer border border-foreground/40 px-4 py-2 font-medium hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-4">Consenti e carica le recensioni</button>
      </div>
    </details>
  );
}
