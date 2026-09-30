import Link from "next/link";
import type { Metadata } from "next";
import AsoForm from "./aso-form";
import "./aso.css";

export const metadata: Metadata = {
  title: "asokit — a clearer path to app discovery",
  description:
    "Understand your store listing with a source-backed ASO audit. Measure search visibility, find keyword gaps, and see what to improve next.",
  openGraph: {
    title: "asokit — a clearer path to app discovery",
    description: "Your listing. Your opportunities. A clearer next move.",
    url: "/aso",
    siteName: "asokit",
  },
};

const SAMPLES = [
  {
    label: "Thābit on iOS",
    value: "https://apps.apple.com/us/app/id6788482756",
  },
  {
    label: "Thābit on Android",
    value:
      "https://play.google.com/store/apps/details?id=com.deenteachings.thabit",
  },
];

export default function AsoPage() {
  return (
    <div className="aso-app">
      <a className="aso-skip" href="#audit">
        Skip to audit
      </a>
      <header className="aso-nav">
        <a className="aso-brand" href="/aso" aria-label="asokit home">
          <span className="aso-mark" aria-hidden="true">
            a<span>↗</span>
          </span>
          asokit<span className="aso-brand-note">APP GROWTH, UNDERSTOOD</span>
        </a>
        <nav aria-label="ASO navigation">
          <a href="#how">How it works</a>
          <a href="/aso/methodology">Methodology</a>
          <a className="aso-nav-action" href="/aso/watch">
            Watchlist <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <main>
        <section className="aso-hero aso-wrap">
          <div className="aso-intro">
            <p className="aso-eyebrow">
              <span className="aso-dot" /> INDEPENDENT ASO INTELLIGENCE
            </p>
            <h1>
              Good apps deserve
              <br />
              to be <em>discovered.</em>
            </h1>
            <p className="aso-lead">
              See what’s holding your listing back.
              <br className="aso-desktop-break" /> Turn public store data into
              your next best move.
            </p>
            <div className="aso-promise">
              <span>↗ App Store</span>
              <span>▷ Google Play</span>
              <span>No account needed</span>
            </div>
          </div>
          <aside
            className="aso-preview"
            aria-label="Illustrative report preview"
          >
            <div className="aso-preview-head">
              <span className="aso-eyebrow">YOUR LISTING, DECODED</span>
              <span className="aso-example">ILLUSTRATIVE</span>
            </div>
            <div className="aso-preview-score">
              <div className="aso-score-orbit">
                <span>↗</span>
              </div>
              <div>
                <h2>Clarity before changes.</h2>
                <p>A score with the evidence behind it.</p>
              </div>
            </div>
            <div className="aso-preview-row">
              <span>
                <i className="aso-status green" />
                Listing health
              </span>
              <strong>Know what to fix</strong>
            </div>
            <div className="aso-preview-row">
              <span>
                <i className="aso-status amber" />
                Search visibility
              </span>
              <strong>See where you stand</strong>
            </div>
            <div className="aso-preview-row">
              <span>
                <i className="aso-status purple" />
                Keyword opportunities
              </span>
              <strong>Find the gaps</strong>
            </div>
            <div className="aso-preview-foot">
              <span>✓ Sources attached</span>
              <span>✓ Limitations labelled</span>
            </div>
          </aside>
        </section>
        <section
          className="aso-wrap aso-audit-section"
          id="audit"
          aria-labelledby="audit-title"
        >
          <div className="aso-section-top">
            <div>
              <p className="aso-eyebrow">01 / START WITH YOUR APP</p>
              <h2 id="audit-title">Your next chapter starts here.</h2>
            </div>
            <span className="aso-caption">
              Public data. Practical direction.
            </span>
          </div>
          <AsoForm samples={SAMPLES} />
          <p className="aso-privacy">
            ◇ Only public store information. Your private console stays private.
          </p>
        </section>
        <section className="aso-deliverables aso-wrap" id="report">
          <div className="aso-section-top">
            <div>
              <p className="aso-eyebrow">THE BIGGER PICTURE</p>
              <h2>Less guesswork. More direction.</h2>
            </div>
            <a className="aso-text-link" href="/aso/methodology">
              Explore the methodology ↗
            </a>
          </div>
          <div className="aso-feature-grid">
            {[
              [
                "01",
                "Listing health",
                "Understand the details that matter.",
                "A rule-based scorecard with field-level findings, recommended fixes, and the source behind each rule.",
                "↗",
              ],
              [
                "02",
                "Search visibility",
                "Find your place in the results.",
                "Measured positions across selected storefronts, competing listings, and keywords you may be missing.",
                "◎",
              ],
              [
                "03",
                "Room to grow",
                "Make your next move a better one.",
                "Review language, localized listings, and track changes over time. See what is available and what is not.",
                "✳",
              ],
            ].map(([number, label, title, body, icon]) => (
              <article className="aso-feature" key={number}>
                <div className="aso-feature-top">
                  <span>
                    {number} / {label}
                  </span>
                  <span className="aso-feature-icon" aria-hidden="true">
                    {icon}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="aso-process" id="how">
          <div className="aso-wrap">
            <div className="aso-section-top">
              <div>
                <p className="aso-eyebrow">FROM LINK TO NEXT STEPS</p>
                <h2>A little input. A lot of perspective.</h2>
              </div>
            </div>
            <div className="aso-steps">
              {[
                [
                  "01",
                  "Bring your app",
                  "Paste a store link, package name, bundle ID, or numeric App Store ID. We resolve the listing and ask you to choose if it exists on both stores.",
                ],
                [
                  "02",
                  "Set your lens",
                  "Choose your markets and recommendation languages. We inspect the public listing and measure live search results.",
                ],
                [
                  "03",
                  "Make your move",
                  "Read your report, follow the evidence, and prioritize changes. Add the app to your watchlist to follow rank movement.",
                ],
              ].map(([n, title, body]) => (
                <article key={n}>
                  <span className="aso-step-number">{n}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="aso-honesty aso-wrap">
          <span className="aso-honesty-symbol" aria-hidden="true">
            ✳
          </span>
          <div>
            <p className="aso-eyebrow">CONFIDENCE COMES FROM CONTEXT</p>
            <h2>
              If we can’t measure it,
              <br />
              we’ll say so.
            </h2>
            <p>
              No invented search volumes. No unexplained difficulty scores.
              Public data has limits; every report should make those limits
              clear. A listing score is a diagnostic, not a promise of growth.
            </p>
            <a className="aso-text-link" href="/aso/methodology">
              Read how we measure ↗
            </a>
          </div>
        </section>
      </main>
      <footer className="aso-footer aso-wrap">
        <a className="aso-brand" href="/aso">
          asokit
          <span className="aso-dot" />
        </a>
        <p>A clearer view. A better next move.</p>
        <Link href="/">From the team behind Thābit ↗</Link>
      </footer>
    </div>
  );
}
