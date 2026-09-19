# Richardus

Sito della trattoria Richardus a Francavilla Fontana, in italiano, inglese, francese, tedesco e spagnolo. Stack: Next.js 16.3.5, React 19.2.8, TypeScript e Tailwind CSS 4. Le venticinque pagine sono generate staticamente; menu e contenuti principali sono presenti nell’HTML iniziale.

## Sviluppo locale

Node.js 24 LTS è indicato in `.nvmrc` e usato nel Dockerfile. Le dipendenze sono gestite con npm e `package-lock.json`.

```bash
npm ci
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000). Docker non è necessario durante lo sviluppo locale.

## File principali

- `src/app/(it)/`: cinque pagine italiane e layout italiano.
- `src/app/[locale]/[[...slug]]/page.tsx`: generazione delle quindici pagine EN/FR/DE, metadata e gestione dei percorsi non validi.
- `src/app/[locale]/layout.tsx` e `src/components/AppShell.tsx`: layout condiviso, lingua HTML, font, metadata generali, JSON-LD e provider client.
- `src/lib/locale.ts`, `src/lib/i18n.ts`, `src/lib/translate.ts` e `src/lib/localize.tsx`: percorsi localizzati, catalogo, traduttore e trasformazione dei contenuti renderizzabili.
- `src/data/translations.json`: traduzioni EN/FR/DE delle stringhe sorgente italiane.
- `src/components/HomeSections.tsx`, `Header.tsx`, `Footer.tsx` e `Reservation.tsx`: sezioni e navigazione condivise.
- `src/components/ui/`: primitive personalizzate su Radix e varianti dei pulsanti.
- `src/data/menu.json` e `src/lib/menu.ts`: contenuti e presentazione delle 42 proposte in otto categorie.
- `src/lib/restaurant.ts`: telefono, indirizzo e link WhatsApp, Maps e recensioni.
- `src/app/globals.css` e moduli CSS: tema scuro, token e layout; `DESIGN.md` e `.impeccable/design.json` documentano il sistema.
- `next.config.ts`: configurazione Next.js e output standalone.

Tailwind 4 usa `@tailwindcss/postcss` e `@theme` nel CSS. Il contesto approvato è in `PRODUCT.md`; le evidenze di verifica sono in `docs/redesign-review.md`.

## Lingue e indicizzazione

L’italiano usa `/`, `/menu`, `/chi-siamo`, `/privacy-policy` e `/cookie-policy`; le altre lingue aggiungono `/en`, `/fr`, `/de` o `/es` agli stessi percorsi. Il selettore conserva pagina e hash della categoria. Le root layout separate permettono di impostare correttamente `html lang` anche al cambio lingua; condividono `AppShell.tsx`.

Il catalogo è importato lato server. `LocaleProvider` riceve i messaggi della sola lingua selezionata; `localizeTree` traduce testo, proprietà di presentazione e collegamenti interni prima del rendering, lasciando invariati ID, dati e comportamento. Le nuove stringhe visibili e accessibili devono avere le quattro traduzioni nel catalogo. Le citazioni delle recensioni mantengono testo e lingua originali.

Canonical e `hreflang` collegano le cinque versioni. La sitemap contiene le quindici pagine di contenuto indicizzabili. Le dieci versioni delle pagine legali restano `noindex`. Gli endpoint `/icon` e `/opengraph-image` usano il logo orizzontale fornito.

## Identità, fotografie e tipografia

Tema nero, superfici scure e accenti caldi. `Brand.tsx` usa `src/app/images/logo.webp` in navigazione, pannello mobile, contatti e footer, senza aggiungere una targhetta. La navigazione include Home.

Ogni fotografia ha un solo impiego per lingua: `interno2.jpg` nell’apertura della home, `interno.jpg` nel suo modulo narrativo, foto di orecchiette/fave/entrecôte nel carosello, insalata in Chi siamo e `vino.webp` nel menu. `home.webp` non viene usata. Nessuna immagine generata o stock esterno è integrata. Altri file presenti nella cartella non implicano l’uso sul sito.

Manrope è l’unico font dell’interfaccia: WOFF2 variabile latino locale, intervallo 400–700, circa 24,8KB, caricato tramite `next/font/local` da `AppShell.tsx`, con `display: swap` e fallback Arial adattato. Proviene dalla dipendenza `@fontsource-variable/manrope`, distribuita con licenza SIL OFL. Non ci sono richieste a Google Fonts durante build o navigazione. Il lettering del logo resta quello dell’immagine fornita.

## Prenotazioni, menu e recensioni

Le CTA aprono il link WhatsApp configurato in `src/lib/restaurant.ts`, con messaggio precompilato modificabile. Il sito non lo invia automaticamente; la prenotazione richiede conferma del ristorante. Il numero telefonico è `+39 329 009 0918`.

Il menu usa Tabs Radix, categorie raggiungibili tramite hash e frecce di scorrimento quando necessarie. Tutte le proposte rimangono nell’HTML iniziale. I conteggi sono esclusi dall’interfaccia. Le informazioni su allergie e coperto rimangono disponibili; non si dichiarano allergeni dei singoli piatti come verificati.

`ReviewsCarousel.tsx` mostra cinque estratti autentici in `src/data/reviews.ts`, verificati sul profilo Google il 19 settembre 2026. La selezione conserva testo e attribuzione; non è un feed automatico. Il link visibile apre tutte le recensioni Google. Non carica script o avatar esterni e non usa cookie o localStorage.

Piatti e recensioni usano `DishCarousel.tsx` con Embla: trascinamento, pulsanti e frecce della tastiera, senza rotazione automatica. Le slide sono server-rendered e i controlli rispettano il movimento ridotto.

## Movimento e accessibilità

`ScrollReveal.tsx` usa Motion per i blocchi `data-reveal`: una dissolvenza di 300ms da opacità 0.35 a 1 e traslazione da 8px a 0, una volta per elemento durante la visita alla pagina. I contenuti sono già visibili nell’HTML iniziale. Il componente completa le animazioni quando si attiva `prefers-reduced-motion` e le ripulisce al cambio percorso.

Le primitive Radix gestiscono focus e tastiera per pannello mobile, categorie e disclosure. CSS e hook riducono il movimento quando richiesto. L’header è sticky; il dock mobile mostra le azioni rapide quando il blocco prenotazione non è visibile.

## Footer, privacy e cookie

Il footer condiviso contiene contatti, orari, navigazione e link diretti ai profili Instagram di Richardus e Senza Freno Digital.

Le pagine privacy e cookie sono bozze `noindex`: per richiesta del committente ragione sociale, partita IVA, sede legale e contatto privacy restano vuoti. Prima della pubblicazione vanno completati e verificati anche hosting, log, destinatari, conservazione e trasferimenti; solo dopo può essere rimossa l’esclusione dall’indicizzazione. Le traduzioni mantengono lo stesso stato di bozza. Queste pagine non attestano la conformità del sito.

La mappa in `GoogleMap.tsx` resta facoltativa: l’apertura della disclosure non carica Google, serve il consenso esplicito. Il consenso non è memorizzato e “Disattiva la mappa” rimuove l’iframe. I normali link a Instagram, WhatsApp e Google non sono embed. Le vecchie preferenze Elfsight non sono più lette e possono essere eliminate dalle impostazioni del browser.

## Verifiche

```bash
npm run lint
npm run typecheck
npm run build
npm run verify
```

`verify` controlla l’output generato in `.next/server/app`: eseguirlo dopo la build. Lo script verifica contenuti, lingue, link, menu, metadata e vincoli degli asset. Le verifiche visive e i limiti delle misure prestazionali sono registrati separatamente in `docs/redesign-review.md`.

## Pubblicazione su Coolify

1. Carica il progetto in un repository Git, includendo `package-lock.json`, `Dockerfile` e `.dockerignore`.
2. Crea un'applicazione in Coolify collegata al repository e al branch desiderato.
3. Seleziona **Build Pack: Dockerfile**.
4. Imposta **Base Directory: /** e **Dockerfile Location: /Dockerfile**.
5. Imposta **Ports Exposes: 3000** e aggiungi il dominio.
6. Avvia **Deploy** e verifica i log e il dominio.

Il Dockerfile esegue installazione e build in stage separati. Il container finale contiene l'output standalone, gli asset statici e i file pubblici; parte con un utente non root e ascolta su `0.0.0.0:3000`.
Non servono Docker Compose o un database per questa base. Se abiliti un health check HTTP in Coolify, usa il percorso `/` e la porta `3000`.

Non sono richieste variabili d'ambiente applicative. Per aggiungerle in futuro, usa `.env.local` in sviluppo e la configurazione di Coolify in produzione. I file `.env*` sono esclusi da Git e dal contesto Docker.
Le variabili `NEXT_PUBLIC_*` sono incorporate durante la build: con questo Dockerfile vanno dichiarate e utilizzate come `ARG`/`ENV` nello stage `builder`, configurate in Coolify e richiedono una nuova build quando cambiano. Non usarle per segreti.

### Test Docker locale facoltativo

Con Docker Desktop avviato e configurato per container Linux:

```bash
docker build -t richardus .
docker run --rm -p 3000:3000 richardus
```

Riferimenti: [Next.js su Coolify](https://coolify.io/docs/applications/framework-examples/javascript/nextjs), [output standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

Il selettore lingua usa Radix Select, bandiere SVG decorative e nomi nativi. Lo spagnolo è in `src/data/translations.es.json`; gli altri tre cataloghi in `src/data/translations.json`. Google Maps apre la scheda verificata Richardus Mangia & Bevi; la mappa incorporata richiede consenso.
