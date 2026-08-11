import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/infusion-therapy",
    "/regenerative-therapy",
    "/metabolic-wellness",
    "/aesthetics-hair-growth",
    "/vaccinations",
    "/our-story",
    "/blog",
    "/service-area",
    "/lab-partners",
    "/reviews",
    "/privacy",
    "/id",
    "/id/infusion-therapy",
    "/id/regenerative-therapy",
    "/id/metabolic-wellness",
    "/id/aesthetics-hair-growth",
    "/id/vaccinations",
    "/id/our-story",
    "/id/service-area",
    "/id/lab-partners",
    "/id/reviews",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const posts = await getPublishedPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_at ?? post.created_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
