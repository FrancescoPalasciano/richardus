# Verifica del redesign Richardus

Aggiornamento: 19 settembre 2026. Prima verifica: tema nero, logo orizzontale e quattro lingue. L’aggiornamento in fondo registra le successive cinque lingue e la rimozione della descrizione storica. Il contesto approvato è in `PRODUCT.md`; il sistema estratto dal CSS è in `DESIGN.md` e `.impeccable/design.json`.

## Implementazione documentata

- Venti pagine statiche: cinque italiane e quindici EN/FR/DE. Contenuti server-rendered, lingua HTML, canonical e alternanze linguistiche per ogni percorso; sitemap con dodici pagine indicizzabili.
- Menu di 42 proposte in otto categorie, con prezzi preservati, categorie raggiungibili tramite hash, frecce di scorrimento e gestione difensiva degli hash malformati. I conteggi non compaiono nell’interfaccia.
- Cinque estratti autentici mantenuti nella lingua originale; prenotazione WhatsApp subordinata alla conferma del ristorante e telefono invariato.
- Sette fotografie fornite, una collocazione ciascuna per lingua; logo orizzontale riutilizzato nei punti di identità. Nessun uso di `home.webp`, foto generate o stock esterno.
- Manrope latino locale, immagini con proporzioni e `sizes`, preload sulle immagini principali; Motion e CSS prevedono movimento ridotto. L’iframe della mappa richiede consenso esplicito e revocabile.

## Stato delle verifiche

- Prettier sui sei documenti e sugli ultimi sorgenti: PASS. Lint, type-check e build: PASS dopo entrambe le correzioni finali.
- `npm run verify`: PASS su 20 percorsi, 352 collegamenti interni e 42 piatti; controllati canonical, metadata, JSON-LD, consenso mappa, sitemap, robots e immagine social.
- Browser sulla nuova versione: 180 combinazioni, cioè 20 pagine alle larghezze 320, 375, 390, 430, 768, 1024, 1280, 1440 e 1920px. Nessun overflow orizzontale, testo tagliato o immagine principale mancante rilevato. Sono stati usati viewport CSS effettivi in iframe temporanei, non dispositivi fisici.
- Interazioni: freccia di scorrimento categorie e filtro Primi funzionanti; passaggio IT → EN → FR → DE → IT con categoria conservata; ArrowRight cambia categoria. Il Sheet tedesco mostra logo e Home; Escape lo chiude e restituisce il focus. Un’apertura diretta del menu tedesco non ha prodotto warning o errori console.
- Ispezione di nuove acquisizioni home/menu/chi siamo a 1440 e 375px, drawer a 375px e home tedesca a 320px. Il revisore `dark_multilingual_finish_review` ha espresso `disposition: ship`, senza correzioni materiali residue.
- Contrasti calcolati delle coppie di token: testo principale 17,01:1; secondario 8,61:1; pulsante 9,13:1; hover argilla 9,72:1; oliva 10,63:1. Sono verifiche delle coppie indicate, non una certificazione WCAG completa.

## Correzioni e tracciabilità

- `5a7ec5a`: rendering delle traduzioni ed endpoint social.
- `c31cabe`: titoli legali tedeschi senza overflow.
- `119fc70`: associazione del titolo alla sezione storia.

Il commit `9922416` comprende nove file per la modifica indivisibile delle route e delle root layout localizzate: l’eccezione al limite di sei file è stata dichiarata prima del commit. Questo verbale registra gli esiti; non costituisce una pubblicazione del sito.

## Limiti

Aggiornamento scroll: dissolvenze di 350ms sui singoli blocchi e sulle schede sotto la piega, una volta per pagina e senza traslazione. Verificati home e menu su desktop e home a 375px: gli elementi compaiono entrando nel viewport e non scompaiono risalendo; nessun elemento in attesa resta nascosto nella zona leggibile. Il focus da tastiera rende subito visibile la scheda raggiunta. Console senza errori; Prettier, lint, type-check, build e verifica delle 20 route superati. La schermata iniziale resta visibile; movimento ridotto e stampa completano le dissolvenze tramite codice.

Non sono disponibili misure Core Web Vitals di utenti reali o un rapporto Lighthouse; non si attribuiscono punteggi prestazionali. Il supporto a movimento ridotto è stato verificato nel codice, ma la preferenza non è stata emulata tramite il sistema operativo. Non sono state eseguite prove su hardware mobile fisico.

Le otto pagine legali restano bozze `noindex`: mancano dati aziendali e verifiche già indicate nel README, da completare prima della pubblicazione. Nessuna dichiarazione di conformità è implicita.

I vecchi componenti o stili non raggiunti dalle pagine attive non sono fonti normative del nuovo sistema. Gli altri asset presenti nella cartella, non importati dalle pagine, non sono considerati integrati. Gli screenshot di verifica restano evidenze locali, non asset da pubblicare.

## Aggiornamento lingue e posizione

Aggiunto lo spagnolo a contenuti, menu, metadati e alternanze SEO: 25 pagine, 15 indicizzabili e 10 legali noindex. Rimossa la descrizione storica in tutte le lingue. Selettore Radix con bandiere SVG, nomi nativi, focus visibile e opzioni da almeno 46px; nuovo accento ambra #d99426. Link e mappa incorporata puntano alla scheda verificata Richardus Mangia & Bevi, mantenendo il consenso.

Verificati lint, type-check, build e output statico: 25 route, 440 collegamenti e 42 piatti. Verifica responsive aggiuntiva: 63 combinazioni (cinque home più menu e Chi siamo spagnoli alle nove larghezze da 320 a 1920px), nessun overflow. Ispezione visiva dropdown desktop e mobile 320px; cambio tra cinque lingue, conservazione categoria e chiusura Escape.

Commit: 4209651 (spagnolo), 9bc8cea (selettore e ambra), 68a27b6 (descrizioni). Quest’ultimo contiene dodici file per mantenere coerenti copy, cataloghi e SEO: eccezione indivisibile dichiarata prima del commit.
