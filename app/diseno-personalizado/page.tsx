import { CustomDesign } from "@/components/CustomDesign";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Diseño personalizado | IBHOLA Trail Running",
  description: "Diseñamos prendas deportivas personalizadas para clubes, equipos y eventos, desde una unidad hasta grandes pedidos.",
};

export default function Page() {
  return <><Header /><main id="main-content" tabIndex={-1}><CustomDesign /></main><SiteFooter /></>;
}
