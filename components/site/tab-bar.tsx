"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Glyph from "@/components/site/glyph";
import type { GlyphName } from "@/components/site/glyph-paths";

export type Tab = {
  href: string;
  label: string;
  icon: GlyphName;
  iconOn: GlyphName;
  /** Section ids that light this tab while they are on screen. */
  sections?: string[];
};

// Phones only: the app's floating tab bar (app/(tabs)/_layout.tsx), a black
// pill with a sliding indicator, Light icons and a Fill icon for the active
// tab. Like the app, it slips away while scrolling down and returns on the
// way up (components/tabBarMotion.ts: 200ms out, 180ms back).
export default function TabBar({ tabs, current }: { tabs: Tab[]; current?: number }) {
  const [active, setActive] = useState(current ?? 0);
  const [hidden, setHidden] = useState(false);

  // Which tab the reader is in: the section crossing the middle of the screen.
  useEffect(() => {
    if (current !== undefined) return;
    const owner = new Map<string, number>();
    tabs.forEach((t, i) => t.sections?.forEach((id) => owner.set(id, i)));
    const els = [...owner.keys()]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(owner.get(e.target.id) ?? 0);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs, current]);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - 80;
        if (y < 80 || nearEnd || y < last - 6) setHidden(false);
        else if (y > last + 6) setHidden(true);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className="tab-bar"
      aria-label="Sections"
      data-hidden={hidden ? "" : undefined}
      style={{ "--n": tabs.length, "--i": active } as React.CSSProperties}
    >
      <span className="tab-bar-indicator" aria-hidden="true" />
      {tabs.map((t, i) => (
        <Link
          key={t.href}
          href={t.href}
          className="tab-bar-item"
          aria-current={i === active ? (current !== undefined ? "page" : "location") : undefined}
          onClick={() => setActive(i)}
        >
          <Glyph name={i === active ? t.iconOn : t.icon} className="tab-bar-icon" />
          <span>{t.label}</span>
        </Link>
      ))}
    </nav>
  );
}
