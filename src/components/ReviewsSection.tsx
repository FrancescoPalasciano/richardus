import ExternalReviews from "./ExternalReviews";

export default function ReviewsSection() {
  return (
    <section
      id="recensioni"
      aria-labelledby="reviews-title"
      className="mx-auto w-full min-w-0 max-w-7xl scroll-mt-28 px-6 pb-16 md:px-10 md:pb-28"
    >
      <h2
        id="reviews-title"
        className="mb-8 text-[clamp(2.5rem,4.5vw,4.5rem)] leading-tight"
      >
        Le vostre parole
      </h2>
      <ExternalReviews />
      <a
        href="https://share.google/mfaCnrlgZuCyMWie5"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Leggi tutte le recensioni su Google
      </a>
    </section>
  );
}
