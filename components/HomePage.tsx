import Image from "next/image";
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock3, Compass, Footprints, Mail, MapPin, Navigation, Phone, Route, ShieldCheck, ShoppingBag, Store, UsersRound } from "lucide-react";
import { business } from "@/config/business";
import { Header } from "./Header";
import { GoogleReviewsLink } from "./GoogleReviewsLink";
import { LaunchScreen } from "./LaunchScreen";
import { RevealObserver } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { FacebookLogo, InstagramLogo } from "./SocialIcons";
import { Topography } from "./Topography";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;
const link = (path: string) => `${basePath}${path}`;
const reviews = [
  { quote: "La calidad comienza nada más entrar. Si quieres el mejor asesoramiento y un lugar de confianza, este es tu sitio.", author: "F. Ripoll" },
  { quote: "Miguel en todo momento te asesora y recomienda cuál es tu zapatilla. Ideal para personas como yo, que estamos comenzando en esto del running.", author: "Jose Manuel González Romero" },
  { quote: "Tienda especializada en trail running. Productos de gran calidad, asesoramiento, profesionalidad, amabilidad y un trato de diez.", author: "Ricardo Escobar Vilatersana" },
] as const;

export function HomePage() {
  return <>
    <LaunchScreen /><RevealObserver /><Header />
    <main>
      <section className="hero" id="inicio"><Topography className="hero__topography" />
        <div className="hero__layout container-wide">
          <div className="hero__copy"><h1>Todo lo que necesitas para <em>salir a correr.</em></h1><p className="hero__lead">Calzado, textil y material para trail y running, con asesoramiento profesional de alguien que lleva muchos años sumando kilómetros.</p>
            <div className="hero__actions"><a className="button" href={link("/catalogo/")}>Ver catálogo <ArrowRight size={18} /></a><a className="button button--ghost" href={business.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar <Navigation size={17} /></a></div>
            <a className="hero__rating" href={business.googleReviewsUrl} target="_blank" rel="noreferrer" aria-label="Escribir una reseña de IBHOLA en Google"><b>★★★★★</b><span><strong>{business.rating.toFixed(1)}</strong> · {business.reviewCount} opiniones en Google</span><ArrowUpRight size={15} /></a>
          </div>
          <div className="hero__visual"><div className="hero__photo"><Image src={imagePath("/images/comunidad/IMG-20260505-WA0038.jpg")} alt="Miguel Ángel Pereira corriendo entre agua y monte" fill priority quality={92} sizes="(max-width: 900px) 100vw, 54vw" /></div></div>
        </div>
      </section>

      <section className="about section" id="presentacion"><div className="container about__intro">
        <div className="about__copy reveal"><h2>Experiencia real <em>a tu servicio.</em></h2><p className="about__lead">Conocemos el material, las dudas y las necesidades de cada corredor para ofrecerte un trato profesional, cercano y adaptado a ti.</p><div className="about__actions"><a className="text-link" href={link("/catalogo/")}>Ver catálogo <ArrowRight size={18} /></a></div></div>
        <div className="about__visual reveal"><div className="about__image"><Image src={imagePath("/images/comunidad/IMG-20260706-WA0085~2.jpg")} alt="Miguel Ángel Pereira sonriendo al finalizar una carrera" fill quality={92} sizes="(max-width: 850px) 100vw, 52vw" /></div></div>
      </div>
      </section>

      <section className="home-services section" id="que-hacemos"><div className="container"><div className="section-heading reveal"><div><h2>Te ayudamos a <em>elegir bien.</em></h2></div><p>Asesoramiento profesional, material técnico y una atención adaptada a tu experiencia y tus objetivos.</p></div></div>
      <div className="container services">{[
        [Compass, "Asesoramiento", "Escuchamos cómo corres y buscamos contigo la opción adecuada."],
        [Footprints, "Ajuste y elección", "Comparamos comodidad, respuesta y estabilidad sin prisas."],
        [ShieldCheck, "Material técnico", "Calzado, ropa, hidratación, nutrición y accesorios."],
        [ShoppingBag, "Atención en tienda", "Prueba opciones, pregunta lo que necesites y decide sin prisas."],
        [UsersRound, "Comunidad", "Encuentros, pruebas y actividades para compartir kilómetros."],
        [Route, "Trail y asfalto", "Material para entrenar, competir o simplemente disfrutar corriendo."],
      ].map(([Icon, title, text]) => { const I = Icon as typeof Compass; return <article className="service reveal" key={title as string}><I size={24} /><h3>{title as string}</h3><p>{text as string}</p></article>; })}</div>
      <div className="container section-cta"><a className="button button--dark" href={link("/catalogo/")}>Explorar catálogo <ArrowRight size={17} /></a></div></section>

      <section className="gallery section" id="tienda">
        <div className="gallery__heading reveal"><div><h2>Conoce la tienda <em>por dentro.</em></h2></div><a href={business.mapsUrl} target="_blank" rel="noreferrer">Ven a visitarnos <ArrowUpRight size={17} /></a></div>
        <div className="gallery__grid">
          <figure className="gallery__item gallery__item--runner reveal"><Image src={imagePath("/images/tienda/interior-20.jpeg")} alt="Vista general del interior de la tienda IBHOLA" fill sizes="(max-width: 850px) 100vw, 40vw" /><figcaption><Store size={17} aria-hidden="true" /> IBHOLA por dentro</figcaption></figure>
          <figure className="gallery__item gallery__item--kit reveal"><Image src={imagePath("/images/tienda/interior-09.jpeg")} alt="Entrada y zona de textil de la tienda IBHOLA" fill sizes="(max-width: 850px) 100vw, 28vw" /><figcaption><Route size={17} aria-hidden="true" /> Trail y running</figcaption></figure>
          <figure className="gallery__item gallery__item--store reveal"><Image src={imagePath("/images/tienda/interior-42.jpeg")} alt="Pasillo interior con ropa técnica de IBHOLA" fill sizes="(max-width: 850px) 100vw, 32vw" /><figcaption><UsersRound size={17} aria-hidden="true" /> Atención en tienda</figcaption></figure>
          <figure className="gallery__item gallery__item--singlet reveal"><Image src={imagePath("/images/tienda/interior-37.jpeg")} alt="Exposición de calzado de trail y running en IBHOLA" fill sizes="(max-width: 850px) 100vw, 28vw" /><figcaption><Footprints size={17} aria-hidden="true" /> Material especializado</figcaption></figure>
        </div>
      </section>

      <section className="reviews section" id="opiniones"><div className="container">
        <div className="reviews__heading reveal"><div><p className="eyebrow">La comunidad habla</p><h2>¿Qué opinan <em>nuestros clientes?</em></h2></div><GoogleReviewsLink /></div>
        <div className="reviews__grid">{reviews.map((review, index) => <article className="review reveal" key={review.quote}><div><span className="review__stars" aria-hidden="true">★★★★★</span><span>{String(index + 1).padStart(2, "0")}</span></div><blockquote>“{review.quote}”</blockquote><footer><span className="review__author"><BadgeCheck size={15} aria-hidden="true" /><span>{review.author}</span></span><span className="review__label">Opinión destacada</span></footer></article>)}</div>
      </div></section>

      <section className="social-feed section"><div className="container">
        <div className="social-feed__intro reveal"><div><h2>Lo último de <em>IBHOLA.</em></h2></div><p>Material recién llegado, carreras, encuentros y el día a día de nuestra comunidad, directamente desde nuestras redes.</p><div className="social-feed__platforms"><a className="social-platform social-platform--instagram" href={business.social.instagram} target="_blank" rel="noreferrer" aria-label="IBHOLA en Instagram"><InstagramLogo size={27} /><span>Instagram<small>{business.social.instagramHandle}</small></span></a><a className="social-platform social-platform--facebook" href={business.social.facebook} target="_blank" rel="noreferrer" aria-label="IBHOLA en Facebook"><FacebookLogo size={27} /><span>Facebook<small>IBHOLA Trail Running</small></span></a></div></div>
        <div className="social-feed__grid">
          <div className="social-feed__feature reveal"><Image src={imagePath("/images/equipacion-enhanced.webp")} alt="Comunidad de corredores de IBHOLA" fill sizes="(max-width: 850px) 100vw, 52vw" /><div className="social-feed__feature-copy"><span>Trail · Running · Comunidad</span><h3>Compartimos cada <em>kilómetro.</em></h3><p>Síguenos para conocer las novedades de la tienda y todo lo que se mueve alrededor de IBHOLA.</p><div><a href={business.social.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={18} /> Instagram</a><a href={business.social.facebook} target="_blank" rel="noreferrer"><FacebookLogo size={18} /> Facebook</a></div></div></div>
          <div className="instagram-feed reveal"><div className="instagram-feed__heading"><i><InstagramLogo size={22} /></i><div><small>Publicaciones recientes</small><strong>{business.social.instagramHandle}</strong></div><a href={business.social.instagram} target="_blank" rel="noreferrer">Abrir perfil <ArrowUpRight size={15} /></a></div><div className="instagram-feed__viewport"><iframe src="https://www.instagram.com/ibhola/embed/" title="Últimas publicaciones de IBHOLA en Instagram" width="500" height="690" loading="lazy" /></div><a className="instagram-feed__footer" href={business.social.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={17} /> Ver más en Instagram <ArrowUpRight size={16} /></a></div>
        </div>
      </div></section>

      <section className="contact section" id="contacto"><div className="container"><div className="contact__heading reveal"><h2>Visítanos en <em>Corrales.</em></h2><p>Ven a la tienda, llámanos o escríbenos antes de desplazarte.</p></div>
        <div className="contact__main"><div className="contact__details reveal"><div className="contact__detail"><MapPin size={20} /><span><small>Dirección</small><a href={business.mapsUrl}>{business.address.street}<br />{business.address.postalCode} {business.address.locality}, {business.address.region}</a></span></div><div className="contact__detail"><Phone size={20} /><span><small>Teléfono</small><a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></span></div><div className="contact__detail"><Mail size={20} /><span><small>Correo</small><a href={`mailto:${business.email}`}>{business.email}</a></span></div><div className="hours"><div className="hours__title"><Clock3 size={19} /><h3>Horario habitual</h3></div><div className="hours__row"><b>Lunes a viernes</b><span>09:30–13:30 / 17:30–20:30</span></div><div className="hours__row"><b>Sábado</b><span>10:00–13:30</span></div><div className="hours__row"><b>Domingo</b><span>Cerrado</span></div></div><div className="contact__buttons"><a className="button" href={business.mapsUrl}>Cómo llegar <Navigation size={17} /></a></div></div>
          <div className="contact__map reveal"><iframe src={business.mapEmbedUrl} title={`Mapa de ${business.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="contact__map-label"><Store size={17} /> Dónde estamos</div></div></div>
        <div className="home-contact-cta reveal"><div><h2>¿Quieres preguntarnos algo?</h2><p>Envíanos tu consulta desde el formulario y te responderemos lo antes posible.</p></div><a className="button" href={link("/preguntas-frecuentes/#contacto")}>Contacta con nosotros <ArrowRight size={17} /></a></div>
      </div></section>
    </main><SiteFooter />
  </>;
}
