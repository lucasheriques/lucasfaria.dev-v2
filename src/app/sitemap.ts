import { MetadataRoute } from "next";

import { SITE_URL } from "@/helpers/constants";
import { getBlogPostList, getBytesList } from "@/helpers/file-helpers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ideas = await getBlogPostList();
  const bytes = await getBytesList();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ideas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bytes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...ideas.map((idea) => ({
      url: `${SITE_URL}/${idea.slug}`,
      lastModified: new Date(idea.updatedAt ?? idea.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...bytes.map((byte) => ({
      url: `${SITE_URL}/${byte.slug}`,
      lastModified: new Date(byte.updatedAt ?? byte.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
