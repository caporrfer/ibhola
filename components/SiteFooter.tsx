import { ArrowUpRight } from "lucide-react";
import { business, fullAddress } from "@/config/business";
import { Brand } from "./Brand";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteFooter() {
  return <footer className="footer">
    <div className="container-wide footer__masthead"><p>El camino sigue.</p><a href={`${basePath}/catalogo/`}>Encuentra tu equipo <ArrowUpRight size={24} /></a></div>
    <div className="container-wide footer__grid">
      <div><Brand footer /><p>Trail, running y personas.<br />Desde Corrales, Huelva.</p></div>
      <div><h2>Explora</h2><a href={`${basePath}/catalogo/`}>Catálogo</a><a href={`${basePath}/diseno-personalizado/`}>Diseño personalizado</a><a href={`${basePath}/eventos/`}>Comunidad & eventos</a><a href={`${basePath}/que-hacemos/`}>Qué hacemos</a><a href={`${basePath}/preguntas-frecuentes/`}>Preguntas & contacto</a></div>
      <div><h2>La tienda</h2><a href={business.mapsUrl} target="_blank" rel="noreferrer">{fullAddress} ↗</a><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
      <div><h2>Sigue el ritmo</h2><a href={business.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={business.social.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div>
    </div>
    <div className="container-wide footer__bottom"><p>© {new Date().getFullYear()} IBHOLA TRAIL RUNNING</p><div><a href={`${basePath}/aviso-legal/`}>Aviso legal</a><a href={`${basePath}/privacidad/`}>Privacidad</a><a href={`${basePath}/cookies/`}>Cookies</a></div><span>Nos vemos fuera.</span></div>
  </footer>;
}
