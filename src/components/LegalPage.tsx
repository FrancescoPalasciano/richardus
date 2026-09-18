import type { ReactNode } from "react";
import Link from "next/link";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main id="contenuto" className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-10 sm:py-20">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-sm underline underline-offset-4"
      >
        Torna alla home
      </Link>
      <h1 className="mt-6 text-[clamp(3rem,6vw,5rem)] leading-tight">
        {title}
      </h1>
      <p className="mt-6 border-l-2 border-accent pl-4 text-sm leading-7">
        Informativa in preparazione. I dati del titolare e le informazioni sulla
        gestione dei dati devono essere completati e verificati prima della
        pubblicazione del sito.
      </p>
      <div className="mt-10 space-y-10 leading-8 [&_h2]:mb-3 [&_h2]:text-3xl [&_p+p]:mt-3 [&_a]:underline [&_a]:underline-offset-4 [&_a]:break-words [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4">
        {children}
      </div>
    </main>
  );
}
