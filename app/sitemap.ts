import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: business.siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...["quienes-somos", "que-hacemos", "catalogo", "eventos", "preguntas-frecuentes"].map((path) => ({ url: `${business.siteUrl}/${path}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...["aviso-legal", "privacidad", "cookies"].map((path) => ({ url: `${business.siteUrl}/${path}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
