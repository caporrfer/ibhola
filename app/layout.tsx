import type { Metadata, Viewport } from "next";
import { business } from "@/config/business";
import { SiteEnhancements } from "@/components/SiteEnhancements";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: "IBHOLA Trail Running | Tienda de Trail y Running en Huelva",
  description: "IBHOLA Trail Running, tienda especializada en trail y running en Corrales, Huelva. Zapatillas, ropa, accesorios y asesoramiento deportivo especializado.",
  keywords: ["tienda trail running Huelva", "trail running Huelva", "zapatillas trail Huelva", "tienda running Huelva", "tienda deportes Corrales", "running Aljaraque", "IBHOLA Trail Running"],
  alternates: { canonical: business.siteUrl },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: business.siteUrl,
    siteName: business.name,
    title: "IBHOLA Trail Running | Especialistas en Huelva",
    description: "Material técnico y asesoramiento personalizado para trail y running en Corrales, Huelva.",
    images: [{ url: `${business.siteUrl}/images/corredor-original.jpg`, width: 945, height: 520, alt: "Corredor de IBHOLA Trail Running" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IBHOLA Trail Running | Corrales, Huelva",
    description: "Especialistas en trail y running. Material técnico y asesoramiento de verdad.",
    images: [`${business.siteUrl}/images/corredor-original.jpg`],
  },
  icons: { icon: `${business.siteUrl}/icon.svg` },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f3eb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><SiteEnhancements />{children}</body></html>;
}
