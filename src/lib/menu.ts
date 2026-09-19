import menu from "@/data/menu.json";

export type Dish = (typeof menu.prodotti)[keyof typeof menu.prodotti];
export const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: menu.valuta,
});
export const displayName = (name: string) =>
  name === name.toLocaleUpperCase("it-IT")
    ? name.charAt(0) + name.slice(1).toLocaleLowerCase("it-IT")
    : name;
export const dishes = Object.entries(menu.prodotti)
  .filter(([, dish]) => dish.visibile)
  .sort(([, a], [, b]) => a.ordine - b.ordine);
export const categories = Object.entries(menu.categorie)
  .filter(([id]) => dishes.some(([, dish]) => dish.categoria === id))
  .sort(([, a], [, b]) => a.ordine - b.ordine);
export const categoryLabel = (id: string, fallback: string) =>
  ({
    "primi-piatti": "Primi",
    "secondi-piatti": "Secondi",
    "frittura-della-casa": "Frittura",
    pizze: "Pizza",
    dolci: "Dessert",
    bevande: "Vini e bevande",
  })[id] ?? fallback;

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": "https://richardus.it/menu#carta",
    name: "Menu Richardus",
    inLanguage: "it",
    url: "https://richardus.it/menu",
    hasMenuSection: categories.map(([id, category]) => ({
      "@type": "MenuSection",
      name: category.nome,
      description: category.descrizione || undefined,
      hasMenuItem: dishes
        .filter(([, dish]) => dish.categoria === id)
        .map(([, dish]) => ({
          "@type": "MenuItem",
          name: displayName(dish.nome),
          description: dish.descrizione || undefined,
          offers: dish.prezzoSuRichiesta
            ? undefined
            : dish.prezzoMassimo !== null
              ? {
                  "@type": "AggregateOffer",
                  lowPrice: dish.prezzo,
                  highPrice: dish.prezzoMassimo,
                  priceCurrency: menu.valuta,
                }
              : {
                  "@type": "Offer",
                  price: dish.prezzo,
                  priceCurrency: menu.valuta,
                },
        })),
    })),
  };
}
