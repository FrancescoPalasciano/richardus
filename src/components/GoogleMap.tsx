"use client";

import { localizeTree } from "@/lib/localize";
import { useLocale } from "@/components/LocaleProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { restaurant } from "@/lib/restaurant";
import { Button } from "@/components/ui/button";
import styles from "./VisitSection.module.css";

function MapFrame() {
  const { locale, t } = useLocale();
  const [status, setStatus] = useState<"loading" | "ready" | "slow">("loading");
  useEffect(() => {
    const timeout = window.setTimeout(
      () => setStatus((current) => (current === "loading" ? "slow" : current)),
      12000,
    );
    return () => window.clearTimeout(timeout);
  }, []);
  return localizeTree(
    <>
      <iframe
        title="Mappa di Richardus Mangia & Bevi"
        src={restaurant.mapsEmbed}
        className={styles.mapFrame}
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setStatus("ready")}
      />
      {status !== "ready" && (
        <p role="status" className={styles.mapStatus}>
          {status === "loading"
            ? "Caricamento della mappa…"
            : "Il caricamento richiede più tempo del previsto."}
        </p>
      )}
    </>,
    locale,
    t,
  );
}

export default function GoogleMap() {
  const { locale, t } = useLocale();
  const [visible, setVisible] = useState(false);
  return localizeTree(
    <div className={styles.mapPanel}>
      {visible ? (
        <MapFrame />
      ) : (
        <div className={styles.mapConsent}>
          <MapPin size={34} aria-hidden="true" />
          <h3>Richardus, in centro.</h3>
          <p>
            Attiva la mappa interattiva per esplorare la posizione. Google
            riceverà dati di navigazione solo dopo la tua scelta.
          </p>
          <Button onClick={() => setVisible(true)}>Carica la mappa</Button>
          <br />
          <Link href="/cookie-policy#mappa" className={styles.mapPrivacy}>
            Informazioni privacy
          </Link>
        </div>
      )}
    </div>,
    locale,
    t,
  );
}
