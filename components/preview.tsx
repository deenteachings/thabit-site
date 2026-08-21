export default function Preview() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <p className="section-label mb-4">Made for heavy days</p>
          <h2 className="display-large text-balance">
            We open with salam. We never open with a lecture.
          </h2>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-secondary">
            Every screen speaks softly — the way you would to someone you love
            who is hurting. Guided journeys through grief, du&apos;a, and
            Ramadan walk with you, one small step at a time.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            className="w-[280px] rounded-[2.5rem] border border-border bg-elevated p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
            aria-hidden="true"
          >
            <div className="rounded-[2rem] border border-border bg-background px-6 pb-4 pt-6">
              <div className="flex items-center justify-between pb-6">
                <span className="text-[12px] font-semibold tracking-wide text-primary">
                  6:12 AM
                </span>
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>

              <p className="text-[13px] text-secondary">Good morning</p>
              <p className="arabic mt-1 text-[22px] font-bold leading-snug text-primary">
                السلام عليكم
              </p>

              <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                <p className="section-label mb-2">Up next</p>
                <p className="text-[13px] font-semibold text-primary">
                  Morning adhkar
                </p>
                <p className="mt-1 text-[12px] text-tertiary">
                  8 of 12 · take your time
                </p>
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < 8 ? "bg-primary" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-elevated p-4">
                <p className="text-[13px] font-semibold text-primary">
                  Sakinah
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-tertiary">
                  &ldquo;Whatever you&apos;re carrying, we can sit with it
                  together for a while.&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center justify-around border-t border-border pt-4">
                {["Home", "Reflect", "Sakinah", "Solace", "Score"].map(
                  (label, i) => (
                    <span
                      key={label}
                      className={`flex flex-col items-center gap-1 text-[9px] font-medium ${
                        i === 0 ? "text-primary" : "text-quaternary"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          i === 0 ? "bg-primary" : "bg-border"
                        }`}
                      />
                      {label}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
