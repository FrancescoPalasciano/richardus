import ReviewsCarousel from "./ReviewsCarousel";
import { restaurant } from "@/lib/restaurant";

export default function ReviewsSection() {
  return (
    <section id="recensioni" aria-labelledby="reviews-title" className="scroll-mt-28 bg-[#eeeae1]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[.85fr_1.15fr] md:gap-20 md:px-10 md:py-20">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[.12em] text-accent">Le voci degli ospiti</p>
          <h2 id="reviews-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05]">La parola a chi<br />è stato a tavola.</h2>
          <p className="mt-5 max-w-xs text-sm leading-6">Una selezione dalle recensioni dei nostri ospiti su Google.</p>
          <a href={restaurant.reviews} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4">Leggi tutte le recensioni</a>
        </div>
        <ReviewsCarousel />
      </div>
    </section>
  );
}
