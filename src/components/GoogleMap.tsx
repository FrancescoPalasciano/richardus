"use client";

import { localizeTree } from "@/lib/localize";
import { useLocale } from "@/components/LocaleProvider";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { restaurant } from "@/lib/restaurant";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/disclosure";

function MapFrame() {
  const { locale, t } = useLocale();
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const timeout = window.setTimeout(
      () => setStatus((current) => (current === "loading" ? "slow" : current)),
      12000,
    );
    return () => window.clearTimeout(timeout);
  }, []);
  return localizeTree(
    <>
      <p role="status" className="mb-3 min-h-6 text-xs leading-6">
        {status === "loading"
          ? "Caricamento della mappa…"
          : status === "ready"
            ? "Mappa fornita da Google."
            : "La mappa non è ancora disponibile. Apri le indicazioni direttamente in Google Maps."}
      </p>
      <iframe
        title="Richardus, Via San Giovanni 15, Francavilla Fontana"
        src="https://maps.google.com/maps?q=Via+San+Giovanni+15,+Francavilla+Fontana,+BR,+Italy&output=embed&z=16"
        className="block h-64 w-full border-0"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />
      <a
        href={restaurant.maps}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link mt-2"
      >
        Apri in Google Maps <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </>,
    locale,
    t,
  );
}

export default function GoogleMap() {
  const { locale, t } = useLocale();
  const [visible, setVisible] = useState(false);
  return localizeTree(
    <Accordion
      type="single"
      collapsible
      className="mt-5 w-full"
      onValueChange={(value) => {
        if (!value) setVisible(false);
      }}
    >
      <AccordionItem value="mappa">
        <AccordionTrigger>Mostra la mappa qui</AccordionTrigger>
        <AccordionContent>
          {visible ? (
            <>
              <MapFrame />
              <Button
                variant="outline"
                className="mt-3"
                onClick={() => setVisible(false)}
              >
                Disattiva la mappa
              </Button>
            </>
          ) : (
            <>
              <p className="text-xs leading-6">
                La mappa si collega a Google e trasmette dati di navigazione
                solo dopo il tuo consenso.{" "}
                <Link href="/cookie-policy#mappa" className="underline">
                  Informazioni privacy
                </Link>
                .
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setVisible(true)}
              >
                Consenti e carica la mappa
              </Button>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>,
    locale,
    t,
  );
}
