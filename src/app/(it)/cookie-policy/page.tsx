import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import {
  resolveLocale,
  languageAlternates,
  type RouteProps,
} from "@/lib/locale";
import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/cookie-policy",
    languages: languageAlternates("/cookie-policy"),
  },
  title: "Cookie policy",
  description: "Cookie e contenuti esterni del sito Richardus.",
  robots: { index: false, follow: true },
};

export default async function CookiePage({ params }: RouteProps) {
  const locale = resolveLocale((await params).locale);
  const t = getTranslator(locale);
  return localizeTree(
    <LegalPage locale={locale} title="Cookie policy">
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
    </LegalPage>,
    locale,
    t,
  );
}
