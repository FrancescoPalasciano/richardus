import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/surfaces";

export default function LegalPage({
  locale = "it",
  title,
  children,
}: {
  locale?: Locale;
  title: string;
  children: ReactNode;
}) {
  const t = getTranslator(locale);
  return localizeTree(
    <main
      id="contenuto"
      className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8 sm:py-20"
    >
      <Link href="/" className="text-link">
        <ArrowLeft size={16} aria-hidden="true" /> Torna alla home
      </Link>
      <h1 className="mt-8 text-[clamp(2.4rem,6vw,5rem)] leading-tight">
        {title}
      </h1>
      <div className="mt-8 rounded-2xl bg-surface-secondary p-6 text-sm leading-7">
        <Badge accent>Informativa in preparazione</Badge>
        <p className="mt-3">
          I dati del titolare e le informazioni sulla gestione dei dati devono
          essere completati e verificati prima della pubblicazione del sito.
        </p>
      </div>
      <div className="mt-12 space-y-10 text-sm leading-8 [&_a]:break-words [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-4 [&_h2]:text-2xl [&_p+p]:mt-3">
        {children}
      </div>
    </main>,
    locale,
    t,
  );
}
