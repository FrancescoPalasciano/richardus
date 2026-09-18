import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import CookiePreferences from "@/components/CookiePreferences";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Cookie, contenuti esterni e preferenze sulle recensioni di Richardus.",
  robots: { index: false, follow: true },
};

export default function CookiePage() {
  return (
    <LegalPage title="Cookie policy">
      <section>
        <h2>Cookie e memoria del browser</h2>
        <p>
          I cookie sono piccoli file salvati nel browser. Anche altri strumenti,
          come localStorage, possono memorizzare informazioni sul dispositivo.
          Questa pagina descrive le funzionalità implementate nel sito; i dati
          del titolare sono riportati nella{" "}
          <Link href="/privacy-policy">privacy policy</Link> e devono ancora
          essere completati.
        </p>
      </section>
      <section>
        <h2>La tua scelta sulle recensioni</h2>
        <p>
          Il sito memorizza la scelta sui contenuti Elfsight nella voce
          localStorage{" "}
          <code className="break-all text-sm">
            richardus-reviews-consent-v1
          </code>
          , sul dominio visitato. La scelta viene considerata valida per 180
          giorni; dopo questo periodo il contenuto esterno resta disattivato
          finché non viene nuovamente consentito. Il dato viene sostituito a
          ogni modifica delle preferenze e può essere eliminato dalle
          impostazioni del browser.
        </p>
        <p>
          Questa memoria serve esclusivamente a rispettare la tua scelta. Se il
          browser ne impedisce l’uso, la scelta può essere mantenuta solo
          durante la pagina aperta e richiesta nuovamente alla visita
          successiva.
        </p>
      </section>
      <section>
        <h2>Contenuti facoltativi: Elfsight</h2>
        <p>
          Il widget delle recensioni non viene caricato prima del consenso. Se
          scegli “Consenti e mostra le recensioni”, il sito contatta Elfsight e
          carica il contenuto esterno, con trasmissione dei dati tecnici
          necessari e possibile accesso a risorse di terze parti.
        </p>
        <p>
          Secondo la{" "}
          <a
            href="https://help.elfsight.com/article/418-elfsight-and-gdpr"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentazione del fornitore
          </a>
          , Elfsight utilizza il cookie{" "}
          <code className="break-all text-sm">elfsight_viewed_recently</code>,
          sul dominio{" "}
          <code className="break-all text-sm">core.service.elfsight.com</code>,
          con durata dichiarata di 15 secondi, per evitare il conteggio ripetuto
          delle visualizzazioni. Altri cookie del servizio possono riguardare
          chi è già autenticato come proprietario di un account Elfsight.
        </p>
        <p>
          Le condizioni del servizio esterno possono cambiare: consulta anche l’
          <a
            href="https://elfsight.com/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            informativa Elfsight
          </a>
          . Non sono presenti integrazioni pubblicitarie o analytics aggiunte
          direttamente dal sito.
        </p>
      </section>
      <CookiePreferences />
      <section>
        <h2>Revoca e servizi collegati</h2>
        <p>
          Disattivando le recensioni interrompi il loro caricamento nelle visite
          successive; se lo script è già attivo, la pagina viene ricaricata per
          interromperne l’esecuzione. La revoca non elimina automaticamente
          cookie già impostati su domini esterni, che puoi gestire o cancellare
          nelle impostazioni del browser.
        </p>
        <p>
          I link a Instagram, WhatsApp e Google Maps sono normali collegamenti:
          non incorporano i relativi contenuti nella pagina. Puoi leggere le
          recensioni direttamente su Google senza attivare Elfsight.
        </p>
      </section>
    </LegalPage>
  );
}
