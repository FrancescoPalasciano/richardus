"use client";

import { localizeTree } from "@/lib/localize";
import { useLocale } from "@/components/LocaleProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div
      className={`${styles.mapPanel} ${visible ? styles.mapPanelVisible : ""}`}
    >
      {visible ? (
        <MapFrame />
      ) : (
        <div className={styles.mapConsent}>
          <div>
            <h3>Mappa interattiva</h3>
            <p>
              Google riceverà dati di navigazione solo dopo la tua scelta.
            </p>
          </div>
          <div className={styles.mapActions}>
            <Button onClick={() => setVisible(true)}>Carica la mappa</Button>
            <Link href="/cookie-policy#mappa" className={styles.mapPrivacy}>
              Informazioni privacy
            </Link>
          </div>
        </div>
      )}
    </div>,
    locale,
    t,
  );
}
