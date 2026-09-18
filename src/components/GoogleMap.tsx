"use client";

import { useState } from "react";
import Link from "next/link";

export default function GoogleMap() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mt-5">
      <div className="overflow-hidden border border-foreground/15 bg-[#e9ede6]">
        {visible ? (
          <iframe
            title="Google Maps: Richardus, Via San Giovanni 15, Francavilla Fontana"
            src="https://maps.google.com/maps?q=Via+San+Giovanni+15,+Francavilla+Fontana,+BR,+Italy&output=embed&z=16"
            className="block h-64 w-full border-0 sm:h-72"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-5 py-7 text-center sm:min-h-72">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <p className="max-w-64 text-sm leading-6">
              Visualizza la nostra posizione sulla mappa interattiva di Google.
            </p>
            <button
              type="button"
              onClick={() => setVisible(true)}
              className="min-h-11 cursor-pointer bg-foreground px-5 py-3 text-sm text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            >
              Consenti e mostra la mappa
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2 text-xs leading-5">
        <p className="max-w-sm">
          {visible
            ? "Mappa fornita da Google."
            : "La mappa si collega a Google solo dopo il tuo consenso."}{" "}
          <Link
            href="/cookie-policy#mappa"
            className="underline underline-offset-4"
          >
            Informazioni privacy
          </Link>
        </p>
        {visible && (
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="min-h-11 cursor-pointer underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Disattiva la mappa
          </button>
        )}
      </div>
    </div>
  );
}
