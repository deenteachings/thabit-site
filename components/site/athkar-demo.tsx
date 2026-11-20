"use client";

import { useEffect, useRef, useState } from "react";
import Glyph from "@/components/site/glyph";
import { ATHKAR_DEMO, MORNING_COUNT } from "@/components/site/data";

/** The app's own words for the athkar screen (app/athkar.tsx keys). */
export type AthkarLabels = {
  morning: string;
  of: string;
  remaining: string; // "{{remaining}} remaining"
  begin: string; // "We begin with gratitude"
  building: string; // "We are building our morning"
  peace: string; // "Peace, one dhikr at a time"
  transliteration: string;
  translation: string;
  source: string;
  tap: string;
  done: string;
  previous: string;
  reset: string;
  /** Meaning and source for items 2 and 3, in the reader's language. */
  items?: { en: string; src: string }[];
};

export const ATHKAR_EN: AthkarLabels = {
  morning: "Morning",
  of: "of",
  remaining: "{{remaining}} remaining",
  begin: "We begin with gratitude",
  building: "We are building our morning",
  peace: "Peace, one dhikr at a time",
  transliteration: "Transliteration",
  translation: "Translation",
  source: "Source",
  tap: "Tap to count",
  done: "Done",
  previous: "Previous",
  reset: "Reset",
};

// Items 2 and 3 of the morning athkar, counted the app's way: one tap adds
// one, the number pulses, and the next item comes 700ms after the count.
// The heading follows app/athkar.tsx by how many items are complete.
export default function AthkarDemo({ labels: L = ATHKAR_EN }: { labels?: AthkarLabels }) {
  const [item, setItem] = useState(0);
  const [counts, setCounts] = useState(() => ATHKAR_DEMO.map(() => 0));
  const [pulse, setPulse] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const a = ATHKAR_DEMO[item];
  const meaning = L.items?.[item]?.en ?? a.en;
  const source = L.items?.[item]?.src ?? a.src;
  const count = counts[item];
  const done = counts.filter((c, i) => c >= ATHKAR_DEMO[i].target).length;
  const heading = done === 0 ? L.begin : done <= 3 ? L.building : L.peace;

  function tap() {
    if (count >= a.target) return;
    const next = count + 1;
    setCounts((cs) => cs.map((c, i) => (i === item ? next : c)));
    setPulse((p) => p + 1);
    navigator.vibrate?.(next === a.target ? 18 : 6);
    if (next === a.target && item < ATHKAR_DEMO.length - 1) {
      timer.current = window.setTimeout(() => setItem((i) => i + 1), 700);
    }
  }

  function reset() {
    window.clearTimeout(timer.current);
    setCounts(ATHKAR_DEMO.map(() => 0));
    setItem(0);
  }

  return (
    <div className="athkar-card">
      <div className="athkar-top">
        <p className="micro">
          {L.morning} <span aria-hidden="true">·</span> {item + 2} {L.of} {MORNING_COUNT}
        </p>
        <p className="athkar-heading">{heading}</p>
        <p className="athkar-remaining">
          {L.remaining.replace("{{remaining}}", String(MORNING_COUNT - done))}
        </p>
      </div>

      <div className="athkar-body" key={item}>
        <p className="athkar-ar" lang="ar" dir="rtl">
          {a.ar}
        </p>
        <p className="micro athkar-label">{L.transliteration}</p>
        <p className="athkar-tr" dir="ltr">
          {a.tr}
        </p>
        <p className="micro athkar-label">{L.translation}</p>
        <p className="athkar-en">{meaning}</p>
        <p className="micro athkar-label">{L.source}</p>
        <p className="athkar-src">{source}</p>
      </div>

      <div className="athkar-counter">
        <button
          type="button"
          className="athkar-nav"
          aria-label={L.previous}
          disabled={item === 0}
          onClick={() => setItem((i) => Math.max(0, i - 1))}
        >
          <Glyph name="caret-left" className="flip-rtl" />
        </button>
        <button
          type="button"
          className="athkar-tap"
          onClick={tap}
          aria-label={`${L.tap}: ${count} / ${a.target}`}
          disabled={count >= a.target}
        >
          <span className="athkar-num" key={pulse} data-pulse={pulse > 0 ? "" : undefined}>
            {count}
          </span>
          <span className="athkar-of">/ {a.target}</span>
          <span className="athkar-hint">{count >= a.target ? L.done : L.tap}</span>
        </button>
        <button type="button" className="athkar-nav" aria-label={L.reset} onClick={reset}>
          <Glyph name="arrow-clockwise" />
        </button>
      </div>
      <div className="athkar-rule" aria-hidden="true">
        <span style={{ transform: `scaleX(${count / a.target})` }} />
      </div>
    </div>
  );
}
