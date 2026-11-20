// Everything the home page says about the app, in one place, copied from the
// app or its store listing. Each block names its source; keep them in step.
//   app   = ~/thabit (the Thābit app repo)
//   store = the 2.0.0 App Store listing (aso.config.json, locales.en.apple)

// app/breathing.tsx BREATH_PATTERNS (seconds). Inhale dhikr shows through
// hold one, exhale dhikr through hold two.
export type BreathPattern = {
  id: "calm" | "rest" | "focus";
  name: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  dIn: string;
  dInEn: string;
  dOut: string;
  dOutEn: string;
};

export const BREATH_PATTERNS: BreathPattern[] = [
  {
    id: "calm",
    name: "Calm",
    inhale: 4,
    hold1: 4,
    exhale: 6,
    hold2: 2,
    dIn: "سُبْحَانَ اللَّهِ",
    dInEn: "SubhanAllah",
    dOut: "الْحَمْدُ لِلَّهِ",
    dOutEn: "Alhamdulillah",
  },
  {
    id: "rest",
    name: "Rest",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    dIn: "اللَّهُ أَكْبَرُ",
    dInEn: "Allahu Akbar",
    dOut: "لَا إِلَهَ إِلَّا اللَّهُ",
    dOutEn: "La ilaha illa Allah",
  },
  {
    id: "focus",
    name: "Focus",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    dIn: "أَسْتَغْفِرُ اللَّهَ",
    dInEn: "Astaghfirullah",
    dOut: "سُبْحَانَ اللَّهِ",
    dOutEn: "SubhanAllah",
  },
];

// app/breathing.tsx RETURN_CYCLE_TARGET
export const BREATH_CYCLES = 3;

// app data/athkar.ts MORNING_ATHKAR, items 2 and 3 (lines 18-31).
export const ATHKAR_DEMO = [
  {
    ar: "قُلْ هُوَ اللَّهُ أَحَدٌ ۚ اللَّهُ الصَّمَدُ ۚ لَمْ يَلِدْ وَلَمْ يُولَدْ ۚ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
    tr: "Qul huwa Allahu ahad. Allahu as-samad. Lam yalid wa lam yulad. Wa lam yakun lahu kufuwan ahad.",
    en: "Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.",
    target: 3,
    src: "Surah Al-Ikhlas · Sunan Abi Dawud 5082 (Hasan) — three times morning and evening, they suffice against everything",
  },
  {
    ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۚ مِن شَرِّ مَا خَلَقَ ۚ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۚ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۚ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    tr: "Qul a'udhu bi rabbi al-falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharri an-naffathati fi al-'uqad. Wa min sharri hasidin idha hasad.",
    en: "Say: I seek refuge in the Lord of daybreak, from the evil of what He created, from the evil of darkness when it settles, from the evil of the blowers in knots, and from the evil of an envier when he envies.",
    target: 3,
    src: "Surah Al-Falaq · Sunan Abi Dawud 5082 (Hasan) — three times morning and evening, they suffice against everything",
  },
];

// app data/athkar.ts: 18 morning, 14 evening.
export const MORNING_COUNT = 18;

// app data/moodSteps.ts (tier, colour, label), drawn by MoodStrip.tsx as a
// mouth inside a tinted circle. Tiers 1-2 are "heavy" and put a companion first.
export const MOOD_STEPS = [
  { tier: 1, color: "#B27A88", label: "Heavy" },
  { tier: 2, color: "#E0A98F", label: "Low" },
  { tier: 3, color: "#EFD8A0", label: "Steady" },
  { tier: 4, color: "#BCDCBF", label: "Light" },
  { tier: 5, color: "#4E8A6E", label: "Very light" },
] as const;

// app i18n/*.ts key "How is your heart?"; names from i18n/index.ts.
export const HEART_QUESTION = [
  { code: "en", name: "English", text: "How is your heart?", dir: "ltr" },
  { code: "ar", name: "العربية", text: "كيف حال قلبك؟", dir: "rtl" },
  { code: "ur", name: "اردو", text: "آپ کا دل کیسا ہے؟", dir: "rtl" },
  { code: "id", name: "Bahasa Indonesia", text: "Bagaimana kabar hatimu?", dir: "ltr" },
  { code: "tr", name: "Türkçe", text: "Kalbin nasıl?", dir: "ltr" },
  { code: "fr", name: "Français", text: "Comment va ton cœur ?", dir: "ltr" },
  { code: "es", name: "Español", text: "¿Cómo está tu corazón?", dir: "ltr" },
] as const;

// app services/windows.ts greeting windows (local hours).
export function greetingFor(hour: number): string {
  if (hour < 5) return "Still awake";
  if (hour < 12) return "Good morning";
  if (hour < 16) return "Good afternoon";
  return "Good evening";
}

// App Store screenshot 2 (the 2.0.0 English set): the opening exchange.
export const SAKINAH_EXAMPLE = {
  user: "I can’t sleep tonight.",
  reply: [
    "Hey. Three a.m. mind is a different kind of loud.",
    "Want to just talk through what's keeping you up, or just sit here quiet for a bit? Either one's fine with us. Allah's not asleep either way, He's close even at this hour.",
  ],
};

// app app/paths.tsx PATH_ORDER with data/programs.ts and data/paths/*.ts.
export const PATHS = [
  { title: "Seven Days with Sabr", days: 7, free: true },
  { title: "Anxiety — 10 Days of Grounding", days: 10, free: true },
  { title: "Returning to Salah — 14 Days", days: 14, free: true },
  { title: "After a Loss — 40 Days", days: 40, free: true },
  { title: "Waswas", days: 21, free: false },
  { title: "The Heavy Heart", days: 30, free: false },
  { title: "Sleep & the Believing Heart", days: 21, free: false },
  { title: "Breaking Free", days: 40, free: false },
  { title: "Gratitude", days: 14, free: true },
  { title: "Patience", days: 14, free: false },
  { title: "Tawakkul", days: 14, free: false },
  { title: "Forgiveness", days: 14, free: false },
  { title: "Du'a", days: 14, free: false },
  { title: "Grief", days: 21, free: false },
  { title: "Thinking Well of Allah", days: 14, free: false },
  { title: "Presence in Prayer", days: 14, free: false },
  { title: "Ramadan", days: 30, free: false },
  { title: "The Wound Someone Gave You", days: 21, free: false },
  { title: "Enough", days: 21, free: false },
];

// app data/dailyMeditation.ts subtitles; data/hardDays.ts titles.
export const SITTINGS = {
  morning: [
    "When the morning is ordinary",
    "Before the day starts asking",
    "When the day is already heavy",
    "When you want the day to start with Him",
    "When no one will notice what you do",
    "When big plans keep falling apart",
  ],
  evening: [
    "The end of an ordinary day",
    "When you regret something",
    "When you're too tired for more",
    "When your mind won't settle",
    "When unwanted thoughts won't leave",
    "When there's something you need",
  ],
  hardDays: [
    "When getting up feels like too much",
    "When you feel nothing at all",
    "When you think Allah is angry with you",
    "When the sadness has no name",
    "When everything feels too big",
    "When asking for help feels wrong",
    "When you feel alone",
    "When you can't sleep",
    "When it comes back",
    "When your prayer is lifted",
    "When you're tired of carrying it",
  ],
};

// app data/sleepStories.ts
export const SLEEP_STORIES = [
  { title: "The Well and the Stars", about: "The story of Yusuf (AS)", minutes: 12 },
  { title: "The Cave", about: "The night of Hijra", minutes: 10 },
  { title: "The Night Journey", about: "Isra wal-Mi'raj", minutes: 15 },
  { title: "After the Rain", about: "Aisha (RA) remembers", minutes: 8 },
];

// app data/spaces.ts SPACES
export const SPACES = [
  { id: "pine", name: "Pine", deep: "#0E3A2A", mid: "#245C42", lit: "#2F7D5B", dark: "#38A880" },
  { id: "dawn", name: "Dawn", deep: "#5A3210", mid: "#8A521C", lit: "#9C5D16", dark: "#E0AC63" },
  { id: "night", name: "Night", deep: "#141E3A", mid: "#24365E", lit: "#2E4A7C", dark: "#8FAEE0" },
  { id: "rose", name: "Rose", deep: "#5A2230", mid: "#8A3850", lit: "#A84A63", dark: "#E79BB1" },
  { id: "olive", name: "Olive", deep: "#2F3A14", mid: "#4C5A22", lit: "#66762F", dark: "#B6C77E" },
  { id: "ocean", name: "Ocean", deep: "#0A3540", mid: "#155A66", lit: "#1F7382", dark: "#66C6D2" },
] as const;

// store: What's New in This Version (2.0.0), the feature lines, verbatim.
export const WHATS_NEW = [
  { name: "Meditation", text: "a new tab with twelve morning and evening sittings, Hard Days sittings for when the heart is heavy, and nature sounds with a timer." },
  { name: "Practices", text: "breathing, athkar, dhikr, sleep and more, gathered in one tab." },
  { name: "Paths", text: "every guided program and journey in one place. Day one of every path is free." },
  { name: "Journal", text: "now a tab of its own." },
  { name: "Daily Return", text: "we ask what the heart needs today and offer one small step (Practices / Daily)." },
  { name: "Today's notes", text: "three short notes each day, in your language." },
  { name: "Her Days", text: "during your period, prayer habits step aside quietly instead of showing as missed, and your streaks wait for you." },
  { name: "Du'ā Together", text: "every request is checked before anyone sees it, any request can be reported, and anyone can be blocked." },
  { name: "Cloud copy", text: "off until you turn it on: your journal and more are sealed on your phone before they leave, so we cannot read them (Settings / Privacy & Safety)." },
];

// The ten App Store screenshots (2.0.0, English), in store order.
export const STORE_SHOTS = [
  { file: "01", alt: "Islamic healing. Guided paths for grief, loss and heavy seasons." },
  { file: "02", alt: "Talk to Sakinah. An AI companion for heavy moments, grounded in Islam." },
  { file: "03", alt: "Qur'an & Sunnah. Every hadith authentic, cited, in seven languages." },
  { file: "04", alt: "Dawn & dusk. 32 morning and evening athkar, with a tap counter." },
  { file: "05", alt: "When it hurts. 45 duas for 11 moments of life. Ask others to pray for you." },
  { file: "06", alt: "Private journal. Lock it with Face ID. Write it, or say it." },
  { file: "07", alt: "Calm for tonight. Soft audio and 4 sleep stories for the long nights." },
  { file: "08", alt: "Breathe, be still. Guided breathing and short meditations." },
  { file: "09", alt: "At a glance. 9 widgets for ayah, dhikr, habits and more, in 3 sizes." },
  { file: "10", alt: "Today's notes. For the heart, for hope, and for the day ahead." },
];
