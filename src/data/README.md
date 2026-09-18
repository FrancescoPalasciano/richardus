# Dati del menu

`menu.json` è l'unica fonte dei contenuti del menu: 61 prodotti, 9 categorie e la legenda dei 14 allergeni, trascritti dal PDF `menu.pdf` (pagine 3-7). Coperto e supplementi sono in `costiAggiuntivi`, separati dai prodotti.

Non sono necessari database o dipendenze aggiuntive. Il campo `$schema` collega il file a `menu.schema.json`, che abilita suggerimenti e controlli di tipo negli editor compatibili, incluso VS Code.

## Organizzazione

- `prodotti`: oggetto indicizzato per ID stabile, ad esempio `la-priora`. Per trovare un prodotto non occorre scorrere un array.
- `categorie`: nomi, descrizioni comuni e ordine delle categorie; ogni prodotto contiene il relativo ID nel campo `categoria`.
- `allergeni`: legenda della penultima pagina del PDF, indicizzata per ID leggibili. Gli ID sono nostri riferimenti tecnici, non codici numerici stampati nel menu.
- `ordine`: posizione all'interno della categoria o della legenda. I valori distanziati di 10 consentono inserimenti intermedi senza rinumerare tutto.
- `paginaFonte`: pagina del PDF da confrontare quando si modifica una voce. Per nuovi prodotti non presenti nel documento, usare `null`.

Gli ID non dipendono dal prezzo né dalla posizione: mantenerli invariati quando si rinomina, riordina o nasconde un prodotto.

## Campi dei prodotti

| Campo | Significato |
| --- | --- |
| `categoria` | ID della categoria, ad esempio `pizze`. |
| `nome` | Nome mostrato nel menu. |
| `prezzo` | Numero in euro, ad esempio `9` oppure `1.5`; non una stringa con il simbolo €. |
| `prezzoMassimo` | `null` per prezzi fissi; limite superiore per birre speciali e vini imbottigliati. |
| `prezzoAPersona` | `true` solo per le due voci che riportano esplicitamente “a persona” nel PDF. |
| `prezzoSuRichiesta` | `true` per i vini imbottigliati, il cui prezzo specifico va chiesto al personale. |
| `visibile` | `true` per mostrare il prodotto, `false` per nasconderlo senza cancellarlo. Inizialmente tutti visibili. |
| `descrizione` | Descrizione o ingredienti riportati nel PDF; stringa vuota se manca un testo separato. Non sono state inventate ricette. |
| `allergeni` | Array di ID della legenda, oppure `null` quando il documento non consente di ricavare informazioni sufficienti. |
| `allergeniVerificati` | Indica se il ristorante ha verificato la lista completa. Inizialmente sempre `false`. |
| `varianti` | Alternative esplicitamente indicate con lo stesso prezzo o intervallo; array vuoto se non presenti. |
| `ordine` | Ordinamento del prodotto nella categoria. |
| `paginaFonte` | Pagina di provenienza nel PDF. |

Per eventuali calcoli monetari convertire gli importi in centesimi con `Math.round(prezzo * 100)`; per la visualizzazione usare `Intl.NumberFormat`.

## Allergeni: dati da verificare

Il PDF elenca i 14 allergeni a pagina 7, ma **non dichiara gli allergeni di ciascun prodotto**. Non è quindi possibile ottenere dal documento una mappatura completa e certificata.

Le liste compilate sono **indicative e non esaustive**: latte per formaggi e latticini espliciti, pesce per tonno/alici/acciughe, frutta a guscio per il pistacchio, glutine presumibile per pasta, impasti, birra e pane delle insalate, solfiti presumibili per il vino. Anche queste deduzioni richiedono conferma. Ricette di polpette, panature, ripieni, salse, pesti, salumi, dessert e prodotti confezionati potrebbero contenere altri allergeni non ricavabili dal menu.

- `allergeni: null` significa **informazione non disponibile**, mai “senza allergeni”.
- Una lista con `allergeniVerificati: false` va mostrata soltanto come **indicativa / da verificare con il personale**, mai come elenco completo o come filtro per dichiarare un piatto adatto a una persona allergica.
- Dopo verifica del ristorante, aggiornare l'array e impostare `allergeniVerificati: true`.
- `allergeni: []` è consentito dallo schema solo quando `allergeniVerificati` è `true`. Non implica comunque assenza di contaminazioni crociate.

## Esempi in Next.js

```ts
import menu from "@/data/menu.json";

// Accesso diretto per ID.
const priora = menu.prodotti["la-priora"];
const nomeCategoria = menu.categorie.pizze.nome;
const nomeAllergene = menu.allergeni.latte.nome;

// Prodotti visibili di una categoria, ordinati.
const pizze = Object.entries(menu.prodotti)
  .filter(([, prodotto]) => prodotto.visibile && prodotto.categoria === "pizze")
  .sort(([, a], [, b]) => a.ordine - b.ordine)
  .map(([id, prodotto]) => ({ id, ...prodotto }));

// Prezzi fissi, intervalli e prezzo a persona.
const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: menu.valuta,
});
const prodotto = menu.prodotti["birre-speciali"];
const prezzo = prodotto.prezzoMassimo === null
  ? euro.format(prodotto.prezzo)
  : `${euro.format(prodotto.prezzo)} - ${euro.format(prodotto.prezzoMassimo)}`;
const etichetta = `${prezzo}${prodotto.prezzoAPersona ? " a persona" : ""}`;
// Mostrare anche prodotto.descrizione se prezzoSuRichiesta è true.
```

Per nascondere una pizza basta cambiare `visibile` in `false`. Per aggiungere un prodotto, copiare una voce, assegnare un nuovo ID e aggiornare campi e ordine. Per riordinare le categorie usare il loro campo `ordine`, senza dipendere dall'ordine delle chiavi JSON.

Lo schema controlla la struttura, non l'esistenza degli ID collegati: gli ID di `categoria` e degli `allergeni` devono corrispondere alle rispettive legende; `prezzoMassimo`, quando presente, deve essere maggiore o uguale a `prezzo`.

I nomi sintetici delle tre insalate sono ricavati dagli ingredienti; le descrizioni conservano l'elenco completo. Nomi dialettali e diciture particolari delle altre voci sono mantenuti. Le note comuni alle insalate si leggono dalla categoria. La nota sui surgelati resta generale perché non è associabile in modo univoco ai singoli prodotti.

Con un import statico, in produzione le modifiche al JSON richiedono una nuova build e un deploy su Coolify. Il file non è ancora collegato alla pagina del sito e non introduce API o pannelli di amministrazione.
