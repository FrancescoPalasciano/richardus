import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import {
  resolveLocale,
  languageAlternates,
  type RouteProps,
} from "@/lib/locale";
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy-policy",
    languages: languageAlternates("/privacy-policy"),
  },
  title: "Privacy policy",
  description: "Informazioni sul trattamento dei dati del sito Richardus.",
  robots: { index: false, follow: true },
};

export default async function PrivacyPage({ params }: RouteProps) {
  const locale = resolveLocale((await params).locale);
  const t = getTranslator(locale);
  return localizeTree(
    <LegalPage locale={locale} title="Privacy policy">
      <section>
        <h2>Titolare e contatti</h2>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          {[
            "Ragione sociale del titolare",
            "Partita IVA",
            "Sede legale",
            "Contatto per richieste privacy",
          ].map((label) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd
                className="min-h-9 border-b border-foreground/25"
                aria-label="Dato da completare"
              />
            </div>
          ))}
        </dl>
        <p className="mt-5">
          Il ristorante Richardus si trova in Via S. Giovanni 15, Francavilla
          Fontana. Per informazioni sul ristorante:{" "}
          <a href="tel:+393290090918">329 009 0918</a>.
        </p>
      </section>
      <section>
        <h2>Navigazione e contatti</h2>
        <p>
          La consultazione di questo sito non richiede un account. Non sono
          presenti moduli di prenotazione o pagamento: i pulsanti di contatto
          aprono il telefono oppure WhatsApp. Il messaggio proposto su WhatsApp
          viene inviato solo dopo la tua conferma nell’app.
        </p>
        <p>
          Quando contatti il ristorante per una prenotazione, puoi comunicare
          nome, recapito, orario e numero di persone. Questi dati servono a
          rispondere alla tua richiesta e a organizzare la prenotazione; la base
          giuridica è l’esecuzione di misure precontrattuali richieste
          dall’interessato, ai sensi dell’art. 6, par. 1, lett. b del GDPR.
        </p>
      </section>
      <section>
        <h2>Dati tecnici e hosting</h2>
        <p>
          Il server che eroga il sito riceve dati tecnici necessari alla
          comunicazione, tra cui indirizzo IP, data e ora, risorsa richiesta e
          informazioni sul browser. La configurazione dei log, il fornitore di
          hosting, gli eventuali destinatari, i tempi di conservazione e la
          relativa base giuridica devono essere confermati dal titolare.
        </p>
        <p>
          I caratteri tipografici del sito sono ospitati localmente. Nel codice
          del sito non sono integrati strumenti di analytics o pixel
          pubblicitari.
        </p>
      </section>
      <section>
        <h2>Recensioni e servizi esterni</h2>
        <p>
          Il sito mostra una selezione di estratti delle recensioni pubblicate
          su Google, con attribuzione agli autori. I testi sono ospitati nel
          sito: la loro visualizzazione non carica servizi esterni e non
          memorizza preferenze nel browser. Il link alle recensioni complete
          apre il profilo del ristorante su Google.
        </p>
        <p>
          I collegamenti a Instagram, WhatsApp e Google Maps aprono servizi
          esterni, soggetti alle rispettive informative:{" "}
          <a
            href="https://privacycenter.instagram.com/policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          ,{" "}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy-eea"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>{" "}
          e{" "}
          <a
            href="https://policies.google.com/privacy?hl=it"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google
          </a>
          . Il collegamento al profilo del realizzatore del sito non comporta,
          da solo, la trasmissione a quest’ultimo dei dati delle prenotazioni.
        </p>
      </section>
      <section>
        <h2>Conservazione e destinatari</h2>
        <p>
          I tempi applicabili ai contatti e alle prenotazioni, gli eventuali
          obblighi di conservazione e i soggetti autorizzati ad accedere ai dati
          devono essere definiti dal titolare prima della pubblicazione di
          questa informativa.
        </p>
      </section>
      <section>
        <h2>I tuoi diritti</h2>
        <p>
          Nei casi previsti dal GDPR puoi chiedere accesso, rettifica,
          cancellazione, limitazione e portabilità dei dati, oppure opporti al
          trattamento. Puoi revocare il consenso senza pregiudicare la liceità
          del trattamento effettuato prima della revoca. Le richieste vanno
          indirizzate al titolare, ai recapiti da completare sopra.
        </p>
        <p>
          Puoi inoltre presentare un reclamo al{" "}
          <a
            href="https://www.garanteprivacy.it/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Garante per la protezione dei dati personali
          </a>
          .
        </p>
      </section>
    </LegalPage>,
    locale,
    t,
  );
}
