"use client";

import { useEffect, useRef, useState } from "react";

type Sample = { label: string; value: string };
type Detected = {
  kind: string;
  store?: string;
  id?: string;
  display?: string;
  country?: string;
  name?: string;
  icon_url?: string;
  ambiguity?: { apple?: Detected; play?: Detected };
  error?: { message?: string };
};
const COUNTRIES = [
  ["us", "United States"],
  ["gb", "United Kingdom"],
  ["ae", "United Arab Emirates"],
  ["sa", "Saudi Arabia"],
  ["pk", "Pakistan"],
  ["in", "India"],
  ["ca", "Canada"],
  ["au", "Australia"],
  ["id", "Indonesia"],
  ["tr", "Türkiye"],
  ["fr", "France"],
  ["es", "Spain"],
  ["de", "Germany"],
  ["my", "Malaysia"],
  ["ng", "Nigeria"],
  ["ma", "Morocco"],
  ["bd", "Bangladesh"],
  ["eg", "Egypt"],
];
// The seven languages the Thābit app ships (thabit/i18n/index.ts), first.
const THABIT_LOCALES = ["en", "ar", "ur", "id", "tr", "fr", "es"];
const LOCALES = [
  ["en", "English"],
  ["ar", "Arabic · العربية"],
  ["ur", "Urdu · اردو"],
  ["id", "Indonesian"],
  ["tr", "Turkish"],
  ["fr", "French"],
  ["es", "Spanish"],
  ["de", "German"],
  ["pt", "Portuguese"],
  ["ru", "Russian"],
  ["bn", "Bengali"],
  ["ms", "Malay"],
];
const MAX_MARKETS = 5;
const MAX_KEYWORDS = 20;
const MAX_KEYWORD_CHARS = 60;

// Split on commas (Latin and Arabic) and new lines; trim; drop duplicates.
function parseKeywords(raw: string) {
  const seen = new Set<string>();
  return raw
    .split(/[,،\n]/)
    .map((term) => term.trim().replace(/\s+/g, " "))
    .filter((term) => {
      const key = term.toLocaleLowerCase();
      if (!term || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
const MAX_LOCALES = THABIT_LOCALES.length;

export default function AsoForm({ samples }: { samples: Sample[] }) {
  const [value, setValue] = useState("");
  const [detected, setDetected] = useState<Detected | null>(null);
  const [phase, setPhase] = useState<"idle" | "detecting" | "starting">("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [countries, setCountries] = useState(["us"]);
  const [locales, setLocales] = useState(["en"]);
  const [keywords, setKeywords] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controller = useRef<AbortController | null>(null);
  const generation = useRef(0);
  const starting = useRef(false);
  const wake = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (wake.current) clearTimeout(wake.current);
      controller.current?.abort();
    },
    [],
  );

  async function detect(input: string, version: number) {
    const request = new AbortController();
    controller.current = request;
    const timeout = setTimeout(() => request.abort(), 30000);
    try {
      const response = await fetch("/aso/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
        signal: request.signal,
      });
      const data: Detected = await response.json();
      if (version !== generation.current) return;
      if (!response.ok || data.error)
        throw new Error(
          data.error?.message ||
            "We couldn’t identify that app. Check the link or ID and try again.",
        );
      if (!["apple", "play", "ambiguous"].includes(data.kind))
        throw new Error(
          "This app identifier isn’t supported. Try a full store link.",
        );
      setDetected(data);
    } catch (err) {
      if (version !== generation.current) return;
      if (request.signal.aborted) {
        setError("The app lookup took too long. Please retry in a moment.");
        return;
      }
      setError(
        err instanceof Error &&
          !(err instanceof TypeError) &&
          !(err instanceof SyntaxError)
          ? err.message
          : "The analysis engine is unavailable. Try again in a moment.",
      );
    } finally {
      clearTimeout(timeout);
      if (version === generation.current) setPhase("idle");
    }
  }

  function change(input: string, immediate = false) {
    if (starting.current) return;
    setValue(input);
    setDetected(null);
    setError("");
    setNotice("");
    controller.current?.abort();
    if (timer.current) clearTimeout(timer.current);
    const version = ++generation.current;
    setPhase(input.trim() ? "detecting" : "idle");
    if (input.trim())
      timer.current = setTimeout(
        () => void detect(input.trim(), version),
        immediate ? 0 : 500,
      );
  }

  async function startAnalysis(payload: Detected) {
    if (
      starting.current ||
      phase !== "idle" ||
      !countries.length ||
      !locales.length
    )
      return;
    const seedTerms = parseKeywords(keywords);
    if (seedTerms.length > MAX_KEYWORDS) {
      setError(`Track up to ${MAX_KEYWORDS} keywords per audit.`);
      return;
    }
    const tooLong = seedTerms.find((term) => term.length > MAX_KEYWORD_CHARS);
    if (tooLong) {
      setError(
        `“${tooLong.slice(0, 24)}…” is longer than ${MAX_KEYWORD_CHARS} characters.`,
      );
      return;
    }
    starting.current = true;
    setPhase("starting");
    setError("");
    wake.current = setTimeout(
      () =>
        setNotice(
          "The engine is warming up. Your first audit can take up to a minute.",
        ),
      5000,
    );
    const request = new AbortController();
    controller.current = request;
    const timeout = setTimeout(() => request.abort(), 90000);
    try {
      const response = await fetch("/aso/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          detected: payload,
          countries,
          locales,
          seed_terms: seedTerms,
        }),
        signal: request.signal,
      });
      const data = await response.json();
      if (response.status === 429 || response.status === 422) {
        // Busy engine, per-connection quota, or invalid input: the engine's
        // own message says exactly what to do next.
        setError(
          data?.detail?.message ||
            "Couldn’t start the audit. Please try again in a minute.",
        );
        return;
      }
      if (!response.ok || typeof data.job_id !== "string" || !data.job_id)
        throw new Error("Couldn’t start the audit. Please try again.");
      // Reports are engine-rendered HTML, so navigation must load a full document.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`/aso/report/${encodeURIComponent(data.job_id)}`);
    } catch {
      setError(
        "Couldn’t start the audit. The engine may be unavailable. Please try again.",
      );
    } finally {
      clearTimeout(timeout);
      if (wake.current) clearTimeout(wake.current);
      setNotice("");
      setPhase("idle");
      starting.current = false;
    }
  }

  function toggle(
    code: string,
    selected: string[],
    update: (value: string[]) => void,
    max: number,
  ) {
    if (selected.includes(code)) {
      if (selected.length > 1) update(selected.filter((item) => item !== code));
    } else if (selected.length < max) update([...selected, code]);
  }

  const allThabit =
    locales.length === THABIT_LOCALES.length &&
    THABIT_LOCALES.every((code) => locales.includes(code));

  return (
    <form
      className="aso-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (detected && detected.kind !== "ambiguous")
          void startAnalysis(detected);
      }}
      aria-busy={phase === "starting"}
    >
      <label className="aso-input-label" htmlFor="app-link">
        App link or identifier
      </label>
      <div className="aso-input-row">
        <span className="aso-input-icon" aria-hidden="true">
          ↗
        </span>
        <input
          id="app-link"
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="Paste your App Store or Google Play link"
          value={value}
          disabled={phase === "starting"}
          onChange={(event) => change(event.target.value)}
          aria-describedby="app-link-help detection-status"
        />
        <button
          className="aso-button"
          disabled={
            phase !== "idle" || !detected || detected.kind === "ambiguous"
          }
          type="submit"
        >
          {phase === "starting"
            ? "Starting audit…"
            : phase === "detecting"
              ? "Finding app…"
              : "Audit my app"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p id="app-link-help" className="aso-input-help">
        Store links, package names, bundle IDs, and numeric App Store IDs.
      </p>
      <div className="aso-samples">
        <span>Take it for a spin</span>
        {samples.map((sample) => (
          <button
            type="button"
            disabled={phase === "starting"}
            key={sample.value}
            onClick={() => change(sample.value, true)}
          >
            {sample.label} <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div id="detection-status" role="status" aria-live="polite">
        {phase === "detecting" && (
          <p className="aso-detection">Looking up your app’s public listing…</p>
        )}
        {detected && detected.kind !== "ambiguous" && (
          <div className="aso-detection">
            <span className="aso-detection-check" aria-hidden="true">
              ✓
            </span>
            <div>
              <strong>
                {detected.name || detected.display || detected.id}
              </strong>
              <p>
                {detected.store === "apple" ? "App Store" : "Google Play"} ·{" "}
                {(detected.country || "us").toUpperCase()} · Ready to audit
              </p>
            </div>
          </div>
        )}
        {notice && <p className="aso-detection">{notice}</p>}
      </div>
      {detected?.kind === "ambiguous" && (
        <fieldset className="aso-ambiguity">
          <legend>This app exists on both stores. Choose one to audit.</legend>
          {(["apple", "play"] as const).map((store) => {
            const option = detected.ambiguity?.[store];
            return option ? (
              <button
                className="aso-button secondary"
                type="button"
                key={store}
                disabled={phase !== "idle"}
                onClick={() => void startAnalysis(option)}
              >
                {store === "apple" ? "App Store" : "Google Play"} ·{" "}
                {option.name || option.id} ↗
              </button>
            ) : null;
          })}
        </fieldset>
      )}
      {error && (
        <div className="aso-error" role="alert">
          <span>{error}</span>
          {!detected && (
            <button type="button" onClick={() => change(value, true)}>
              Retry lookup ↗
            </button>
          )}
        </div>
      )}
      <details className="aso-settings">
        <summary>
          <span className="aso-settings-title">◎ Customize your audit</span>
          <span className="aso-settings-summary">
            {countries.length === 1
              ? COUNTRIES.find(([code]) => code === countries[0])?.[1]
              : `${countries.length} markets`}{" "}
            ·{" "}
            {locales.length === 1
              ? LOCALES.find(([code]) => code === locales[0])?.[1]
              : `${locales.length} languages`}
            <span className="aso-settings-plus" aria-hidden="true">
              +
            </span>
          </span>
        </summary>
        <div className="aso-settings-body">
          <div className="aso-keywords">
            <label htmlFor="aso-keywords">
              Keywords to track <span>optional</span>
            </label>
            <p id="aso-keywords-help">
              Comma-separated, in any language — e.g. dhikr, أذكار, doa harian.
              Each is measured in every market. Leave empty and we derive them
              from your listing.
            </p>
            <textarea
              id="aso-keywords"
              rows={2}
              dir="auto"
              value={keywords}
              disabled={phase === "starting"}
              aria-describedby="aso-keywords-help aso-keywords-count"
              onChange={(event) => setKeywords(event.target.value)}
            />
            <p id="aso-keywords-count" className="aso-keywords-count">
              {parseKeywords(keywords).length}/{MAX_KEYWORDS}
            </p>
          </div>
          <fieldset disabled={phase === "starting"}>
            <legend>
              Markets <span>
                {countries.length}/{MAX_MARKETS}
              </span>
            </legend>
            <p>Select 1–5 storefronts. More markets take longer to measure.</p>
            <div className="aso-options">
              {COUNTRIES.map(([code, name]) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={countries.includes(code)}
                  disabled={
                    countries.includes(code)
                      ? countries.length === 1
                      : countries.length === MAX_MARKETS
                  }
                  onClick={() =>
                    toggle(code, countries, setCountries, MAX_MARKETS)
                  }
                >
                  {name}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset disabled={phase === "starting"}>
            <legend>
              Recommendation languages <span>
                {locales.length}/{MAX_LOCALES}
              </span>
            </legend>
            <p>
              Each language is mined in its own storefront and mapped to the
              exact App Store Connect and Play Console slots to fill. Prose we
              can’t verify publicly is flagged, never guessed.
            </p>
            <button
              type="button"
              className="aso-preset"
              aria-pressed={allThabit}
              onClick={() => setLocales(allThabit ? ["en"] : THABIT_LOCALES)}
            >
              {allThabit ? "✓ " : ""}All 7 Thābit languages
            </button>
            <div className="aso-options">
              {LOCALES.map(([code, name]) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={locales.includes(code)}
                  disabled={
                    locales.includes(code)
                      ? locales.length === 1
                      : locales.length === MAX_LOCALES
                  }
                  onClick={() =>
                    toggle(code, locales, setLocales, MAX_LOCALES)
                  }
                >
                  {name}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </details>
    </form>
  );
}
