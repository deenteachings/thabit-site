"use client";

import { useState } from "react";
import { PATHS } from "@/components/site/data";

const FREE = PATHS.filter((p) => p.free).length;

// The 19 paths in the app's own order (app/paths.tsx PATH_ORDER).
export default function Paths() {
  const [onlyFree, setOnlyFree] = useState(false);
  const shown = onlyFree ? PATHS.filter((p) => p.free) : PATHS;

  return (
    <section id="paths" className="chapter field-paper" aria-labelledby="paths-title">
      <div className="wrap">
        <div className="paths-head">
          <div>
            <p className="micro" data-reveal>
              Guided programs and journeys
            </p>
            <h2 id="paths-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
              19 paths,
              <span className="accent">one day at a time.</span>
            </h2>
          </div>
          <div data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            <p className="body-lg">
              Guided programs and journeys of 7 to 40 days. Five paths are fully
              free, and day one of every path is free.
            </p>
            <div className="filter" role="radiogroup" aria-label="Show paths">
              <button type="button" role="radio" aria-checked={!onlyFree} className="chip" onClick={() => setOnlyFree(false)}>
                All <span className="chip-n">{PATHS.length}</span>
              </button>
              <button type="button" role="radio" aria-checked={onlyFree} className="chip" onClick={() => setOnlyFree(true)}>
                Fully free <span className="chip-n">{FREE}</span>
              </button>
            </div>
          </div>
        </div>

        <ul className="path-grid" aria-live="polite">
          {shown.map((p, i) => (
            <li key={p.title} className="path" style={{ "--i": i } as React.CSSProperties}>
              <span className="path-days">
                <b>{p.days}</b> days
              </span>
              <span className="path-title">{p.title}</span>
              <span className={`path-tag${p.free ? " is-free" : ""}`}>
                {p.free ? "Free" : "Day one free"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
