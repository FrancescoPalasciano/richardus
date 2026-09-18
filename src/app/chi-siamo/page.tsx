import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Richardus, ristorante tipico nel cuore della Puglia: pasta, brace e pizza.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20 sm:px-10 sm:py-32">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">
        Chi siamo
      </p>
      <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">
        Nel cuore della Puglia.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-9 text-foreground/80 sm:text-xl">
        Dove il profumo del mare si mescola agli ulivi secolari e alle
        tradizioni contadine, nasce il nostro ristorante tipico Richardus.
      </p>
      <p className="mt-10 text-sm uppercase tracking-[0.2em] text-accent">
        Pasta · Brace · Pizza
      </p>
    </main>
  );
}
