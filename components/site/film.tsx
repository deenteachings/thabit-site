"use client";

import { useRef, useState } from "react";
import Glyph from "@/components/site/glyph";

// The 2.0 launch film (88 seconds, vertical, no sound track). Nothing loads
// until play is pressed; the poster is its opening frame.
export default function Film() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    setStarted(true);
    video.current?.play().catch(() => setStarted(false));
  }

  return (
    <section id="film" className="chapter field-ink" aria-labelledby="film-title">
      <div className="wrap split split-flip">
        <div className="split-copy">
          <p className="micro" data-reveal>
            The launch film
          </p>
          <h2 id="film-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Introducing
            <span className="accent">Thābit.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            A first look at 2.0 in 88 seconds, from &ldquo;How is your
            heart?&rdquo; to Your Space. The film has no sound, so it can play
            anywhere.
          </p>
        </div>
        <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <div className="phone film-phone">
            <div className="phone-glass">
              <video
                ref={video}
                src="/film/thabit-film.mp4"
                poster="/film/thabit-film-poster.jpg"
                preload="none"
                playsInline
                muted
                controls={started}
                width={720}
                height={1280}
                aria-label="Thābit launch film, 88 seconds, no sound"
                onEnded={() => setStarted(false)}
              />
              {!started && (
                <button type="button" className="film-play" onClick={play}>
                  <span className="film-play-dot">
                    <Glyph name="play" />
                  </span>
                  Play the film <span className="film-len">1:28</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
