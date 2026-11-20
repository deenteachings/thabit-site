import type { MetadataRoute } from "next";

const BASE = "https://www.thabitapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.4 },
  ];
}
