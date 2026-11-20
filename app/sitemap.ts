import type { MetadataRoute } from "next";
import { LANGUAGES } from "@/components/site/i18n/types";

const BASE = "https://www.thabitapp.com";
const languages = Object.fromEntries(LANGUAGES.map((l) => [l.code, `${BASE}${l.href === "/" ? "/" : l.href}`]));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // The home page in every language the site speaks, each naming the others.
    ...LANGUAGES.map((l) => ({
      url: `${BASE}${l.href === "/" ? "/" : l.href}`,
      changeFrequency: "monthly" as const,
      priority: l.code === "en" ? 1 : 0.9,
      alternates: { languages },
    })),
    { url: `${BASE}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.4 },
  ];
}
