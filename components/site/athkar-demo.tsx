"use client";

import { useEffect, useRef, useState } from "react";
import Glyph from "@/components/site/glyph";
import { ATHKAR_DEMO, MORNING_COUNT } from "@/components/site/data";

// app/athkar.tsx encouragement, by how many items are complete.
function heading(done: number): string {
  if (done === 0) return "We begin with gratitude";
  if (done <= 3) return "We are building our morning";
  return "Peace, one dhikr at a time";
}

// Items 2 and 3 of the morning athkar, counted the app's way: one tap adds
// one, the number pulses, and the next item comes 700ms after the count.
export default function AthkarDemo() {
  const [item, setItem] = useState(0);
  const [counts, setCounts] = useState(() => ATHKAR_DEMO.map(() => 0));
  const [pulse, setPulse] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const a = ATHKAR_DEMO[item];
  const count = counts[item];
  const done = counts.filter((c, i) => c >= ATHKAR_DEMO[i].target).length;
  const finished = done === ATHKAR_DEMO.length;

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
          Morning <span aria-hidden="true">·</span> {item + 2} of {MORNING_COUNT}
        </p>
        <p className="athkar-heading">{finished ? "Two of eighteen, done" : heading(done)}</p>
        <p className="athkar-remaining">
          {finished ? "The other sixteen are in the app." : `${MORNING_COUNT - done} remaining`}
        </p>
      </div>

      <div className="athkar-body" key={item}>
        <p className="athkar-ar" lang="ar" dir="rtl">
          {a.ar}
        </p>
        <p className="micro athkar-label">Transliteration</p>
        <p className="athkar-tr">{a.tr}</p>
        <p className="micro athkar-label">Translation</p>
        <p className="athkar-en">{a.en}</p>
        <p className="micro athkar-label">Source</p>
        <p className="athkar-src">{a.src}</p>
      </div>

      <div className="athkar-counter">
        <button
          type="button"
          className="athkar-nav"
          aria-label="Previous"
          disabled={item === 0}
          onClick={() => setItem((i) => Math.max(0, i - 1))}
        >
          <Glyph name="caret-left" />
        </button>
        <button
          type="button"
          className="athkar-tap"
          onClick={tap}
          aria-label={`Count. ${count} of ${a.target}`}
          disabled={count >= a.target}
        >
          <span className="athkar-num" key={pulse} data-pulse={pulse > 0 ? "" : undefined}>
            {count}
          </span>
          <span className="athkar-of">/ {a.target}</span>
          <span className="athkar-hint">{count >= a.target ? "Complete" : "Tap to count"}</span>
        </button>
        <button type="button" className="athkar-nav" aria-label="Reset" onClick={reset}>
          <Glyph name="arrow-clockwise" />
        </button>
      </div>
      <div className="athkar-rule" aria-hidden="true">
        <span style={{ transform: `scaleX(${count / a.target})` }} />
      </div>
    </div>
  );
}
