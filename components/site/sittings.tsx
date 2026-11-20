"use client";

import { useRef, useState } from "react";
import { SITTINGS } from "@/components/site/data";

const TABS = [
  { key: "morning", label: "Morning", items: SITTINGS.morning },
  { key: "evening", label: "Evening", items: SITTINGS.evening },
  { key: "hardDays", label: "Hard Days", items: SITTINGS.hardDays },
] as const;

// The Meditation tab's real sittings (data/dailyMeditation.ts, data/hardDays.ts).
export default function Sittings() {
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
      <div className="tabs" role="tablist" aria-label="Sittings">
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
            {x.label}
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
            {title}
          </li>
        ))}
      </ol>
    </div>
  );
}
