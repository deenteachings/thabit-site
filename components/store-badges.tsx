export const APP_STORE_URL =
  "https://apps.apple.com/us/app/thabit-islamic-healing/id6788482756";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.deenteachings.thabit";

// The official badges, unmodified: Apple's black "Download on the App Store"
// (developer.apple.com, US-UK RGB, 119.66 x 40) and Google's "Get it on Google
// Play" (play.google.com/intl/en_us/badges, 646 x 250 with its clear space).
// site.css sizes Google's so both badges stand at the same visible height.
export default function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`store-badges ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="badge badge-apple"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- an SVG badge, served as is */}
        <img src="/badges/app-store.svg" alt="Download on the App Store" width={144} height={48} />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="badge badge-google"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- the official badge, served as is */}
        <img src="/badges/google-play.png" alt="Get it on Google Play" width={185} height={71} />
      </a>
    </div>
  );
}
