import DeviceFrame from "@/components/device-frame";
import StoreBadges from "@/components/store-badges";
import BrandMark from "@/components/brand-mark";
import { SunIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section className="thabit-hero">
      <div className="thabit-hero-inner">
        <div className="thabit-hero-copy">
          <p className="section-label">
            <BrandMark className="thabit-small-mark" />
            A gentle companion for the Muslim heart
          </p>
          <h1>
            A softer place
            <br />
            for your <em>heart.</em>
          </h1>
          <p className="thabit-salam">
            As-salamu alaykum. You’re welcome here.
          </p>
          <p className="thabit-hero-description">
            For the days that feel heavy, and the little moments in between.
            Find quiet adhkar, a listening companion, and daily practices that
            bring you back to Allah.
          </p>
          <StoreBadges className="thabit-hero-badges" />
          <p className="thabit-hero-note">
            Rooted in faith. Made with care. Begin at your own pace.
          </p>
        </div>
        <div className="thabit-hero-art">
          <div className="thabit-arch" aria-hidden="true">
            <span className="arabic" lang="ar" dir="rtl">
              ثابت
            </span>
          </div>
          <div className="thabit-hero-device">
            <DeviceFrame
              src="/screens/home.webp"
              alt="The Thābit home screen, with daily practices and a gentle check-in"
              priority
            />
          </div>
          <div className="thabit-hero-caption">
            <SunIcon />
            <div>
              A moment of stillness.
              <br />
              <strong>A small return to you.</strong>
            </div>
          </div>
          <span className="thabit-art-note">
            FAITH · REFLECTION · EVERYDAY CARE
          </span>
        </div>
      </div>
      <div className="thabit-hero-bottom">
        <span>Come as you are.</span>
        <a href="#practices">
          Discover your quiet place <span aria-hidden="true">↓</span>
        </a>
        <span>No perfect days required.</span>
      </div>
    </section>
  );
}
