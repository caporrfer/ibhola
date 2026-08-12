import { InteriorPage } from "@/components/InteriorPage";
import { ProductCatalog } from "@/components/ProductCatalog";
export const metadata = { title: "Catálogo | IBHOLA Trail Running" };
export default function Page() { return <InteriorPage eyebrow="Catálogo / Tienda" title="Material para cada forma de correr." intro="Productos de muestra para descubrir las categorías de la tienda. Consulta disponibilidad y tallas con nuestro equipo."><section className="catalog section"><div className="container"><ProductCatalog /></div></section></InteriorPage>; }
