import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/infusion-therapy",
    "/regenerative-therapy",
    "/metabolic-wellness",
    "/aesthetics-hair-growth",
    "/our-story",
    "/service-area",
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
