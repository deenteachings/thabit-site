import BrandMark from "@/components/brand-mark";
import Glyph from "@/components/site/glyph";

// The store description's OUR PROMISE, sentence by sentence, and the
// paywall's own line (app/paywall.tsx). Wording kept as published.
const PROMISES = [
  {
    glyph: "book-open" as const,
    title: "Sources, named",
    text: "Every hadith we cite is graded Sahih, or Hasan for a few athkar, and every source is named; we never use weak or fabricated narrations.",
  },
  {
    glyph: "lock" as const,
    title: "Sealed before it leaves",
    text: "The cloud copy is optional and sealed on your phone first, so we cannot read it.",
  },
  {
    glyph: "shield-check" as const,
    title: "Never sold",
    text: "We never sell your data. Thābit has no ads and no investors.",
  },
  {
    glyph: "heart" as const,
    title: "Not a substitute",
    text: "Thābit is not a substitute for medical or mental-health care. If you are in danger, please contact the emergency services where you are.",
  },
];

export default function Promise() {
  return (
    <section id="promise" className="chapter field-paper" aria-labelledby="promise-title">
      <div className="wrap">
        <p className="micro" data-reveal>
          Our promise
        </p>
        <h2 id="promise-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
          Nothing here
          <span className="accent">lectures you.</span>
        </h2>
        <ul className="promise-grid">
          {PROMISES.map((p, i) => (
            <li key={p.title} data-reveal style={{ "--d": `${140 + i * 55}ms` } as React.CSSProperties}>
              <Glyph name={p.glyph} className="promise-glyph" />
              <span className="promise-title">{p.title}</span>
              <span className="promise-text">{p.text}</span>
            </li>
          ))}
        </ul>

        <figure className="dedication" data-reveal>
          <BrandMark className="dedication-mark" />
          <blockquote>
            Thābit is sadaqah jāriyah for Aisha Yahaya{" "}
            <span className="arabic" lang="ar">
              رحمها الله
            </span>
            , who passed on the first day of Ramadan, fasting, after giving
            sadaqah. Every screen is built in her name.
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
