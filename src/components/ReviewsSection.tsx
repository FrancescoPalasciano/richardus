import ReviewsCarousel from "./ReviewsCarousel";
import { restaurant } from "@/lib/restaurant";

export default function ReviewsSection() {
  return (
    <section id="recensioni" aria-labelledby="reviews-title" className="scroll-mt-28 bg-[#eeeae1]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <h2 id="reviews-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05]">A tavola con voi.</h2>
            <p className="mt-3 text-base">Una selezione delle vostre recensioni su Google.</p>
          </div>
          <a href={restaurant.reviews} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4">Leggi tutte le recensioni</a>
        </div>
        <ReviewsCarousel />
      </div>
    </section>
  );
}
