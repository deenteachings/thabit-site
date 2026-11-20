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

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "latin-ext"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

// The app's own UI faces for Arabic and Urdu, used only where the site shows
// the app's words in those languages. Not preloaded: most visitors never see them.
const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["500"],
  preload: false,
});

const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["500"],
  preload: false,
});

const DESCRIPTION =
  "When your heart is heavy, Thābit sits with you: a Muslim mental wellness companion with dhikr, du'ā, Qur'an, sleep, meditation and Sakinah, an AI companion who answers at 3am, rooted in the Qur'an and authentic Sunnah.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thabitapp.com"),
  title: "Thābit: Muslim Mental Wellness",
  description: DESCRIPTION,
  icons: {
    icon: [
      { url: "/icon.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "Thābit: Muslim Mental Wellness",
    description: DESCRIPTION,
    url: "https://thabitapp.com",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F4F1" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

// Runs before first paint: marks that scripts run, so [data-reveal] content
// may start hidden and rise in. Without JavaScript nothing is ever hidden.
const REVEAL_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${notoSans.variable} ${amiri.variable} ${naskh.variable} ${nastaliq.variable} h-full antialiased`}
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
