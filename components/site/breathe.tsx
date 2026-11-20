import BreatheDemo from "@/components/site/breathe-demo";

// An immersive chapter: the copy centred above the app's breathing screen,
// and a halo behind it that swells and settles with the session's breath.
export default function Breathe() {
  return (
    <section id="breathe" className="chapter field-lit breathe-chapter" aria-labelledby="breathe-title">
      <div className="breathe-halo" aria-hidden="true" />
      <div className="wrap center-copy">
        <p className="micro" data-reveal>
          Breathing paced to dhikr
        </p>
        <h2 id="breathe-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
          Breathe,
          <span className="accent">be still.</span>
        </h2>
        <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          Try it here. These are the app&apos;s three patterns at the app&apos;s
          own pace, each one paired with a dhikr. Press begin, and this whole
          page breathes with you.
        </p>
      </div>
      <div className="wrap breathe-stage" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
        <BreatheDemo />
      </div>
    </section>
  );
}
