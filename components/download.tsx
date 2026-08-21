export default function Download() {
  return (
    <section id="download" className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="section-label mb-6">Coming soon</p>
        <h2 className="display-large text-balance">
          Arriving on iOS and Android.
        </h2>
        <p className="mt-6 max-w-xl text-balance text-[16px] leading-relaxed text-secondary">
          We&apos;re finishing it with care — the kind of care this deserves.
          Follow @deenteachings to be first when we open the doors.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <span className="flex h-12 w-full items-center justify-center rounded-full border border-border bg-elevated px-8 text-[14px] font-semibold text-primary sm:w-auto">
            App Store — soon
          </span>
          <span className="flex h-12 w-full items-center justify-center rounded-full border border-border bg-elevated px-8 text-[14px] font-semibold text-primary sm:w-auto">
            Google Play — soon
          </span>
        </div>
        <a
          href="https://instagram.com/deenteachings"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 text-[15px] font-semibold text-primary underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
        >
          @deenteachings on Instagram
        </a>
      </div>
    </section>
  );
}
