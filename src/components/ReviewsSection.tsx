import ExternalReviews from "./ExternalReviews";
import { restaurant } from "@/lib/restaurant";

export default function ReviewsSection() {
  return (
    <section id="recensioni" aria-labelledby="reviews-title" className="scroll-mt-28 bg-[#eeeae1]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-10 md:py-14">
        <h2 id="reviews-title" className="text-[clamp(2.25rem,4vw,3.5rem)] leading-tight">La parola a chi<br />è stato a tavola.</h2>
        <div>
          <p className="max-w-lg leading-7">Le esperienze dei nostri ospiti, nelle recensioni su Google.</p>
          <a href={restaurant.reviews} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Leggi le recensioni su Google</a>
          <ExternalReviews />
        </div>
      </div>
    </section>
  );
}
