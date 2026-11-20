import Greeting from "@/components/site/greeting";
import Phone from "@/components/site/phone";
import StoreBadges from "@/components/store-badges";

export default function Hero() {
  return (
    <section className="hero field-paper" aria-labelledby="hero-title">
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
        <Phone
          src="/app/spaces/pine-home.webp"
          alt="The Thābit 2.0 home screen: Morning Athkar to begin, Today's notes, Breathe, Mood, and the question How is your heart?"
          priority
          className="hero-phone"
        />
      </div>
    </section>
  );
}
