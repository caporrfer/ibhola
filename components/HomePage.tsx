import { ArrowRight, ArrowUpRight, Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { business } from "@/config/business";
import { Header } from "./Header";
import { MotionConstellation } from "./MotionConstellation";
import { RevealObserver } from "./Reveal";
import { SiteFooter } from "./SiteFooter";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function HomePage() {
  return <><RevealObserver /><Header />
    <main className="neo-home">
      <MotionConstellation />
      <section className="neo-hero" id="inicio">
        <div className="neo-hero__stage">
          <div className="ambient-particles" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} />)}</div>
          <div className="neo-shell neo-hero__grid">
            <div className="neo-hero__copy">
              <p className="neo-kicker">TRAIL · RUNNING · HUELVA</p>
              <h1>Tu próximo<br /><span>movimiento</span><br />empieza aquí.</h1>
              <p className="neo-lead">Material técnico y asesoramiento de alguien que también suma kilómetros. Ven, cuéntanos cómo corres y encuentra lo que realmente necesitas.</p>
              <div className="neo-actions"><a className="neo-button" href={`${basePath}/catalogo/`}>Explorar catálogo <ArrowRight size={17} /></a><a className="neo-link" href={business.mapsUrl} target="_blank" rel="noreferrer">Visitar la tienda <ArrowUpRight size={16} /></a></div>
            </div>
          </div>
          <div className="neo-hero__foot neo-shell"><span>IBHOLA / CORRALES</span><span>SCROLL PARA TRANSFORMAR ↓</span></div>
        </div>
      </section>

      <section className="neo-section neo-manifesto" id="presentacion"><div className="neo-shell neo-split reveal">
        <h2>No vendemos<br />por vender.<br /><span>Te escuchamos.</span></h2>
        <div><p className="neo-kicker">01 / NUESTRA FORMA DE HACER</p><p className="neo-copy">Cada pisada, cada terreno y cada objetivo pide algo diferente. En IBHOLA combinamos experiencia real, criterio técnico y atención cercana para ayudarte a elegir bien.</p><a className="neo-link neo-link--amber" href={`${basePath}/que-hacemos/`}>Así trabajamos <ArrowRight size={16} /></a></div>
      </div></section>

      <section className="neo-section neo-paths"><div className="neo-shell">
        <p className="neo-kicker reveal">02 / TODO PARA MOVERTE</p>
        <div className="neo-path reveal"><span>01</span><h3>Corre</h3><p>Calzado de asfalto y trail elegido para tu pisada, distancia y terreno.</p><a href={`${basePath}/catalogo/#calzado`} aria-label="Ver calzado"><ArrowUpRight /></a></div>
        <div className="neo-path reveal"><span>02</span><h3>Equípate</h3><p>Textil, hidratación, nutrición y accesorios que funcionan cuando los necesitas.</p><a href={`${basePath}/catalogo/`} aria-label="Ver equipamiento"><ArrowUpRight /></a></div>
        <div className="neo-path reveal"><span>03</span><h3>Comparte</h3><p>Eventos, pruebas y una comunidad unida por las ganas de sumar kilómetros.</p><a href={`${basePath}/eventos/`} aria-label="Ver eventos"><ArrowUpRight /></a></div>
      </div></section>

      <section className="neo-section neo-proof"><div className="neo-shell neo-split reveal">
        <div><p className="neo-kicker">03 / CONFIANZA LOCAL</p><div className="neo-rating"><strong>{business.rating.toFixed(1)}</strong><span>★★★★★<small>{business.reviewCount} opiniones en Google</small></span></div></div>
        <h2>La mejor señal:<br /><span>quien vuelve.</span></h2>
      </div><div className="neo-shell neo-proof__action reveal"><p>Opiniones reales de corredores que ya han pasado por la tienda.</p><a className="neo-button" href={business.googleReviewsUrl} target="_blank" rel="noreferrer">Leer opiniones <ArrowUpRight size={17} /></a></div></section>

      <section className="neo-section neo-visit" id="contacto"><div className="neo-shell reveal"><p className="neo-kicker">04 / VEN A VERNOS</p><h2>Tu siguiente ruta<br />pasa por <span>IBHOLA.</span></h2>
        <div className="neo-visit__grid"><div><MapPin /><p>{business.address.street}<br />{business.address.postalCode} {business.address.locality}, {business.address.region}</p><a className="neo-link" href={business.mapsUrl} target="_blank" rel="noreferrer">Abrir en Maps <Navigation size={16} /></a></div><div><Clock3 /><p>L–V&nbsp; 09:30–13:30 / 17:30–20:30<br />Sábado&nbsp; 10:00–13:30</p></div><div><Phone /><p><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><br /><a href={`mailto:${business.email}`}>{business.email}</a></p></div></div>
      </div></section>
    </main><SiteFooter /></>;
}
