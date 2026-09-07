"use client";

import { useCallback, useRef, useState } from "react";

type Sample = { label: string; value: string };

type Detected = {
  kind: string;
  store?: string;
  id?: string;
  display?: string;
  country?: string;
  name?: string;
  icon_url?: string;
  ambiguity?: {
    apple?: Record<string, unknown>;
    play?: Record<string, unknown>;
  };
  error?: { message?: string };
};

const COUNTRIES = ["us", "gb", "ae", "sa", "pk", "in", "ca", "au", "id", "tr", "fr", "es", "de", "my", "ng", "ma", "bd", "eg"];

const API = "/aso/api";

export default function AsoForm({ samples }: { samples: Sample[] }) {
  const [value, setValue] = useState("");
  const [detected, setDetected] = useState<Detected | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState<string[]>(["us"]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runDetect = useCallback((input: string) => {
    if (!input.trim()) {
      setDetected(null);
      setError("");
      return;
    }
    setBusy(true);
    fetch(`${API}/detect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    })
      .then((r) => r.json())
      .then((data: Detected) => {
        setError("");
        setDetected(data.error ? null : data);
        if (data.error) setError(data.error.message || "Unrecognised input.");
      })
      .catch(() => {
        setDetected(null);
        setError("The analysis engine is offline right now — try again soon.");
      })
      .finally(() => setBusy(false));
  }, []);

  const onChange = (input: string) => {
    setValue(input);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => runDetect(input), 600);
  };

  const startAnalysis = (payload: Record<string, unknown>) => {
    setBusy(true);
    fetch(`${API}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ detected: payload, countries }),
    })
      .then((r) => r.json())
      .then((data: { job_id?: string }) => {
        if (data.job_id) {
          // The report page is served by the proxied engine, not a Next page.
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.href = `/aso/report/${data.job_id}`;
        } else setError("Could not start the analysis.");
      })
      .catch(() => setError("The analysis engine is offline right now — try again soon."))
      .finally(() => setBusy(false));
  };

  const toggleCountry = (code: string) => {
    setCountries((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : prev.length < 5
          ? [...prev, code]
          : prev
    );
  };

  const submit = () => {
    if (!detected || detected.kind === "ambiguous") return;
    startAnalysis(detected);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="input-hero"
          type="text"
          spellCheck={false}
          placeholder="https://apps.apple.com/us/app/id…  ·  com.example.app  ·  play.google.com/store/apps/details?id=…"
          aria-label="App Store or Google Play link, package name, or numeric id"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
        />
        <button
          className="btn-pill btn-solid w-full sm:w-auto"
          type="button"
          onClick={submit}
          disabled={busy || !detected || detected.kind === "ambiguous"}
        >
          {busy ? "Working…" : "Analyze"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {samples.map((s) => (
          <button
            key={s.value}
            type="button"
            className="chip"
            onClick={() => {
              setValue(s.value);
              runDetect(s.value);
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {detected?.kind === "ambiguous" && (
        <div className="detect-box mt-4" role="group" aria-label="Choose a store">
          <p className="section-label">This identifier exists on both stores</p>
          <p className="mt-1 text-[13px] text-tertiary">{detected.display}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["apple", "play"] as const).map((store) => {
              const opt = detected.ambiguity?.[store] as Detected | undefined;
              if (!opt) return null;
              return (
                <button
                  key={store}
                  type="button"
                  className="btn-pill btn-outline h-10 px-5 text-[13px]"
                  onClick={() => startAnalysis(opt)}
                >
                  {store === "apple" ? "App Store" : "Google Play"} — {opt.name || opt.id}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {detected && detected.kind !== "ambiguous" && (
        <div className="detect-box mt-4 flex items-center gap-3">
          {detected.icon_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={detected.icon_url} alt="" className="h-11 w-11 rounded-[10px] border border-border bg-surface" />
          )}
          <div>
            <p className="text-[15px] font-semibold text-primary">{detected.name || detected.display}</p>
            <p className="text-[12px] text-tertiary">
              {detected.store === "apple" ? "App Store" : "Google Play"} ·{" "}
              {(detected.country || "us").toUpperCase()}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="error-box mt-4" role="alert">
          {error}
        </div>
      )}

      <p className="section-label mt-8">Measure rank in</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {COUNTRIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${countries.includes(c) ? "chip-on" : ""}`}
            aria-pressed={countries.includes(c)}
            onClick={() => toggleCountry(c)}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[12px] text-tertiary">
        Every selected storefront is measured per term. More countries means a
        slower analysis — the storefronts are asked politely, one at a time.
      </p>
    </div>
  );
}
