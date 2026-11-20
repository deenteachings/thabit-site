import BreatheDemo from "@/components/site/breathe-demo";

export default function Breathe() {
  return (
    <section id="breathe" className="chapter field-lit" aria-labelledby="breathe-title">
      <div className="wrap split split-flip">
        <div className="split-copy">
          <p className="micro" data-reveal>
            Breathing paced to dhikr
          </p>
          <h2 id="breathe-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Breathe,
            <span className="accent">be still.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            Try it here. These are the app&apos;s three patterns at the
            app&apos;s own pace, each one paired with a dhikr: Calm, Rest and
            Focus. The circle fills as you breathe in and empties as you
            breathe out.
          </p>
        </div>
        <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <BreatheDemo />
        </div>
      </div>
    </section>
  );
}
