import { InteriorPage } from "@/components/InteriorPage";
import { ProductCatalog } from "@/components/ProductCatalog";
export const metadata = { title: "Catálogo | IBHOLA Trail Running" };
export default function Page() { return <InteriorPage title="Material para cada forma de correr." intro="Descubre las categorías y marcas que trabajamos en tienda. Te asesoramos según tu pisada, tus objetivos y el terreno que disfrutas."><section className="catalog section"><div className="container"><ProductCatalog /></div></section></InteriorPage>; }
