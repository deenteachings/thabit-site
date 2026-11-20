"use client";

import { useEffect, useRef, useState } from "react";
import Glyph from "@/components/site/glyph";
import { SAKINAH_EXAMPLE } from "@/components/site/data";

// The Sakinah screen as the app draws it (app/(tabs)/sakinah.tsx), playing
// the App Store screenshot's opening exchange once it scrolls into view:
// the message lands, Sakinah is typing, then the reply.
export default function SakinahChat() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    if (still || !("IntersectionObserver" in window)) {
      timers.push(window.setTimeout(() => setStep(3), 0));
      return () => timers.forEach(clearTimeout);
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timers.push(window.setTimeout(() => setStep(1), 250));
        timers.push(window.setTimeout(() => setStep(2), 1050));
        timers.push(window.setTimeout(() => setStep(3), 2650));
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="phone sakinah-phone" ref={ref}>
      <div className="phone-glass sakinah-screen">
        <span className="phone-island" aria-hidden="true" />
        <div className="sk-status" aria-hidden="true">
          3:12
        </div>
        <div className="sk-head">
          <Glyph name="caret-left" className="sk-back" />
          <span className="sk-avatar">
            <Glyph name="sparkle" />
          </span>
          <span className="sk-title">
            Sakinah
            <span className="sk-presence">Here for you</span>
          </span>
          <Glyph name="dots-three" className="sk-more" />
        </div>
        <div className="sk-thread" aria-live="polite">
          <p className="sk-day">
            <span>Today</span>
          </p>
          {step >= 1 && (
            <p className="sk-msg sk-user">{SAKINAH_EXAMPLE.user}</p>
          )}
          {step === 2 && (
            <p className="sk-typing" aria-label="Sakinah is typing">
              <span />
              <span />
              <span />
            </p>
          )}
          {step >= 3 && (
            <div className="sk-msg sk-reply">
              {SAKINAH_EXAMPLE.reply.map((p) => (
                <p key={p.slice(0, 12)}>{p}</p>
              ))}
            </div>
          )}
        </div>
        <div className="sk-input" aria-hidden="true">
          <span>Share what&apos;s on your heart...</span>
          <Glyph name="microphone" className="sk-mic" />
          <span className="sk-send">
            <Glyph name="arrow-up" />
          </span>
        </div>
      </div>
    </div>
  );
}
