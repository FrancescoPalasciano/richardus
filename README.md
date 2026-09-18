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
