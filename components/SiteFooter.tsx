import { Navigation, Phone } from "lucide-react";
import { business, fullAddress } from "@/config/business";
import { Brand } from "./Brand";
import { Topography } from "./Topography";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteFooter() {
  return <>
    <footer className="footer"><Topography className="footer__topography" />
      <div className="container footer__grid">
        <div><Brand footer /><p>Material y asesoramiento profesional para trail &amp; running.<br />Corrales, Huelva.</p></div>
        <div><h2>Explora</h2><a href={`${basePath}/que-hacemos/`}>Qué hacemos</a><a href={`${basePath}/catalogo/`}>Catálogo</a><a href={`${basePath}/eventos/`}>Eventos</a></div>
        <div><h2>Encuéntranos</h2><p>{fullAddress}</p><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a></div>
        <div><h2>Comunidad</h2><a href={business.social.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={business.social.facebook} target="_blank" rel="noreferrer">Facebook ↗</a></div>
      </div>
      <div className="container footer__bottom"><p>© {new Date().getFullYear()} IBHOLA TRAIL RUNNING</p><div><a href={`${basePath}/aviso-legal/`}>Aviso legal</a><a href={`${basePath}/privacidad/`}>Privacidad</a><a href={`${basePath}/cookies/`}>Cookies</a></div><span>Corrales · Huelva</span></div>
    </footer>
    <div className="mobile-action-bar" aria-label="Acciones rápidas">
      <a href={`tel:${business.phone}`} aria-label={`Llamar a IBHOLA: ${business.phoneDisplay}`} title="Llamar a IBHOLA"><Phone size={24} aria-hidden="true" /></a>
      <a href={business.mapsUrl} target="_blank" rel="noreferrer" aria-label="Ver cómo llegar a IBHOLA" title="Cómo llegar"><Navigation size={24} aria-hidden="true" /></a>
    </div>
  </>;
}
