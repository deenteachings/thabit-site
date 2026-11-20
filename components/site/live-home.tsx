"use client";

import { useEffect, useRef, useState } from "react";
import "./home-screen.css";

type State = { html: string; caption: string };
type Window = "morning" | "afternoon" | "evening" | "night" | "midnight";

// One module per time window, so a visitor downloads only the one they are in.
const LOADERS: Record<Window, () => Promise<{ default: State[] }>> = {
  morning: () => import("./home-screens/morning"),
  afternoon: () => import("./home-screens/afternoon"),
  evening: () => import("./home-screens/evening"),
  night: () => import("./home-screens/night"),
  midnight: () => import("./home-screens/midnight"),
};

// The app's windows (services/windows.ts): 05-12, 12-16, 16-20, 20-24, 00-05.
function windowFor(hour: number): Window {
  if (hour < 5) return "midnight";
  if (hour < 12) return "morning";
  if (hour < 16) return "afternoon";
  if (hour < 20) return "evening";
  return "night";
}

// The 2.0 home screen, live. The server sends the morning screen; in the
// browser the visitor's own time of day replaces it, and each face shows Home
// exactly as the app ranks it for that window and that answer.
export default function LiveHome({ initial }: { initial: State }) {
  const host = useRef<HTMLDivElement>(null);
  const [states, setStates] = useState<State[] | null>(null);
  const [tier, setTier] = useState(0);
  const refocus = useRef(false);

  useEffect(() => {
    let live = true;
    LOADERS[windowFor(new Date().getHours())]().then((m) => {
      if (live) setStates(m.default);
    });
    return () => {
      live = false;
    };
  }, []);

  const state = states ? states[tier] : initial;

  // Keep the scroll and the keyboard where they were when a tap swaps the screen.
  const scrollTop = useRef(0);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const scroller = el.querySelector<HTMLElement>(".fx-home-scroll");
    if (scroller) scroller.scrollTop = scrollTop.current;
    if (refocus.current) {
      el.querySelector<HTMLButtonElement>(`button[data-tier="${tier || 1}"]`)?.focus();
      refocus.current = false;
    }
  }, [state, tier]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const pick = (t: number, focus: boolean) => {
      scrollTop.current = el.querySelector<HTMLElement>(".fx-home-scroll")?.scrollTop ?? 0;
      refocus.current = focus;
      setTier(t);
    };
    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-tier]");
      if (b) pick(Number(b.dataset.tier), document.activeElement === b);
    };
    const onKey = (e: KeyboardEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-tier]");
      if (!b) return;
      const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      pick(((Number(b.dataset.tier) - 1 + step + 5) % 5) + 1, true);
    };
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("keydown", onKey);
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
          dangerouslySetInnerHTML={{ __html: state.html }}
        />
        <span className="phone-island live-island" aria-hidden="true" />
      </div>
      <figcaption className="live-home-caption" aria-live="polite">
        {state.caption}
      </figcaption>
    </figure>
  );
}
