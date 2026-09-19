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
    "Pasta, brace e pizza da Richardus, in Via San Giovanni 15 a Francavilla Fontana. Scopri piatti e prezzi e prenota il tuo tavolo su WhatsApp o per telefono.",
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
