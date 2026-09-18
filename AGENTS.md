# Regole di progetto per Codex — siti web premium

## Obiettivo

Realizza siti veloci, accessibili, indicizzabili e visivamente distintivi. Il risultato deve sembrare progettato intenzionalmente da un team senior, non assemblato da un generatore automatico.

Queste regole sono requisiti di accettazione, non semplici suggerimenti. Se un requisito entra in conflitto con il codice esistente, segnala il conflitto e scegli la soluzione che preserva funzionalità, qualità e manutenibilità.

## Metodo di lavoro

- Prima di modificare il codice, esamina struttura del progetto, stack, componenti, stili, dipendenze, convenzioni, test e stato Git.
- Conserva le scelte valide già presenti. Non riscrivere parti funzionanti senza una motivazione concreta.
- Definisci prima dell'implementazione: pubblico, obiettivo della pagina, azione primaria, gerarchia dei contenuti e direzione visiva.
- Per attività non banali, prepara un piano breve e procedi per piccoli blocchi verificabili.
- Riutilizza componenti e token esistenti. Se manca un pattern ricorrente, crea un componente riutilizzabile invece di duplicare markup o stili.
- Mantieni le modifiche strettamente pertinenti alla richiesta. Non introdurre dipendenze o refactoring collaterali senza necessità.
- Usa le API e le convenzioni native dello stack prima di aggiungere librerie.
- Non lasciare placeholder, TODO, contenuti fittizi, link vuoti, pulsanti non funzionanti o sezioni incompiute nel risultato finale.
- Non dichiarare completato il lavoro finché build, controlli e test pertinenti non passano.
- Se mancano informazioni non bloccanti, adotta un'ipotesi ragionevole, dichiarala e continua. Chiedi chiarimenti solo quando la scelta cambia materialmente il risultato.

## Efficienza dei token e dei passaggi

- Ottimizza il processo per consumare meno token, chiamate agli strumenti e tempo, senza ridurre accuratezza, verifiche o qualità del risultato finale.
- Prima di agire, individua il percorso minimo affidabile: comprendi il problema, limita l'ambito, raccogli solo il contesto necessario, implementa e verifica.
- Cerca prima per nomi, simboli e pattern specifici; apri soltanto i file e le sezioni pertinenti. Non caricare intere directory o file molto lunghi quando basta un estratto mirato.
- Raggruppa ricerche, letture e controlli indipendenti in poche operazioni ben progettate quando questo non rende l'output ambiguo.
- Non rileggere file invariati e non ripetere ricerche, build o test già conclusi con successo, salvo che una modifica successiva possa averne invalidato il risultato.
- Mantieni una mappa sintetica dei file rilevanti, delle decisioni prese e delle verifiche già eseguite. Aggiornala invece di ricostruire il contesto da zero.
- Preferisci modifiche mirate e patch piccole. Non riscrivere un file intero quando è sufficiente cambiare una sezione.
- Non stampare nei messaggi o nei risultati il contenuto completo di file, log o output voluminosi. Riporta solo righe rilevanti, errori, decisioni e conclusioni.
- Mantieni aggiornamenti e riepiloghi concisi, informativi e privi di ripetizioni. Non descrivere operazioni ovvie che non aiutano a verificare il lavoro.
- Riutilizza componenti, utility, comandi e conoscenze già disponibili nel repository invece di rigenerarli.
- Usa prima il controllo più rapido e specifico capace di trovare l'errore; amplia progressivamente a type-check, test completi e build quando il rischio o la fase finale lo richiedono.
- Durante l'iterazione esegui test mirati sulle parti toccate; prima della consegna esegui comunque tutti i controlli finali richiesti dal progetto e dal livello di rischio.
- Evita dipendenze, strumenti, ricerche web e documentazione esterna quando il repository contiene già una risposta affidabile. Usali quando servono a garantire correttezza o informazioni aggiornate.
- Parallelizza soltanto attività realmente indipendenti quando riduce il lavoro complessivo e non duplica contesto o analisi.
- Non creare sotto-attività o delegazioni per lavori piccoli. Usale solo quando hanno confini chiari e producono un vantaggio netto in velocità o qualità.
- In caso di conflitto, la correttezza prevale sul risparmio: non saltare analisi, accessibilità, sicurezza, test, controllo visivo o verifica SEO per consumare meno token.
- Se una scorciatoia riduce la fiducia nel risultato, non usarla. L'obiettivo è eliminare sprechi, non eliminare controlli utili.

## Git e commit

- Prima di iniziare, controlla lo stato Git e non alterare né includere nei commit modifiche preesistenti dell'utente.
- Se una singola attività richiede la modifica di più di 6 file, crea commit intermedi atomici: ogni commit deve contenere al massimo 6 file modificati da Codex.
- Crea il commit dopo che il relativo blocco è coerente e verificato, prima di passare al blocco successivo.
- Non dividere artificialmente una modifica indivisibile solo per rispettare il limite: in quel caso segnala l'eccezione prima del commit e riduci il gruppo quanto possibile.
- Esegui i controlli pertinenti prima di ogni commit. Non committare codice deliberatamente non funzionante.
- Usa messaggi Conventional Commits chiari, per esempio `feat: improve mobile navigation` o `fix: add canonical metadata`.
- Non usare `git add .` quando potrebbe includere modifiche estranee. Aggiungi esplicitamente soltanto i file del blocco corrente.
- Non modificare la cronologia, non effettuare force-push e non pubblicare commit remoti senza richiesta esplicita.

## Direzione visiva: premium, riconoscibile, non “AI slop”

- Prima di scrivere CSS, scegli una direzione visiva coerente con brand, settore e pubblico. Ogni scelta deve avere una ragione funzionale o narrativa.
- Costruisci una gerarchia evidente attraverso scala tipografica, contrasto, ritmo, composizione, densità e spazi bianchi.
- Evita l'estetica generica da template: gradienti viola/blu gratuiti, glow ovunque, glassmorphism indiscriminato, blob casuali, griglie di card identiche, pill eccessive, hero con testo centrato prevedibile e illustrazioni astratte prive di significato.
- Evita formule e microcopy stereotipate come “Rivoluziona il tuo futuro”, “Esperienza senza limiti” o testo enfatico non supportato da prove.
- Non riempire la pagina di card. Usa card solo quando rappresentano davvero elementi indipendenti e confrontabili.
- Alterna ritmo e composizione delle sezioni senza perdere coerenza. Una landing page non deve sembrare una pila uniforme di rettangoli.
- Introduci almeno un elemento distintivo legato al contenuto: composizione editoriale, tipografia, trattamento immagini, dettaglio interattivo o motivo grafico proprietario.
- Usa una palette limitata e intenzionale, con contrasto sufficiente. Definisci colori, spaziature, raggi, ombre, tipografia e motion come design token.
- Usa al massimo due famiglie tipografiche e pochi pesi realmente necessari. Cura lunghezza delle righe, interlinea, tracking e fluidità delle dimensioni.
- Ombre, bordi, gradienti e trasparenze devono essere sottili e coerenti. Non usarli come decorazione automatica.
- Mantieni coerenza assoluta tra raggi, icone, spessori, allineamenti, stati interattivi e spaziature.
- Preferisci contenuti reali, specifici e credibili. Non inventare metriche, clienti, recensioni, premi o certificazioni.
- Se mancano immagini adeguate, non inserire fotografie stock generiche solo per riempire spazio. Progetta una composizione che funzioni anche senza immagini.

## Tipografia premium per ristoranti e hospitality

- Per ristoranti, bistrot, enoteche, cocktail bar, pasticcerie e strutture hospitality, usa come impostazione di partenza un serif espressivo per titoli e dettagli editoriali abbinato a un sans-serif molto leggibile per testi, navigazione, menu, prezzi, form e prenotazioni.
- Non scegliere i font soltanto perché sembrano “lussuosi”. La tipografia deve essere coerente con posizionamento, cucina, luogo, storia, pubblico e identità visiva dell'attività.
- Usa al massimo due famiglie tipografiche e, normalmente, non più di 3–4 pesi complessivi. Ogni peso caricato deve avere un impiego reale.
- Considera questi abbinamenti come punti di partenza, non come scelte automatiche:
  - Fine dining elegante o ristorante italiano raffinato: `Cormorant Garamond` per titoli + `Manrope` per testi e interfaccia.
  - Fine dining contemporaneo o cocktail bar sofisticato: `Bodoni Moda` per titoli + `DM Sans` per testi e controlli.
  - Bistrot moderno, bakery o attività artigianale: `Fraunces` per titoli + `Inter` per testi.
  - Enoteca, ristorante storico o cucina tradizionale: `EB Garamond` per titoli + `Work Sans` per testi.
  - Hospitality minimalista e contemporanea: `Instrument Serif` per titoli + `Geist` o `Manrope` per testi.
- Usa Cormorant Garamond, Bodoni Moda, Fraunces e altri display serif soprattutto per hero, heading, citazioni, nomi dei piatti e dettagli brevi. Non usarli automaticamente per lunghi paragrafi o piccoli testi funzionali.
- Se il brand possiede già font e licenze ufficiali, usa quelli e costruisci il sistema tipografico attorno all'identità esistente.
- Evita la combinazione automatica `Playfair Display` + `Montserrat`, l'uso indiscriminato di `Poppins`, `Cinzel` e font calligrafici, oppure qualsiasi accoppiata molto riconoscibile da template. Possono essere usati solo quando la direzione creativa li giustifica e l'esecuzione li rende distintivi.
- Non usare font script o calligrafici per paragrafi, menu completi, prezzi, pulsanti o informazioni essenziali. Limitane l'eventuale uso a brevissimi accenti decorativi leggibili.
- Evita contrasti tipografici casuali. Abbina famiglie che si distinguono per ruolo ma condividono proporzioni, tono o ritmo compatibili.
- Imposta una scala fluida, non una raccolta di dimensioni arbitrarie. Come riferimento: hero `clamp(3rem, 7vw, 7rem)`, heading di sezione `clamp(2rem, 4vw, 4.5rem)` e testo base `clamp(1rem, 0.95rem + 0.2vw, 1.125rem)`, adattando i valori alla famiglia scelta e al layout.
- Mantieni il testo corrente normalmente tra 16 e 18 CSS px, con `line-height` indicativa tra 1.5 e 1.7 e una lunghezza di riga di circa 45–75 caratteri.
- Per navigazione, categorie del menu ed etichette in maiuscolo, usa con moderazione un tracking indicativo tra `0.06em` e `0.12em`. Non aumentare il tracking dei paragrafi.
- Non usare pesi ultraleggeri su testi piccoli, immagini, video o sfondi a basso contrasto. Il lusso non deve compromettere la leggibilità.
- Cura gerarchia, ritmo verticale, allineamenti e spazi bianchi: il carattere da solo non crea un risultato premium.
- Controlla sempre accenti italiani, simboli di valuta, apostrofi, virgolette, numeri, frazioni, legature e glifi necessari al menu prima di adottare una famiglia.
- Usa virgolette tipografiche, apostrofi corretti e trattini appropriati nei contenuti finali quando il sistema editoriale lo permette.
- Preferisci file `woff2`, subset coerenti con le lingue effettivamente usate e font variabili soltanto quando riducono davvero numero e peso dei file.
- Quando licenza e infrastruttura lo consentono, ospita localmente i font per avere controllo su privacy, caching e disponibilità. Conserva sempre le informazioni di licenza richieste.
- Precarica esclusivamente i file realmente necessari above-the-fold. Usa `font-display: swap` o una strategia equivalente appropriata e fallback metricamente compatibili per limitare FOIT e layout shift.
- Non scaricare famiglie complete, corsivi e pesi inutilizzati. Verifica il peso totale dei font e l'impatto su LCP e CLS.
- Testa la tipografia su mobile reale: titoli lunghi, nomi dei piatti, prezzi, descrizioni, CTA e traduzioni non devono creare overflow, righe isolate o composizioni fragili.

## Mobile-first e responsive

- Progetta e implementa prima il viewport piccolo; amplia progressivamente il layout con `min-width` media query quando opportuno.
- Il sito deve funzionare almeno a 320 px di larghezza senza overflow orizzontale, testo tagliato o controlli irraggiungibili.
- Non limitarti a impilare la versione desktop. Ridefinisci gerarchia, ordine dei contenuti, densità, navigazione e interazioni per mobile.
- Usa layout fluidi con Grid/Flexbox, `clamp()`, unità relative e contenitori elastici. Evita coordinate assolute e altezze fisse per il layout principale.
- I target interattivi devono essere comodi al tocco, idealmente almeno 44×44 CSS px, con spazio sufficiente tra azioni adiacenti.
- Nessuna funzione essenziale deve dipendere da hover. Prevedi stati touch, tastiera e focus.
- Gestisci correttamente menu, modali, tabelle, form, immagini, video e testi lunghi su schermi piccoli.
- Rispetta safe area, orientamento, zoom del browser e tastiera virtuale quando pertinenti.
- Verifica almeno le larghezze 320, 375, 768, 1024 e 1440 px, oltre ai punti in cui il layout cambia naturalmente.

## SEO tecnico e indicizzazione

- Ogni pagina indicizzabile deve avere un unico `title` descrittivo, una meta description specifica, URL leggibile, canonical corretto e un solo `h1` coerente con l'intento di ricerca.
- Mantieni una gerarchia semantica corretta di heading senza usare i livelli solo per ottenere uno stile visivo.
- Usa HTML semantico: `header`, `nav`, `main`, `section`, `article`, `aside` e `footer` quando appropriati.
- I contenuti principali devono essere presenti nell'HTML iniziale o renderizzati in modo compatibile con i crawler. Non nascondere contenuti essenziali dietro interazioni o solo nel client quando evitabile.
- Configura Open Graph e Twitter Card con titolo, descrizione, URL e immagine social coerenti.
- Aggiungi dati strutturati JSON-LD validi e pertinenti, ad esempio `Organization`, `LocalBusiness`, `WebSite`, `BreadcrumbList`, `Article`, `Product` o `FAQPage`. Non aggiungere schema non visibile o non veritiero.
- Prevedi `robots.txt` e sitemap XML corretti. Non bloccare accidentalmente pagine o asset necessari.
- Usa `noindex` soltanto per pagine che non devono comparire nei risultati. Verifica canonical, redirect e codici di stato per evitare duplicati o soft 404.
- Per siti multilingua, imposta `lang`, URL distinti, canonical e `hreflang` reciproci corretti.
- Tutte le immagini informative devono avere `alt` descrittivo; quelle decorative devono avere `alt=""`.
- Usa anchor text descrittivi e collegamenti interni utili. Evita “clicca qui” e link duplicati senza contesto.
- Non fare keyword stuffing. Scrivi prima per le persone, coprendo chiaramente intento, entità, domande e informazioni concrete.
- Non inventare metadata o contenuti aziendali mancanti: usa dati verificati o chiedili quando sono indispensabili.
- Verifica che favicon, manifest, social preview e metadata siano validi e non puntino a URL inesistenti.

## Prestazioni e Core Web Vitals

- Considera le prestazioni parte del design. Punta a LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 al 75° percentile su mobile quando misurabile.
- Mantieni leggero il caricamento iniziale. Rimuovi codice, CSS, font e dipendenze non necessari.
- Ottimizza immagini con dimensioni corrette, formati moderni, `srcset`/`sizes`, dimensioni dichiarate e lazy loading sotto la piega.
- Non applicare lazy loading all'immagine LCP. Precarica soltanto risorse realmente critiche.
- Evita salti di layout riservando spazio a immagini, embed, banner e contenuti asincroni.
- Carica i font in modo efficiente, limita varianti e subset, usa fallback metricamente compatibili e una strategia `font-display` appropriata.
- Riduci JavaScript client-side e lavoro sul main thread. Preferisci rendering server-side o statico quando lo stack lo consente.
- Le animazioni non devono rallentare input, scroll o caricamento.
- Esegui una verifica Lighthouse o equivalente sulle pagine principali quando l'ambiente lo consente; tratta regressioni importanti come problemi da correggere, non come note opzionali.

## Animazioni e microinterazioni premium

- Usa il movimento per comunicare gerarchia, causalità, continuità o feedback. Ogni animazione deve avere uno scopo.
- Preferisci animazioni brevi e sobrie di `transform` e `opacity`. Evita animazioni di proprietà che causano continui reflow o repaint costosi.
- Mantieni un sistema di motion coerente: durate, easing e distanze devono provenire da pochi token condivisi.
- Le microinterazioni devono essere rapide; le entrate di sezione possono essere leggermente più lente ma mai ostacolare la lettura.
- Evita animazioni simultanee su ogni elemento, reveal ripetitivi, parallax aggressivo, cursori personalizzati invasivi, scroll hijacking e transizioni che ritardano la navigazione.
- Gli elementi above-the-fold devono essere leggibili subito. Non nascondere contenuto essenziale in attesa di JavaScript o animazioni.
- Attiva animazioni basate sullo scroll solo quando entrano nel viewport e usa l'osservazione efficiente degli elementi.
- Supporta sempre `prefers-reduced-motion: reduce`, riducendo o eliminando movimento non essenziale senza perdere contenuto o funzionalità.
- Non aggiungere librerie di animazione se CSS o le API già disponibili risolvono il caso in modo pulito.

## Icone e risorse grafiche

- Non usare emoji, caratteri Unicode, icone Material/Google o simboli testuali come sostituti delle icone dell'interfaccia.
- Usa SVG di qualità, coerenti nello stile, preferibilmente tramite una libreria già presente o un set unico scelto per il progetto.
- Non mescolare famiglie di icone con geometrie, viewBox, riempimenti o spessori diversi.
- Le icone decorative devono essere ignorate dagli screen reader. Le icone interattive devono avere un nome accessibile tramite testo visibile o `aria-label`.
- Ottimizza gli SVG, evita markup superfluo e usa `currentColor` quando l'icona deve ereditare il colore del contesto.
- Non copiare loghi o asset protetti da fonti non autorizzate.

## Accessibilità

- Mira almeno a WCAG 2.2 livello AA.
- Usa elementi HTML nativi prima di ricreare controlli con `div` e ARIA.
- Tutto deve essere utilizzabile con tastiera, con ordine di focus logico e focus chiaramente visibile.
- Non rimuovere l'outline senza fornire un'alternativa almeno equivalente.
- Associa correttamente label, errori e istruzioni ai campi. Gli errori devono spiegare come correggere il problema.
- Garantisci contrasto sufficiente per testo, icone, bordi funzionali e stati interattivi.
- Non usare solo il colore per comunicare stato o significato.
- Modali, menu e popover devono gestire focus, chiusura con Escape, ritorno del focus e semantica corretta.
- Usa ARIA soltanto quando necessario e in modo valido. ARIA non deve compensare HTML semanticamente errato.

## Contenuti e conversione

- Ogni pagina deve avere uno scopo primario e una CTA principale riconoscibile, senza competizione inutile tra troppe azioni.
- Scrivi titoli specifici e informativi. La proposta di valore deve essere comprensibile senza slogan vaghi.
- Organizza i contenuti secondo le domande reali dell'utente: che cos'è, per chi è, quale problema risolve, perché fidarsi, come funziona e cosa fare dopo.
- Mantieni tono, terminologia e lingua coerenti. Evita testo gonfio, ripetitivo o palesemente generato.
- Non sacrificare chiarezza e fiducia per un effetto visivo.
- Form e checkout devono richiedere solo informazioni necessarie, spiegare gli errori e mostrare chiaramente esito e prossimi passi.

## Qualità del codice

- Segui le convenzioni, il formatter, il linter e i tipi del progetto.
- Preferisci componenti piccoli con responsabilità chiare, nomi descrittivi e API semplici.
- Non duplicare logica o valori magici. Centralizza token e configurazioni condivise senza creare astrazioni premature.
- Mantieni separati contenuto, presentazione e comportamento quando lo stack lo permette.
- Evita `!important`, selettori fragili, z-index arbitrari e correzioni locali che nascondono un problema strutturale.
- Non aggiungere dipendenze per utilità banali. Se ne aggiungi una, verifica manutenzione, peso, licenza, sicurezza e compatibilità.
- Non esporre segreti, chiavi o dati sensibili nel client, nel repository o nei log.
- Gestisci stati di caricamento, vuoto, errore, successo e dati parziali quando pertinenti.
- Mantieni compatibilità con i browser supportati dal progetto; non introdurre polyfill indiscriminati.

## Verifica obbligatoria prima della consegna

- Esegui formatter, lint, type-check, test e build pertinenti.
- Controlla visivamente le pagine modificate su mobile e desktop, non soltanto tramite lettura del codice.
- Verifica navigazione, link, CTA, menu, form, modali, tastiera, focus e stati di errore.
- Verifica assenza di overflow, clipping, layout shift, errori console e richieste fallite.
- Controlla metadata, canonical, heading, alt text, dati strutturati, sitemap e robots quando coinvolti.
- Controlla `prefers-reduced-motion`, contrasto e accessibilità di base.
- Confronta il risultato con la richiesta e con il design esistente. Correggi incoerenze prima di concludere.
- Nel riepilogo finale indica: cosa è cambiato, verifiche eseguite, eventuali limiti rimasti e commit creati.

## Definition of Done

Il lavoro è concluso solo quando:

1. La funzione richiesta è completa e realmente utilizzabile.
2. Il design è coerente, distintivo e curato su mobile e desktop.
3. SEO, accessibilità e prestazioni non hanno regressioni evidenti.
4. Non sono presenti placeholder, errori console o interazioni rotte.
5. I controlli pertinenti passano, oppure ogni impedimento è documentato con precisione.
6. La regola dei commit atomici con massimo 6 file modificati da Codex è stata rispettata.
