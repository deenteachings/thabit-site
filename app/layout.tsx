import type { Metadata, Viewport } from "next";
import { Amiri } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thabitapp.com"),
  title: "Thābit — Islamic emotional healing",
  description:
    "Thābit is a gentle Islamic emotional healing app from the team behind @thethabitapp. Adhkar, a listening companion, and daily practices rooted in authentic sources — for the days when your heart feels heavy.",
  icons: {
    icon: [
      { url: "/icon.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    title: "Thābit — Islamic emotional healing",
    description:
      "A gentle companion for the Muslim heart. Adhkar, a listening companion, and daily practices rooted in authentic sources.",
    url: "https://thabitapp.com",
    siteName: "Thābit",
    type: "website",
  },
};

// Browser chrome follows the palette's --page in each mode.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F4F1" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${amiri.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col">
        <div className="aurora" aria-hidden="true" />
        <div className="relative z-10 flex min-h-screen flex-1 flex-col">
          {children}
        </div>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
