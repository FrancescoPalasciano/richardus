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
  description:
    "Richardus, trattoria storica a Francavilla Fontana: cucina pugliese, pasta e carne alla brace in Via San Giovanni 15. Scopri il menu e prenota il tuo tavolo.",
};

export default function Home() {
  return (
    <main id="contenuto">
      <Hero />
      <InfoStrip />
      <MenuPreview />
      <SignatureDishes />
      <BentoGrid />
      <VisitSection />
      <ReviewsSection />
      <Reservation />
    </main>
  );
}
