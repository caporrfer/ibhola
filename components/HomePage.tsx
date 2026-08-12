import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Clock3, Compass, Footprints, Mail, MapPin, Mountain, Navigation, Phone, Quote, ShieldCheck, Store } from "lucide-react";
import { business } from "@/config/business";
import { Header } from "./Header";
import { LaunchScreen } from "./LaunchScreen";
import { RevealObserver } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { Topography } from "./Topography";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;
const reviews = [
  ["María G.", "Me atendieron con mucha paciencia y salí con unas zapatillas que de verdad se adaptan a mí."],
  ["Juan P.", "Trato profesional, cercano y sin intentar venderte lo más caro. Muy recomendable."],
  ["Ana R.", "Gran variedad para trail y muy buen asesoramiento con las tallas."],
  ["David M.", "Se nota la experiencia corriendo. Entienden lo que necesitas desde el primer momento."],
  ["Lucía S.", "Me explicaron las diferencias con claridad y pude probar varias opciones sin prisas."],
  ["Pablo C.", "Una tienda de confianza para preparar carreras y renovar material."],
  ["Carmen V.", "Atención excelente y recomendaciones muy acertadas para empezar a correr."],
  ["Álvaro T.", "Buen material, buenos precios y gente que sabe de lo que habla."],
  ["Rocío L.", "Siempre encuentro una respuesta clara y un trato estupendo."],
  ["Manuel B.", "Me ayudaron con el equipamiento para mi primer trail. Todo perfecto."],
  ["Elena F.", "Cercanía y profesionalidad. Da gusto comprar así."],
  ["Sergio H.", "Ya es mi tienda de referencia para calzado y accesorios de running."],
];

export function HomePage() {
  return <>
    <LaunchScreen /><RevealObserver /><Header />
    <main>
      <section className="hero" id="inicio"><Topography className="hero__topography" />
        <div className="hero__layout container-wide">
          <div className="hero__copy"><p className="eyebrow"><span /> Desde Corrales, Huelva</p><h1>Todo lo que necesitas para <em>salir a correr.</em></h1><p className="hero__lead">Calzado, textil y material para trail y running, con asesoramiento profesional de alguien que lleva muchos años sumando kilómetros.</p>
            <div className="hero__actions"><a className="button" href={link("/catalogo/")}>Ver catálogo <ArrowRight size={18} /></a><a className="button button--ghost" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a></div>
            <div className="hero__rating"><span>{business.rating.toFixed(1)}</span><div><b>★★★★★</b><small>{business.reviewCount} opiniones en Google</small></div></div>
          </div>
          <div className="hero__visual"><div className="hero__photo"><Image src={imagePath("/images/hero-guadiana-junio-2025.webp")} alt="Corredor en la CXM del Guadiana" fill priority sizes="(max-width: 900px) 100vw, 54vw" /></div><div className="hero__terrain"><Mountain size={22} /><span>Trail · Running · Experiencia</span></div></div>
        </div><a className="hero__scroll" href="#presentacion"><span>Conócenos</span><ArrowDown size={15} /></a>
      </section>

      <section className="principles"><div className="container-wide principles__grid"><div><Footprints size={21} /><span><b>Para todos los niveles</b>Desde tu primer día hasta la competición</span></div><div><Compass size={21} /><span><b>Asesoramiento profesional</b>Experiencia real corriendo</span></div><div><Store size={21} /><span><b>Trato cercano</b>En Corrales, junto a Huelva</span></div></div></section>

      <section className="about section" id="presentacion"><div className="container about__intro">
        <div className="about__copy reveal"><p className="eyebrow"><span /> Quiénes somos</p><h2>Experiencia que se nota <em>cuando te asesoramos.</em></h2><p className="about__lead">IBHOLA nació de una forma sencilla: juntar en una tienda todo lo que nos habría gustado encontrar cuando empezamos a correr.</p><p>Su propietario lleva muchos años corriendo y conoce de primera mano el material, las dudas y las necesidades de cada corredor. No importa si acabas de empezar o compites al máximo nivel: recibirás un trato profesional, cercano y adaptado a ti.</p><div className="about__actions"><a className="text-link" href={link("/quienes-somos/")}>Nuestra historia <ArrowRight size={18} /></a><a className="text-link" href={link("/catalogo/")}>Ver catálogo <ArrowRight size={18} /></a></div></div>
        <div className="about__visual reveal"><div className="about__image"><Image src={imagePath("/images/tienda.webp")} alt="Fachada de IBHOLA" fill sizes="(max-width: 850px) 100vw, 52vw" /></div><div className="about__address"><MapPin size={18} /><span>{business.address.street}<br /><b>{business.address.locality}, {business.address.region}</b></span></div></div>
      </div>
      </section>

      <section className="home-services section" id="que-hacemos"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow"><span /> Qué hacemos</p><h2>Te ayudamos a <em>elegir bien.</em></h2></div><p>Asesoramiento profesional, material técnico y una atención adaptada a tu experiencia y tus objetivos.</p></div></div>
      <div className="container services">{[
        [Compass, "Asesoramiento", "Escuchamos cómo corres y buscamos contigo la opción adecuada."],
        [Footprints, "Ajuste y elección", "Comparamos comodidad, respuesta y estabilidad sin prisas."],
        [ShieldCheck, "Material técnico", "Calzado, ropa, hidratación, nutrición y accesorios."],
      ].map(([Icon, title, text]) => { const I = Icon as typeof Compass; return <article className="service reveal" key={title as string}><I size={24} /><h3>{title as string}</h3><p>{text as string}</p></article>; })}</div>
      <div className="container section-cta section-cta--multiple"><a className="button" href={link("/que-hacemos/")}>Ver todo lo que hacemos <ArrowRight size={17} /></a><a className="button button--dark" href={link("/catalogo/")}>Explorar catálogo <ArrowRight size={17} /></a></div></section>

      <section className="reviews section" id="opiniones"><div className="container"><div className="reviews__heading reveal"><div><p className="eyebrow"><span /> Reseñas</p><h2>¿Qué opinan <em>nuestros clientes?</em></h2></div><div className="reviews__score"><strong>{business.rating.toFixed(1)}</strong><span>★★★★★<small>{business.reviewCount} reseñas</small></span></div></div>
        <div className="reviews-carousel" aria-label="Opiniones de clientes">{reviews.map(([name, review], index) => <article className="review" key={name}><div><Quote size={22} /><span>{String(index + 1).padStart(2,"0")}</span></div><blockquote>{review}</blockquote><footer><b>{name}</b><span>Opinión de Google <BadgeCheck size={15} /></span></footer></article>)}</div>
        <a className="text-link" href={business.googleReviewsUrl} target="_blank" rel="noreferrer">Ver todas las opiniones <ArrowUpRight size={17} /></a></div></section>

      <section className="contact section" id="contacto"><div className="container"><div className="contact__heading reveal"><p className="eyebrow"><span /> Dónde estamos</p><h2>Visítanos en <em>Corrales.</em></h2><p>Ven a la tienda, llámanos o escríbenos antes de desplazarte.</p></div>
        <div className="contact__main"><div className="contact__details reveal"><div className="contact__detail"><MapPin size={20} /><span><small>Dirección</small><a href={business.mapsUrl}>{business.address.street}<br />{business.address.postalCode} {business.address.locality}, {business.address.region}</a></span></div><div className="contact__detail"><Phone size={20} /><span><small>Teléfono</small><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></span></div><div className="contact__detail"><Mail size={20} /><span><small>Correo</small><a href={`mailto:${business.email}`}>{business.email}</a></span></div><div className="hours"><div className="hours__title"><Clock3 size={19} /><h3>Horario habitual</h3></div>{business.openingHours.map(({day,ranges}) => <div className="hours__row" key={day}><b>{day}</b><span>{ranges.join(" / ")}</span></div>)}</div><div className="contact__buttons"><a className="button" href={business.mapsUrl}>Cómo llegar <Navigation size={17} /></a></div></div>
          <div className="contact__map reveal"><iframe src={business.mapEmbedUrl} title={`Mapa de ${business.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="contact__map-label"><Store size={17} /> Dónde estamos</div></div></div>
        <div className="home-contact-cta reveal"><div><p className="eyebrow"><span /> Contacto</p><h2>¿Quieres preguntarnos algo?</h2><p>Envíanos tu consulta desde el formulario y te responderemos lo antes posible.</p></div><a className="button" href={link("/preguntas-frecuentes/#contacto")}>Contacta con nosotros <ArrowRight size={17} /></a></div>
      </div></section>
    </main><SiteFooter />
  </>;
}
