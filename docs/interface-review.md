# Richardus — revisione dell’interfaccia

## Direzione e ambito

Pubblico: potenziali clienti del ristorante, con priorità mobile. Obiettivi:
consultare piatti e prezzi, trovare indirizzo e orari, prenotare tramite WhatsApp
o telefono. Identità conservata: verde bosco, avorio, EB Garamond e Work Sans,
logo e fotografie esistenti. Nessuna nuova dipendenza.

## Interventi

- Home editoriale con testo separato dalla fotografia, prenotazione e menu
  immediatamente disponibili. Tre piatti reali usano dati e prezzi di menu.json.
- Menu senza hero fotografica, indice delle categorie persistente e prezzi
  allineati. Nomi delle pizze leggibili senza maiuscole integrali.
- Prenotazione nell’header e in fondo alle pagine principali, con messaggio
  WhatsApp naturale e indicazione che occorre la conferma del ristorante.
- Chi siamo basato su indirizzo, piatti e ingredienti già documentati. Nessuna
  storia aziendale, certificazione o informazione sul personale inventata.
- Indirizzo e orari prima della fotografia su mobile. Mappa e recensioni
  facoltative, compatte e attivate solo con consenso; collegamenti diretti a
  Google disponibili senza caricare embed.
- Stati di caricamento, attesa prolungata ed errore per i contenuti esterni.
  La mappa viene rimossa quando si chiude il relativo pannello.
- Social nel footer ridimensionati. Focus visibile, salto al contenuto,
  navigazione da tastiera e metadati descrittivi; schema Restaurant con i soli
  dati già presenti nel sito.

## Verifiche effettuate

- ESLint completo, TypeScript e build Next.js: superati.
- Home, menu e Chi siamo a 320, 375, 768, 1024 e 1440 CSS px: nessun overflow
  orizzontale della pagina, un h1 per pagina, description presente, ancore
  interne valide. L’indice del menu scorre nel proprio contenitore.
- Controllo visivo mobile, tablet e desktop, anche sulla build di produzione.
- Apertura della navigazione da tastiera con focus sul primo link; Escape
  chiude prima le categorie e poi la navigazione, restituendo il focus.
- Percorso home-menu, collegamenti alle categorie, URL telefono/WhatsApp,
  disattivazione delle recensioni e della mappa controllati.
- Attesa prolungata dei servizi esterni verificata: messaggio e alternativa
  diretta restano disponibili. Nessun errore o warning console rilevato nelle
  pagine principali durante il controllo.
- Contrasto dei token: testo/avorio 11,54:1; CTA 14,20:1; testo secondario
  dell’header 10,57:1; accento/avorio 4,85:1.

## Limiti e informazioni necessarie

- Il caricamento completo di Google Maps ed Elfsight non è stato confermato
  nell’ambiente di prova; è stato verificato il recupero dall’attesa prolungata.
- Le alternative CSS per prefers-reduced-motion sono conservate. Non è stata
  eseguita una prova su dispositivo reale con questa preferenza attiva.
- Non sono stati misurati Lighthouse, FPS o Core Web Vitals sul campo.
- Canonical, sitemap e URL social assoluti richiedono il dominio definitivo.
  Non sono stati inventati URL di produzione.
- Le informative preesistenti rimangono bozze noindex: mancano ragione sociale,
  partita IVA, sede legale, contatto privacy e verifiche sull’hosting. Questi
  dati devono essere forniti e verificati prima della pubblicazione.
- Le modifiche preesistenti a README.md, package.json, package-lock.json e
  ScrollReveal.tsx non sono state incluse nei commit di questa revisione.
