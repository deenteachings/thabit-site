import { APP_STORE_URL, PLAY_STORE_URL } from "@/components/store-badges";

// Tells search engines this page is about an app. Facts from the 2.0.0
// listing only; no rating is given because none is published here.
const DATA = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Thābit: Muslim Mental Wellness",
  alternateName: "Thābit",
  url: "https://www.thabitapp.com/",
  image: "https://www.thabitapp.com/og.png",
  description:
    "When your heart is heavy, Thābit sits with you: a Muslim mental wellness companion with dhikr, du'ā, Qur'an, sleep, meditation and Sakinah, an AI companion who answers at 3am, rooted in the Qur'an and authentic Sunnah.",
  operatingSystem: "iOS, Android",
  applicationCategory: "HealthApplication",
  inLanguage: ["en", "ar", "ur", "id", "tr", "fr", "es"],
  installUrl: [APP_STORE_URL, PLAY_STORE_URL],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "DeenTeachings LLP", url: "https://www.thabitapp.com/" },
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(DATA).replace(/</g, "\\u003c") }}
    />
  );
}
