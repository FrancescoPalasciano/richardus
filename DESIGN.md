# Richardus — sistema visivo

## Direzione

Il sito traduce quattro materiali del locale — **pietra, tavola, Puglia e calore** — in una presenza editoriale, fotografica e conviviale. Richardus non è fine dining e non è rustico folkloristico: è una trattoria pugliese contemporanea, curata ma informale.

La fotografia reale viene prima dell’interfaccia. Le superfici digitali accompagnano il racconto con avorio caldo, carbone morbido, noce e terracotta; non competono con il cibo o con la sala.

## Principi

- Le fotografie occupano spazio e mantengono ritagli credibili, mai decorativi.
- La composizione alterna pieni fotografici, respiro editoriale e blocchi materici; non usa una pila uniforme di card.
- La pietra è evocata dai colori e dalla grana delle immagini reali, non da texture sintetiche.
- La conversione principale è la prenotazione su WhatsApp; menu e indicazioni sono azioni secondarie ma sempre facili da trovare.
- Ogni dato commerciale viene da contenuti esistenti: nessuna recensione, prezzo o promessa viene inventata.

## Palette

- Avorio `#F2EADB`: sfondo principale e luce calda.
- Carbone `#29231E`: testo e sezioni scure.
- Noce `#4A3326`: superfici narrative e calore materico.
- Terracotta `#9E4D36`: accento, CTA e dettagli identitari.
- Pietra `#D8CBB7`: pannelli chiari e sezione posizione.
- Crema `#FFFAF0`: testo su fotografia e superfici scure.

I colori sono centralizzati in `src/app/globals.css`. Il focus usa terracotta scura con contrasto visibile. Le sovrapposizioni fotografiche sono neutre e calde, mai gradienti cromatici artificiali.

## Tipografia

- Display: EB Garamond locale, per hero, heading editoriali e frasi brevi.
- Interfaccia e testo: Manrope variabile, già ospitato dal progetto.
- La scala è fluida; le intestazioni principali possono diventare grandi ma restano sotto il limite di leggibilità del viewport.
- Il testo corrente resta tra 16 e 18 px, con interlinea generosa e misura controllata.

## Componenti e forma

- Raggi contenuti: 8–14 px per controlli e immagini, 18–22 px solo per superfici maggiori.
- I pulsanti non sono pillole; hanno forma compatta, target minimo di 44 px e copy d’azione.
- Le card esistono soltanto quando il contenuto è autonomo: piatti, recensioni e dati di visita.
- Il logo ufficiale bianco resta invariato ed è mostrato su fondo scuro o fotografico.
- Le icone provengono esclusivamente da Lucide e mantengono uno stroke coerente.

## Movimento

- Transizioni brevi su link e controlli.
- Il momento focale della home è l’assestamento iniziale della fotografia della sala, attraversata una sola volta da una luce calda che richiama pietra e convivialità; il copy resta leggibile dal primo frame.
- Le entrate sotto la piega distinguono materiale e ruolo: ritaglio controllato per le fotografie, breve continuità verticale per il copy e un solo stagger contenuto per i piatti.
- L’unico movimento fotografico ricorrente è un leggero ingrandimento dei piatti su hover.
- I reveal sono progressivi, si eseguono una volta e non nascondono contenuto senza JavaScript.
- `prefers-reduced-motion` elimina movimento spaziale e sequenze non essenziali, preservando un feedback cromatico rapido sui controlli.

## Homepage

Modalità: **Persuade**. Il visitatore deve capire immediatamente luogo, cucina e atmosfera, quindi prenotare.

Primo viewport: fotografia reale della sala in pietra a piena larghezza, H1 semantico “Richardus, Trattoria a Francavilla Fontana”, CTA WhatsApp e accesso al menu.

Percorso: informazioni pratiche → piatti fotografici → racconto della tavola → manifesto “La Puglia, a tavola.” → posizione e orari → tre recensioni → prenotazione scenografica.

Elemento distintivo: la tipografia di “La Puglia, a tavola.” dialoga con fotografie e blocchi materici, usando terracotta e corsivo editoriale come firma ricorrente.

## Fotografia

Usare prima gli asset reali del progetto. Priorità futura per un servizio fotografico: facciata orizzontale al tramonto, Via San Giovanni/centro storico in formato verticale, brace in azione, mani in cucina, tavola conviviale con persone e piatti firma in luce naturale calda.
