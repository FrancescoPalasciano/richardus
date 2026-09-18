import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Richardus, ristorante tipico nel cuore della Puglia: pasta, brace e pizza.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero title="Nel cuore della Puglia." eyebrow="Chi siamo" />
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-20">
        <p className="mt-8 max-w-2xl text-lg leading-9 text-foreground/80 sm:text-xl">
          Dove il profumo del mare si mescola agli ulivi secolari e alle
          tradizioni contadine, nasce il nostro ristorante tipico Richardus.
        </p>
        <p className="mt-10 text-sm uppercase tracking-[0.2em] text-accent">
          Pasta · Brace · Pizza
        </p>
      </div>
    </main>
  );
}
