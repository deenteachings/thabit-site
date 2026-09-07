import type { Metadata } from "next";
import AsoForm from "@/app/aso/aso-form";

export const metadata: Metadata = {
  title: "asokit — paste a link, get a full ASO audit",
  description:
    "An honest ASO audit. Paste an App Store or Google Play link, a package name, or a numeric id — get a full report with measured rank, findings, keyword gaps and competitors. No invented volume figures.",
};

const SAMPLES = [
  { label: "Thābit — App Store", value: "https://apps.apple.com/us/app/id6788482756" },
  { label: "Thābit — Google Play", value: "https://play.google.com/store/apps/details?id=com.deenteachings.thabit" },
  { label: "A cross-store bundle", value: "com.tinyspeck.chatlyio" },
];

export default function AsoPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pt-20">
          <p className="section-label">ASO audit · no guesses</p>
          <h1 className="display-huge mt-4 text-balance">
            Paste a link, get a full ASO audit.
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-6 text-secondary">
            An App Store link, a Google Play link, a package name, a bundle
            id, or a bare numeric id. We detect which store and which app it
            is — with zero guesswork — pull the live listing, and measure
            everything a public page can honestly show.
          </p>

          <AsoForm samples={SAMPLES} />

          <p className="mt-6 text-[13px] text-tertiary">
            Privacy: only public store pages are fetched. Nothing about your
            private console data is needed — or asked for.
          </p>
        </div>
      </section>

      <section id="how" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="section-label">How it works</p>
          <h2 className="display-large mt-3">Three honest steps.</h2>
          <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
            {[
              ["1 · detect", "Exact store and app detection — a link, an id, or a package name. If an identifier exists on both stores, we ask instead of guessing."],
              ["2 · measure", "Live listing pulled with provenance, every field checked against the stores' published rules, and your real position in live search results."],
              ["3 · report", "A shareable report: score, findings with sources, measured rank, keyword gaps, and competitors — each labelled with how it was measured."],
            ].map(([label, body]) => (
              <div key={label} className="bg-background p-6">
                <p className="section-label">{label}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-secondary">{body}</p>
              </div>
            ))}
          </div>

          <h2 className="display-large mt-14">What we never invent.</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">
            Search volume, difficulty scores, and rank predictions are
            proprietary to Apple Search Ads and Google Keyword Planner. A tool
            that prints them without your credentials is modelling a guess —
            this tool reports what it can measure, and says plainly when a
            source is unreachable.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="section-label">What the report contains</p>
          <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
            {[
              ["Score", "Every point traceable to a published rule, renormalised when fields a public page cannot show are excluded."],
              ["Findings", "Severity, field, fix, and the source URL behind each rule."],
              ["Rank & gaps", "Your measured position per term across storefronts, leader listings, autocomplete demand, and the words ranking apps use that you do not."],
            ].map(([label, body]) => (
              <div key={label} className="bg-background p-6">
                <p className="text-[15px] font-semibold text-primary">{label}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-secondary">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
