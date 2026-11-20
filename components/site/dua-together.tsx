"use client";

import { useState } from "react";
import Glyph from "@/components/site/glyph";

// app/duaa-together.tsx (card copy) and data/duaaTogetherSources.ts (the
// hadith), word for word. On the site nothing is sent, so pressing the button
// shows the hadith the feature rests on instead of the app's confirmation.
const HADITH = {
  ar: "دَعْوَةُ الْمَرْءِ الْمُسْلِمِ لِأَخِيهِ بِظَهْرِ الْغَيْبِ مُسْتَجَابَةٌ، عِنْدَ رَأْسِهِ مَلَكٌ مُوَكَّلٌ، كُلَّمَا دَعَا لِأَخِيهِ بِخَيْرٍ قَالَ الْمَلَكُ الْمُوَكَّلُ بِهِ: آمِينَ وَلَكَ بِمِثْلٍ",
  en: "The supplication of a Muslim for his brother in his absence is answered. There is an angel appointed at his head — whenever he makes duā for his brother with good, the angel says: Āmīn, and the same for you.",
  src: "Sahih Muslim 2733",
};

// Store description (DHIKR AND DU'Ā), the app's privacy line, and What's New.
const FACTS = [
  "Your request is shared anonymously with others praying tonight, and it is removed after 48 hours. No name is ever attached to it.",
  "Every request is checked before anyone sees it, any request can be reported, and anyone can be blocked.",
];

export type DuaLabels = {
  today: string;
  title: string;
  body: string;
  button: string;
  hadithEn: string;
  src: string;
  /** Shown only where the site has words for it (English). */
  note?: string;
};

export const DUA_EN: DuaLabels = {
  today: "Today",
  title: "A Muslim needs your du'ā",
  body: "You don't know their name. But your du'ā reaches a waiting heart — and the angel says Āmīn for you too.",
  button: "I made du'ā",
  hadithEn: HADITH.en,
  src: HADITH.src,
  note: "A preview: nothing is sent from this page.",
};

export function DuaCard({ labels: L = DUA_EN }: { labels?: DuaLabels }) {
  const [made, setMade] = useState(false);
  return (
    <div className="dua-card">
      <p className="micro dua-eyebrow">{L.today}</p>
      <p className="dua-title">{L.title}</p>
      <p className="dua-body">{L.body}</p>
      <button
        type="button"
        className="btn btn-ink dua-btn"
        aria-expanded={made}
        aria-controls="dua-hadith"
        onClick={() => setMade(true)}
        disabled={made}
      >
        <Glyph name="heart" className="btn-glyph" />
        {L.button}
      </button>
      <div id="dua-hadith" className="dua-hadith" data-open={made ? "" : undefined} aria-live="polite">
        {made && (
          <>
            <p className="dua-ar" lang="ar" dir="rtl">
              {HADITH.ar}
            </p>
            <p className="dua-en">{L.hadithEn}</p>
            <p className="micro dua-src">{L.src}</p>
          </>
        )}
      </div>
      {L.note && <p className="dua-note">{L.note}</p>}
    </div>
  );
}

export default function DuaTogether() {
  return (
    <section id="dua" className="chapter field-ink" aria-labelledby="dua-title">
      <div className="wrap split">
        <div className="split-copy">
          <p className="micro" data-reveal>
            Du&apos;ā Together
          </p>
          <h2 id="dua-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Make du&apos;ā
            <span className="accent">for others.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            Make du&apos;ā for others. The angel says Āmīn for you too.
            Du&apos;ā Together lets you make du&apos;ā for other Muslims and
            receive theirs.
          </p>
          <ul className="facts" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
            {FACTS.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <DuaCard />
        </div>
      </div>
    </section>
  );
}
