import Image from "next/image";
import StoreBadges from "@/components/store-badges";

// Copy: the store's promotional text, verbatim.
export default function GetApp() {
  return (
    <section id="download" className="chapter field-pine get-app" aria-labelledby="download-title">
      <div className="splash-glow" aria-hidden="true" />
      <div className="wrap get-app-inner">
        <Image
          src="/app/spaces/pine-icon-light.webp"
          alt=""
          width={240}
          height={240}
          unoptimized
          className="get-app-icon"
          data-reveal
        />
        <h2 id="download-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
          Download
          <span className="accent">Thābit.</span>
        </h2>
        <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
          As-salāmu &apos;alaykum. Thābit speaks English, Arabic, Urdu,
          Indonesian, Turkish, French and Spanish. Begin with the morning
          athkar, or tell Sakinah how tonight feels.
        </p>
        <div data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
          <StoreBadges className="store-badges-center" />
        </div>
      </div>
    </section>
  );
}
