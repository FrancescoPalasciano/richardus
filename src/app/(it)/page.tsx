import { localizeTree } from "@/lib/localize";
import { getTranslator } from "@/lib/i18n";
import {
  resolveLocale,
  languageAlternates,
  type RouteProps,
} from "@/lib/locale";
import type { Metadata } from "next";
import {
  Hero,
  InfoStrip,
  MenuPreview,
  SignatureDishes,
  BentoGrid,
} from "@/components/HomeSections";
import VisitSection from "@/components/VisitSection";
import ReviewsSection from "@/components/ReviewsSection";
import Reservation from "@/components/Reservation";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: languageAlternates("/") },
  description:
    "Richardus, trattoria storica a Francavilla Fontana: cucina pugliese, pasta e carne alla brace in Via San Giovanni 15. Scopri il menu e prenota il tuo tavolo.",
};

export default async function Home({ params }: RouteProps) {
  const locale = resolveLocale((await params).locale);
  const t = getTranslator(locale);
  return localizeTree(
    <main id="contenuto">
      <Hero locale={locale} />
      <InfoStrip locale={locale} />
      <MenuPreview locale={locale} />
      <SignatureDishes locale={locale} />
      <BentoGrid locale={locale} />
      <VisitSection locale={locale} />
      <ReviewsSection locale={locale} />
      <Reservation locale={locale} />
    </main>,
    locale,
    t,
  );
}
