"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { WHATS_NEW } from "@/components/site/data";

// The four 2.0 additions that have a screen to show, each drawn from the app's code.
const VIEWS = [
  { name: "Meditation", src: "/app/screens/meditation.webp", alt: "The Meditation tab" },
  { name: "Daily Return", src: "/app/screens/return.webp", alt: "Daily Return: We can begin with what is honest today. Find calm, Return to Allah, I have little in me, Stay close" },
  { name: "Today's notes", src: "/app/screens/notes.webp", alt: "Today's notes: the first of three notes, For the heart" },
  { name: "Her Days", src: "/app/screens/herdays.webp", alt: "Her Days: Days when prayer and fasting are lifted by Allah. Nothing about them is a gap." },
];

export default function WhatsNew() {
  const [v, setV] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const view = VIEWS[v];
  const line = WHATS_NEW.find((w) => w.name === view.name);

  function onKey(e: React.KeyboardEvent) {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (v + step + VIEWS.length) % VIEWS.length;
    setV(next);
    btns.current[next]?.focus();
  }

  return (
    <section id="new" className="chapter field-ink" aria-labelledby="new-title">
      <div className="wrap split">
        <div className="split-copy">
          <p className="micro" data-reveal>
            New in 2.0
          </p>
          <h2 id="new-title" className="display display-sm" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            The biggest update
            <span className="accent">since Thābit began.</span>
          </h2>

          <div className="viewer-tabs" role="tablist" aria-label="New in 2.0" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            {VIEWS.map((x, i) => (
              <button
                key={x.name}
                ref={(el) => {
                  btns.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`new-tab-${i}`}
                aria-selected={i === v}
                aria-controls="new-panel"
                tabIndex={i === v ? 0 : -1}
                className="viewer-tab"
                onClick={() => setV(i)}
                onKeyDown={onKey}
              >
                <span className="viewer-n">{String(i + 1).padStart(2, "0")}</span>
                {x.name}
              </button>
            ))}
          </div>
          <p className="body-lg viewer-line" aria-live="polite" key={view.name}>
            <b>{view.name}:</b> {line?.text}
          </p>
        </div>

        <div
          className="split-stage"
          id="new-panel"
          role="tabpanel"
          aria-labelledby={`new-tab-${v}`}
          data-reveal
          style={{ "--d": "110ms" } as React.CSSProperties}
        >
          <div className="phone">
            <div className="phone-glass">
              <Image key={view.src} src={view.src} alt={view.alt} width={660} height={1434} unoptimized className="fade-in" />
              <span className="phone-island" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <ul className="new-list">
          {/* The viewer above already shows its four; the list carries the rest. */}
          {WHATS_NEW.filter((w) => !VIEWS.some((v) => v.name === w.name)).map((w, i) => (
            <li key={w.name} data-reveal style={{ "--d": `${140 + Math.min(i, 6) * 55}ms` } as React.CSSProperties}>
              <span className="new-name">{w.name}</span>
              <span className="new-text">{w.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
