import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import "../site.css";
import Nav from "@/components/site/nav";
import Footer from "@/components/footer";
import Reveals from "@/components/site/reveals";
import StoreBadges from "@/components/store-badges";
import TabBar, { type Tab } from "@/components/site/tab-bar";
import BreatheDemo, { BREATHE_EN, type BreatheLabels } from "@/components/site/breathe-demo";
import AthkarDemo, { type AthkarLabels } from "@/components/site/athkar-demo";
import { HeartCard } from "@/components/site/heart-check";
import { DuaCard, DUA_EN } from "@/components/site/dua-together";
import Sittings from "@/components/site/sittings";
import { PathsGrid } from "@/components/site/paths";
import SpacePicker from "@/components/site/space-picker";
import { HEART_QUESTION, PATHS, SITTINGS, SLEEP_STORIES, SPACES } from "@/components/site/data";
import { LANGUAGES, LOCALES, type LocaleCode, type LocaleCopy } from "@/components/site/i18n/types";

// Each language's words (generated, approved only), loaded for its own page.
const COPY: Record<LocaleCode, () => Promise<{ default: LocaleCopy }>> = {
  ar: () => import("@/components/site/i18n/ar"),
  ur: () => import("@/components/site/i18n/ur"),
  id: () => import("@/components/site/i18n/id"),
  tr: () => import("@/components/site/i18n/tr"),
  fr: () => import("@/components/site/i18n/fr"),
  es: () => import("@/components/site/i18n/es"),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

async function load(lang: string): Promise<LocaleCopy> {
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  return (await COPY[lang as LocaleCode]()).default;
}

const ALTERNATES = Object.fromEntries(LANGUAGES.map((l) => [l.code, l.href]));

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const c = await load(lang);
  const description = c.hero.head1 + (c.hero.head2 ? ` ${c.hero.head2}` : "");
  return {
    title: c.name,
    description: c.promo,
    alternates: { canonical: `/${lang}`, languages: { ...ALTERNATES, "x-default": "/" } },
    openGraph: { title: c.name, description, url: `/${lang}`, siteName: "Thābit", locale: lang, type: "website", images: ["/og.png"] },
  };
}

/** A caption or title as the store's two-line headline: split after its first comma or full stop. */
function twoLines(text: string): [string, string] {
  const m = text.match(/^(.+?[,،.۔])\s+(.+)$/);
  return m ? [m[1], m[2]] : [text, ""];
}

function Head({ id, text, tag = "h2", size }: { id: string; text: string; tag?: "h2" | "h3"; size?: "sm" }) {
  const [a, b] = twoLines(text);
  const Tag = tag;
  return (
    <Tag id={id} className={`display${size ? " display-sm" : ""}`} data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
      {a}
      {b && <span className="accent">{b}</span>}
    </Tag>
  );
}

function Shot({ lang, n, alt, priority = false }: { lang: string; n: number; alt: string; priority?: boolean }) {
  return (
    <Image
      src={`/app/store/${lang}/${String(n).padStart(2, "0")}.webp`}
      alt={alt}
      width={600}
      height={1300}
      unoptimized
      priority={priority}
      className="store-shot"
    />
  );
}

export default async function LocalizedHome({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const c = await load(lang);
  const t = (k: string) => c.t[k] ?? k;
  const S = c.sections;

  const breathe: BreatheLabels = {
    title: t("Breathing"),
    patterns: { calm: t("Calm"), rest: t("Rest"), focus: t("Focus") },
    phases: { inhale: t("Inhale"), hold1: t("Hold"), exhale: t("Exhale"), hold2: t("Rest") },
    caption: { inhale: t("IN"), hold1: t("HOLD"), exhale: t("OUT"), hold2: t("REST") },
    phaseOf: t("PHASE {n} OF {total}"),
    ofSpace: t("of space"),
    firstRun: t("Three slow breaths, under a minute. You can stop whenever you need."),
    perCycle: t("Per cycle"),
    begin: t("Begin session"),
    pause: t("Pause"),
    cont: t("Continue"),
    counts: { ...BREATHE_EN.counts, ...c.counts },
  };
  const athkar: AthkarLabels = {
    morning: t("Morning"),
    of: t("of"),
    remaining: t("{{remaining}} remaining"),
    begin: t("We begin with gratitude"),
    building: t("We are building our morning"),
    peace: t("Peace, one dhikr at a time"),
    transliteration: t("TRANSLITERATION"),
    translation: t("TRANSLATION"),
    source: t("SOURCE"),
    tap: t("Tap to count"),
    done: t("Done"),
    previous: t("Previous"),
    reset: t("Reset"),
    items: c.athkar,
  };
  const titles = Object.fromEntries(
    [...PATHS.map((p) => p.title), ...SITTINGS.morning, ...SITTINGS.evening, ...SITTINGS.hardDays, ...SLEEP_STORIES.flatMap((s) => [s.title, s.about])].map(
      (k) => [k, t(k)],
    ),
  );
  // App Store screenshots, in their order, each named by the feature it shows.
  const shotAlt = [
    S.paths.title, S.sakinah.title, S.promise.title, S.athkar.title, S.dua.title,
    S.journal.title, S.sleep.title, S.meditation.title, c.whatsNew.items[10]?.text, c.whatsNew.items[7]?.text,
  ];
  const promises = S.promise.body.split(/(?<=[.۔])\s+/).filter(Boolean);
  const [nameA, nameB] = (() => {
    const i = c.name.search(/[:：]/);
    return i > 0 ? [c.name.slice(0, i).trim(), c.name.slice(i + 1).trim()] : [c.name, ""];
  })();
  const startLang = Math.max(0, HEART_QUESTION.findIndex((q) => q.code === lang));
  const tabs: Tab[] = [
    { href: "#top", label: t("Home"), icon: "house@light", iconOn: "house", sections: ["top", "heart"] },
    { href: "#sakinah", label: t("Sakinah"), icon: "sparkle@light", iconOn: "sparkle", sections: ["sakinah"] },
    { href: "#breathe", label: t("Practices"), icon: "squares-four", iconOn: "squares-four@fill", sections: ["breathe", "athkar", "dua", "paths"] },
    { href: "#meditation", label: t("Meditation"), icon: "flower", iconOn: "flower", sections: ["meditation"] },
    { href: "#space", label: t("Your Space"), icon: "palette@light", iconOn: "palette@fill", sections: ["space", "new", "screens", "promise", "download"] },
  ];

  return (
    <div className="site" lang={lang} dir={c.dir}>
      <Nav
        lang={lang}
        ctaLabel={null}
        links={[
          { href: "#sakinah", label: t("Sakinah") },
          { href: "#breathe", label: t("Practices") },
          { href: "#meditation", label: t("Meditation") },
          { href: "#space", label: t("Your Space") },
        ]}
      />
      <main id="main">
        {/* Hero: the listing's opening line and its first paragraph. */}
        <section id="top" className="hero field-paper" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="micro hero-eyebrow enter">{c.name}</p>
            <h1
              id="hero-title"
              className={`display enter${c.hero.head1.length + c.hero.head2.length > 50 ? " display-long" : ""}`}
              style={{ "--d": "55ms" } as React.CSSProperties}
            >
              {c.hero.head1}
              {c.hero.head2 && <span className="accent">{c.hero.head2}</span>}
            </h1>
            <p className="lede enter" style={{ "--d": "110ms" } as React.CSSProperties}>
              {c.hero.lede}
            </p>
            <div className="enter" style={{ "--d": "165ms" } as React.CSSProperties}>
              <StoreBadges />
              <p className="micro hero-note">{c.subtitle}</p>
              <p className="hero-notice">{c.notice}</p>
            </div>
          </div>
          <div className="hero-stage field-pine">
            <div className="splash-glow" aria-hidden="true" />
            <div className="hero-phone">
              <Shot lang={lang} n={1} alt={shotAlt[0]} priority />
            </div>
          </div>
        </section>

        {/* How is your heart: the app's own question and faces. */}
        <section id="heart" className="chapter field-paper" aria-labelledby="heart-title">
          <div className="wrap heart heart-solo">
            <h2 id="heart-title" className="display display-sm" data-reveal>
              {t("How is your heart?")}
            </h2>
            <div data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              <HeartCard
                startLang={startLang}
                labels={{ moods: [t("Heavy"), t("Low"), t("Steady"), t("Light (mood)"), t("Very light")] }}
              />
            </div>
          </div>
        </section>

        <section id="sakinah" className="chapter field-ink" aria-labelledby="sakinah-title">
          <div className="wrap split">
            <div className="split-copy">
              <p className="micro" data-reveal>{S.sakinah.title}</p>
              <Head id="sakinah-title" text={c.captions[0]} />
              <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>{S.sakinah.body}</p>
            </div>
            <figure className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              <Shot lang={lang} n={2} alt={shotAlt[1]} />
            </figure>
          </div>
        </section>

        <section id="breathe" className="chapter field-lit breathe-chapter" aria-labelledby="breathe-title">
          <div className="breathe-halo" aria-hidden="true" />
          <div className="wrap center-copy">
            <p className="micro" data-reveal>{S.tools.title}</p>
            <Head id="breathe-title" text={c.captions[6]} />
          </div>
          <div className="wrap breathe-stage" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
            <BreatheDemo labels={breathe} />
          </div>
        </section>

        <section id="athkar" className="chapter field-paper" aria-labelledby="athkar-title">
          <div className="wrap split split-flip">
            <div className="split-copy">
              <p className="micro" data-reveal>{S.athkar.title}</p>
              <Head id="athkar-title" text={c.captions[1]} />
              <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>{S.athkar.body}</p>
            </div>
            <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              <AthkarDemo labels={athkar} />
            </div>
          </div>
        </section>

        <section id="dua" className="chapter field-ink" aria-labelledby="dua-title">
          <div className="wrap split">
            <div className="split-copy">
              <p className="micro" data-reveal>{t("Du'ā Together")}</p>
              <Head id="dua-title" text={c.captions[8]} />
              <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
                {t("Make du'ā for others. The angel says Āmīn for you too.")}
              </p>
              <ul className="facts" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
                <li>{t("Your request is shared anonymously with others praying tonight, and it is removed after 48 hours. No name is ever attached to it.")}</li>
                {c.whatsNew.items[9] && <li>{c.whatsNew.items[9].text}</li>}
              </ul>
            </div>
            <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              <DuaCard
                labels={{
                  today: t("TODAY"),
                  title: t("A Muslim needs your du'ā"),
                  body: t("You don't know their name. But your du'ā reaches a waiting heart — and the angel says Āmīn for you too."),
                  button: t("I made du'ā"),
                  hadithEn: t(DUA_EN.hadithEn),
                  src: t("Sahih Muslim 2733"),
                }}
              />
            </div>
          </div>
        </section>

        <section id="meditation" className="chapter field-pine" aria-labelledby="meditation-title">
          <div className="wrap split">
            <div className="split-copy">
              <p className="micro" data-reveal>{S.meditation.title}</p>
              <Head id="meditation-title" text={c.captions[7]} />
              <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>{S.meditation.body}</p>
              <div data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
                <Sittings
                  labels={{ name: t("Meditation"), tabs: { morning: t("Morning"), evening: t("Evening"), hardDays: t("Hard Days") }, titles }}
                />
              </div>
            </div>
            <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              <Shot lang={lang} n={8} alt={shotAlt[7]} />
            </div>
          </div>
          <div className="wrap split split-flip sleep">
            <div className="split-copy">
              <p className="micro" data-reveal>{S.sleep.title}</p>
              <Head id="sleep-title" text={c.captions[4]} tag="h3" size="sm" />
              <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>{S.sleep.body}</p>
              <ul className="stories" data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
                {SLEEP_STORIES.map((s) => (
                  <li key={s.title}>
                    <span className="story-title">{titles[s.title]}</span>
                    <span className="story-about">{titles[s.about]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="split-stage" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>
              <Shot lang={lang} n={7} alt={shotAlt[6]} />
            </div>
          </div>
        </section>

        <section id="paths" className="chapter field-paper" aria-labelledby="paths-title">
          <div className="wrap">
            <div className="paths-head">
              <div>
                <p className="micro" data-reveal>{S.paths.title}</p>
                <Head id="paths-title" text={c.captions[2]} />
              </div>
              <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>{S.paths.body}</p>
            </div>
            <PathsGrid labels={{ all: t("All"), onlyFree: t("Free"), freeTag: t("Free"), titles, days: c.counts }} />
          </div>
        </section>

        <SpacePicker
          copy={{
            eyebrow: t("Your Space"),
            head1: c.whatsNew.items[11]?.text ?? t("Your Space"),
            body: c.whatsNew.items[10] ? [c.whatsNew.items[10].text] : [],
            names: Object.fromEntries(SPACES.map((s) => [s.name, t(s.name)])),
            compact: true,
          }}
        />

        <section id="new" className="chapter field-ink" aria-labelledby="new-title">
          <div className="wrap">
            <p className="micro" data-reveal>{c.whatsNew.salam}</p>
            <h2 id="new-title" className="display display-sm" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
              {c.whatsNew.headline}
            </h2>
            <ul className="new-list">
              {c.whatsNew.items.slice(1, 12).map((w, i) => (
                <li key={w.text} data-reveal style={{ "--d": `${140 + Math.min(i, 6) * 55}ms` } as React.CSSProperties}>
                  {w.name && <span className="new-name">{w.name}</span>}
                  <span className="new-text">{w.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="screens" className="chapter field-paper" aria-labelledby="screens-title">
          <div className="wrap gallery-head">
            <div>
              <h2 id="screens-title" className="display display-sm" data-reveal>{S.languages.title}</h2>
              <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>{S.languages.body}</p>
            </div>
          </div>
          <ul className="gallery" tabIndex={0} aria-labelledby="screens-title">
            {shotAlt.map((alt, i) => (
              <li key={i}>
                <Image src={`/app/store/${lang}/${String(i + 1).padStart(2, "0")}.webp`} alt={alt ?? c.name} width={600} height={1300} unoptimized loading="lazy" />
              </li>
            ))}
          </ul>
        </section>

        <section id="promise" className="chapter field-paper" aria-labelledby="promise-title">
          <div className="wrap">
            <h2 id="promise-title" className="display display-sm" data-reveal>{S.promise.title}</h2>
            <ul className="promise-grid">
              {promises.map((p, i) => (
                <li key={p} data-reveal style={{ "--d": `${140 + i * 55}ms` } as React.CSSProperties}>
                  <span className="promise-text">{p}</span>
                </li>
              ))}
            </ul>
            <figure className="dedication" data-reveal>
              <blockquote>{c.memorial}</blockquote>
            </figure>
          </div>
        </section>

        <section id="download" className="chapter field-pine get-app" aria-labelledby="download-title">
          <div className="splash-glow" aria-hidden="true" />
          <div className="wrap get-app-inner">
            <Image src="/app/spaces/pine-icon-light.webp" alt="" width={240} height={240} unoptimized className="get-app-icon" data-reveal />
            <h2 id="download-title" className="display" data-reveal style={{ "--d": "55ms" } as React.CSSProperties}>
              {nameA}
              {nameB && <span className="accent">{nameB}</span>}
            </h2>
            <p className="body-lg" data-reveal style={{ "--d": "110ms" } as React.CSSProperties}>{c.promo}</p>
            <div data-reveal style={{ "--d": "165ms" } as React.CSSProperties}>
              <StoreBadges className="store-badges-center" />
            </div>
          </div>
        </section>
      </main>
      <Footer
        labels={{
          tagline: c.subtitle,
          support: "Support",
          privacy: t("Privacy Policy"),
          terms: t("Terms of Service"),
          home: `/${lang}`,
          base: "© 2026 DeenTeachings LLP",
          notice: c.notice,
        }}
      />
      <TabBar tabs={tabs} />
      <Reveals />
    </div>
  );
}
