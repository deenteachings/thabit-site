import AthkarDemo from "@/components/site/athkar-demo";

export default function Athkar() {
  return (
    <section id="athkar" className="chapter field-paper" aria-labelledby="athkar-title">
      <div className="wrap split split-flip">
        <div className="split-copy">
          <p className="micro" data-reveal>
            Morning and evening athkar
          </p>
          <h2 id="athkar-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Dawn &amp;
            <span className="accent">dusk.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            32 athkar, 18 for the morning and 14 for the evening, each with its
            Arabic, transliteration, meaning and source. A soft counter keeps
            your place and a gentle streak brings you back.
          </p>
          <p className="body" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
            Every hadith we cite is graded Sahih, or Hasan for a few athkar, and
            every source is named. Tap the counter to try two of them.
          </p>
        </div>
        <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <AthkarDemo />
        </div>
      </div>
    </section>
  );
}
