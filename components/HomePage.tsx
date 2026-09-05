import Image from "next/image";
import { ArrowRight, ArrowUpRight, Navigation, MapPin } from "lucide-react";
import { business } from "@/config/business";
import { Header } from "./Header";
import { SiteFooter } from "./SiteFooter";
import { FacebookLogo, InstagramLogo } from "./SocialIcons";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const link = (path: string) => `${basePath}${path}`;
const families = [
  ["01", "Calzado", "Encuentra tu próxima zancada.", "calzado", "/images/catalogo/calzado-hoka-trail.jpg"],
  ["02", "Textil técnico", "Comodidad en cada kilómetro.", "textil", "/images/catalogo/textil-personalizado.jpg"],
] as const;

export function HomePage() {
  return <><Header /><main id="main-content" className="editorial-home" tabIndex={-1}>
    <section className="ed-hero" id="inicio">
      <div className="ed-hero__heading container-wide"><p className="eyebrow">Trail & running / Corrales, Huelva</p><h1>Todo empieza<br />por <em>salir.</em></h1><div className="ed-hero__intro"><p>Material que conocemos.<br />Consejos de quien también corre.<br />Tu tienda de trail y running en Huelva.</p><a className="button" href={link("/catalogo/")}>Encuentra tu equipo <ArrowUpRight size={19} /></a></div></div>
      <figure className="ed-hero__photo"><Image src={link("/images/hero-guadiana-junio-2025.webp")} alt="Corredor superando una subida en la CXM del Guadiana" fill priority sizes="100vw" quality={90} /><figcaption><span>Ahí fuera es donde todo cobra sentido.</span><span>CXM del Guadiana / Archivo IBHOLA</span></figcaption></figure>
      <div className="ed-hero__strip container-wide"><span>Trail. Asfalto. A tu ritmo.</span><a href={link("/#contacto")}>Pasa por la tienda <ArrowDownIcon /></a></div>
    </section>

    <section className="ed-equipment ed-section container-wide" id="que-hacemos">
      <div className="ed-section-heading"><div><p className="eyebrow">01 / El material</p><h2>Elige tu<br /><em>próxima salida.</em></h2></div><p>Desde las primeras zapatillas hasta el material de tu próxima carrera. Te ayudamos a elegir lo que necesitas, sin prisas.</p></div>
      <div className="ed-families">{families.map(([number, title, description, id, image]) => <a className="ed-family" key={id} href={link(`/catalogo/#${id}`)}><div className="ed-family__image"><Image src={link(image)} alt={title === "Calzado" ? "Zapatillas HOKA de trail sobre roca" : "Camiseta técnica con diseño IBHOLA"} fill sizes="(max-width: 699px) 100vw, 50vw" /><span>{number} / Colección</span></div><div className="ed-family__title"><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={27} /></div></a>)}</div>
      <nav className="ed-category-index" aria-label="Más familias del catálogo">{[["03", "Suplementación", "suplementacion"], ["04", "Complementos", "complementos"], ["05", "Accesorios", "accesorios"], ["06", "Cuidado deportivo", "cuidado"]].map(([n, title, id]) => <a href={link(`/catalogo/#${id}`)} key={id}><small>{n}</small><span>{title}</span><ArrowUpRight size={20} /></a>)}</nav>
      <p className="ed-stock-note">El catálogo es una selección de referencia. Consulta modelos, tallas y disponibilidad en tienda.</p>
    </section>

    <section className="ed-person ed-section" id="presentacion"><div className="container-wide ed-person__grid"><div className="ed-person__photo"><Image src={link("/images/miguel-pereira-retrato.jpg")} alt="Miguel Ángel Pereira, de IBHOLA Trail Running" fill sizes="(max-width: 699px) 100vw, 40vw" /></div><div className="ed-person__copy"><p className="eyebrow">02 / Detrás del mostrador</p><h2>Hablamos<br />tu <em>idioma.</em></h2><p className="ed-lead">El del terreno, las distancias y esas zapatillas que tienen que sentirse bien.</p><p>Soy Miguel Ángel Pereira. En IBHOLA compartimos la experiencia de correr para ayudarte a elegir. Cuéntanos por dónde te mueves, qué buscas y cómo te gusta correr.</p><a className="text-link" href={link("/que-hacemos/")}>Así te asesoramos <ArrowRight size={18} /></a><div className="ed-person__signature">Miguel Ángel Pereira <span>IBHOLA Trail Running</span></div></div></div></section>

    <section className="ed-community ed-section container-wide"><div className="ed-section-heading"><div><p className="eyebrow">03 / Mejor en compañía</p><h2>Hay kilómetros<br />que <em>se comparten.</em></h2></div><a className="text-link" href={link("/eventos/")}>Nuestra comunidad <ArrowUpRight size={18} /></a></div><div className="ed-community__photo"><Image src={link("/images/eventos/quedadas-jueves/03-atardecer-playa.jpg")} alt="Corredores de las quedadas IBHOLA en la playa al atardecer" fill sizes="100vw" /></div><div className="ed-community__caption"><span className="ed-day">JUE<span>20:30</span></span><div><h3>El jueves, nos vemos fuera.</h3><p>Salimos desde IBHOLA. Todos los niveles, sin inscripción. Un rato para correr, conocer gente y disfrutar del camino.</p></div><a className="button button--outline" href={link("/eventos/")}>Conoce las quedadas <ArrowRight size={18} /></a></div></section>

    <section className="ed-custom container-wide"><div><p className="eyebrow">Hecho para vuestro equipo</p><h2>Vuestros colores.<br /><em>Vuestra historia.</em></h2><p>Diseño y fabricación de equipaciones para clubes, grupos y eventos. De una prenda especial a un equipo completo.</p><a className="text-link" href={link("/diseno-personalizado/")}>Diseño personalizado <ArrowUpRight size={18} /></a></div><div className="ed-custom__image"><Image src={link("/images/catalogo/personalizacion-camiseta.png")} alt="Camiseta deportiva personalizada IBHOLA" fill sizes="(max-width: 699px) 80vw, 40vw" /></div></section>

    <section className="ed-store ed-section container-wide" id="tienda"><div className="ed-section-heading"><div><p className="eyebrow">04 / Tu punto de salida</p><h2>Nos vemos<br />en <em>Corrales.</em></h2></div><p>Entra, prueba y pregunta.<br />Aquí seguimos hablando de correr.</p></div><div className="ed-store__grid"><div className="ed-store__image"><Image src={link("/images/tienda/interior-20.jpeg")} alt="Interior de IBHOLA con textil, calzado y material de running" fill sizes="(max-width: 899px) 100vw, 60vw" /></div><div className="ed-store__details" id="contacto"><MapPin size={25} /><h3>IBHOLA Trail Running</h3><address>{business.address.street}<br />{business.address.postalCode} {business.address.locality}, {business.address.region}</address><dl><div><dt>Lunes a viernes</dt><dd>09:30–13:30 / 17:30–20:30</dd></div><div><dt>Sábado</dt><dd>10:00–13:30</dd></div><div><dt>Domingo</dt><dd>Cerrado</dd></div></dl><a className="button" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a><div className="ed-store__contact"><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a></div></div></div><div className="ed-map"><iframe src={business.mapEmbedUrl} title="Cómo llegar a IBHOLA en Corrales, Huelva" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="ed-contact-line"><p>¿Una talla, un modelo, una duda?</p><a className="text-link" href={link("/preguntas-frecuentes/#contacto")}>Hablemos <ArrowUpRight size={18} /></a></div></section>

    <section className="ed-social container-wide"><div><p className="eyebrow">La vida entre carreras</p><h2>Sigue el ritmo.</h2><p>Novedades, encuentros y el día a día de IBHOLA.</p></div><div className="ed-social__links"><a href={business.social.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={23} /><span>Instagram<small>{business.social.instagramHandle}</small></span><ArrowUpRight size={20} /></a><a href={business.social.facebook} target="_blank" rel="noreferrer"><FacebookLogo size={23} /><span>Facebook<small>IBHOLA Trail Running</small></span><ArrowUpRight size={20} /></a></div><a className="ed-rating" href={business.googleReviewsUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">★★★★★</span><strong>{business.rating.toFixed(1)} / 5</strong><small>{business.reviewCount} opiniones en Google</small><span>Escribe tu reseña ↗</span></a></section>
  </main><SiteFooter /></>;
}

function ArrowDownIcon() { return <span aria-hidden="true">↓</span>; }
