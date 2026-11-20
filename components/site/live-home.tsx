"use client";

import { useEffect, useRef, useState } from "react";
import { HOME_SCREEN_HTML } from "@/components/site/home-screen-markup";
import "./home-screen.css";

// What Home does after a face is tapped, per the app's ranking (the fragment's
// NOTES.md, from home.tsx chooseMood and services/homeSlots.ts).
const AFTER: Record<string, string> = {
  "1": "Heavy: Home keeps the gentlest things. No tiles, nothing new.",
  "2": "Low: of the tiles, only The Floor stays.",
  "3": "Steady: The Floor, Dhikr, Gratitude and one thing new to you.",
  "4": "Light: The Floor, Dhikr, Gratitude and one thing new to you.",
  "5": "Very light: The Floor, Dhikr, Gratitude and one thing new to you.",
};

// The 2.0 home screen, live: the faces re-rank Home the way the app does,
// and on a desktop pointer the screen scrolls inside the phone.
export default function LiveHome() {
  const host = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<string | null>(null);

  useEffect(() => {
    const root = host.current?.querySelector<HTMLElement>(".fx-home");
    if (!root) return;
    const faces = [...root.querySelectorAll<HTMLButtonElement>("button[data-tier]")];
    const choose = (b: HTMLButtonElement, focus = false) => {
      const t = b.dataset.tier!;
      root.dataset.mood = t;
      faces.forEach((f) => {
        const on = f === b;
        f.setAttribute("aria-checked", String(on));
        f.tabIndex = on ? 0 : -1;
      });
      if (focus) b.focus();
      setTier(t);
    };
    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-tier]");
      if (b) choose(b);
    };
    const onKey = (e: KeyboardEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-tier]");
      if (!b) return;
      const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const i = faces.indexOf(b);
      choose(faces[(i + step + faces.length) % faces.length], true);
    };
    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <figure className="live-home">
      <div className="phone hero-phone">
        <div
          className="phone-glass live-home-glass"
          ref={host}
          role="group"
          aria-label="The Thābit 2.0 home screen"
          dangerouslySetInnerHTML={{ __html: HOME_SCREEN_HTML }}
        />
        <span className="phone-island live-island" aria-hidden="true" />
      </div>
      <figcaption className="live-home-caption" aria-live="polite">
        {tier
          ? AFTER[tier]
          : "Try it: tap a face under “How is your heart?”"}
      </figcaption>
    </figure>
  );
}
