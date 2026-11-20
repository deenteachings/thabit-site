import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Noto_Naskh_Arabic,
  Noto_Nastaliq_Urdu,
  Noto_Sans,
  Poppins,
} from "next/font/google";
import "./globals.css";

// Store identity: Poppins ExtraBold headlines (the App Store frames), Noto
// Sans for everything read (the app's UI face), Amiri for Qur'an and du'ā.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
});

// Noto Sans in two halves under one family name: basic Latin is preloaded for
// the first paint; the Latin Extended file (the ā in Thābit, du'ā) is not
// preloaded, and the browser fetches it, by its unicode-range, only when a
// character on screen needs it.
const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  // One metric-matched fallback is enough; the Latin Extended half declares it.
  adjustFontFallback: false,
});

const notoSansExt = Noto_Sans({
  variable: "--font-noto-ext",
  subsets: ["latin-ext"],
  preload: false,
});

// Qur'an and du'ā appear only below the fold, so Amiri is not preloaded.
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  preload: false,
});

// The app's own UI faces for Arabic and Urdu (the /ar and /ur pages, and the
// app's words in those languages). Not preloaded: most visitors never see them.
const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["500", "700"],
  preload: false,
  // Latin letters inside Arabic text fall through to Noto Sans, not to a
  // generated serif fallback.
  adjustFontFallback: false,
});

const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["500", "700"],
  preload: false,
  // Latin letters inside Arabic text fall through to Noto Sans, not to a
  // generated serif fallback.
  adjustFontFallback: false,
});

const DESCRIPTION =
  "When your heart is heavy, Thābit sits with you: a Muslim mental wellness companion with dhikr, du'ā, Qur'an, sleep, meditation and Sakinah, an AI companion who answers at 3am, rooted in the Qur'an and authentic Sunnah.";

export const metadata: Metadata = {
  // The site is served from www (the bare domain redirects there).
  metadataBase: new URL("https://www.thabitapp.com"),
  title: "Thābit: Muslim Mental Wellness",
  description: DESCRIPTION,
  // app/icon.png and app/apple-icon.png: the Pine app icon (file conventions).
  // iOS Safari shows Apple's Smart App Banner for the App Store app.
  itunes: { appId: "6788482756" },
  openGraph: {
    title: "Thābit: Muslim Mental Wellness",
    description: DESCRIPTION,
    url: "https://www.thabitapp.com",
    siteName: "Thābit",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Thābit: When your heart is heavy, we sit with you.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thābit: Muslim Mental Wellness",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

// Browser chrome follows the palette's --page in each mode.
export const viewport: Viewport = {
  // Lets the phone tab bar sit above the home indicator (safe-area insets).
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F4F1" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

// Runs before first paint: marks that scripts run (so [data-reveal] content
// may rise in) and the visitor's platform (so the right badge leads).
const REVEAL_FLAG =
  "document.documentElement.classList.add('js');" +
  // Android visitors see the Google Play badge first.
  "if(/android/i.test(navigator.userAgent))document.documentElement.dataset.platform='android'";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${notoSans.variable} ${notoSansExt.variable} ${amiri.variable} ${naskh.variable} ${nastaliq.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_FLAG }} />
      </head>
      <body className="relative flex min-h-full flex-col">
        <div className="relative z-10 flex min-h-screen flex-1 flex-col">
          {children}
        </div>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
