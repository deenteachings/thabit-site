"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SPACES } from "@/components/site/data";

// Your Space: the six palettes from data/spaces.ts. Choosing one recolours
// this section with the app's own ramp and swaps in that Space's home
// screen, app icons and widgets, each drawn by the app's code.
export type SpaceCopy = {
  eyebrow: string;
  head1: string;
  head2?: string;
  body?: string[];
  /** Space names by English name, in the reader's language. */
  names?: Record<string, string>;
  /** Labels for the two icon variants (English: Light, Dark). */
  light?: string;
  dark?: string;
  /** Only the icons: no home screen or widgets (they are drawn in English). */
  compact?: boolean;
};

const SPACE_EN: SpaceCopy = {
  eyebrow: "Your Space",
  head1: "Six colours.",
  head2: "Make it yours.",
  body: [
    "Six tuned palettes, each rooted in nature and light, not a colour wheel. Your Space colours the app, its nine widgets and, on iPhone, the app icon too.",
  ],
  light: "Light",
  dark: "Dark",
};

export default function SpacePicker({ copy: C = SPACE_EN }: { copy?: SpaceCopy }) {
  const [i, setI] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const s = SPACES[i];
  const name = C.names?.[s.name] ?? s.name;

  function onKey(e: React.KeyboardEvent) {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + SPACES.length) % SPACES.length;
    setI(next);
    btns.current[next]?.focus();
  }

  return (
    <section
      id="space"
      className="chapter space"
      aria-labelledby="space-title"
      style={
        {
          "--sp-deep": s.deep,
          "--sp-mid": s.mid,
          "--sp-lit": s.lit,
          "--sp-dark": s.dark,
        } as React.CSSProperties
      }
    >
      <div className="wrap space-grid">
        <div className="space-copy">
          <p className="micro" data-reveal>
            {C.eyebrow}
          </p>
          <h2 id="space-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            {C.head1}
            {C.head2 && <span className="accent">{C.head2}</span>}
          </h2>
          {C.body?.map((b) => (
            <p key={b} className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              {b}
            </p>
          ))}

          <div
            className="swatches"
            role="radiogroup"
            aria-label={C.eyebrow}
            data-reveal
            style={{ "--d": "165ms" } as React.CSSProperties}
          >
            {SPACES.map((sp, n) => (
              <button
                key={sp.id}
                ref={(el) => {
                  btns.current[n] = el;
                }}
                type="button"
                role="radio"
                aria-checked={n === i}
                tabIndex={n === i ? 0 : -1}
                className="swatch"
                onClick={() => setI(n)}
                onKeyDown={onKey}
              >
                <span
                  className="swatch-chip"
                  style={{ background: `linear-gradient(135deg, ${sp.deep}, ${sp.mid} 55%, ${sp.lit})` }}
                  aria-hidden="true"
                />
                {C.names?.[sp.name] ?? sp.name}
              </button>
            ))}
          </div>

          {!C.compact && (
            <div className="space-icons" data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
              <figure>
                <Image key={`${s.id}-l`} src={`/app/spaces/${s.id}-icon-light.webp`} alt={`The Thābit app icon in ${s.name}, light`} width={240} height={240} unoptimized className="space-icon fade-in" />
                <figcaption className="micro">{C.light}</figcaption>
              </figure>
              <figure>
                <Image key={`${s.id}-d`} src={`/app/spaces/${s.id}-icon-dark.webp`} alt={`The Thābit app icon in ${s.name}, dark`} width={240} height={240} unoptimized className="space-icon fade-in" />
                <figcaption className="micro">{C.dark}</figcaption>
              </figure>
            </div>
          )}
        </div>

        {C.compact ? (
          // Without the English screens: the app icon itself, light and dark, large.
          <div className="space-stage space-stage-icons" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            <Image key={`${s.id}-l`} src={`/app/spaces/${s.id}-icon-light.webp`} alt={`${C.eyebrow}: ${name}`} width={240} height={240} unoptimized className="space-icon space-icon-lg fade-in" />
            <Image key={`${s.id}-d`} src={`/app/spaces/${s.id}-icon-dark.webp`} alt={`${C.eyebrow}: ${name}`} width={240} height={240} unoptimized className="space-icon space-icon-lg fade-in" />
          </div>
        ) : (
          <div className="space-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            <div className="phone">
              <div className="phone-glass">
                <Image
                  key={`${s.id}-home`}
                  src={`/app/spaces/${s.id}-home.webp`}
                  alt={`The Thābit home screen in the ${s.name} Space`}
                  width={660}
                  height={1434}
                  unoptimized
                  className="fade-in"
                />
                <span className="phone-island" aria-hidden="true" />
              </div>
            </div>
          </div>
        )}
      </div>

      {!C.compact && (
        <div className="wrap" data-reveal>
          <figure className="space-widgets">
            <Image
              key={`${s.id}-w`}
              src={`/app/spaces/${s.id}-widgets.webp`}
              alt={`Six of the Thābit widgets in the ${s.name} Space: Daily Ayah, Habits Today, Check-in Streak, Your Path, Dhikr Today and Name of the Day`}
              width={1400}
              height={678}
              unoptimized
              className="fade-in"
            />
            <figcaption className="micro">The widgets, drawn by the app in {s.name}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
