import type { Metadata } from "next";
import menu from "@/data/menu.json";
import Reservation from "@/components/Reservation";

export const metadata: Metadata = {
  title: "Menu",
  description: "Il menu di Richardus a Francavilla Fontana: antipasti, pasta, piatti alla brace e pizze. Consulta ingredienti e prezzi e prenota il tuo tavolo.",
};

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: menu.valuta });
const displayName = (name: string) => name === name.toLocaleUpperCase("it-IT")
  ? name.charAt(0) + name.slice(1).toLocaleLowerCase("it-IT") : name;

export default function MenuPage() {
  const prodotti = Object.entries(menu.prodotti).filter(([, prodotto]) => prodotto.visibile);
  const categorie = Object.entries(menu.categorie)
    .filter(([id]) => prodotti.some(([, prodotto]) => prodotto.categoria === id))
    .sort(([, a], [, b]) => a.ordine - b.ordine);

  return (
    <main id="contenuto">
      <header className="mx-auto max-w-6xl px-6 pb-6 pt-10 sm:px-10 sm:pt-16">
        <h1 className="text-[clamp(3.25rem,7vw,6rem)] leading-none tracking-[-0.025em]">Il menu.</h1>
        <p className="mt-5 max-w-xl text-base leading-7">Pasta, brace e pizza. Scegli da dove cominciare.</p>
      </header>
      <nav aria-label="Categorie dei piatti" className="sticky top-[calc(5.5rem+1px)] z-20 border-y border-foreground/20 bg-background">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:thin] sm:px-8">
          {categorie.map(([id, categoria]) => (
            <li key={id} className="shrink-0">
              <a href={`#${id}`} className="inline-flex min-h-11 items-center px-3 text-sm font-medium underline decoration-foreground/30 underline-offset-8 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px]">{categoria.nome}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mx-auto max-w-6xl px-6 pb-12 sm:px-10">
        <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/85">Allergie o intolleranze? Rivolgiti al personale prima di ordinare. {menu.costiAggiuntivi.coperto.visibile && `Coperto ${euro.format(menu.costiAggiuntivi.coperto.prezzo)}.`}</p>
        {categorie.map(([id, categoria]) => (
          <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-44 border-b border-foreground/20 py-9 sm:py-12 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 id={`${id}-title`} className="text-4xl leading-tight sm:text-5xl">{categoria.nome}</h2>
              {categoria.descrizione && <p className="mt-3 max-w-md text-sm leading-6">{categoria.descrizione}</p>}
            </div>
            <div>
              <ul className="mt-5 divide-y divide-foreground/15 lg:mt-0">
                {prodotti.filter(([, prodotto]) => prodotto.categoria === id)
                  .sort(([, a], [, b]) => a.ordine - b.ordine)
                  .map(([prodottoId, prodotto]) => (
                    <li key={prodottoId} className="py-5 first:pt-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="min-w-0 text-base font-medium leading-6">{displayName(prodotto.nome)}</h3>
                        <p className="shrink-0 text-right text-sm tabular-nums">
                          {euro.format(prodotto.prezzo)}
                          {prodotto.prezzoMassimo !== null && <><br /><span>– {euro.format(prodotto.prezzoMassimo)}</span></>}
                          {prodotto.prezzoAPersona && <span className="block text-xs leading-5">a persona</span>}
                        </p>
                      </div>
                      {prodotto.descrizione && <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/85">{prodotto.descrizione}</p>}
                    </li>
                  ))}
              </ul>
              {id === "pizze" && <p className="mt-4 text-sm leading-6">{menu.costiAggiuntivi.aggiuntePizze.descrizione}</p>}
            </div>
          </section>
        ))}
      </div>
      <Reservation />
    </main>
  );
}
