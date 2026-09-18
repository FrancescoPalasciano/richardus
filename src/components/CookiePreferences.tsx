"use client";

import { setReviewsConsent, useReviewsConsent } from "@/lib/reviews-consent";

export default function CookiePreferences() {
  const allowed = useReviewsConsent();
  return (
    <div
      id="preferenze"
      className="scroll-mt-28 border border-foreground/20 p-6"
    >
      <h2>Le tue preferenze</h2>
      <p role="status">
        Recensioni Elfsight: {allowed ? "consentite" : "disattivate"}.
      </p>
      <p>
        Puoi cambiare scelta in qualsiasi momento. La disattivazione ricarica la
        pagina se il servizio è già stato avviato.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={allowed}
          onClick={() => setReviewsConsent(true)}
          className="min-h-11 cursor-pointer border border-foreground px-4 py-2 disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Consenti le recensioni
        </button>
        <button
          type="button"
          disabled={!allowed}
          onClick={() => setReviewsConsent(false)}
          className="min-h-11 cursor-pointer border border-foreground px-4 py-2 disabled:cursor-default disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Disattiva le recensioni
        </button>
      </div>
    </div>
  );
}
