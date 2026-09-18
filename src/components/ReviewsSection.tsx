import ExternalReviews from "./ExternalReviews";

export default function ReviewsSection() {
  return (
    <section
      id="recensioni"
      aria-labelledby="reviews-title"
      className="w-full scroll-mt-28 border-t border-foreground/10 bg-[#eeeae1]"
    >
      <div
        className="mx-auto w-full min-w-0 max-w-7xl px-6 py-16 md:px-10 md:py-24"
        data-reveal
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-accent">
          Le esperienze dei nostri ospiti
        </p>
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
      </div>
    </section>
  );
}
