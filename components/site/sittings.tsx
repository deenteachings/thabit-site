"use client";

import { useRef, useState } from "react";
import { SITTINGS } from "@/components/site/data";

const TABS = [
  { key: "morning", items: SITTINGS.morning },
  { key: "evening", items: SITTINGS.evening },
  { key: "hardDays", items: SITTINGS.hardDays },
] as const;

export type SittingsLabels = {
  /** What the tab list is called (for screen readers). */
  name: string;
  tabs: Record<(typeof TABS)[number]["key"], string>;
  /** Sitting titles by English title, in the reader's language. */
  titles?: Record<string, string>;
};

export const SITTINGS_EN: SittingsLabels = {
  name: "Sittings",
  tabs: { morning: "Morning", evening: "Evening", hardDays: "Hard Days" },
};

// The Meditation tab's real sittings (data/dailyMeditation.ts, data/hardDays.ts).
export default function Sittings({ labels: L = SITTINGS_EN }: { labels?: SittingsLabels }) {
  const [tab, setTab] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (tab + step + TABS.length) % TABS.length;
    setTab(next);
    btns.current[next]?.focus();
  }

  const t = TABS[tab];
  return (
    <div className="sittings">
      <div className="tabs" role="tablist" aria-label={L.name}>
        {TABS.map((x, i) => (
          <button
            key={x.key}
            ref={(el) => {
              btns.current[i] = el;
            }}
            id={`sit-tab-${x.key}`}
            type="button"
            role="tab"
            aria-selected={i === tab}
            aria-controls="sit-panel"
            tabIndex={i === tab ? 0 : -1}
            className="tab"
            onClick={() => setTab(i)}
            onKeyDown={onKey}
          >
            {L.tabs[x.key]}
            <span className="tab-count">{x.items.length}</span>
          </button>
        ))}
      </div>
      <ol
        id="sit-panel"
        role="tabpanel"
        aria-labelledby={`sit-tab-${t.key}`}
        className="sitting-list"
        key={t.key}
      >
        {t.items.map((title, i) => (
          <li key={title} style={{ "--i": i } as React.CSSProperties}>
            <span className="sitting-n">{String(i + 1).padStart(2, "0")}</span>
            {L.titles?.[title] ?? title}
          </li>
        ))}
      </ol>
    </div>
  );
}
