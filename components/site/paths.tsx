"use client";

import { useState } from "react";
import { PATHS } from "@/components/site/data";

const FREE = PATHS.filter((p) => p.free).length;

export type PathsLabels = {
  all: string;
  onlyFree: string;
  freeTag: string;
  /** Tag for the paths that are not fully free; English only. */
  dayOneTag?: string;
  /** Path titles by English title, in the reader's language. */
  titles?: Record<string, string>;
  /** countPhrase "days:7" and so on; English draws "7 days". */
  days?: Record<string, string>;
};

export const PATHS_EN: PathsLabels = {
  all: "All",
  onlyFree: "Fully free",
  freeTag: "Free",
  dayOneTag: "Day one free",
};

// "7 days", "14 يومًا", "7 gün": the number bold, the word beside it.
function Days({ text }: { text: string }) {
  const m = text.match(/^(\d+)\s*(.*)$/);
  return (
    <span className="path-days">
      {m ? (
        <>
          <b>{m[1]}</b> {m[2]}
        </>
      ) : (
        text
      )}
    </span>
  );
}

// The 19 paths in the app's own order (app/paths.tsx PATH_ORDER).
export function PathsGrid({ labels: L = PATHS_EN }: { labels?: PathsLabels }) {
  const [onlyFree, setOnlyFree] = useState(false);
  const shown = onlyFree ? PATHS.filter((p) => p.free) : PATHS;
  return (
    <>
      <div className="filter" role="radiogroup" aria-label={L.all}>
        <button type="button" role="radio" aria-checked={!onlyFree} className="chip" onClick={() => setOnlyFree(false)}>
          {L.all} <span className="chip-n">{PATHS.length}</span>
        </button>
        <button type="button" role="radio" aria-checked={onlyFree} className="chip" onClick={() => setOnlyFree(true)}>
          {L.onlyFree} <span className="chip-n">{FREE}</span>
        </button>
      </div>
      <ul className="path-grid" aria-live="polite">
        {shown.map((p, i) => {
          const tag = p.free ? L.freeTag : L.dayOneTag;
          return (
            <li key={p.title} className="path" style={{ "--i": i } as React.CSSProperties}>
              <Days text={L.days?.[`days:${p.days}`] ?? `${p.days} days`} />
              <span className="path-title">{L.titles?.[p.title] ?? p.title}</span>
              {tag && <span className={`path-tag${p.free ? " is-free" : ""}`}>{tag}</span>}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function Paths() {
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
          </div>
        </div>
        <PathsGrid />
      </div>
    </section>
  );
}
