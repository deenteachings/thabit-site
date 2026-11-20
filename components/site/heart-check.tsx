"use client";

import { useRef, useState } from "react";
import { HEART_QUESTION, MOOD_STEPS } from "@/components/site/data";

// The five mouths from the app (services/moodFaceGeometry.ts), deepest frown
// to widest smile, in a 24 box with a 1.9 stroke.
const MOUTHS = [
  "M7 15 Q12 9 17 15",
  "M7 15 Q12 11.4 17 15",
  "M7 15 L17 15",
  "M7 15 Q12 18.6 17 15",
  "M7 15 Q12 21 17 15",
];

// MoodStrip.tsx moodTone, light mode: Heavy and Low take the Space's deep
// stop, Steady its mid, Light and Very light its lit stop. Dark mode draws
// every mouth in the Space's dark accent (handled in site.css).
const TONE = ["deep", "deep", "mid", "lit", "lit"] as const;

const FONT: Record<string, string | undefined> = {
  ar: "var(--font-naskh)",
  ur: "var(--font-nastaliq)",
};

export default function HeartCheck() {
  const [lang, setLang] = useState(0);
  const [tier, setTier] = useState<number | null>(null);
  const faces = useRef<(HTMLButtonElement | null)[]>([]);
  const q = HEART_QUESTION[lang];

  // Radio-group keys: arrows move and select, as a native radio set does.
  function onKey(e: React.KeyboardEvent, i: number) {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + MOOD_STEPS.length) % MOOD_STEPS.length;
    setTier(MOOD_STEPS[next].tier);
    faces.current[next]?.focus();
  }

  // services/homeRank.ts demandCeiling: the tier caps how much a suggestion
  // may ask; at 2 or below (the heavy band) there is no discovery tile.
  const heavy = tier !== null && tier <= 2;

  return (
    <section id="heart" className="chapter field-paper" aria-labelledby="heart-title">
      <div className="wrap heart">
        <div className="heart-copy">
          <p className="micro" data-reveal>
            First, it asks
          </p>
          <h2 id="heart-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            One question,
            <span className="accent">every day.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            Every day, Home asks how the heart is. Tap a face and the screen
            beneath reorders around the answer. The words are the app&apos;s
            own, in all seven of its languages.
          </p>
        </div>

        <div className="heart-card" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
          <div className="lang-tabs" role="tablist" aria-label="Language">
            {HEART_QUESTION.map((l, i) => (
              <button
                key={l.code}
                type="button"
                role="tab"
                aria-selected={i === lang}
                lang={l.code}
                className="lang-tab"
                onClick={() => setLang(i)}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          <p
            key={q.code}
            className="heart-question"
            lang={q.code}
            dir={q.dir}
            style={{ fontFamily: FONT[q.code] }}
            aria-live="polite"
          >
            {q.text}
          </p>
          <p className="micro heart-lang">{q.name}</p>

          <div className="mood-strip" role="radiogroup" aria-label="How is your heart?">
            {MOOD_STEPS.map((m, i) => {
              const on = tier === m.tier;
              return (
                <button
                  key={m.tier}
                  ref={(el) => {
                    faces.current[i] = el;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={on || (tier === null && i === 0) ? 0 : -1}
                  className="mood"
                  data-tone={TONE[i]}
                  onClick={() => setTier(m.tier)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="mood-face">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={MOUTHS[i]} />
                    </svg>
                  </span>
                  <span className="mood-label">{m.label}</span>
                </button>
              );
            })}
          </div>

          <p className="heart-answer" aria-live="polite">
            {tier === null
              ? "Choose one. Nothing is saved here."
              : heavy
                ? "On a heavy answer, Home asks less of you: only the gentlest things stay, and nothing new is suggested."
                : "Home reorders around the answer. The lighter the heart, the more it offers."}
          </p>
        </div>
      </div>
    </section>
  );
}
