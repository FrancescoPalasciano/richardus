"use client";

import Link from "next/link";
import Script from "next/script";
import { setReviewsConsent, useReviewsConsent } from "@/lib/reviews-consent";

export default function ExternalReviews() {
  const allowed = useReviewsConsent();

  if (!allowed) {
    return (
      <div className="border-y border-foreground/20 py-8 sm:py-10">
        <p className="max-w-2xl text-lg">
          Le recensioni di Google, qui sul nostro sito.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7">
          Per mostrarle utilizziamo Elfsight, un servizio esterno che riceve
          dati di navigazione, come l’indirizzo IP, e può utilizzare cookie.
          Puoi consentirne il caricamento oppure leggere le recensioni
          direttamente su Google. La scelta è facoltativa e modificabile nella{" "}
          <Link
            href="/cookie-policy#preferenze"
            className="underline underline-offset-4"
          >
            cookie policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => setReviewsConsent(true)}
          className="mt-5 min-h-11 cursor-pointer bg-foreground px-5 py-3 text-sm text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          Consenti e mostra le recensioni
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className="elfsight-app-59145d03-21a7-4841-a274-768fa2319eeb min-h-96"
        data-elfsight-app-lazy=""
      />
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
    </>
  );
}
