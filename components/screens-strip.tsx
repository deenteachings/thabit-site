import DeviceFrame from "@/components/device-frame";

const SCREENS = [
  {
    src: "/screens/journal.webp",
    alt: "Reflect — a private journal",
    title: "Reflect",
    meta: "Private pages for the heavy things.",
  },
  {
    src: "/screens/journeys.webp",
    alt: "Guided journeys",
    title: "Journeys",
    meta: "Grief, du'a, Ramadan — walked with you.",
  },
  {
    src: "/screens/programs.webp",
    alt: "Structured healing programs",
    title: "Programs",
    meta: "Structured care, one small step at a time.",
  },
  {
    src: "/screens/onboarding.webp",
    alt: "Onboarding — we open with salam",
    title: "Begin softly",
    meta: "We open with salam, never a lecture.",
  },
];

export default function ScreensStrip() {
  return (
    <section id="screens" className="border-b border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="mb-14 max-w-2xl">
          <p className="section-label mb-4">Every screen, gentle</p>
          <h2 className="display-large text-balance">
            From your first salam to your last check-in.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {SCREENS.map((screen) => (
            <figure
              key={screen.title}
              className="flex flex-col items-center gap-5 text-center"
            >
              <DeviceFrame
                src={screen.src}
                alt={screen.alt}
                className="w-40 sm:w-48"
              />
              <figcaption>
                <p className="text-[15px] font-semibold tracking-tight text-primary">
                  {screen.title}
                </p>
                <p className="mt-1.5 text-[12px] text-tertiary">
                  {screen.meta}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
