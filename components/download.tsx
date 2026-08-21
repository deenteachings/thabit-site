import StoreBadges from "@/components/store-badges";

export default function Download() {
  return (
    <section id="download" className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="section-label mb-6">Get Thābit</p>
        <h2 className="display-medium text-balance">
          Free. Quiet. Yours.
        </h2>
        <p className="mt-6 max-w-xl text-balance text-[16px] leading-6 text-secondary">
          Download from the App Store or Google Play — and may it bring you the
          stillness your heart has been asking for.
        </p>
        <StoreBadges className="mt-10" />
        <p className="mt-12 text-[13px] text-tertiary">
          From the team behind{" "}
          <a
            href="https://instagram.com/deenteachings"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-secondary underline decoration-border underline-offset-4 transition-colors hover:text-primary"
          >
            @deenteachings
          </a>
          . Made with intention. Sahih sources only.
        </p>
      </div>
    </section>
  );
}
