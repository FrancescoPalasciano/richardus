import type { Metadata } from "next";
import menu from "@/data/menu.json";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Il menu di Richardus: antipasti, primi, piatti alla brace, pizze, dolci e bevande.",
};

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: menu.valuta,
});

export default function MenuPage() {
  const prodotti = Object.entries(menu.prodotti).filter(
    ([, prodotto]) => prodotto.visibile,
  );
  const categorie = Object.entries(menu.categorie)
    .filter(([id]) =>
      prodotti.some(([, prodotto]) => prodotto.categoria === id),
    )
    .sort(([, a], [, b]) => a.ordine - b.ordine);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">
        Pasta · Brace · Pizza
      </p>
      <h1 className="mt-4 font-serif text-5xl sm:text-7xl">Il nostro menu</h1>
      <p className="mt-6 max-w-xl text-sm leading-6 text-foreground/80">
        Per informazioni sugli allergeni, rivolgiti al personale prima di
        ordinare.
      </p>
      {categorie.map(([id, categoria]) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-title`}
          className="scroll-mt-28 pt-16 sm:pt-20"
        >
          <h2 id={`${id}-title`} className="font-serif text-3xl sm:text-4xl">
            {categoria.nome}
          </h2>
          {categoria.descrizione && (
            <p className="mt-3 text-sm leading-6 text-foreground/80">
              {categoria.descrizione}
            </p>
          )}
          <ul className="mt-6 divide-y divide-foreground/15 border-y border-foreground/15">
            {prodotti
              .filter(([, prodotto]) => prodotto.categoria === id)
              .sort(([, a], [, b]) => a.ordine - b.ordine)
              .map(([prodottoId, prodotto]) => (
                <li key={prodottoId} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="min-w-0 flex-1 basis-48 text-base font-medium">
                      {prodotto.nome}
                    </h3>
                    <p className="text-sm tabular-nums">
                      {euro.format(prodotto.prezzo)}
                      {prodotto.prezzoMassimo !== null &&
                        ` – ${euro.format(prodotto.prezzoMassimo)}`}
                      {prodotto.prezzoAPersona && (
                        <span className="ml-1 text-foreground/75">
                          a persona
                        </span>
                      )}
                    </p>
                  </div>
                  {prodotto.descrizione && (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/80">
                      {prodotto.descrizione}
                    </p>
                  )}
                </li>
              ))}
          </ul>
          {id === "pizze" && (
            <p className="mt-4 text-sm leading-6 text-foreground/80">
              {menu.costiAggiuntivi.aggiuntePizze.descrizione}
            </p>
          )}
        </section>
      ))}
      {menu.costiAggiuntivi.coperto.visibile && (
        <p className="mt-12 text-sm">
          Coperto {euro.format(menu.costiAggiuntivi.coperto.prezzo)}
        </p>
      )}
    </main>
  );
}
