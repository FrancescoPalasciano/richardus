import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/cookie-policy" },
  title: "Cookie policy",
  description: "Cookie e contenuti esterni del sito Richardus.",
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
        <h2>Recensioni sul sito</h2>
        <p>
          Gli estratti delle recensioni sono inclusi nelle pagine del sito. Il
          carosello non carica widget, immagini o script di Google o Elfsight e
          non salva cookie o preferenze nel browser. Il collegamento “Leggi
          tutte le recensioni” apre il profilo del ristorante su Google.
        </p>
        <p>
          Un’eventuale preferenza salvata dalla precedente versione del widget
          non viene più letta né aggiornata. Può essere eliminata dalle
          impostazioni del browser.
        </p>
      </section>
      <section id="mappa" className="scroll-mt-28">
        <h2>Mappa Google</h2>
        <p>
          La mappa incorporata è un contenuto facoltativo. Si attiva solo con
          “Consenti e carica la mappa”. Il caricamento trasmette a Google dati
          tecnici, tra cui l’indirizzo IP, e può comportare l’utilizzo di cookie
          secondo l’
          <a
            href="https://policies.google.com/privacy?hl=it"
            target="_blank"
            rel="noopener noreferrer"
          >
            informativa Google
          </a>
          .
        </p>
        <p>
          Questa scelta non viene salvata nella memoria del browser: vale solo
          finché la sezione rimane aperta. Il pulsante “Disattiva la mappa”
          rimuove il contenuto incorporato. Puoi sempre aprire l’indirizzo
          direttamente su Google Maps senza attivare la mappa nel sito.
        </p>
      </section>
      <section>
        <h2>Servizi collegati</h2>
        <p>
          I link a Instagram, WhatsApp e Google aprono servizi esterni. La mappa
          Google incorporata viene gestita con la scelta descritta sopra. Gli
          eventuali cookie già impostati da servizi esterni possono essere
          gestiti o cancellati nelle impostazioni del browser.
        </p>
      </section>
    </LegalPage>
  );
}
