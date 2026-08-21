import {
  MindIcon,
  SparkleIcon,
  MoonIcon,
  HeartIcon,
  ChevronIcon,
} from "@/components/icons";

function OrbDemo() {
  return (
    <div className="demo-orb-halo" aria-hidden="true">
      <span className="demo-orb-ripple" />
      <span className="demo-orb-core" />
    </div>
  );
}

function CounterDemo() {
  const STEPS = Array.from({ length: 8 });
  return (
    <div className="w-28 text-right" aria-hidden="true">
      <div className="flex items-baseline justify-end gap-2">
        <span className="tabular text-[22px] font-bold leading-none text-primary">
          33
        </span>
        <span className="arabic text-[14px] text-quaternary">أستغفر الله</span>
      </div>
      <div className="mt-2.5 flex items-center gap-1">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-[2px] flex-1 rounded-full ${
              i === 3
                ? "w-5 flex-none bg-primary"
                : i < 4
                  ? "bg-primary"
                  : "border border-quaternary bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MoonDemo() {
  return (
    <div className="demo-moon-halo" aria-hidden="true">
      <MoonIcon className="h-5 w-5 text-primary" />
      <span className="demo-star" style={{ top: "10%", right: "14%" }} />
      <span
        className="demo-star"
        style={{ bottom: "16%", left: "12%", animationDelay: "1.2s" }}
      />
      <span
        className="demo-star"
        style={{ top: "22%", left: "20%", animationDelay: "2.1s" }}
      />
    </div>
  );
}

function HeartbeatDemo() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <HeartIcon className="demo-heart h-6 w-6 text-primary" />
      <div className="flex flex-col gap-1.5">
        <span className="h-[2px] w-10 rounded-full bg-primary/80" />
        <span className="h-[2px] w-6 rounded-full bg-primary/50" />
      </div>
    </div>
  );
}

const MOMENTS = [
  {
    title: "Sujud",
    meta: "A breathing orb tied to the dhikr — Calm, Rest, Focus.",
    Icon: MindIcon,
    Demo: OrbDemo,
  },
  {
    title: "Istighfar",
    meta: "The dhikr counter keeps your place, then steps aside.",
    Icon: SparkleIcon,
    Demo: CounterDemo,
  },
  {
    title: "Sleep",
    meta: "A moon breathing inside its halo, while Solace plays softly.",
    Icon: MoonIcon,
    Demo: MoonDemo,
  },
  {
    title: "Soul",
    meta: "A gentle lub-dub — your score, presented as a pulse.",
    Icon: HeartIcon,
    Demo: HeartbeatDemo,
  },
];

export default function Showcase() {
  return (
    <section id="moments" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="section-label mb-4">Signature moments</p>
          <h2 className="display-large text-balance">
            One calm motion per screen — and it always stops when you ask it
            to.
          </h2>
        </div>

        <div className="border-b border-border">
          {MOMENTS.map((moment) => {
            const { Icon, Demo } = moment;
            return (
              <div
                key={moment.title}
                className="group flex items-center gap-5 border-t border-border py-6 first:border-t-0 sm:py-7"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[16px] font-semibold tracking-tight text-primary">
                    {moment.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-tertiary">
                    {moment.meta}
                  </p>
                </div>
                <Demo />
                <ChevronIcon className="h-4 w-4 shrink-0 text-quaternary" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
