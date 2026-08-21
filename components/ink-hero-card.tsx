const MOTES = [
  { left: "10%", delay: "0s" },
  { left: "22%", delay: "0.9s" },
  { left: "34%", delay: "1.8s" },
  { left: "46%", delay: "2.7s" },
  { left: "58%", delay: "3.6s" },
  { left: "70%", delay: "4.5s" },
  { left: "82%", delay: "5.4s" },
  { left: "90%", delay: "6.3s" },
];

const STEPS = Array.from({ length: 12 });

export default function InkHeroCard() {
  return (
    <div className="ink-card w-full p-8 text-left sm:p-10">
      <div className="ink-glow" aria-hidden="true" />
      <div className="ink-floor" aria-hidden="true" />
      {MOTES.map((mote) => (
        <span
          key={mote.left}
          className="ink-mote"
          style={{ left: mote.left, animationDelay: mote.delay }}
          aria-hidden="true"
        />
      ))}

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="ink-badge">Up next</span>
          <span className="tabular text-[12px] font-medium onink-tertiary">
            8:42 PM
          </span>
        </div>

        <h3 className="mt-8 text-[28px] font-bold leading-tight tracking-[-0.02em] onink-primary">
          Evening wind-down
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed onink-secondary">
          A few quiet minutes of adhkar before you rest. No rush, no score to
          keep.
        </p>

        <div className="mt-10 flex items-center gap-1.5" aria-hidden="true">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`ink-step ${
                i < 8
                  ? "ink-step-filled"
                  : i === 8
                    ? "ink-step-current"
                    : "ink-step-pending"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] onink-tertiary">
            Evening adhkar
          </span>
          <span className="tabular text-[13px] font-semibold onink-primary">
            8 <span className="onink-tertiary">of 12</span>
          </span>
        </div>
      </div>
    </div>
  );
}
