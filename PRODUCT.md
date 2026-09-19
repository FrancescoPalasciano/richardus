# Richardus — prodotto

## Pubblico e bisogno

Il sito serve a chi cerca una trattoria a Francavilla Fontana e vuole conoscere cucina e ambiente, consultare piatti e prezzi, raggiungere il locale e richiedere un tavolo. Le lingue disponibili sono italiano, inglese, francese, tedesco e spagnolo. Il percorso deve funzionare anche da telefono, senza account.

## Proposta e informazioni confermate

Richardus è una trattoria in Via San Giovanni 15, Francavilla Fontana. La proposta attuale comprende cucina pugliese, pasta e piatti alla brace. Il dominio confermato è `https://richardus.it`; il numero è `+39 329 009 0918`. Contatti e destinazioni WhatsApp e Google Maps sono centralizzati in `src/lib/restaurant.ts`.

Il menu in `src/data/menu.json` contiene 42 proposte in otto categorie. La selezione è stata aggiornata su indicazione del committente il 19 settembre 2026, preservando prezzi e contenuti delle voci rimaste. Le cinque recensioni in `src/data/reviews.ts` sono estratti autentici conservati nella lingua originale; non costituiscono un feed in tempo reale o una valutazione aggregata.

Gli orari pubblicati sono martedì–domenica 19:30–00:00 e domenica anche 12:30–15:00; lunedì chiuso. Contenuti visibili e dati strutturati devono restare coerenti.

## Obiettivo e azioni

L’azione primaria è richiedere una prenotazione su WhatsApp. Il sito apre un messaggio modificabile; il cliente lo invia nell’app e il tavolo è prenotato soltanto dopo conferma del ristorante. La telefonata è l’alternativa. Consultazione del menu e indicazioni stradali sostengono questa decisione.

Non sono presenti acquisto, pagamento, disponibilità tavoli in tempo reale o invio automatico della richiesta. La comunicazione deve rispecchiare questo funzionamento.

## Pagine e lingue

| Percorso italiano | Scopo                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/`               | Presentare la trattoria, gli interni, la cucina, gli orari e le recensioni; accompagnare al menu e alla prenotazione. |
| `/menu`           | Consultare categorie, ingredienti e prezzi; trovare informazioni su allergie e coperto.                               |
| `/chi-siamo`      | Descrivere identità e proposta gastronomica attraverso contenuti reali.                                               |
| `/privacy-policy` | Esporre la bozza informativa privacy, esclusa dall’indicizzazione.                                                    |
| `/cookie-policy`  | Spiegare la mappa facoltativa e la bozza della gestione cookie, esclusa dall’indicizzazione.                          |

Gli stessi cinque percorsi sono disponibili con prefissi `/en`, `/fr`, `/de` e `/es`, per venticinque pagine. Il selettore lingua conserva pagina e categoria del menu tramite hash. Le quindici pagine di contenuto sono indicizzabili; le dieci pagine legali restano `noindex`. La navigazione comprende un collegamento Home esplicito.

## Direzione approvata

Il brief finale richiede fondo nero in tutto il sito, Manrope come unica famiglia dell’interfaccia, superfici scure e accenti caldi. Si usa esclusivamente il logo orizzontale fornito dal committente, senza targhetta aggiunta. La home apre con un titolo chiaro sulla trattoria, una descrizione breve, due azioni e una fotografia dell’interno: le informazioni pratiche restano fuori dal blocco introduttivo.

Plate è un riferimento concettuale di qualità, non una fonte da copiare. I dettagli del sistema implementato sono in `DESIGN.md`.

Le fotografie fornite si usano una volta ciascuna nel percorso di ogni lingua: `interno2.jpg` nel blocco introduttivo della home, `interno.jpg` nel suo modulo narrativo, orecchiette/fave/entrecôte nel carosello, insalata nella pagina Chi siamo e `vino.webp` nell’intestazione del menu. Non si usano `home.webp`, fotografie generate o stock esterno.

## Vincoli duraturi

- Preservare i contatti reali e i percorsi nelle cinque lingue; non inventare storia, premi, recensioni, prezzi o dati aziendali.
- Mantenere tutte le proposte nell’HTML iniziale, con categorie accessibili da tastiera e senza conteggi promozionali.
- Conservare testi e attribuzioni delle recensioni nella lingua originale.
- Caricare l’iframe Google Maps solo dopo consenso esplicito, revocabile e non memorizzato.
- Usare font locali, immagini dimensionate e dissolvenze leggere disattivabili tramite movimento ridotto.
- Completare e verificare i dati legali mancanti prima della pubblicazione: le bozze esistenti non attestano conformità.

Le evidenze e i limiti delle verifiche sono registrati in `docs/redesign-review.md`.
