import Link from "next/link";
import BrandMark from "@/components/brand-mark";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/components/store-badges";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href="/" className="site-brand">
            <BrandMark className="site-brand-mark" />
            Thābit
          </Link>
          <p>Muslim mental wellness, in seven languages.</p>
        </div>
        <nav aria-label="Get the app" className="footer-col">
          <p className="micro">The app</p>
          <a href={APP_STORE_URL} {...external}>
            App Store
          </a>
          <a href={PLAY_STORE_URL} {...external}>
            Google Play
          </a>
          <a href="https://instagram.com/thethabitapp" {...external}>
            @thethabitapp
          </a>
        </nav>
        <nav aria-label="Help" className="footer-col">
          <p className="micro">Help</p>
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:thabit@deenteachings.com">thabit@deenteachings.com</a>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>© 2026 Thābit. Authentic sources only. Made with intention.</p>
        <p>Published by DeenTeachings LLP</p>
        <p className="footer-legal">
          Apple and the Apple logo are trademarks of Apple Inc., registered in
          the U.S. and other countries. App Store is a service mark of Apple
          Inc. Google Play and the Google Play logo are trademarks of Google LLC.
        </p>
      </div>
    </footer>
  );
}
