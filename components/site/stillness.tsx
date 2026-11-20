import Phone from "@/components/site/phone";
import Sittings from "@/components/site/sittings";
import { SLEEP_STORIES } from "@/components/site/data";

// Copy: the store description's MEDITATION and SOLACE AND SLEEP sections.
export default function Stillness() {
  return (
    <section id="meditation" className="chapter field-pine" aria-labelledby="meditation-title">
      <div className="wrap split">
        <div className="split-copy">
          <p className="micro" data-reveal>
            Meditation, the Islamic way
          </p>
          <h2 id="meditation-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Never something
            <span className="accent">you owe.</span>
          </h2>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            Twelve short morning and evening sittings, Hard Days sittings for
            when the heart is heavy, and nature sounds with a timer. Companions
            to your athkar, never something you owe.
          </p>
          <div data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
            <Sittings />
          </div>
        </div>
        <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <Phone
            src="/app/screens/meditation.webp"
            alt="The Meditation tab: today's morning sitting, Daily moments, Hard Days and Rest"
          />
        </div>
      </div>

      <div className="wrap split split-flip sleep">
        <div className="split-copy">
          <p className="micro" data-reveal>
            Solace and sleep
          </p>
          <h3 className="display display-sm" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
            Calm for
            <span className="accent">tonight.</span>
          </h3>
          <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
            Audio tracks for anxiety, grief, hope, sleep, worship and
            Qur&apos;an. Sleep Sanctuary adds a wind-down timer, sleep adhkar
            and 4 bedtime stories.
          </p>
          <ul className="stories" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
            {SLEEP_STORIES.map((s) => (
              <li key={s.title}>
                <span className="story-title">{s.title}</span>
                <span className="story-about">{s.about}</span>
                <span className="story-min">{s.minutes} min</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          <Phone
            src="/app/screens/sleep.webp"
            alt="Sleep Sanctuary: a night wind-down with the wind-down timer, sleep adhkar and sleep stories"
          />
        </div>
      </div>
    </section>
  );
}
