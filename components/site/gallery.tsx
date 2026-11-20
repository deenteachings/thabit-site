"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Glyph from "@/components/site/glyph";
import { STORE_SHOTS } from "@/components/site/data";

// The ten App Store screenshots, as uploaded for 2.0.0, in a scroll-snap
// strip: swipe, scroll, arrow keys, or the two buttons.
export default function Gallery() {
  const strip = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const card = el.firstElementChild as HTMLElement | null;
        if (!card) return;
        const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
        setPos(Math.min(STORE_SHOTS.length - 1, Math.round(el.scrollLeft / step)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  function go(dir: 1 | -1) {
    const el = strip.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: still ? "auto" : "smooth" });
  }

  return (
    <section id="screens" className="chapter field-paper" aria-labelledby="screens-title">
      <div className="wrap gallery-head">
        <div>
          <p className="micro" data-reveal>
            On the App Store
          </p>
          <h2 id="screens-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Every screen,
            <span className="accent">as it ships.</span>
          </h2>
        </div>
        <div className="gallery-controls" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <span className="micro gallery-pos" aria-live="polite">
            {String(pos + 1).padStart(2, "0")} / {STORE_SHOTS.length}
          </span>
          <button type="button" className="icon-btn" aria-label="Previous screenshot" onClick={() => go(-1)} disabled={pos === 0}>
            <Glyph name="arrow-left" />
          </button>
          <button type="button" className="icon-btn" aria-label="Next screenshot" onClick={() => go(1)} disabled={pos === STORE_SHOTS.length - 1}>
            <Glyph name="arrow-right" />
          </button>
        </div>
      </div>
      <ul
        ref={strip}
        className="gallery"
        tabIndex={0}
        aria-label="App Store screenshots"
        data-reveal
        style={{ "--d": "110ms" } as React.CSSProperties}
      >
        {STORE_SHOTS.map((s) => (
          <li key={s.file}>
            <Image src={`/app/store/${s.file}.webp`} alt={s.alt} width={600} height={1300} unoptimized loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  );
}
