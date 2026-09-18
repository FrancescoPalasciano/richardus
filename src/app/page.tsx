export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">
        Ristorante
      </p>
      <h1 className="mt-6 font-serif text-6xl tracking-tight sm:text-8xl">
        Richardus
      </h1>
      <div aria-hidden="true" className="my-10 h-px w-16 bg-accent" />
      <p className="max-w-sm text-base leading-7 text-foreground/75 sm:text-lg">
        Il nostro nuovo sito sta prendendo forma.
        <br />
        Presto saremo qui per accogliervi.
      </p>
    </main>
  );
}
