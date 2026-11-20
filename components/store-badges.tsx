import { AppleIcon, PlayIcon } from "@/components/icons";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/thabit-islamic-healing/id6788482756";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.deenteachings.thabit";

// The two stores as square buttons: App Store filled, Google Play outlined.
// Colours come from the field they sit on (site.css .btn-ink / .btn-line).
export default function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`store-badges ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Thābit on the App Store"
        className="btn btn-ink store-badge"
      >
        <AppleIcon className="store-badge-icon" />
        <span className="store-badge-text">
          <span>Download on the</span>
          App Store
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Thābit on Google Play"
        className="btn btn-line store-badge"
      >
        <PlayIcon className="store-badge-icon" />
        <span className="store-badge-text">
          <span>Get it on</span>
          Google Play
        </span>
      </a>
    </div>
  );
}
