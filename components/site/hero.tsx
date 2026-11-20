import Greeting from "@/components/site/greeting";
import LiveHome from "@/components/site/live-home";
import morning from "@/components/site/home-screens/morning";
import StoreBadges from "@/components/store-badges";

// The app's splash, once (components/SplashGate.tsx): the Space glow rises,
// then a ripple echoing the mark's three arcs spreads out behind the screen.
const ARCS = [189, 248, 308];

export default function Hero() {
  return (
    <section id="top" className="hero field-paper" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="micro hero-eyebrow enter">
          <Greeting /> <span aria-hidden="true">·</span> As-salāmu &apos;alaykum
        </p>
        <h1 id="hero-title" className="display enter" style={{ "--d": "55ms" } as React.CSSProperties}>
          When your heart is heavy,
          <span className="accent">we sit with you.</span>
        </h1>
        <p className="lede enter" style={{ "--d": "110ms" } as React.CSSProperties}>
          A Muslim mental wellness companion with dhikr, du&apos;ā, Qur&apos;an,
          sleep, meditation and Sakinah, an AI companion who answers at 3am,
          rooted in the Qur&apos;an and authentic Sunnah.
        </p>
        <div className="enter" style={{ "--d": "165ms" } as React.CSSProperties}>
          <StoreBadges />
          <p className="micro hero-note">
            Free to start <span aria-hidden="true">·</span> Seven languages{" "}
            <span aria-hidden="true">·</span> iPhone and Android
          </p>
        </div>
      </div>
      <div className="hero-stage field-pine">
        <div className="splash-glow" aria-hidden="true" />
        <svg className="hero-ripple" viewBox="96 118 320 278" aria-hidden="true">
          {ARCS.map((y) => (
            <path
              key={y}
              d={`M106 ${y} A184.6 184.6 0 0 0 406 ${y} A212.5 212.5 0 0 1 106 ${y} Z`}
            />
          ))}
        </svg>
        <LiveHome initial={morning[0]} />
      </div>
    </section>
  );
}
