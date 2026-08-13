import Image from "next/image";
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock3, Compass, Footprints, Mail, MapPin, Mountain, Navigation, Phone, Route, ShieldCheck, ShoppingBag, Store, UsersRound } from "lucide-react";
import { business } from "@/config/business";
import { Header } from "./Header";
import { LaunchScreen } from "./LaunchScreen";
import { RevealObserver } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { Topography } from "./Topography";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;
export function HomePage() {
  return <>
    <LaunchScreen /><RevealObserver /><Header />
    <main>
      <section className="hero" id="inicio"><Topography className="hero__topography" />
        <div className="hero__layout container-wide">
          <div className="hero__copy"><p className="eyebrow"><span /> Desde Corrales, Huelva</p><h1>Todo lo que necesitas para <em>salir a correr.</em></h1><p className="hero__lead">Calzado, textil y material para trail y running, con asesoramiento profesional de alguien que lleva muchos años sumando kilómetros.</p>
            <div className="hero__actions"><a className="button" href={link("/catalogo/")}>Ver catálogo <ArrowRight size={18} /></a><a className="button button--ghost" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a></div>
          </div>
          <div className="hero__visual"><div className="hero__photo"><Image src={imagePath("/images/hero-guadiana-junio-2025.webp")} alt="Corredor en la CXM del Guadiana" fill priority sizes="(max-width: 900px) 100vw, 54vw" /></div><div className="hero__terrain"><Mountain size={22} /><span>Trail · Running · Experiencia</span></div></div>
        </div>
      </section>

      <section className="principles"><div className="container-wide principles__grid"><div><Footprints size={21} /><span><b>Para todos los niveles</b>Desde tu primer día hasta la competición</span></div><div><Compass size={21} /><span><b>Asesoramiento profesional</b>Experiencia real corriendo</span></div><div><Store size={21} /><span><b>Trato cercano</b>En Corrales, junto a Huelva</span></div><a className="principles__rating" href={business.googleReviewsUrl} target="_blank" rel="noreferrer"><strong>{business.rating.toFixed(1)}</strong><span><b>★★★★★</b>{business.reviewCount} opiniones en Google</span><ArrowUpRight size={18} /></a></div></section>

      <section className="about section" id="presentacion"><div className="container about__intro">
        <div className="about__copy reveal"><p className="eyebrow"><span /> Quiénes somos</p><h2>Experiencia real <em>a tu servicio.</em></h2><p className="about__lead">Conocemos el material, las dudas y las necesidades de cada corredor para ofrecerte un trato profesional, cercano y adaptado a ti.</p><div className="about__actions"><a className="text-link" href={link("/quienes-somos/")}>Nuestra historia <ArrowRight size={18} /></a><a className="text-link" href={link("/catalogo/")}>Ver catálogo <ArrowRight size={18} /></a></div></div>
        <div className="about__visual reveal"><div className="about__image"><Image src={imagePath("/images/salida-carrera-ibhola.jpg")} alt="Salida de una carrera de la comunidad de IBHOLA" fill sizes="(max-width: 850px) 100vw, 52vw" /></div></div>
      </div>
      </section>

      <section className="home-services section" id="que-hacemos"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow"><span /> Qué hacemos</p><h2>Te ayudamos a <em>elegir bien.</em></h2></div><p>Asesoramiento profesional, material técnico y una atención adaptada a tu experiencia y tus objetivos.</p></div></div>
      <div className="container services">{[
        [Compass, "Asesoramiento", "Escuchamos cómo corres y buscamos contigo la opción adecuada."],
        [Footprints, "Ajuste y elección", "Comparamos comodidad, respuesta y estabilidad sin prisas."],
        [ShieldCheck, "Material técnico", "Calzado, ropa, hidratación, nutrición y accesorios."],
        [ShoppingBag, "Atención en tienda", "Prueba opciones, pregunta lo que necesites y decide sin prisas."],
        [UsersRound, "Comunidad", "Encuentros, pruebas y actividades para compartir kilómetros."],
        [Route, "Trail y asfalto", "Material para entrenar, competir o simplemente disfrutar corriendo."],
      ].map(([Icon, title, text]) => { const I = Icon as typeof Compass; return <article className="service reveal" key={title as string}><I size={24} /><h3>{title as string}</h3><p>{text as string}</p></article>; })}</div>
      <div className="container section-cta"><a className="button button--dark" href={link("/catalogo/")}>Explorar catálogo <ArrowRight size={17} /></a></div></section>

      <section className="reviews section" id="opiniones"><div className="container"><div className="reviews__heading reveal"><div><p className="eyebrow"><span /> Reseñas</p><h2>¿Qué opinan <em>nuestros clientes?</em></h2></div><div className="reviews__score"><strong>{business.rating.toFixed(1)}</strong><span>★★★★★<small>{business.reviewCount} reseñas</small></span></div></div>
        <div className="reviews__google reveal"><BadgeCheck size={28} /><p>Consulta las opiniones reales y actualizadas de nuestros clientes directamente en Google.</p><a className="button" href={business.googleReviewsUrl} target="_blank" rel="noreferrer">Ver opiniones en Google <ArrowUpRight size={17} /></a></div></div></section>

      <section className="contact section" id="contacto"><div className="container"><div className="contact__heading reveal"><p className="eyebrow"><span /> Dónde estamos</p><h2>Visítanos en <em>Corrales.</em></h2><p>Ven a la tienda, llámanos o escríbenos antes de desplazarte.</p></div>
        <div className="contact__main"><div className="contact__details reveal"><div className="contact__detail"><MapPin size={20} /><span><small>Dirección</small><a href={business.mapsUrl}>{business.address.street}<br />{business.address.postalCode} {business.address.locality}, {business.address.region}</a></span></div><div className="contact__detail"><Phone size={20} /><span><small>Teléfono</small><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></span></div><div className="contact__detail"><Mail size={20} /><span><small>Correo</small><a href={`mailto:${business.email}`}>{business.email}</a></span></div><div className="hours"><div className="hours__title"><Clock3 size={19} /><h3>Horario habitual</h3></div><div className="hours__row"><b>Lunes a viernes</b><span>09:30–13:30 / 17:30–20:30</span></div><div className="hours__row"><b>Sábado</b><span>10:00–13:30</span></div><div className="hours__row"><b>Domingo</b><span>Cerrado</span></div></div><div className="contact__buttons"><a className="button" href={business.mapsUrl}>Cómo llegar <Navigation size={17} /></a></div></div>
          <div className="contact__map reveal"><iframe src={business.mapEmbedUrl} title={`Mapa de ${business.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="contact__map-label"><Store size={17} /> Dónde estamos</div></div></div>
        <div className="home-contact-cta reveal"><div><p className="eyebrow"><span /> Contacto</p><h2>¿Quieres preguntarnos algo?</h2><p>Envíanos tu consulta desde el formulario y te responderemos lo antes posible.</p></div><a className="button" href={link("/preguntas-frecuentes/#contacto")}>Contacta con nosotros <ArrowRight size={17} /></a></div>
      </div></section>
    </main><SiteFooter />
  </>;
}
