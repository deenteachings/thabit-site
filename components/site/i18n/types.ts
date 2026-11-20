export type Section = { title: string; body: string };

/** One language's words, all approved: the store listing and the app's i18n. */
export type LocaleCopy = {
  code: "ar" | "ur" | "id" | "tr" | "fr" | "es";
  dir: "ltr" | "rtl";
  native: string;
  /** The app's own notice: translation still improving, ayahs from published translations. */
  notice: string;
  name: string;
  subtitle: string;
  promo: string;
  hero: { head1: string; head2: string; lede: string };
  sections: Record<
    "sakinah" | "athkar" | "dua" | "paths" | "sleep" | "meditation" | "journal" | "tools" | "languages" | "promise",
    Section
  >;
  memorial: string;
  /** Store screenshot captions, in the listing's own order. */
  captions: string[];
  whatsNew: { salam: string; headline: string; items: { name: string; text: string }[] };
  /** The app's translation for each English key the site uses. */
  t: Record<string, string>;
  /** countPhrase output, keyed "sec:4", "breaths:3", "days:7". */
  counts: Record<string, string>;
  /** Morning athkar 2 and 3: the published meaning and the source, localized. */
  athkar: { en: string; src: string }[];
};

export const LOCALES = ["ar", "ur", "id", "tr", "fr", "es"] as const;
export type LocaleCode = (typeof LOCALES)[number];

/** Every language the site speaks, for the switcher (English first). */
export const LANGUAGES: { code: "en" | LocaleCode; native: string; href: string }[] = [
  { code: "en", native: "English", href: "/" },
  { code: "ar", native: "العربية", href: "/ar" },
  { code: "ur", native: "اردو", href: "/ur" },
  { code: "id", native: "Bahasa Indonesia", href: "/id" },
  { code: "tr", native: "Türkçe", href: "/tr" },
  { code: "fr", native: "Français", href: "/fr" },
  { code: "es", native: "Español", href: "/es" },
];
