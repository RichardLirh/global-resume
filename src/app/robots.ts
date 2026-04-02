import type { MetadataRoute } from "next";
import { publicWebsite } from "@/data/resume";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    ...(publicWebsite
      ? {
          sitemap: `${publicWebsite}/sitemap.xml`,
          host: publicWebsite,
        }
      : {}),
  };
}
