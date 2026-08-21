import { AppleIcon, PlayIcon } from "@/components/icons";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/thabit-islamic-healing/id6788482756";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.deenteachings.thabit";

export default function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-4 sm:flex-row ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Thābit on the App Store"
        className="btn-pill btn-solid gap-3"
      >
        <AppleIcon className="h-5 w-5 shrink-0" />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] opacity-60">
            Download on the
          </span>
          <span className="text-[15px] font-semibold">App Store</span>
        </span>
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Thābit on Google Play"
        className="btn-pill btn-outline gap-3"
      >
        <PlayIcon className="h-5 w-5 shrink-0" />
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] opacity-60">
            Get it on
          </span>
          <span className="text-[15px] font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
