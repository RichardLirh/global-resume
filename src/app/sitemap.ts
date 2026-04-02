import type { MetadataRoute } from "next";
import { publicWebsite } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!publicWebsite) {
    return [];
  }

  return [
    {
      url: publicWebsite,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${publicWebsite}/resume.json`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
