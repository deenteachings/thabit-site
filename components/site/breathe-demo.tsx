"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Glyph from "@/components/site/glyph";
import { BREATH_CYCLES, BREATH_PATTERNS, type BreathPattern } from "@/components/site/data";

type Phase = { key: "inhale" | "hold1" | "exhale" | "hold2"; secs: number };

/** The app's own words for the breathing screen (app/breathing.tsx keys). */
export type BreatheLabels = {
  title: string;
  patterns: Record<"calm" | "rest" | "focus", string>;
  phases: Record<Phase["key"], string>;
  caption: Record<Phase["key"], string>;
  phaseOf: string; // "PHASE {n} OF {total}"
  ofSpace: string;
  firstRun: string;
  perCycle: string;
  begin: string;
  pause: string;
  cont: string;
  /** countPhrase output: "sec:4", "breaths:3". */
  counts: Record<string, string>;
};

const SECS = [2, 4, 6, 7, 8, 16, 19];
export const BREATHE_EN: BreatheLabels = {
  title: "Breathing",
  patterns: { calm: "Calm", rest: "Rest", focus: "Focus" },
  phases: { inhale: "Inhale", hold1: "Hold", exhale: "Exhale", hold2: "Rest" },
  caption: { inhale: "IN", hold1: "HOLD", exhale: "OUT", hold2: "REST" },
  phaseOf: "PHASE {n} OF {total}",
  ofSpace: "of space",
  firstRun: "Three slow breaths, under a minute. You can stop whenever you need.",
  perCycle: "Per cycle",
  begin: "Begin session",
  pause: "Pause",
  cont: "Continue",
  counts: { ...Object.fromEntries(SECS.map((n) => [`sec:${n}`, `${n} sec`])), "breaths:3": "3 breaths" },
};

// app/breathing.tsx: inhale, hold, exhale, rest; a zero phase is skipped.
function phasesOf(p: BreathPattern): Phase[] {
  const all: Phase[] = [
    { key: "inhale", secs: p.inhale },
    { key: "hold1", secs: p.hold1 },
    { key: "exhale", secs: p.exhale },
    { key: "hold2", secs: p.hold2 },
  ];
  return all.filter((ph) => ph.secs > 0);
}

// components/breathCurve.ts: easeInOutSine fullness; the orb runs 0.68 to 1.
const ease = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * x);
function fullness(ph: Phase, x: number): number {
  if (ph.key === "inhale") return ease(x);
  if (ph.key === "hold1") return 1;
  if (ph.key === "exhale") return 1 - ease(x);
  return 0;
}

const clock = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

type Status = "idle" | "running" | "paused" | "done";

export default function BreatheDemo({ labels: L = BREATHE_EN }: { labels?: BreatheLabels }) {
  const [pi, setPi] = useState(0);
  const pattern = BREATH_PATTERNS[pi];
  const phases = useMemo(() => phasesOf(pattern), [pattern]);
  const cycleMs = phases.reduce((a, p) => a + p.secs, 0) * 1000;

  const [status, setStatus] = useState<Status>("idle");
  const [view, setView] = useState({ phase: 0, left: phases[0].secs, cycles: 0, elapsed: 0 });

  const orb = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);
  const last = useRef<number | null>(null);
  const raf = useRef(0);
  const still = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    still.current = mq.matches;
    const on = () => (still.current = mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const paint = useCallback(
    (ms: number) => {
      const cycles = Math.floor(ms / cycleMs);
      const t = (ms % cycleMs) / 1000;
      let acc = 0;
      let idx = 0;
      for (let i = 0; i < phases.length; i++) {
        if (t < acc + phases[i].secs) {
          idx = i;
          break;
        }
        acc += phases[i].secs;
      }
      const ph = phases[idx];
      const x = (t - acc) / ph.secs;
      const f = fullness(ph, x);
      const scale = still.current ? 0.86 : 0.68 + f * 0.32;
      if (orb.current) {
        orb.current.style.transform = `scale(${scale})`;
        // The chapter's halo breathes with the same curve.
        if (!still.current) orb.current.closest("section")?.style.setProperty("--breath", f.toFixed(3));
      }
      if (bar.current) bar.current.style.transform = `scaleX(${(ms % cycleMs) / cycleMs})`;
      const left = Math.max(1, Math.ceil(ph.secs - (t - acc)));
      setView((v) =>
        v.phase === idx && v.left === left && v.cycles === cycles && Math.floor(v.elapsed / 1000) === Math.floor(ms / 1000)
          ? v
          : { phase: idx, left, cycles, elapsed: ms },
      );
    },
    [cycleMs, phases],
  );

  // The frame loop lives inside the effect so it can schedule itself.
  useEffect(() => {
    if (status !== "running") return;
    last.current = null;
    const total = cycleMs * BREATH_CYCLES;
    const frame = (now: number) => {
      if (last.current !== null) elapsed.current += now - last.current;
      last.current = now;
      if (elapsed.current >= total) {
        elapsed.current = total;
        setStatus("done");
        setView((v) => ({ ...v, cycles: BREATH_CYCLES, elapsed: total }));
        if (orb.current) orb.current.style.transform = `scale(${still.current ? 0.86 : 0.68})`;
        if (bar.current) bar.current.style.transform = "scaleX(1)";
        return;
      }
      paint(elapsed.current);
      raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf.current);
  }, [status, cycleMs, paint]);

  // A hidden tab pauses the session rather than racing ahead.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden) setStatus((s) => (s === "running" ? "paused" : s));
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  function reset(next = pi) {
    cancelAnimationFrame(raf.current);
    orb.current?.closest("section")?.style.removeProperty("--breath");
    elapsed.current = 0;
    last.current = null;
    const ph = phasesOf(BREATH_PATTERNS[next]);
    setView({ phase: 0, left: ph[0].secs, cycles: 0, elapsed: 0 });
    if (orb.current) orb.current.style.transform = `scale(${still.current ? 0.86 : 0.68})`;
    if (bar.current) bar.current.style.transform = "scaleX(0)";
  }

  function choose(i: number) {
    setPi(i);
    setStatus("idle");
    reset(i);
  }

  function main() {
    if (status === "running") setStatus("paused");
    else if (status === "paused") setStatus("running");
    else {
      reset();
      setStatus("running");
    }
  }

  const ph = phases[view.phase];
  const active = status === "running" || status === "paused";
  const inBreath = ph.key === "inhale" || ph.key === "hold1";
  // The app's idle caption: "IN 4 sec · HOLD 4 sec · OUT 6 sec · REST 2 sec".
  const caption = phases.map((p) => `${L.caption[p.key]} ${L.counts[`sec:${p.secs}`]}`).join(" · ");
  const phaseOf = L.phaseOf.replace("{n}", String(view.phase + 1)).replace("{total}", String(phases.length));

  return (
    <div className="breathe-card">
      <div className="breathe-head">
        <span className="breathe-title">{L.title}</span>
        <span className="breathe-sub">
          {view.cycles} / {L.counts[`breaths:${BREATH_CYCLES}`]}
        </span>
      </div>

      <div className="breathe-patterns" role="radiogroup" aria-label={L.title}>
        {BREATH_PATTERNS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={i === pi}
            className="chip"
            onClick={() => choose(i)}
          >
            {L.patterns[p.id]}
          </button>
        ))}
      </div>

      <div className="breathe-phase" aria-live="polite">
        {active ? (
          <>
            <span className="micro">{phaseOf}</span>
            <span className="breathe-word">{L.phases[ph.key]}</span>
          </>
        ) : (
          <>
            <span className="micro">{caption}</span>
            <span className="breathe-word">{L.patterns[pattern.id]}</span>
          </>
        )}
        <span className="breathe-dhikr" lang="ar" dir="rtl">
          {inBreath || !active ? pattern.dIn : pattern.dOut}
        </span>
        <span className="breathe-tr">{inBreath || !active ? pattern.dInEn : pattern.dOutEn}</span>
      </div>

      <div className="breathe-orb-wrap">
        <div className="breathe-orb" ref={orb}>
          <span className="breathe-count">
            {active ? view.left : status === "done" ? BREATH_CYCLES : `~${L.counts[`sec:${cycleMs / 1000}`]}`}
          </span>
          <span className="breathe-count-label">
            {active ? L.phases[ph.key] : status === "done" ? L.counts[`breaths:${BREATH_CYCLES}`] : L.perCycle}
          </span>
        </div>
      </div>

      <div className="breathe-progress" aria-hidden="true">
        <span ref={bar} />
      </div>
      <p className="breathe-space">
        {active || status === "done"
          ? `${clock(view.elapsed)} ${L.ofSpace}`
          : L.firstRun}
      </p>

      <button type="button" className="btn btn-ink breathe-cta" onClick={main}>
        {status === "running" ? (
          <>
            <Glyph name="pause" className="btn-glyph" /> {L.pause}
          </>
        ) : status === "paused" ? (
          <>
            <Glyph name="play" className="btn-glyph" /> {L.cont}
          </>
        ) : (
          <>
            <Glyph name="play" className="btn-glyph" /> {L.begin}
          </>
        )}
      </button>
    </div>
  );
}
