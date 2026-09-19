# Richardus

Base per il sito di un ristorante con Next.js 16, React 19, TypeScript, Tailwind CSS 4 e App Router.
La home presenta il ristorante con una foto e i pulsanti di contatto; sono disponibili anche le pagine Menu e Chi siamo.

## Sviluppo locale

Versione consigliata: Node.js 24 LTS, indicata anche in `.nvmrc` e usata nel Dockerfile.
Le dipendenze sono gestite con npm e `package-lock.json`.

```bash
npm ci
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).
Docker non è necessario durante lo sviluppo locale.

## File principali

- `src/app/page.tsx`: pagina iniziale.
- `src/app/layout.tsx`: layout, lingua e metadati.
- `src/app/globals.css`: Tailwind, colori e font.
- `src/components/PageHero.tsx`: sezione fotografica condivisa dai titoli delle tre pagine.
- `src/app/images/home.webp`: foto usata come sfondo, ottimizzata da `next/image`.
- `public/`: immagini e altri file pubblici.
- `next.config.ts`: configurazione Next.js e output standalone.

Tailwind 4 è configurato con `@tailwindcss/postcss` e `@theme` nel CSS; non serve un `tailwind.config.js` per questa base.
I font sono inclusi nel progetto, quindi la build non richiede download da Google Fonts.

I collegamenti “Chiama ora” e “Scrivici” della home sono configurati in `src/app/page.tsx`: numero `+39 329 009 0918` e messaggio WhatsApp precompilato “Salve vorrei prenotare un tavolo per le x per x persone a nome di x”. Il visitatore può modificare e inviare il messaggio in WhatsApp; il sito non lo invia automaticamente.

## Footer, privacy e cookie

Il footer condiviso (`src/components/Footer.tsx`) contiene contatti, orari, navigazione e i link diretti ai profili Instagram di Richardus e Senza Freno Digital.

Le pagine `/privacy-policy` e `/cookie-policy` sono bozze con `noindex`: per richiesta del committente ragione sociale, partita IVA, sede legale e contatto privacy restano vuoti. Prima della pubblicazione vanno completati e verificati anche hosting, log, destinatari, conservazione e trasferimenti; poi può essere rimossa l'esclusione dall'indicizzazione. Queste bozze non attestano la conformità del sito.

Il carosello locale in `ReviewsCarousel.tsx` mostra otto estratti autentici selezionati in `src/data/reviews.ts`, verificati sul profilo Google il 19 settembre 2026. Non è un feed aggiornato automaticamente: modificare il file per aggiornare la selezione, mantenendo testo e attribuzione fedeli. Il collegamento visibile apre tutte le recensioni su Google. Non carica script o avatar esterni e non usa cookie o localStorage.

La rotazione cambia citazione ogni 8 secondi solo quando il carosello è visibile e la scheda attiva. Pausa al passaggio del mouse, arresto al focus o alla navigazione manuale, ripresa esplicita. Con movimento ridotto la rotazione e le transizioni sono disattivate. Le slide sovrapposte riservano lo spazio necessario evitando salti; solo quella attiva è esposta alle tecnologie assistive. I cambi manuali vengono annunciati, quelli automatici no.

La mappa incorporata in `GoogleMap.tsx` resta facoltativa: consenso esplicito non memorizzato e pulsante “Disattiva la mappa”. I normali link a Instagram, WhatsApp e Google non sono embed. Le vecchie preferenze Elfsight non sono più lette; si possono eliminare dalle impostazioni del browser.

## Animazioni allo scorrimento

`src/components/ScrollReveal.tsx`, incluso nel layout, gestisce con GSAP e ScrollTrigger i blocchi con attributo `data-reveal`. Prepara solo quelli sotto lo schermo con `data-reveal-state="pending"`, poi al primo ingresso applica una dissolvenza di 850 ms con spostamento dal basso di 28 px e easing `power2.out`. L'effetto è attivo sui blocchi della sezione contatti e sulle parti principali del footer. La sezione recensioni ha uno sfondo sabbia separato dal resto della pagina.

Per aggiungerlo a un nuovo blocco basta usare `<section data-reveal>...</section>` (o l'elemento semantico appropriato). Evitare blocchi annidati entrambi animati. Il contenuto è presente e visibile nell'HTML iniziale: senza JavaScript o con movimento ridotto rimane leggibile. Lo stato nascosto viene applicato solo dal codice client ai blocchi fuori schermo. I blocchi già visibili all'apertura non sono animati; il focus da tastiera rende visibile il blocco anche se era in attesa. Le istanze ScrollTrigger vengono ricreate al cambio pagina e ripulite insieme a tween e stati di attesa; anche la stampa mostra tutti i contenuti.

Il verde comune a header, pannelli di navigazione e footer è `#17271f`; l'header conserva una leggera trasparenza.

## Tipografia

La coppia scelta per Richardus è **EB Garamond + Work Sans**, consigliata nelle linee guida Markdown per ristoranti storici e cucina tradizionale:

| Font        | Utilizzo                                                               | Pesi utilizzati |
| ----------- | ---------------------------------------------------------------------- | --------------- |
| EB Garamond | Titoli di pagina e di sezione, classe `font-serif`                     | 500             |
| Work Sans   | Testi, header, categorie, nomi dei piatti e prezzi, classe `font-sans` | 400 e 500       |

Il serif richiama la tradizione del ristorante; il sans-serif mantiene leggibili navigazione e menu anche su mobile. Il logo originale rimane un'immagine e non viene ridisegnato.

I due file WOFF2 variabili con subset latino sono in `src/app/fonts/` (circa 92 KiB complessivi). Sono caricati con `next/font/local`, `font-display: swap` e fallback con metriche adattate. Non vengono effettuate richieste a Google Fonts, né durante la build né dal browser; non sono caricati corsivi o altri subset.

Le variabili `--font-work-sans` e `--font-eb-garamond` sono definite in `src/app/layout.tsx` e collegate ai token Tailwind in `src/app/globals.css`. Le licenze SIL Open Font License 1.1 sono conservate accanto ai file. Origine dei font: pacchetti Fontsource `@fontsource-variable/eb-garamond` e `@fontsource-variable/work-sans`; non sono dipendenze dell'applicazione.

## Verifiche

```bash
npm run lint
npm run typecheck
npm run build
```

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
