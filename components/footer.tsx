import Link from "next/link";
import BrandMark from "@/components/brand-mark";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/components/store-badges";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export type FooterLabels = {
  tagline: string;
  /** Column headings; English only. */
  theApp?: string;
  help?: string;
  support: string;
  privacy: string;
  terms: string;
  home: string;
  /** The first line of the base row. */
  base: string;
  /** The app's translation notice, on localized pages. */
  notice?: string;
};

const FOOTER_EN: FooterLabels = {
  tagline: "Muslim mental wellness, in seven languages.",
  theApp: "The app",
  help: "Help",
  support: "Support",
  privacy: "Privacy",
  terms: "Terms",
  home: "/",
  base: "© 2026 Thābit. Authentic sources only. Made with intention.",
};

export default function Footer({ labels: L = FOOTER_EN }: { labels?: FooterLabels }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Link href={L.home} className="site-brand">
            <BrandMark className="site-brand-mark" />
            Thābit
          </Link>
          <p>{L.tagline}</p>
        </div>
        <nav aria-label={L.theApp ?? "App Store, Google Play"} className="footer-col">
          {L.theApp && <p className="micro">{L.theApp}</p>}
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
        <nav aria-label={L.help ?? L.support} className="footer-col">
          {L.help && <p className="micro">{L.help}</p>}
          <Link href="/support" lang="en">
            {L.support}
          </Link>
          <Link href="/privacy">{L.privacy}</Link>
          <Link href="/terms">{L.terms}</Link>
          <a href="mailto:thabit@deenteachings.com">thabit@deenteachings.com</a>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>{L.base}</p>
        <p>Published by DeenTeachings LLP</p>
        {L.notice && <p className="footer-notice">{L.notice}</p>}
        <p className="footer-legal" lang="en">
          Apple and the Apple logo are trademarks of Apple Inc., registered in
          the U.S. and other countries. App Store is a service mark of Apple
          Inc. Google Play and the Google Play logo are trademarks of Google LLC.
        </p>
      </div>
    </footer>
  );
}
