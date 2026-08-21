import {
  SunIcon,
  MindIcon,
  HeartIcon,
  CompassIcon,
  PathIcon,
  SparkleIcon,
  BookIcon,
  MoonIcon,
  WavesIcon,
} from "@/components/icons";

const PRACTICES = [
  { title: "Daily", meta: "Morning & evening", Icon: SunIcon },
  { title: "Mind", meta: "Calm · rest · focus", Icon: MindIcon },
  { title: "Healing", meta: "Qur'an · du'a · grief", Icon: HeartIcon },
  { title: "Programs", meta: "Structured care", Icon: CompassIcon },
  { title: "Journeys", meta: "Ramadan · grief · du'a", Icon: PathIcon },
  { title: "Soul", meta: "Your quiet progress", Icon: SparkleIcon },
  { title: "Journal", meta: "Private pages", Icon: BookIcon },
  { title: "Sleep", meta: "Solace audio", Icon: MoonIcon },
  { title: "Breathe", meta: "Sujud breathing", Icon: WavesIcon },
];

function PracticeCell({
  practice,
}: {
  practice: (typeof PRACTICES)[number];
}) {
  const { Icon } = practice;
  return (
    <div className="flex flex-col items-center gap-3 border-b border-r border-border px-2 py-8 text-center transition-colors hover:bg-pressed sm:px-3 sm:py-10">
      <Icon className="h-[22px] w-[22px] text-primary" />
      <h3 className="text-[15px] font-semibold tracking-tight text-primary">
        {practice.title}
      </h3>
      <p className="text-[11px] font-medium text-tertiary">{practice.meta}</p>
    </div>
  );
}

export default function Practices() {
  return (
    <section id="practices" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="section-label mb-4">Inside the app</p>
          <h2 className="display-large text-balance">
            Nine quiet practices. Nothing asks too much.
          </h2>
        </div>

        <div className="grid grid-cols-3 border-l border-t border-border">
          {PRACTICES.map((practice) => (
            <PracticeCell key={practice.title} practice={practice} />
          ))}
        </div>
      </div>
    </section>
  );
}
