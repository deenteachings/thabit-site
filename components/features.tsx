const FEATURES = [
  {
    title: "Sakinah",
    description:
      "A listening companion that sits with you when the night feels long. Warm answers, never preachy — and always rooted in authentic sources.",
  },
  {
    title: "Solace",
    description:
      "Gentle recitations and soft reminders to fall asleep to. Audio that meets you where you are, without demands.",
  },
  {
    title: "Adhkar",
    description:
      "Morning and evening remembrances with full sahih references. A quiet counter keeps your place, so the tongue remembers what the heart forgets.",
  },
  {
    title: "Reflect",
    description:
      "A private journal for the things you cannot say out loud. Write it, release it, and let it be witnessed only by the One who sees.",
  },
  {
    title: "Breathe",
    description:
      "Breathing patterns tied to dhikr — Calm, Rest, and Focus — so every exhale is a return, not an escape.",
  },
  {
    title: "Small daily anchors",
    description:
      "Gentle check-ins, habits, and a streak that celebrates showing up — especially on the days showing up is hard.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-elevated p-8 transition-colors hover:border-primary">
      <p className="section-label mb-5">0{index + 1}</p>
      <h3 className="text-[19px] font-semibold tracking-tight text-primary">
        {feature.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-secondary">
        {feature.description}
      </p>
    </article>
  );
}

export default function Features() {
  return (
    <section id="inside" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-4">Inside the app</p>
          <h2 className="display-large text-balance">
            Everything in one quiet place, nothing that asks too much.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
