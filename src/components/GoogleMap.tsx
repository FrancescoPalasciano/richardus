"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { restaurant } from "@/lib/restaurant";

function MapFrame() {
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const timeout = window.setTimeout(() => setStatus(current => current === "loading" ? "slow" : current), 12000);
    return () => window.clearTimeout(timeout);
  }, []);
  return (
    <>
      <p role="status" className="mb-3 min-h-6 text-sm leading-6">
        {status === "loading" ? "Caricamento della mappa…" : status === "ready" ? "Mappa fornita da Google." : "La mappa non è ancora disponibile. Puoi aprire le indicazioni direttamente in Google Maps."}
      </p>
      <iframe title="Richardus, Via San Giovanni 15, Francavilla Fontana" src="https://maps.google.com/maps?q=Via+San+Giovanni+15,+Francavilla+Fontana,+BR,+Italy&output=embed&z=16" className="block h-64 w-full border-0" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen onLoad={() => setStatus("ready")} onError={() => setStatus("error")} />
      <a href={restaurant.maps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm underline underline-offset-4">Apri le indicazioni in Google Maps</a>
    </>
  );
}

export default function GoogleMap() {
  const [visible, setVisible] = useState(false);
  return (
    <details className="mt-4 border-b border-foreground/20 pb-2">
      <summary className="w-fit cursor-pointer py-3 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Mostra la mappa qui</summary>
      <div className="py-3">
        {visible ? (
          <>
            <MapFrame />
            <button type="button" onClick={() => setVisible(false)} className="ml-0 inline-flex min-h-11 cursor-pointer items-center text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 sm:ml-4">Disattiva la mappa</button>
          </>
        ) : (
          <>
            <p className="max-w-lg text-sm leading-6">La mappa si collega a Google e trasmette dati di navigazione solo dopo il tuo consenso. <Link href="/cookie-policy#mappa" className="underline underline-offset-4">Informazioni privacy</Link>.</p>
            <button type="button" onClick={() => setVisible(true)} className="mt-4 min-h-11 cursor-pointer border border-foreground/40 px-4 py-2 text-sm font-medium hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-4">Consenti e carica la mappa</button>
          </>
        )}
      </div>
    </details>
  );
}
