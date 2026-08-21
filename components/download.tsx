export default function Download() {
  return (
    <section id="download" className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="section-label mb-6">Coming soon</p>
        <h2 className="display-medium text-balance">
          Arriving on iOS and Android.
        </h2>
        <p className="mt-6 max-w-xl text-balance text-[16px] leading-6 text-secondary">
          We&apos;re finishing it with care — the kind of care this deserves.
          Follow @deenteachings to be first when we open the doors.
        </p>
        <div className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <span className="btn-pill btn-outline w-full sm:w-auto">
            App Store — soon
          </span>
          <span className="btn-pill btn-outline w-full sm:w-auto">
            Google Play — soon
          </span>
        </div>
        <a
          href="https://instagram.com/deenteachings"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill btn-solid mt-12"
        >
          @deenteachings on Instagram
        </a>
      </div>
    </section>
  );
}
