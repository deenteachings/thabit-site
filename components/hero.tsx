export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-24 text-center sm:pt-32">
        <p className="arabic mb-6 text-3xl font-bold text-primary sm:text-4xl">
          ثابت
        </p>
        <p className="section-label mb-6">
          From the team behind @deenteachings
        </p>
        <h1 className="display-huge mx-auto max-w-4xl text-balance">
          Feel held by Allah, not lectured at.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-balance text-[17px] leading-relaxed text-secondary">
          Thābit is a gentle emotional healing companion — quiet adhkar, a
          listening presence, and small daily practices rooted in authentic
          sources. For the days when your heart feels too heavy to pray, we
          built something to sit beside you.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#download"
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-8 text-[15px] font-semibold text-primary-text transition-opacity hover:opacity-80 sm:w-auto"
          >
            Get the app
          </a>
          <a
            href="#inside"
            className="flex h-12 w-full items-center justify-center rounded-full border border-border bg-elevated px-8 text-[15px] font-semibold text-primary transition-colors hover:border-primary sm:w-auto"
          >
            See what&apos;s inside
          </a>
        </div>
      </div>
    </section>
  );
}
