import { Header } from "@/components/Header";
import { ProductCatalog } from "@/components/ProductCatalog";
import { RevealObserver } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
export const metadata = { title: "Catálogo | IBHOLA Trail Running" };
export default function Page() { return <><RevealObserver /><Header /><main id="main-content" className="catalog-page" tabIndex={-1}><ProductCatalog /></main><SiteFooter /></>; }
