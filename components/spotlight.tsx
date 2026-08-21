import DeviceFrame from "@/components/device-frame";

type Screen = { src: string; alt: string };

type SpotlightProps = {
  id?: string;
  label: string;
  title: string;
  body: string;
  screens: Screen[];
  flip?: boolean;
  surface?: boolean;
};

export default function Spotlight({
  id,
  label,
  title,
  body,
  screens,
  flip = false,
  surface = false,
}: SpotlightProps) {
  const single = screens.length === 1;

  return (
    <section
      id={id}
      className={`border-b border-border ${surface ? "bg-surface" : ""}`}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 sm:py-28 lg:grid-cols-2">
        <div className={flip ? "lg:order-2" : ""}>
          <p className="section-label mb-4">{label}</p>
          <h2 className="display-large text-balance">{title}</h2>
          <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-secondary">
            {body}
          </p>
        </div>

        {single ? (
          <div className={`flex justify-center ${flip ? "lg:order-1" : ""}`}>
            <DeviceFrame
              src={screens[0].src}
              alt={screens[0].alt}
              className="w-56 sm:w-64"
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center gap-6 sm:gap-10 ${
              flip ? "lg:order-1" : ""
            }`}
          >
            <DeviceFrame
              src={screens[0].src}
              alt={screens[0].alt}
              className="w-36 -rotate-3 translate-y-4 sm:w-56"
            />
            <DeviceFrame
              src={screens[1].src}
              alt={screens[1].alt}
              className="w-36 rotate-3 -translate-y-2 sm:w-56"
            />
          </div>
        )}
      </div>
    </section>
  );
}
